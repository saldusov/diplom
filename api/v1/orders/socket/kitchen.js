let io = require('../../../global').io;
var nsp = io.of('/kitchen');

nsp.on('connection', function (socket) {
  //console.log('user connected');
  
  socket.on('disconnect', function(){
    //console.log('user disconnected');
  });
});

module.exports = nsp;