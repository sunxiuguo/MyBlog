# 实现一个自己的打包工具

webpack的官方定义:

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。
当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 打包工具需要做什么?

先来看一下咱们平时开发时写的代码

1. ESModule

```js
// a.js
import axios from 'axios'

export default axios;
```

2. CommonJS

```js
// a.js
const _ = require('axios');

module.exports = axios;
```

上述a.js文件只是一个简单的js文件, 如果他们里面有引用其他模块, 那么它们之间的依赖关系就由module系统来表示.

注意, ESModule 上述代码也无法在低版本浏览器运行. 

而打包工具会把这些比较简短的代码, 编译成更长更复杂的代码, 但是可以在低版本浏览器运行, 并且不破坏他们之间的依赖关系.

## 概览

1. 找到一个入口文件
2. 解析这个入口文件, 提取它的依赖.
3. 解析入口文件的依赖文件, 并提取依赖文件的依赖. (提炼一下语言, 就是递归的去创建一个文件间的依赖图, 描述所有文件间的依赖关系)
4. 把所有文件打包成一个文件

## 开始开发

1. 新建几个js源文件

* name.js

```js
export const name = 'lubai';
```

* message.js

```js
import {
    name
} from './name.js';

export default `${name} is a boy`;
```

* entry.js

```js
import message from './message.js';

console.log(message);
```

2. 先来看一下这三个文件的依赖关系

我们以entry.js做为入口文件. 

entry依赖message, message依赖name. 

entry.js => message.js => name.js

3. 开始编写咱们自己的打包工具 mywebpack.js

首先来读取一下入口文件entry.js的内容

```js
const fs = require('fs');

function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    console.log(content);
}

createAsset('./source/entry.js');
```

在当前目录下运行一下命令, 看一下输出
`node mywebpack.js`

4. 分析ast, 思考如何能够解析出entry.js文件的依赖

这里先看一个ast的工具 https://astexplorer.net/

可以在左侧输入代码, 右侧看到对应代码的AST

咱们可以把entry.js里的内容复制到左侧看一下。

4.1 可以看到最上级是一个File, File中包含换一个program, 就是我们的程序
4.2 在program的body属性里, 就是我们各种语法的描述
4.3 可以看到第一个就是 ImportDeclaration, 也就是引入的声明. 
4.4 ImportDeclaration里有一个source属性, 它的value就是引入的文件地址 './message.js'

5. 生成entry.js的ast

首先安装一下 babylon, 一个基于babel的js解析工具. 
官方解释：Babylon is a JavaScript parser used in Babel.

`npm i babylon`

```js
const fs = require('fs');
const babylon = require('babylon');

function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = babylon.parse(content, {
        sourceType: 'module'
    });

    console.log(ast);
}

createAsset('./source/entry.js');
```

再来运行一下mywebpack.js看看输出是什么?

可以看到输出了一个Object, 这就是咱们entry.js的AST.

6. 基于AST, 找到 entry.js 的 ImportDeclaration Node

首先咱们需要遍历出 ImportDeclaration Node. 那么咱们就需要一个工具, babel-traverse

官方解释：We can use it alongside Babylon to traverse and update nodes

`npm i babel-traverse`

然后咱们利用它来遍历并获取到 ImportDeclaration 节点, 遍历到对应节点后, 可以提供一个函数来操作此节点. 

```js
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;

function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = babylon.parse(content, {
        sourceType: 'module'
    });

    traverse(ast, {
        ImportDeclaration: ({
            node
        }) => {
            console.log(node)
        }
    })
}

createAsset('./source/entry.js');
```

7. 获取entry.js的依赖

因为可能有多个依赖, 所以咱们声明一个数组来存储.

```js
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;

function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = babylon.parse(content, {
        sourceType: 'module'
    });

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({
            node
        }) => {
            dependencies.push(node.source.value);
        }
    })

    console.log(dependencies);
}

createAsset('./source/entry.js');
```

打印一下dependencies数组看看.

8. 优化函数 createAsset , 使其能够区分文件.

因为要获取所有文件的依赖, 所以咱们需要一个id来标识所有文件. 

这里咱们用一个简单的自增number, 这样遍历的每一个文件的id就唯一了.

同时咱们要先获取到入口文件的 id filename 以及 dependencies

```js
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;

let ID = 0;

function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = babylon.parse(content, {
        sourceType: 'module'
    });

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({
            node
        }) => {
            dependencies.push(node.source.value);
        }
    })

    const id = ID++;

    return {
        id,
        filename,
        dependencies
    }
}

const mainAsset = createAsset('./source/entry.js');
console.log(mainAsset);
```

运行一下看看, 是不是返回了正确的结果. 

9. 我们获取到了单个文件的依赖了, 接下来尝试建立依赖图

新增一个函数 createGraph, 把createAsset的调用移入此函数. 
同时entry的路径应该是需要动态的, 所以createGraph接收一个参数entry.

```js
function createGraph(entry) {
    const mainAsset = createAsset(entry);
}

const graph = createGraph('./source/entry.js');
console.log(graph);
```

声明一个数组, 来存储所有的Asset, 用以后续的遍历.

```js
function createGraph(entry) {
    const mainAsset = createAsset(entry);
    const allAsset = [mainAsset];

    for (let asset of allAsset) {
        asset.dependencies.forEach();
    }
}
```

10. 上面存储的所有路径都是相对路径, 想办法把他们转为绝对路径

因为有了绝对路径, 我们才能获取到他们的asset

```js
function createGraph(entry) {
    const mainAsset = createAsset(entry);
    const allAsset = [mainAsset];

    for (let asset of allAsset) {
        const dirname = path.dirname(asset.filename);
        asset.dependencies.forEach(relativePath => {
            const absoultePath = path.join(dirname, relativePath);
            const childAsset = createAsset(absoultePath);
        });
    }
}
```

11. 我们需要一个map, 来记录dependencies中的相对路径 和 childAsset的对应关系, 方便后续做依赖的引入

```js
function createGraph(entry) {
    const mainAsset = createAsset(entry);
    const allAsset = [mainAsset];

    for (let asset of allAsset) {
        const dirname = path.dirname(asset.filename);

        asset.mapping = {};

        asset.dependencies.forEach(relativePath => {
            const absoultePath = path.join(dirname, relativePath);

            const childAsset = createAsset(absoultePath);

            asset.mapping[relativePath] = childAsset.id;
        });
    }
}
```

12. 那么接下来如何遍历所有的文件?

很简单, 把新生成的chileAsset推入allAsset数组即可

```js
function createGraph(entry) {
    const mainAsset = createAsset(entry);
    const allAsset = [mainAsset];

    for (let asset of allAsset) {
        const dirname = path.dirname(asset.filename);

        asset.mapping = {};

        asset.dependencies.forEach(relativePath => {
            const absoultePath = path.join(dirname, relativePath);

            const childAsset = createAsset(absoultePath);

            asset.mapping[relativePath] = childAsset.id;

            allAsset.push(childAsset);
        });
    }

    return allAsset;
}
```

输出一下看看, 我们其实就已经获取到了他们之间依赖关系的图. 

有了依赖图了, 咱们接下来就要把所有文件打包成一个文件了

13. 新增一个方法bundle

它的入参就是咱们刚才创建的graph.

```js
function bundle(graph) {

}

const graph = createGraph('./source/entry.js');
const result = bundle(graph)
console.log(result);
```

14. 创建整体的结果代码

因为他需要接收参数, 且需要立即执行, 所以用一个自执行函数来包裹. 

他接收的参数是什么? 是module, 是每一个文件模块.

```js
function bundle(graph) {
    let modules = '';

    const result = `
        (function() {
            
        })({${modules}})
    `;
}
```

接下来遍历graph, 来获取所有的module, 拼接成modules

```js
function bundle(graph) {
    let modules = '';

    graph.forEach(module => {
        modules += `${module.id}:[

        ],`;
    })

    const result = `
        (function() {
            
        })({${modules}})
    `;
}
```

在这里, 每一个module.id对应的value, 应该有当前module的可执行代码, 也就是CommonJs规范的代码.  （这里可以看一下babel 在线演示工具, 展示一下是什么样子的代码. 
https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=true&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&prettier=true&targets=&version=7.14.2&externalPlugins= 
）

但是咱们上面只分析了依赖, 并没有去记录每一个module的代码对吧? 所以咱们添加一下对代码的记录。

1.  编译所有源代码

咱们修改createAsset方法, 在这里获取所有code并且编译.

首先咱们会用到babel-core, 安装他！

`npm i babel-core`

还会用到 babel-preset-env 作为预设来编译代码, 安装他！

`npm i babel-preset-env`

```js
const babel = require('babel-core');

let ID = 0;

function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = babylon.parse(content, {
        sourceType: 'module'
    });

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({
            node
        }) => {
            dependencies.push(node.source.value);
        }
    })

    const id = ID++;

    const {
        code
    } = babel.transformFromAst(ast, null, {
        // 第三个参数, 告诉babel以什么方式编译我们的代码. 这里我们就用官方提供的preset-env, 编译es2015+的js代码.
        // 当然还有其他的各种预设, 可以编译ts, react等等代码.
        presets: ['env']
    })

    return {
        id,
        filename,
        dependencies,
        code
    }
}
```

获取到了code之后, 咱们来打印一下看看.

```js
const graph = createGraph('./source/entry.js');
console.log(graph);
```

16. 把编译后的代码, 加入咱们的result中

再看一遍咱们bebal在线演示编译后的代码, 想一下咱们CommonJS的规范, 每个模块的代码函数其实要接收3个参数

require, module, exports

CommonJS规范规定，每个模块内部：

1. module变量代表当前模块。
这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

2. require方法用于加载模块。

```js
function bundle(graph) {
    let modules = '';

    graph.forEach(module => {
        modules += `${module.id}:[
            function(require, module, exports) {
                ${module.code}
            },
        ],`;
    })

    const result = `
        (function() {
            
        })({${modules}})
    `;

    return result;
}

```

那么接下来, 咱们是不是应该开始实现require函数? 因为module和exports其实咱们已经可以非常方便的拿到了.

首先咱们要先把要引入需要的mapping给放到modules里

```js

function bundle(graph) {
    let modules = '';

    graph.forEach(module => {
        modules += `${module.id}:[
            function(require, module, exports) {
                ${module.code}
            },
            ${JSON.stringify(module.mapping)},
        ],`;
    })

    const result = `
        (function() {
            
        })({${modules}})
    `;

    return result;
}
```

然后再输出一下看看, 发现现在这样输出的代码比较难看. 咱们加几个美化的命令

感兴趣的同学可以去npm搜一下哈. 全局安装就可以了.

`node mywebpack.js | js-beautify | highlight`

17. 接下来实现require方法

require方法应该接收一个参数, 来表示要引入哪些代码.

那么咱们可以用id来实现, 因为前面用一个mapping存了依赖的relativePath和模块id的映射关系.


```js
function bundle(graph) {
    let modules = '';

    graph.forEach(module => {
        modules += `${module.id}:[
            function(require, module, exports) {
                ${module.code}
            },
            ${JSON.stringify(module.mapping)},
        ],`;
    })

    // 记住这里modules的数据结构, 取出来的fn和mapping分别是什么?
    const result = `
        (function(modules) {
            function require(id) {
                const [fn, mapping] = modules[id];

                function localRequire(relativePath) {
                    return require(mapping[relativePath]);
                }

                const module = { exports: {}};

                fn(localRequire, module, module.exports);

                return module.exports;
            }
            require(0);
        })({${modules}})
    `;

    return result;
}
```

到这里基本就已经完成了, 咱们运行一下代码看看.

复制到浏览器里运行一下, 看看能不能正常运行。

18. 每次手动复制太麻烦了, 咱们把结果输出到一个文件里吧

`npm init`

```json
"scripts": {
    "build": "rm -rf dist.js && node mywebpack.js > dist.js"
},
```

最后运行

`npm run build`.

大功告成！