let socket = io();

let params = new URLSearchParams(window.location.search);
if(!params.has('nombre')|| !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El parametro nombre y sala son requeridos');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}
// las funciones on escuchan eventos
socket.on('connect', function (){
    console.log('conectado al servidor');
    socket.emit('entrarChat', usuario, (resp)=>{
        console.log('Usuarios conectados:', resp);
    })
});
socket.on('disconnect', function(){
    console.log('Se perdio la conexion con el servidor');
})

//emitir un mensaje desde el frontend para que el servidor lo escuche
// las funciones emmit envian informacion
// socket.emit('crearMensaje', {
//     usuario: 'Camilo Dominguez',
//     mensaje: 'Hola CADS'
// }, (resp)=>{
//     console.log('respuesta del servidor', resp);
// });
//escuchar información

socket.on('crearMensaje',(resp)=>{
    console.log('Respuesta del servidor',resp);
})

//escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas',(personas)=>{
    console.log('Personas conectadas en el momento',personas);
})

//mensaje privados

socket.on('mensajePrivado', (mensaje)=>{
    console.log('mensajePrivado', mensaje)
})