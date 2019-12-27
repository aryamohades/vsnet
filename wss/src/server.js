const uWS = require('uWebSockets.js');

const port = 8000;
let counter = 0;

const app = uWS
  .App()
  .ws('/ws', {
    compression: 0,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 30,
    open: (ws, req) => {
      counter++;

      if (counter % 100 === 0) {
        console.log(`connections: ${counter}`);
      }

      console.log(`a client connected via URL: ${req.getUrl()}`);
    },
    message: (ws, message, isBinary) => {
      /* Ok is false if backpressure was built up, wait for drain */
      let ok = ws.send(message, isBinary);
    },
    drain: (ws) => {
      console.log(`socket backpressure: ${ws.getBufferedAmount()}`);
    },
    close: (ws, code, message) => {
      counter--;

      if (counter % 100 === 0) {
        console.log(`connections: ${counter}`);
      }

      console.log('socket closed');
    }
  })
  .any('/*', (res, req) => {
    res.end('nothing to see here!');
  })
  .listen(port, (token) => {
    if (token) {
      console.log(`listening on port ${port}`);
    } else {
      console.log(`failed to listen to port ${port}`);
    }
  });
