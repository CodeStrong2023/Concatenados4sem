/* El Asinc/Await convierte las promesas en procesos que parezcan sincronos
 Await solo es válido desde una función asincrona 
 La palabra async no es necesaria en las funciones, porque ya son asíncronas
 Igual proyectan una síncronia visual*/

async  function hola(nombre){
    return new Promise(function(resolve, reject){
        setTimeout(function() {
            console.log('Hola ' + nombre);
            resolve(nombre);
        }, 1000);
    }); 
}

async function  hablar(nombre){ 
    return new Promise((resolve, reject) => { // Usamos la sintaxis ES6
        setTimeout(function() {
            console.log('Bla bla bla bla');
            resolve(nombre);
        }, 1000);
    }); 
}


async function adios(nombre) {
    return new Promise((resolve, reject) => { 
        setTimeout(function() {
            //validamos el error o aprobacion
            console.log('Adios ' + nombre);
            //if(err) reject('Hay un error');
            resolve();
        }, 1000);
    });
}

// await hola('Ariel'); Esto es una mala sintaxis
// await solo es válido dentro de una función asíncrona
async function main() {
    let nombre = await hola('Ariel');
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
    console.log('Termina el proceso');
}

console.log('Empezamos el proceso');
main();
console.log('Esta va a ser la segunda instrucción');