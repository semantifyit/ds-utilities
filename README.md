# DS-Utilities

<div align="center">
<b>
DS-Utilities provides an API to handle Domain Specifications according to the DS Specification. Usable on Node and Browsers.</b>
<br><br>
<a href="https://eslint.org/"><img src="https://img.shields.io/badge/code%20style-ESLint-brightgreen" alt="Code style in ESLint" /></a>
<img src="https://raw.githubusercontent.com/semantifyit/ds-utilities/main/coverage/badge-functions.svg?sanitize=true" alt="Jest Test Coverage Functions" />
<a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License: CC BY-SA 4.0" /></a>
</div>

## Installation

Install via npm directly from GitHub:

```shell
npm install https://github.com/semantifyit/ds-utilities
``` 

## Usage

#### Node

```javascript 
const DsUtilities = require("../src/index.js"); // path to the ds-utilities folder
const myDsUtilitiesV7 = DsUtilities.getDsUtilitiesForDsSpecVersion("7.0");
``` 

### Browser

Include the compiled dist file:

```html 
<script src="../dist/ds-utilities.js"></script>
``` 

Use the global DsUtilities class:

```javascript 
const myDsUtilitiesV7 = DsUtilities.getDsUtilitiesForDsSpecVersion("7.0");
``` 

## Documentation

* [API](API.md)
* [Changelog](HISTORY.md)

### Supported DS Specification Versions

* [Version 7.0](https://gitbook.semantify.it/domainspecifications/ds-v7)
* [Version 5.0](https://gitbook.semantify.it/domainspecifications/ds-v5)

### Examples

Example files for the different environments are provided at:

* [Browser example](./examples/example-browser.html)
* [Node.js example](./examples/example-node.js)