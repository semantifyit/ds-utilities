# API documentation

This is the **technical API documentation** for the [ds-utilities](https://www.npmjs.com/package/ds-utilities) library. 

## Setup

The [readme](https://github.com/semantifyit/ds-utilities#readme) explains the installation, loading and basic usage of this library. In any case, it is expected that the variable `DsUtil` references the library.

**Node**

```javascript
const { DsUtil } = require('ds-utilities');
// or
import { DsUtil } from 'ds-utilities';
```

**Browser**

```html
<script src="/dist/ds-utilities.min.js"></script>
<!--Global variable 'DsUtil' is available-->
```

## Usage

The **ds-utilities** library itself (called **DsUtil** from now on) provides following static functions:

* <a href="./modules.html#getAvailableVersions">getAvailableVersions()</a>
* <a href="./modules.html#getDsUtilitiesForDs">getDsUtilitiesForDs()</a>
* <a href="./modules.html#getDsUtilitiesForDsSpecVersion">getDsUtilitiesForDsSpecVersion()</a>


The function {@link getAvailableVersions | .getAvailableVersions()} returns an array of **available DS-Specification versions** that are supported by this library, e.g. `"5.0"` or `"7.0"`.

The other two functions allow the **creation of DsUtilities instances**. A DsUtilities instance is always bound to a particular [DS-Specification version](https://gitbook.semantify.it/domainspecifications/). While {@link getDsUtilitiesForDsSpecVersion | .getDsUtilitiesForDsSpecVersion()} creates a DsUtilities instance based on the given DS-Specification version number, the function {@link getDsUtilitiesForDs | .getDsUtilitiesForDs()} automatically detects the used DS-Specification version number of the given Domain Specification.

In the following common use-case, the DS-Utilities instance `myDsUtilities` is created for a particular DS-Specification version:

```javascript
const myDsUtilities = DsUtil.getDsUtilitiesForDsSpecVersion("7.0");
```


After the initialization of `myDsUtilities`, its API can be used to retrieve information about Domain Specifications that use DS-Specification version `"7.0"`. Check the reference pages for the different DS-Utilities versions to discover their API:

* {@link DsUtilitiesV7 | DsUtilitiesV7} - DS-Utilities for [DS-Specification 7.0](https://gitbook.semantify.it/domainspecifications/ds-v7)
* {@link DsUtilitiesV5 | DsUtilitiesV5} - DS-Utilities for [DS-Specification 5.0](https://gitbook.semantify.it/domainspecifications/ds-v5)

There are many more methods, options and functionalities to use! Explore them in the <a href="./modules.html">index page</a>.
