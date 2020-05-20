const {io} = require('../index');
const {Usuarios} = require('../classes/usuarios');
const {crearMensaje } = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection',(client) => {
    client.on('entrarChat', (usuario,callback)=>{

        if(!usuario.nombre || !usuario.sala){
            return callback({
                error: false,
                message:'El nombre/sala es necesario'
            })
        }

    client.join(usuario.sala);

        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala )
        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonaPorSala(usuario.sala));
        client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('admin',`${usuario.nombre} se unió`));
        callback(usuarios.getPersonaPorSala(usuario.sala));
    });

    client.on('crearMensaje', (data, callback)=>{

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });

    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id)

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('admin',`${personaBorrada.nombre} se desconecto`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrada.sala));
    })

    //mensajes privados

    client.on('mensajePrivado', data =>{
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })
});