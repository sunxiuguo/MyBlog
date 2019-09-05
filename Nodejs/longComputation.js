const longComputation = () => {
    let sum = 0;
    let i = 0;
    const now = Date.now();
    while(i++ < 1e10) {
        sum = sum + i;
    }
    console.log(`sum = ${sum}, cost time ${Date.now() - now}`);

    return sum;
}

module.exports = longComputation;