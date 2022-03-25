const { Client } = require('pg');
const argumento = process.argv.slice(2);

let tipoFuncion = argumento[0];
let nombre = argumento[1];
let rut = argumento[2];
let curso = argumento[3];
let nivel = argumento[4];

//Requerimiento 1
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'always_music',
    password: 'Feer1985',
    port: 5432,
};

const client = new Client(config);

client.connect();

//Requerimiento 2
const nuevo = async () => {
    await client.query(`INSERT INTO alumnos (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', ${nivel});`);
    console.log(`Estudiante ${nombre} agregado con éxito`);
}

//Requerimiento 3
const consRut = async () => {
    const res = await client.query(`SELECT * FROM alumnos WHERE rut = '${argumento[1]}';`);
    console.log(res.rows);
}

//Requerimiento 4
const consulta = async () => {
    const res = await client.query(`SELECT * FROM alumnos;`);
    console.log('Registro actual ',res.rows);
}

//Requerimiento 5
const editar = async () => {
    const res = await client.query(`UPDATE alumnos SET nombre = '${nombre}', rut = '${rut}', curso ='${curso}', nivel = ${nivel} WHERE rut = '${rut}'`);
    console.log(`Estudiante '${nombre}' editado con éxito`);
}

//Requerimiento 6
const eliminar = async () => {
    await client.query(`DELETE FROM alumnos WHERE rut = '${argumento[1]}'`);
    console.log(`Registro de estudiante con rut ${argumento[1]} eliminado`);
}

const ejecutarFuncion = async () => {
    if (tipoFuncion == 'nuevo') {
        try {
            await nuevo();
        } catch (err) {
            console.log('Error: ', err);
        }
    } else if (tipoFuncion == 'consRut') {
        try {
            await consRut();
        } catch (err) {
            console.log('Error: ', err);
        }
    } else if (tipoFuncion == 'consulta') {
        try {
            await consulta();
        } catch (err) {
            console.log('Error: ', err);
        }
    } else if (tipoFuncion == 'editar') {
        try {
            await editar();
        } catch (err) {
            console.log('Error: ', err);
        }
    }else if (tipoFuncion == 'eliminar') {
        try {
            await eliminar();
        } catch (err) {
            console.log('Error: ', err);
        }
    }
    client.end();
}

ejecutarFuncion()