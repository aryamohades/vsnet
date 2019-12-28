require('log-timestamp');

const WebSocket = require('ws');
const argv = require('yargs').argv;

const { conn = 1, ramp = 0, ip = '127.0.0.1', port = 8000 } = argv;

const ab = new ArrayBuffer();
const url = `ws://${ip}:${port}/ws`;

for (let i = 0; i < conn; i++) {
  const ws = new WebSocket(url);

  ws.on('open', () => {
    console.log(`established connection ${i + 1}`);

    setInterval(() => {
      ws.send(ab);
    }, 1000);
  });

  ws.on('close', () => {
    console.log(`connection ${i + 1} disconnected`);
  });

  ws.on('error', (error) => {
    console.log(`connection ${i + 1} error: ${error.message}`);
  });

  ws.on('message', (data) => {
    console.log(`received message from server: ${data}`);
  });
}
