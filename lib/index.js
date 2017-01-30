const fs = require('fs');
const path = require('path');
const defaults = require('macos-defaults');
// const isArray = require('is-array');
// const isObj = require('is-obj');
const flatten = require('flatten');

const objToDot = require('plain-obj-to-dot-notation');

export default function () {

    let args = flatten(Array.prototype.slice.call(arguments, 0));

    args.forEach(filename => {

        let obj = parseJsonFileSync(path.resolve(__dirname, filename), {});

        if(obj){

            let defaultsWriteObj = objToDot(obj, true);

            Object.keys(defaultsWriteObj).forEach(function(k){

                let value = defaultsWriteObj[k];
                let parts = k.split(".");
                let key = parts.pop();
                let domain = parts.join(".");
                defaults.writeSync(domain, key, value);
            })
        }
    });
}

function parseJsonFileSync(file, options) {

    options = options || {};
    options.encoding = 'utf8';
    let data = fs.readFileSync(file, options);
    return data ? parseJsonSync(data, null) : null;
}

function parseJsonSync(text, reviver){
    try {
        return JSON.parse(text, reviver || null);
    } catch(ex){
        return null
    }
}