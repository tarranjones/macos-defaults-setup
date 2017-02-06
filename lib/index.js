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

const macOSDefaultsSetup = function () {

    // handle flags

    flatten(Array.prototype.slice.call(arguments, 0)).forEach(function(filename){

        let obj = macOSDefaultsSetup.parseObjectFromArg(path.resolve(__dirname, filename), {})

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
    })
}
macOSDefaultsSetup.readFileSync = function(file, options={}){
  options.encoding = 'utf8';
  return fs.readFileSync(file, options);
}

macOSDefaultsSetup.parseObjectFromArg = function(arg, options={}){

  // if is obj return arg
  // is filename
  return this.parseObjectFromFileSync(arg, options);
}

macOSDefaultsSetup.parseObjectFromFileSync = function(file, options={}){

  // case statement to handle other file types
  return this.parseJsonLikeFileSync(file, options);
}


// filename.json with no flag
macOSDefaultsSetup.parseJsonLikeFileSync = function(file, options={}){
  return this.parseJsonLikeSync(this.readFileSync(file, options))
}

macOSDefaultsSetup.parseJsonLikeSync = function(text, reviver=null){

  try {
      return JSON5.parse(text, reviver);
  } catch(ex){
      return null
  }
}

// if a flag is enabled go straight to relavent method rather than slow json5.parse method

// filename.json --json
macOSDefaultsSetup.parseJsonFileSync = function(file, options={}){
    return this.parseJsonSync(this.readFileSync(file, options))
}
macOSDefaultsSetup.parseJsonSync = function(text, reviver=null){
    try {
        return JSON.parse(text, reviver);
    } catch(ex){
        return null
    }
}

// filename.json --ld-json
macOSDefaultsSetup.parseLDJsonSync = function(text, reviver=null){
  // line delimited json only
  // let text = mergeLDJson(text);
  return this.parseJsonSync(text, reviver);
}
macOSDefaultsSetup.parseLDJsonFileSync = function(file, options={}){
  //  line delimited json file only
  return this.parseLDJsonSync(this.readFileSync(file, options));
}

// filename.json --commented-json
macOSDefaultsSetup.parseCommentedJsonFileSync = function(file, options={}){
  // commented json file only
  return this.parseCommentedJsonSync(this.readFileSync(file, options));
}
macOSDefaultsSetup.parseCommentedJsonSync = function(text, reviver=null){
  // commented json only
  return this.parseJsonSync(stripJsonComments(text), reviver);
}

module.exports = macOSDefaultsSetup;
