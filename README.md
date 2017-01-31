# macos-defaults-setup [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 

## Installation

```sh
$ npm install --save macos-defaults-setup
```

## Usage

```js
var macosDefaultsSetup = require('macos-defaults-setup');
macosDefaultsSetup('preferences.json', 'chrome-preferences.json');
```

##Roadmap
- accept invalid json files such as json with comments or ldjson (line delimited json)
- csv 
- js module file (export obj)
- json string
- use streams where available 
- merge objects before exec
- defaults.write should accept value if (value typoef == 'object')

## License

MIT © [tarran](tarranjones.com)


[npm-image]: https://badge.fury.io/js/macos-defaults-setup.svg
[npm-url]: https://npmjs.org/package/macos-defaults-setup
[travis-image]: https://travis-ci.org/tarranjones/macos-defaults-setup.svg?branch=master
[travis-url]: https://travis-ci.org/tarranjones/macos-defaults-setup
[daviddm-image]: https://david-dm.org/tarranjones/macos-defaults-setup.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tarranjones/macos-defaults-setup
[coveralls-image]: https://coveralls.io/repos/tarranjones/macos-defaults-setup/badge.svg
[coveralls-url]: https://coveralls.io/r/tarranjones/macos-defaults-setup
