import { WebSocketServer, WebSocket } from 'ws';


const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  // console.log(ws);

  console.log('client connected');
  
  ws.on('message', function incoming(message) {
    
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: message.toString(),
    });
    // ws.send(JSON.stringify(payload));
    //* Broadcast to all clients
    // wss.clients.forEach(function each(client) {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    //* broadcast to all clients except the sender
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  });

  // ws.send('hi there! I am a server!');

  ws.on('close', () => {
    console.log('client disconnected');
  });

  // setInterval(() => {
  //   ws.send('server message');
  // }, 10000);
});