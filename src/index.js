/*++++++++++++++++++
+ INICIO DE LA APP +
+++++++++++++++++++*/

const { app, modo } = require('./app.js')
const { logger } = require('./config/logger.config.js')
const cluster = require('cluster')
const { cpus } = require('os')

const mainFork = () => {
    app.listen(app.get('port'))
    logger.info('Server listen on port:', app.get('port'))
}

const mainCluster = () => {
    const numCPUs = cpus().length
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
}

if (modo == 'CLUSTER' && cluster.isPrimary) {
    mainCluster()
} else {
    mainFork()
}
