const joinRoom = (socket, namespace) => ({ username, room }) => {}

const publicMessage = (namespace) => ({ room, message, username}) => {
    namespace.socket.in(room).emit('newMessage', { message, username })
}

const privateMessage = (namespace) => ({ privateMessage, to, from, room }) => {
    namespace.to(room).emit('privateMessage', { to, privateMessage, from, room})
}

const leaveRoom = (socket, namespace) => ({ room, username }) => {
    socket.leave(room, () => {
        let usersRoom = users[room]
        userRoom = usersRoom.filter((user) => (user.username !== username))
        namespace.socket.in(room).emit('newUser', userRoom)
    })
}

const joinPrivateRoom = (socket, namespace) => ({ username, room, to }) => {
    socket.join(to, () => {
        if (room !== null) {
            let userRoom = users[room]
            let userToTalk = userRoom.find(user => user.username === to)

            if (userToTalk.privateChat) {
                namespace.to(to).emit('leavePrivateRoom', { to, room, from: username, privateMessage: `${to} is already talking`})
                socket.leave(to, () => {
                    console.log(`user ${username} forced to left the room`)
                })
                return
            }
            // if the user is not talking we update the flag and notify the other user
            userToTalk.privateChat = true
            namespace.socket.in(room).emit('privateChat', { username, to })
        }
    })
}

const leavePrivateRoom = (socket, namespace) => ({ room, from, to }) => {
    let usersRoom = users[room]
    let userToTalk = userRoom.find(user => user.username === to)
    // update the flag and notify the other user
    userToTalk.privateChat = false
    namespace.to(to).emit('leavePrivateRoom', { to, from, privateMessage: `${to} has closed the chat`})
    socket.leave(to, () => {
        console.log(`user ${from} left the private chat with ${to}`)
    })
}
