const longComputation = require('./longComputation');


process.on('message', msg => {
    console.log(`[ChildProcess] recevie msg = ${msg}, pid = ${process.pid}`);
    process.send(longComputation());
})