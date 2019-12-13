const joinRoom = (socket, namespace) => ({ username, room }) => {}

const publicMessage = (namespace) => ({ room, message, username}) => {
    namespace.socket.in(room).emit('newMessage', { message, username })
}

const privateMessage = (namespace) => ({ privateMessage, to, from, room }) => {
    namespace.to(room).emit('privateMessage', { to, privateMessage, from, room})
}
