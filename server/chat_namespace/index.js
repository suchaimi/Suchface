const config = require('./../config')

// Socket namespace
let namespace
const users = {
    general: [],
    sports: [],
    games: []
}

const onConnection = (socket) => {
    // Listening and joining room
    // socket.on('joinRoom', ({ username, room }) => {
    //     socket.join(room, () => {
    //         // Push user for suitable room    
    //         users[room].push({ username: username, privateChat: false })
    //         // Notify all the users in the same room
    //         namespace.in(room).emit('newUser', users[room])
    //     })
    // })

    socket.on('joinRoom', events.joinRoom(socket, namespace)) // Join a room
    socket.on('publicMessage', events.publicMessage(namespace)) // New public message
    socket.on('leaveRoom', events.leaveRoom(socket, namespace)) // Leave room
    socket.on('leaveChat', events.leaveChat(socket, namespace)) // Leave the chat
    socket.on('joinPrivateRoom', events.joinPrivateRoom(socket, namespace)) // Join private room
    socket.on('leavePrivateRoom', events.leavePrivateRoom(socket, namespace)) // Leave private room
    socket.on('privateMessage', events.privateMessage(namespace)) // Private message
    socket.on('changeStatus', events.changeStatus(socket, namespace)) // Set status
}

exports.createNameSpace = (io) => {
    namespace = io
        .of(config.CHAT_NAMESPACE)
        .on('connection', onConnection)
}
