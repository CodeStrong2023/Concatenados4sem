// Este modulo permite manipular archivos del sistema de manera asíncrona, pero con alternativas síncrona
const fs = require('fs');

// Primero leemos el archivo.txt
function leer(ruta) {
    fs.readFile(ruta, (err, data) => {
        console.log(data.toString());
    })
}




// Segundo, escribimos el archivo1.txt creandolo
function escribir(ruta, contenido) {
    fs.writeFile(ruta, contenido, function (err){
        if (err) {
            console.log('No se ha podido escribir', err);
        } else {
            console.log('Se ha escrito correctamente');
        }
    })
} 

// Tercero eliminamos el archivo1.txt
function borrar(ruta, cb) {
    fs.unlink(ruta, cb); // Elimina de manera asíncrona
}

borrar(`${__dirname}/archivo1.txt`, console.log);
//escribir(`${__dirname}/archivo1.txt`, 'Soy un nuevo archivo', console.log);

// Usamos la sintaxis del ES6
//leer(`${__dirname}/archivo.txt`, console.log );