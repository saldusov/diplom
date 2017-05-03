let io = require('../../../global').io;
var nsp = io.of('/order');

nsp.on('connection', function (socket) {
	//console.log('user connection');
	// socket.request._query._id
  socket.join(socket.request._query._id);
  socket.on('disconnect', function(){
    //console.log('user disconnected');
  });
});

module.exports = nsp;