import fs from 'fs';
import path from 'path';
import defaults from 'macos-defaults';

// const isArray = require('is-array');
// const isObj = require('is-obj');
import flatten from 'flatten';

import objToDot from 'plain-obj-to-dot-notation';
import stripJsonComments from 'strip-json-comments';
import JSON5 from 'json5'; // awesome/easy but probably quite slow

// json -> object
// get all objects -> merge -> execute

class macOSDefaultsSetup {
    constructor() {

        // handle flags

        flatten(Array.prototype.slice.call(arguments, 0)).forEach(filename => {

            let obj = this.parseObjectFromArg(path.resolve(__dirname, filename), {});

            if(obj){

                let defaultsWriteObj = objToDot(obj, true);

                Object.keys(defaultsWriteObj).forEach(k => {

                    let value = defaultsWriteObj[k];
                    let parts = k.split(".");
                    let key = parts.pop();
                    let domain = parts.join(".");
                    defaults.writeSync(domain, key, value);
                })
            }
        });
    }

    static readFileSync(file, options={}) {
      options.encoding = 'utf8';
      return fs.readFileSync(file, options);
    }

    static parseObjectFromArg(arg, options={}) {

      // if is obj return arg

      // is filename
      return this.parseObjectFromFileSync(arg, options);
    }

    static parseObjectFromFileSync(file, options={}) {

      // case statement to handle other file types
      return this.parseJsonLikeFileSync(file, options);
    }

    // filename.json with no flag
    static parseJsonLikeFileSync(file, options={}) {
      return this.parseJsonLikeSync(this.readFileSync(file, options))
    }

    static parseJsonLikeSync(text, reviver=null) {

      try {
          return JSON5.parse(text, reviver);
      } catch(ex){
          return null
      }
    }

    // if a flag is enabled go straight to relavent method rather than slow json5.parse method

    // filename.json --json
    static parseJsonFileSync(file, options={}) {
        return this.parseJsonSync(this.readFileSync(file, options))
    }

    static parseJsonSync(text, reviver=null) {
        try {
            return JSON.parse(text, reviver);
        } catch(ex){
            return null
        }
    }

    // filename.json --ld-json
    static parseLDJsonSync(text, reviver=null) {
      // line delimited json only
      // let text = mergeLDJson(text);
      return macOSDefaultsSetup.parseJsonSync(text, reviver);
    }

    static parseLDJsonFileSync(file, options={}) {
      //  line delimited json file only
      return macOSDefaultsSetup.parseLDJsonSync(this.readFileSync(file, options));
    }

    // filename.json --commented-json
    static parseCommentedJsonFileSync(file, options={}) {
      // commented json file only
      return macOSDefaultsSetup.parseCommentedJsonSync(this.readFileSync(file, options));
    }

    static parseCommentedJsonSync(text, reviver=null) {
      // commented json only
      return macOSDefaultsSetup.parseJsonSync(stripJsonComments(text), reviver);
    }
}

export default macOSDefaultsSetup;

