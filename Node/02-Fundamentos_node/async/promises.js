function hola(nombre){
    return new Promise(function (resolve, reject) {
        setTimeout( function(){
            console.log('Hola '+nombre);
            resolve(nombre);
        }, 1000);
    });
}

function hablar(nombre){
    return new Promise( (resolve, reject) =>{ //Usar la sintaxis  ES6
        setTimeout( function (){
        console.log('bla bla bla')
        resolve(nombre);
     },1000);
    })
    
}

function adios(nombre){
    return new Promise( (resolve, reject) => {
        setTimeout( function(){
            console.log('Adios '+nombre);
            //resolve();
            reject('Hay un error');
        }, 1000);
    })
    
}
// Llamar a la:
console.log('Iniciando el proceso...');
hola('Ariel')
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(adios)
    .then((nombre) => {
        console.log('Terminando el proceso');
    })
    .catch(error => {
        console.log('Ocurrio un error: ');
        console.log(error);
    })