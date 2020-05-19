const express = require('express');
const socketIO = require('socket.io');
const http =require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const port = process.env.PORT || 3000;
let publicPath = path.resolve(__dirname,'../public')

app.use(express.static(publicPath));

//Comunicación directa con el servidor
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port,(err)=>{
    if(err)throw new Error(err);
    console.log('Servidor corriendo en el puerto 3000')
});