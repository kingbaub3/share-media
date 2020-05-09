const express = require('express');
const app = express();
const helmet = require('helmet');

// Express configuration (order matters)
app.set('port', (process.env.PORT || 4200));

// Adding HSTS, removes the X-Powered-By header and sets the X-Frame-Options header to prevent click jacking, among other things.
app.use(helmet()); // All https is done through nginx.

// Directory routes to hide the structure of the project.
app.use(express.static(__dirname + '/dist/ShareScreen'));
app.use(express.static(__dirname + '/dist'));

// Always send the index.html file. Angular's routing is handling the diffe$
// url. That way, the page reload works when done with the browser.
app.get('/*', function (request, response, next) {
  response.sendFile('index.html', { root: __dirname + '/dist/ShareScreen/' });
});



const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(app.get('port'), function () {
  console.log('Server is running on port', app.get('port'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('offer', offer => {
    console.log("An offer just arrived", offer);
  });
});

