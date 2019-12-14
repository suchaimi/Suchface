const http = require('http')
const app = require('./app')
const config = require('./config')
const server = http.createServer(app)
const redis = require('socket.io-redis')

app.io.attach(server)
app.io.origin([config.ORIGINS])

server.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`)
})

// We configure the adapter throught configuration, so we can get
// the value fron environment variables when deploying
app.io.adapter(redis({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
}))
