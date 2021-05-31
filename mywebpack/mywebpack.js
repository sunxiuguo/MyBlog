const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
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
        // 告诉babel以什么方式编译我们的代码
        presets: ['env']
    })

    return {
        id,
        filename,
        dependencies,
        code
    }
}

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

const graph = createGraph('./source/entry.js');
const result = bundle(graph)
console.log(result);