import socketIO from 'socketio';
import socketioJwt from 'socketio-jwt';

let io = socketIO(server);

io.on('connection', socketioJwt.authorize({
  secret: jwtsecret,
  timeout: 15000
})).on('authenticated', function (socket) {

  console.log('Это мое имя из токена: ' + socket.decoded_token.displayName);

  socket.on("clientEvent", (data) => {
    console.log(data);
  })
});
