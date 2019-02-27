// 深拷贝

// 递归
function deepClone(source) {
    if (!isObject(source)) {
        return source;
    }
    let result = {};
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (isObject(source[key])) {
                result[key] = deepClone(source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }
    return result;
}

// 循环
function cloneLoop(source) {
    const root = {};
    const loopList = [{
        parent: root,
        data: source,
        key: undefined,
    }];

    while (loopList.length) {
        const node = loopList.pop();
        const parent = node.parent;
        const data = node.data;
        const key = node.key;
        
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                if (isObject(data[i])) {
                    loopList.push({
                        parent: res,
                        key: i,
                        data: data[i]
                    })
                } else {
                    res[i] = data[i];
                }
            }
        }
    }

    return root;
}




function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
}