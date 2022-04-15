let io;

module.exports = {
  init: (httpServer, corsOption) => {
    io = require('socket.io')(httpServer, corsOption);
    return io;
  },
  getIO: () => {
    if(!io) {
      throw new Error('Socket.io not initialized');
    }
    return io;
  }
}