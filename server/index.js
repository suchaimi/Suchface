const http = require('http')
const app = require('./app')
const config = require('./config')
const server = http.createServer(app)

app.io.attach(server)
app.io.origin([config.ORIGINS])

server.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`)
})
