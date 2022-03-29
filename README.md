# DS-Utilities

<div align="center">
<b>
DS-Utilities provides an API to handle Domain Specifications according to the DS Specification. Usable on Node and Browsers.</b>
<br><br>
<a href="https://libraries.io/npm/ds-utilities"><img src="https://img.shields.io/librariesio/release/npm/ds-utilities" alt="Dependencies" /></a>
<a href="https://github.com/semantifyit/ds-utilities/issues"><img src="https://img.shields.io/github/issues/semantifyit/ds-utilities.svg" alt="Issues open" /></a>
<a href="https://github.com/semantifyit/ds-utilities/issues"><img src="https://img.shields.io/snyk/vulnerabilities/github/semantifyit/ds-utilities" alt="Snyk Vulnerability Test" /></a>
<br>
<a href="https://eslint.org/"><img src="https://img.shields.io/badge/code%20style-ESLint-brightgreen" alt="Code style in ESLint" /></a>
<a href="https://npms.io/search?q=ds-utilities"><img src="https://img.shields.io/npms-io/quality-score/ds-utilities" alt="npms.io Code Quality" /></a>
<img src="https://raw.githubusercontent.com/semantifyit/ds-utilities/main/docu/coverage/badge-functions.svg?sanitize=true" alt="Functions test coverage" />
<br>
<a href="https://www.npmjs.com/package/ds-utilities" rel="nofollow"><img src="https://img.shields.io/npm/v/ds-utilities.svg" alt="NPM Version"></a>
<a href="https://github.com/semantifyit/ds-utilities/"><img src="https://img.shields.io/tokei/lines/github/semantifyit/ds-utilities" alt="Total lines of code" /></a>
<a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License: CC BY-SA 4.0" /></a>
</div>

## Installation

Install via npm:

```shell
npm install ds-utilities
``` 

## Usage

#### Node

```javascript 
const { DsUtil } = require('ds-utilities');
// or
import { DsUtil } from 'ds-utilities';

// Use the global variable `DsUtil` to access the library:
const myDsUtilitiesV7 = DsUtil.getDsUtilitiesForDsSpecVersion("7.0");
``` 

### Browser

Include the compiled dist file:

```html 
<script src="/dist/ds-utilities.js"></script>
``` 

Use the global variable `DsUtil` to access the library:

```javascript 
const myDsUtilitiesV7 = DsUtil.getDsUtilitiesForDsSpecVersion("7.0");
``` 

## Documentation

* [Technical API documentation](https://semantifyit.github.io/ds-utilities/)
* [Changelog](HISTORY.md)

### Supported DS Specification Versions

* [Version 7.0](https://gitbook.semantify.it/domainspecifications/ds-v7)
* [Version 5.0](https://gitbook.semantify.it/domainspecifications/ds-v5)

### Examples

Example files for the different environments are provided at:

* [Browser example](./docu/examples/example-browser.html)
* [Node.js example](./docu/examples/example-node.js)


<div align="center">
<h3><a href="https://semantify.it/" target="_blank">semantify.it</a></h3>
Made with &#10084;	 in Tirol!
</div>