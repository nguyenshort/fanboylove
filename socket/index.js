const io = require('socket.io')()
const socketapi = {
  io: io
}

const story = require('./story')

// Add your socket.io logic here!
io.on('connection', function (socket) {
  socket.on('view-story', async (storyID) => {
    socket.join(`story${storyID}`)
    io.to(`story${storyID}`).emit('chapters', await story.chapters(storyID))
  })
})
// end of socket.io logic

module.exports = socketapi
