const { io } = require('../server');
const { Usuarios } = require('../classes/usuario');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat', (data, callback) => {
        console.log(data);
        if (!data.nombre || !data.sala) {
            return callback({ error: true, mensaje: 'es necesario el nombre o sala' });
        }

        client.join(data.sala);
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala(data.sala));

        callback(usuarios.getPersonaPorSala(data.sala)); // los mensajes ahora son por salas
    });

    client.on('crearMensaje', (data) => { // el servidor esta escuchando al navegador cuano crea un mensaje en consola
        let persona = usuarios.getPersona(client.id); // se obtiene el id del navegador o cliente
        let mensaje = crearMensaje(persona.nombre, data.mensaje); // el respectivo nombre y mensaje que se escribe en la consola
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });


    // cuando s refresca el navegador es como el usuario abandona y se vuelve a conectar
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrada.sala));

    });

    client.on('mensajePrivado', data => { // servidor escucha cuando un usuario desea enviar un mensaje privado y recibe una data
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
});