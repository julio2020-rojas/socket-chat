var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'; // se redirecciona a la pagina 
    throw new Error('el nombre y la sala es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) { //callback
        console.log('usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    console.log('mensaje privado: ', mensaje);
});


// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// escuchar cambios de usuario
socket.on('listaPersona', function(personas) {
    console.log(personas);
});

// Enviar información
/*
socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/