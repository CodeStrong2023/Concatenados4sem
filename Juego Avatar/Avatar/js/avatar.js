let vidasJugador = 3;
let vidasEnemigo = 3;
let personajeSeleccionado = null;
let personajeEnemigo = null;
let ataqueJugador = null;
let ataqueEnemigo = null;
let resultado = null;

const body = document.querySelector('body');
const spanVidasJugador = document.getElementById('vida-jugador');
const spanVidasEnemigo = document.getElementById('vida-enemigo');
const mostrarBtnAtaque = document.getElementById('btn-atq'); 
const mostrarReiniciar = document.getElementById('reiniciar');
const mostrarBtnComenzar = document.getElementById('boton-comenzar');
const textoSeleccionar = document.getElementById('pj-select');
const textoReglas = document.getElementById('texto-reglas');
const seccionReglas = document.getElementById('reglas');
const mostrarAtaque = document.getElementById('seleccionar-ataque'); 
const mostrarMensaje = document.getElementById('mensajes'); 
const mostrarSeleccion = document.getElementById('seleccionar-personaje');
const sectionMensaje = document.getElementById('mensajes');
const mostrarBtnReglas = document.getElementById('boton-reglas');
const mostrarReglas = document.getElementById('reglas');
const botonPersonajeJugador = document.getElementById('boton-personaje');


document.addEventListener('DOMContentLoaded', function() {
    
    mostrarBtnReglas.addEventListener('click', function() {
        if (textoReglas.style.display === 'block') {
            textoReglas.style.display = 'none';
        } else {
            textoReglas.style.display = 'block';
        }
    });

    // Mostrar/ocultar selección de personaje
  
    mostrarBtnComenzar.addEventListener('click', function() {
        if (textoSeleccionar.style.display === 'block') {
            textoSeleccionar.style.display = 'none';
        } else {
            textoSeleccionar.style.display = 'block';
            mostrarBtnComenzar.style.display = 'none';
            mostrarReglas.style.display = 'none';
        }
    });

    // Selección de personajes y borde alrededor del personaje seleccionado
    document.querySelectorAll('.pj-container label').forEach(label => {
        label.addEventListener('click', function() {
            document.querySelectorAll('.pj-container label').forEach(label => {
                label.style.borderColor = 'transparent';
            });
            this.style.borderColor = '#F0EAD6'; // Color del borde cuando se selecciona
        });
    });

    iniciarJuego(); // Iniciar el juego al cargar el DOM
});

const crearPetalos = () => {
    let petalo = document.createElement('i');
    let x = innerWidth * Math.random();
    let size = (Math.random() * 8) + 1; 
    let z = Math.round(Math.random()) * 100;
    let delay = Math.random() * 5;
    let animacionPetalo = (Math.random() * 10) + 10;


    petalo.style.left = x + 'px';
    petalo.style.width = size + 'px';
    petalo.style.height = size + 'px';
    petalo.style.zIndex = z;
    petalo.style.animationDelay = delay + 's';
    petalo.style.animationDuration = animacionPetalo + 's';
   
    body.appendChild(petalo);

    setTimeout(() => {
        petalo.remove();
    }, animacionPetalo * 1500)
}

setInterval(crearPetalos, 400);

function iniciarJuego(){
    deshabilitarBotonesAtaque();
   
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);

    // Inicializar las vidas en la interfaz
    spanVidasJugador.innerHTML = vidasJugador.toString();
    spanVidasEnemigo.innerHTML = vidasEnemigo.toString();
    
    // Asignar eventos a los botones de ataque
    document.getElementById('boton-punio').addEventListener('click', ataquePunio);
    document.getElementById('boton-patada').addEventListener('click', ataquePatada);
    document.getElementById('boton-barrida').addEventListener('click', ataqueBarrida);
}

function seleccionarPersonajeJugador() {
    let spanPersonajeJugador = document.getElementById("personaje-jugador");
    
    // Verificar qué personaje está seleccionado
    document.querySelectorAll('input[name="personaje"]').forEach(personaje => {
        if (personaje.checked) {
            personajeSeleccionado = personaje.id;
        }
    });

    if (personajeSeleccionado === null) {
        alert('Debes seleccionar un personaje');
    } else {
        alert('El personaje que elegiste fue: ' + personajeSeleccionado);
        spanPersonajeJugador.innerHTML = personajeSeleccionado;
        seleccionarPersonajeEnemigo();
        habilitarBotonesAtaque();
        mostrarJuego();  // Mostrar la interfaz de juego
    }
}


function seleccionarPersonajeEnemigo(){
    let numero_aleatorio = numeroRandom(1, 4); 
    let spanPersonajeEnemigo = document.getElementById("personaje-enemigo");

    switch (numero_aleatorio) {
    case 1:
        spanPersonajeEnemigo.innerHTML = 'Aang';
        personajeEnemigo = 'Aang';
        break;
    case 2:
        spanPersonajeEnemigo.innerHTML = 'Katara';
        personajeEnemigo = 'Katara';
        break;
    case 3:
        spanPersonajeEnemigo.innerHTML = 'Toph';
        personajeEnemigo = 'Toph';
        break;
    case 4:
        spanPersonajeEnemigo.innerHTML = 'Zuko';
        personajeEnemigo = 'Zuko';
        break;
    }
}

function mostrarJuego() {
    
    // Asegúrate de que ambos elementos existen y se muestran correctamente
    if (mostrarAtaque && mostrarMensaje) {
        mostrarAtaque.style.display = 'block';
        mostrarMensaje.style.display = 'block';
        mostrarSeleccion.style.display = 'none';
        mostrarBtnAtaque.style.display = 'block';
        
    } else {
        console.error('Los elementos de ataque o mensajes no se encontraron en el DOM.');
    }
}

function ataquePunio() {
    ataqueJugador = 'Punio';
    ataqueAleatorioEnemigo();
}

function ataquePatada() {
    ataqueJugador = 'Patada';
    ataqueAleatorioEnemigo();
}

function ataqueBarrida() {
    ataqueJugador = 'Barrida';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = numeroRandom(1, 3);

    switch(ataqueAleatorio){
    case 1:
        ataqueEnemigo = 'Punio';
        break;
    case 2:
        ataqueEnemigo = 'Patada';
        break;
    case 3:
        ataqueEnemigo = 'Barrida';
        break;
    }

    mostrarResultado();
    crearMensaje();
    finJuego();
}

function mostrarResultado(){
    if (ataqueJugador == ataqueEnemigo){
        resultado = 'Empate';
    } else if (ataqueJugador == 'Punio'){
        resultado = (ataqueEnemigo === 'Patada') ? 'Derrota😵‍💫' : 'Victoria✌️';
    } else if (ataqueJugador == 'Patada'){
        resultado = (ataqueEnemigo === 'Barrida') ? 'Derrota😵‍💫' : 'Victoria✌️';
    } else if (ataqueJugador == 'Barrida'){
        resultado = (ataqueEnemigo === 'Punio') ? 'Derrota😵‍💫' : 'Victoria✌️';
    }

    if (resultado === 'Victoria✌️'){
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo.toString();
    } else if (resultado === 'Derrota😵‍💫'){
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador.toString();
    }
}

function finJuego(){
    if (vidasJugador === 0 || vidasEnemigo === 0){
        let mensaje = vidasJugador === 0 ? `El personaje del enemigo ${personajeEnemigo} ha ganado! 😵` : `Su personaje ${personajeSeleccionado} ha ganado! 🎉`;
        let sectionMensaje = document.getElementById('mensajes');
        let parrafo = document.createElement('p');
        parrafo.innerHTML = mensaje;
        sectionMensaje.appendChild(parrafo);
        deshabilitarBotonesAtaque();
        mostrarBtnAtaque.style.display = 'none';
        mostrarReiniciar.style.display = 'block';
    }
}

function deshabilitarBotonesAtaque() {
    document.getElementById('boton-punio').disabled = true;
    document.getElementById('boton-patada').disabled = true;
    document.getElementById('boton-barrida').disabled = true;
}

function habilitarBotonesAtaque() {
    document.getElementById('boton-punio').disabled = false;
    document.getElementById('boton-patada').disabled = false;
    document.getElementById('boton-barrida').disabled = false;
}

function crearMensaje(){
    
    let parrafo = document.createElement('p');
    parrafo.innerHTML= `Tu personaje ${personajeSeleccionado} atacó con ${ataqueJugador}, el personaje enemigo ${personajeEnemigo} atacó con ${ataqueEnemigo}, el resultado es: ${resultado}`;
    sectionMensaje.appendChild(parrafo);
    scrollToBottom();
}

function scrollToBottom() {
    mostrarMensaje.scrollTop = mostrarMensaje.scrollHeight;
}

function numeroRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function reiniciarJuego() {
    // Reiniciar variables de juego
    vidasJugador = 3;
    vidasEnemigo = 3;
    personajeSeleccionado = null;
    personajeEnemigo = null;
    resultado = null;
    ataqueJugador = null;
    ataqueEnemigo = null;

    // Reiniciar elementos visuales y mensajes
    spanVidasJugador.innerHTML = vidasJugador.toString();
    spanVidasEnemigo.innerHTML = vidasEnemigo.toString();
    document.getElementById('personaje-jugador').innerHTML = '';
    document.getElementById('personaje-enemigo').innerHTML = '';
    document.getElementById('mensajes').innerHTML = '';
    
    // Mostrar botones de comenzar y reglas

    mostrarBtnComenzar.style.display = 'inline-flex';
    textoReglas.style.display = 'block';
    mostrarSeleccion.style.display = 'block'; // Mostrar la selección de personajes
    mostrarMensaje.style.display = 'none';
    document.getElementById('seleccionar-ataque').style.display = 'none';
    mostrarBtnAtaque.style.dysplay = 'inline-flex';
    mostrarAtaque.style.display = 'none';
    mostrarReiniciar.style.display = 'none';
    textoReglas.style.display = 'none';
    textoSeleccionar.style.display = 'none';
    seccionReglas.style.display = 'block';
}


