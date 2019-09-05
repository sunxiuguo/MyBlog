const fork = require('child_process').fork;
const longComputation = require('./longComputation');


/**
 * 单进程 单线程 计算耗时造成线程阻塞的例子
 */
const singleProcessCompute = () => {
    const sum1 = longComputation();
    const sum2 = longComputation();
    console.log(`result = ${sum1 + sum2}`);
}

/**
 * 紫禁城
 */
const childProcessCompute = () => {
    const computeProcess = fork('./Nodejs/childProcess.js');
    computeProcess.send('开启一个子进程');
    const sum1 = longComputation();

    computeProcess.on('message', sum => {
        console.log(`[ParentProcess] receive sum from child process = ${sum}`);
        console.log(`result = ${sum1 + sum}`);
        computeProcess.kill();
    });

    computeProcess.on('close', (code, singal) => {
        console.log(`[ParentProcess] child process close with code = ${code} singal = ${singal}`);
        computeProcess.kill();
    });
}



singleProcessCompute();
// childProcessCompute();












