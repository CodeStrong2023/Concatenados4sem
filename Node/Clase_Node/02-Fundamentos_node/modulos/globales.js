// this === global = true

// Mostrar algo en consola
//console.log();
 
// Mostrar un mensaje en forma de error
//console.error();

// Ejecutar un codigo despues de un intervalo de tiempo
//setTimeout(() => {});

// Ejecutar un codigo cada intervalo de tiempo
//setInterval(() => {});

// Da prioridad de ejecucuin a una funcion asincronica
//setImmdiate(() => {});

//console.log(setInterval);

let i = 0;
let intervalo = setInterval(() => {
   console.log('Hola');
    if (i === 3) {
        clearInterval(intervalo); //detenemos la funcion
  }
   i++;
}, 1000);

setImmediate(() => {
    console.log('Saludo inmediato');
});

//requiere();

console.log(__filename);

global.miVariable = 'mi variable global';
console.log(miVariable);