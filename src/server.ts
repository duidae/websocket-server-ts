import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

const PORT = 3002;
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ 
    port: PORT,
    server 
});

wss.on('connection', (ws: WebSocket) => {
    //connection is up, let's add a simple event
    ws.on('message', (message: string) => {
        //log the received message and send it back to the client
        console.log('[Server received]: %s', message);
        ws.send(`[Echo server respond]: ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send(`[Connected] Hi there, I am a WebSocket echo server @ ws://localhost:${PORT}`);
});

//start our server
server.listen(() => {
    console.log(`Echo server started on ws://localhost:${PORT}`);
});
