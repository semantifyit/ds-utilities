(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DsUtilities = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (process){(function (){
// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.

let { urlAlphabet } = _dereq_('./url-alphabet/index.cjs')

if (process.env.NODE_ENV !== 'production') {
  // All bundlers will remove this block in the production bundle.
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
        ' before importing Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))

let customRandom = (alphabet, size, getRandom) => {
  // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
  // values closer to the alphabet size. The bitmask calculates the closest
  // `2^31 - 1` number, which exceeds the alphabet size.
  // For example, the bitmask for the alphabet size 30 is 31 (00011111).
  // `Math.clz32` is not used, because it is not available in browsers.
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  // Though, the bitmask solution is not perfect since the bytes exceeding
  // the alphabet size are refused. Therefore, to reliably generate the ID,
  // the random bytes redundancy has to be satisfied.

  // Note: every hardware random generator call is performance expensive,
  // because the system call for entropy collection takes a lot of time.
  // So, to avoid additional system calls, extra bytes are requested in advance.

  // Next, a step determines how many random bytes to generate.
  // The number of random bytes gets decided upon the ID size, mask,
  // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
  // according to benchmarks).

  // `-~f => Math.ceil(f)` if f is a float
  // `-~i => i + 1` if i is an integer
  let step = -~((1.6 * mask * size) / alphabet.length)

  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      // A compact alternative for `for (var i = 0; i < step; i++)`.
      let j = step
      while (j--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}

let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)

let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))

  // A compact alternative for `for (var i = 0; i < step; i++)`.
  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    let byte = bytes[size] & 63
    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36)
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}

module.exports = { nanoid, customAlphabet, customRandom, urlAlphabet, random }

}).call(this)}).call(this,_dereq_('_process'))
},{"./url-alphabet/index.cjs":2,"_process":3}],2:[function(_dereq_,module,exports){
// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet =
  'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'

module.exports = { urlAlphabet }

},{}],3:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(_dereq_,module,exports){
/**
 * Creates a clone of the given JSON input (without reference to the original input)
 *
 * @param input {any} - the input
 * @return {any} - the clone of the input (no reference)
 */
const cloneJson = (input) => {
  if (input === undefined) {
    return undefined;
  }
  return JSON.parse(JSON.stringify(input));
};

const getLanguageString = (valuesArray, language = undefined) => {
  if (!Array.isArray(valuesArray)) {
    throw new Error("Given valuesArray parameter is not an array, as expected");
  }
  if (language) {
    const entryForGivenLanguage = valuesArray.find(
      (el) => el["@language"] === language
    );
    if (entryForGivenLanguage && entryForGivenLanguage["@value"]) {
      return entryForGivenLanguage["@value"];
    }
  } else {
    // return the first value found
    if (valuesArray[0] && valuesArray[0]["@value"]) {
      return valuesArray[0]["@value"];
    }
  }
  return undefined;
};

const reorderNodeBasedOnNodeTermArray = (dsNode, nodeTermArray) => {
  // always use first the terms used in nodeTermArray, then add any terms that are not listed there
  const dsNodeCopy = cloneJson(dsNode);
  // delete all used terms
  for (const p of Object.keys(dsNode)) {
    delete dsNode[p];
  }
  // add all known terms by order
  for (const t of nodeTermArray) {
    const term = t.term;
    if (dsNodeCopy[term] !== undefined) {
      dsNode[term] = dsNodeCopy[term];
    }
  }
  // add all unknown terms by order of their appearance in the original object
  for (const p of Object.keys(dsNodeCopy)) {
    const standardTerm = nodeTermArray.find((el) => el.term === p);
    if (standardTerm === undefined) {
      dsNode[p] = dsNodeCopy[p];
    }
  }
};

// checks if a given input is really an object
const isObject = (val) => {
  return val instanceof Object && !(val instanceof Array);
};

module.exports = {
  cloneJson,
  getLanguageString,
  reorderNodeBasedOnNodeTermArray,
  isObject,
};

},{}],5:[function(_dereq_,module,exports){
const DsUtilitiesBase = _dereq_("./versions/DsUtilitiesBase.js");
const DsUtilitiesV5 = _dereq_("./versions/DsUtilitiesV5.js");
const DsUtilitiesV7 = _dereq_("./versions/DsUtilitiesV7.js");
const myDsUtilitiesForCheck = new DsUtilitiesBase();
const availableDsUtilitiesVersions = ["5.0", "7.0"];

/**
 * Returns a new and corresponding DsUtilities instance for the given ds specification version (e.g. "5.0")
 *
 * @param {string} dsSpecVersion - the given DS specification version
 * @return {DsUtilitiesV7|DsUtilitiesV5} a corresponding DsUtilities instance for the given version
 */
const getDsUtilitiesForDsSpecVersion = (dsSpecVersion) => {
  if (!availableDsUtilitiesVersions.includes(dsSpecVersion)) {
    throw new Error(
      "The given DS Specification Version " +
        dsSpecVersion +
        " is unknown to DsUtilities."
    );
  }
  switch (dsSpecVersion) {
    case "5.0":
      return new DsUtilitiesV5();
    case "7.0":
      return new DsUtilitiesV7();
  }
};

/**
 *  Returns a new and corresponding DsUtilities instance for the given domain specification
 *
 * @param {object} ds - the given DS
 * @return {DsUtilitiesV7|DsUtilitiesV5} a corresponding DsUtilities instance for the given DS
 */
const getDsUtilitiesForDs = (ds) => {
  const dsSpecVersion = myDsUtilitiesForCheck.getDsSpecificationVersion(ds);
  return getDsUtilitiesForDsSpecVersion(dsSpecVersion);
};

module.exports = {
  getDsUtilitiesForDsSpecVersion,
  getDsUtilitiesForDs,
};

},{"./versions/DsUtilitiesBase.js":9,"./versions/DsUtilitiesV5.js":10,"./versions/DsUtilitiesV7.js":11}],6:[function(_dereq_,module,exports){
class ErrorEntry {
  constructor(severity, path, description) {
    this.severity = severity; // Warning, Error, Critical
    this.path = path;
    this.description = description;
  }
}

module.exports = ErrorEntry;

},{}],7:[function(_dereq_,module,exports){
class VerificationReport {
  constructor() {
    this.errors = [];
    this.result = undefined; // "Valid", "ValidWithWarnings", "Invalid"
  }

  addErrorEntry(e) {
    this.errors.push(e);
  }

  toJson() {
    const invalid = this.errors.find(
      (el) => el.severity === "Error" || el.severity === "Critical"
    );
    if (invalid) {
      this.result = "Invalid";
    } else {
      const ValidWithWarnings = this.errors.find(
        (el) => el.severity === "Warning"
      );
      if (ValidWithWarnings) {
        this.result = "ValidWithWarnings";
      } else {
        this.result = "Valid";
      }
    }
    return JSON.parse(JSON.stringify(this)); // This is done to generate a plain json output (without Class information)
  }
}

module.exports = VerificationReport;

},{}],8:[function(_dereq_,module,exports){
/*
 * ===========================================
 * functions for the meta verification
 * ===========================================
 */

const VerificationReport = _dereq_("../../verification/VerificationReport.js");
const { isObject, cloneJson } = _dereq_("../../helperFunctions.js");
const ErrorEntry = _dereq_("../../verification/ErrorEntry.js");
const dataV7 = _dereq_("../../versions/data/dataV7.js");
const fv7 = _dereq_("../../versions/functions/functionsV7.js");
const nodeTypes = fv7.nodeTypesV7;
/**
 * Returns a meta verification report
 *
 * @param ds {object} - the input DS
 * @param config {object} - optional config object with options for the meta verification
 * @return {object} verification report
 */
const verifyDsV7 = (ds, config = {}) => {
  const verificationReport = new VerificationReport();
  try {
    if (!isObject(ds)) {
      verificationReport.addErrorEntry(
        new ErrorEntry(
          "Error",
          "$",
          "The given input was not an object, as required."
        )
      );
    }
    // check compliance at DS Object level
    checkCompliance(
      verificationReport,
      null,
      ds,
      generateNodeComplianceRules(
        dataV7.nodeTermsDsObject,
        config.nodeTermsDsObject
      )
    );
    // check compliance of the @context
    if (isObject(ds["@context"])) {
      checkCompliance(
        verificationReport,
        "@context",
        ds["@context"],
        generateNodeComplianceRules(
          dataV7.nodeTermsContext(),
          config.nodeTermsContext
        )
      );
    }
    // check compliance of root node
    const rootNode = fv7.getDsRootNodeV7(ds);
    verifyClassNode(
      ds,
      rootNode,
      verificationReport,
      fv7.dsPathInitV7(nodeTypes.NODE_TYPE_ROOT),
      config,
      true
    );
    // check compliance of other @graph nodes (internal references)
    for (const graphNode of ds["@graph"]) {
      if (graphNode["@id"] === rootNode["@id"]) {
        continue;
      }
      verifyClassNode(
        ds,
        graphNode,
        verificationReport,
        fv7.dsPathInitV7(nodeTypes.NODE_TYPE_DEF_INTERNAL, graphNode["@id"]),
        config,
        false
      );
    }
    return verificationReport.toJson();
  } catch (e) {
    verificationReport.addErrorEntry(
      new ErrorEntry(
        "Critical",
        "$",
        "There was a critical error during the verification: " + e
      )
    );
    return verificationReport.toJson();
  }
};

const verifyClassNode = (
  ds,
  classNode,
  verificationReport,
  path,
  config,
  isRoot
) => {
  let complianceRules;
  if (isRoot) {
    complianceRules = generateNodeComplianceRules(
      dataV7.nodeTermsRootNode,
      config.nodeTermsRootNode
    );
  } else {
    complianceRules = generateNodeComplianceRules(
      dataV7.nodeTermsClassNode,
      config.nodeTermsClassNode
    );
  }
  // check the class node itself
  checkCompliance(verificationReport, path, classNode, complianceRules);
  // recursive check of properties
  if (Array.isArray(classNode["sh:property"])) {
    for (const pNode of classNode["sh:property"]) {
      verifyPropertyNode(
        ds,
        pNode,
        verificationReport,
        fv7.dsPathAdditionV7(
          path,
          nodeTypes.NODE_TYPE_PROPERTY,
          pNode["sh:path"]
        ),
        config
      );
    }
  }
};

const verifyEnumerationNode = (
  ds,
  enumerationNode,
  verificationReport,
  path,
  config
) => {
  // check the property node itself
  checkCompliance(
    verificationReport,
    path,
    enumerationNode,
    generateNodeComplianceRules(
      dataV7.nodeTermsEnumerationNode,
      config.nodeTermsEnumerationNode
    )
  );
  // check sh:in values, if present
  if (Array.isArray(enumerationNode["sh:in"])) {
    for (const enumValue of enumerationNode["sh:in"]) {
      // enum values must be objects that have an @id with a string as value
      if (!isObject(enumValue)) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "An enumeration has an unexpected entry for 'sh:in'."
          )
        );
      } else {
        if (enumValue["@id"] === undefined) {
          verificationReport.addErrorEntry(
            new ErrorEntry("Error", path, "An enumeration value has no '@id'.")
          );
        } else if (typeof enumValue["@id"] !== "string") {
          verificationReport.addErrorEntry(
            new ErrorEntry(
              "Error",
              path,
              "An enumeration value has an '@id' that is not a string."
            )
          );
        }
        for (const term of Object.keys(enumValue)) {
          if (term !== "@id") {
            verificationReport.addErrorEntry(
              new ErrorEntry(
                "Warning",
                path,
                "Additional term '" + term + " is being used."
              )
            );
          }
        }
      }
    }
  }
};

const verifyPropertyNode = (
  ds,
  propertyNode,
  verificationReport,
  path,
  config
) => {
  // check the property node itself
  checkCompliance(
    verificationReport,
    path,
    propertyNode,
    generateNodeComplianceRules(
      dataV7.nodeTermsPropertyNode,
      config.nodeTermsPropertyNode
    )
  );
  // recursive check of ranges
  if (Array.isArray(propertyNode["sh:or"])) {
    for (const rNode of propertyNode["sh:or"]) {
      let nodeType;
      let nodeToCheck;
      if (rNode["sh:node"]) {
        nodeType = fv7.dsPathIdentifyNodeTypeV7(rNode["sh:node"], ds);
        nodeToCheck = rNode["sh:node"];
      } else {
        nodeType = fv7.dsPathIdentifyNodeTypeV7(rNode, ds);
        nodeToCheck = rNode;
      }
      let newPath;
      switch (nodeType) {
        case nodeTypes.NODE_TYPE_CLASS:
          try {
            newPath = fv7.dsPathAdditionV7(
              path,
              nodeType,
              nodeToCheck["sh:class"]
            );
          } catch (e) {
            // class node has no sh:class definition
            newPath = path;
          }
          verifyClassNode(
            ds,
            nodeToCheck,
            verificationReport,
            newPath,
            config,
            false
          );
          break;
        case nodeTypes.NODE_TYPE_ENUMERATION:
          try {
            newPath = fv7.dsPathAdditionV7(
              path,
              nodeType,
              nodeToCheck["sh:class"]
            );
          } catch (e) {
            // class node has no sh:class definition
            newPath = path;
          }
          verifyEnumerationNode(
            ds,
            nodeToCheck,
            verificationReport,
            newPath,
            config
          );
          break;
        case nodeTypes.NODE_TYPE_DATATYPE:
          try {
            newPath = fv7.dsPathAdditionV7(
              path,
              nodeType,
              nodeToCheck["sh:datatype"]
            );
          } catch (e) {
            // class node has no sh:datatype definition
            newPath = path;
          }
          verifyDataTypeNode(
            ds,
            nodeToCheck,
            verificationReport,
            newPath,
            config
          );
          break;
      }
    }
  }
};

const verifyDataTypeNode = (
  ds,
  dataTypeNode,
  verificationReport,
  path,
  config
) => {
  // check the datatype node itself
  checkCompliance(
    verificationReport,
    path,
    dataTypeNode,
    generateNodeComplianceRules(
      dataV7.nodeTermsDataTypeNode,
      config.nodeTermsDataTypeNode
    )
  );
};

const checkCompliance = (
  verificationReport,
  path,
  inputObject,
  nodeComplianceRules
) => {
  for (const termObj of nodeComplianceRules) {
    // check if required but not used
    if (termObj.required === true && inputObject[termObj.term] === undefined) {
      verificationReport.addErrorEntry(
        new ErrorEntry(
          "Error",
          path,
          "Term '" + termObj.term + "' is required but not used."
        )
      );
      continue;
    }
    // if used, check valueType, value, and valueIn
    if (inputObject[termObj.term] !== undefined) {
      // valueType
      const valType = getLiteralType(inputObject[termObj.term]);
      if (
        termObj.valueType &&
        termObj.valueType !== "any" &&
        valType !== termObj.valueType
      ) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "Term '" +
              termObj.term +
              "' requires a value with datatype '" +
              termObj.valueType +
              "', but has the datatype '" +
              valType +
              "'."
          )
        );
        continue;
      } else if (
        valType === "array" &&
        inputObject[termObj.term].length === 0
      ) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "Term '" + termObj.term + "' has an empty array as value."
          )
        );
      }
      // value
      if (
        termObj.value &&
        !isSameValue(inputObject[termObj.term], termObj.value)
      ) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "Term '" +
              termObj.term +
              "' requires the value '" +
              getCleanOutputString(termObj.value) +
              "', but has the value '" +
              getCleanOutputString(inputObject[termObj.term]) +
              "'."
          )
        );
      }
      // valueIn
      if (
        termObj.valueIn &&
        !termObj.valueIn.includes(inputObject[termObj.term])
      ) {
        verificationReport.addErrorEntry(
          new ErrorEntry(
            "Error",
            path,
            "Term '" +
              termObj.term +
              "' must have a value from an expected set, which does not include the given value '" +
              getCleanOutputString(inputObject[termObj.term]) +
              "'."
          )
        );
      }
    }
  }
  // check if there are additional entries that are not expected (could be extensions?)
  const additionalTerms = Object.keys(inputObject).filter(
    (el) => !nodeComplianceRules.find((el2) => el2.term === el)
  );
  for (const at of additionalTerms) {
    verificationReport.addErrorEntry(
      new ErrorEntry(
        "Warning",
        path,
        "Additional term '" + at + " is being used."
      )
    );
  }
};

// returns false if the values are not the same
// at this point the inputs are known to have the same datatype
const isSameValue = (val1, val2) => {
  if (isObject(val1)) {
    // make sure both input objects have the same keys with the same values
    if (!checkSameKeys(val1, val2)) {
      return false;
    } else {
      for (const v of Object.keys(val1)) {
        if (!isSameValue(val1[v], val2[v])) {
          return false;
        }
      }
    }
    return true;
  } else {
    return val1 === val2;
  }
};

// returns true if both given objects have the same keys
const checkSameKeys = (obj1, obj2) => {
  const diff1 = Object.keys(obj1).filter(
    (el) => !Object.keys(obj2).includes(el)
  );
  const diff2 = Object.keys(obj2).filter(
    (el) => !Object.keys(obj1).includes(el)
  );
  return diff1.length === 0 && diff2.length === 0;
};

// returns the datatype of the given value, "array", "object", "string", "boolean", "number", "integer"
const getLiteralType = (value) => {
  if (Array.isArray(value)) {
    return "array";
  } else {
    let result = typeof value;
    if (result === "number" && Number.isInteger(value)) {
      return "integer";
    }
    return result;
  }
};

const generateNodeComplianceRules = (nodeData, configData) => {
  let result = cloneJson(nodeData);
  if (!configData) {
    return result;
  }
  for (const entry of configData) {
    result = result.filter((el) => el.term !== entry.term);
    result.push(cloneJson(entry));
  }
  return result;
};

// generates a string representing a given value of any datatype to be included in the error message
const getCleanOutputString = (value) => {
  let actualValue = cloneJson(value);
  if (typeof actualValue !== "string") {
    actualValue = JSON.stringify(actualValue);
    actualValue = actualValue.replace(/"/g, "'");
  }
  return actualValue;
};

module.exports = verifyDsV7;

},{"../../helperFunctions.js":4,"../../verification/ErrorEntry.js":6,"../../verification/VerificationReport.js":7,"../../versions/data/dataV7.js":13,"../../versions/functions/functionsV7.js":16}],9:[function(_dereq_,module,exports){
/**
 * This is the super class for all DsUtilities classes
 * It includes functions that are shared by all DsUtilities classes
 */
const fBase = _dereq_("./functions/functionsBase.js");

class DsUtilitiesBase {
  constructor() {
    // the dsUtilitiesVersion specifies the version of a DsUtilities Class, which is exactly the same as the corresponding DS specification version
    // DsUtilitiesBase is a super-class for all DsUtilities versions, therefore, it has no corresponding Ds specification version
    this.dsUtilitiesVersion = undefined;
    // functions that handle the structure of DS
    this.getDsSpecificationVersion = fBase.getDsSpecificationVersion;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    // this.initDsPathForDsRoot = initDsPathForDsRoot; todo this should also be version specific
    // this.initDsPathForInternalReference = initDsPathForInternalReference; // from DS-V7 upwards
    // this.addPropertyToDsPath = addPropertyToDsPath;
    // this.addRangeToDsPath = addRangeToDsPath;
    // functions that ease the UI interaction with DS
    this.prettyPrintCompactedIRI = fBase.prettyPrintCompactedIRI;
    this.extractSdoVersionNumber = fBase.extractSdoVersionNumber;
  }
}

module.exports = DsUtilitiesBase;

},{"./functions/functionsBase.js":14}],10:[function(_dereq_,module,exports){
const DsUtilitiesBase = _dereq_("./DsUtilitiesBase.js");
const fV5 = _dereq_("./functions/functionsV5.js");

/**
 * A DsUtilities instance that offers an API for DS-V5
 * @class
 */
class DsUtilitiesV5 extends DsUtilitiesBase {
  constructor() {
    super();
    this.dsUtilitiesVersion = "5.0";
    // functions that handle the structure of DS
    this.getDsRootNode = fV5.getDsRootNodeV5;
    this.getDsStandardContext = fV5.getDsStandardContextV5;
    this.getDsId = fV5.getDsIdV5;
    // this.reorderDsNode = reorderDsNodeV5;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    // this.getDsNodeForPath = getDsNodeForPathV5; // e.g. "$.schema:address/schema:PostalAddress"
    // functions that ease the UI interaction with DS
    this.getDsName = fV5.getDsNameV5;
    this.getDsDescription = fV5.getDsDescriptionV5;
    this.getDsAuthorName = fV5.getDsAuthorV5;
    this.getDsSchemaVersion = fV5.getDsSchemaVersionV5;
    this.getDsVersion = fV5.getDsVersionV5;
    this.getDsExternalVocabularies = fV5.getDsExternalVocabulariesV5;
    this.getDsTargetClasses = fV5.getDsTargetClassesV5;
  }
}

module.exports = DsUtilitiesV5;

},{"./DsUtilitiesBase.js":9,"./functions/functionsV5.js":15}],11:[function(_dereq_,module,exports){
const DsUtilitiesBase = _dereq_("./DsUtilitiesBase.js");
const fV7 = _dereq_("./functions/functionsV7.js");
const verifyDsV7 = _dereq_("../verification/versions/verificationV7.js");

/**
 * A DsUtilities instance that offers an API for DS-V7
 * @class
 */
class DsUtilitiesV7 extends DsUtilitiesBase {
  constructor() {
    super();
    this.dsUtilitiesVersion = "7.0";
    // functions that handle the structure of DS
    this.getDsRootNode = fV7.getDsRootNodeV7;
    this.getDsStandardContext = fV7.getDsStandardContextV7;
    this.getDsId = fV7.getDsIdV7;
    this.reorderDs = fV7.reorderDsV7;
    this.reorderDsNode = fV7.reorderDsNodeV7;
    this.generateInnerNodeId = fV7.generateInnerNodeIdV7;
    // functions for the handling of DS Paths, e.g. "$.schema:address/schema:PostalAddress"
    this.dsPathInit = fV7.dsPathInitV7;
    this.dsPathAddition = fV7.dsPathAdditionV7;
    this.dsPathGetNode = fV7.dsPathGetNodeV7;
    this.dsPathIdentifyNodeType = fV7.dsPathIdentifyNodeTypeV7;
    // functions that ease the UI interaction with DS
    this.getDsName = fV7.getDsNameV7;
    this.getDsDescription = fV7.getDsDescriptionV7;
    this.getDsAuthorName = fV7.getDsAuthorNameV7;
    this.getDsSchemaVersion = fV7.getDsSchemaVersionV7;
    this.getDsVersion = fV7.getDsVersionV7;
    this.getDsExternalVocabularies = fV7.getDsExternalVocabulariesV7;
    this.getDsTargetClasses = fV7.getDsTargetClassesV7;
    // functions for the meta verification
    this.verifyDs = verifyDsV7;
    // other algorithms
    this.checkClassMatch = fV7.checkClassMatchV7;
  }
}

module.exports = DsUtilitiesV7;

},{"../verification/versions/verificationV7.js":8,"./DsUtilitiesBase.js":9,"./functions/functionsV7.js":16}],12:[function(_dereq_,module,exports){
/*
 * This file contains data describing the components and structure used by Domain Specifications in DS-V5
 */

// These are the terms used by a DS Object for DS-V5, listed in the recommended order as they should be listed in their lexical representation
const nodeTermsDsObject = [
  {
    term: "@context",
    required: true,
    valueType: "object",
  },
  {
    term: "@graph",
    required: true,
    valueType: "array",
  },
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
];

const dsNodePropertyOrder = [
  "@context",
  "@graph",
  "@id",
  "@type",
  "@language",
  "@value",
  "sh:targetClass",
  "sh:targetObjectsOf",
  "sh:targetSubjectsOf",
  "sh:class",
  "sh:datatype",
  "schema:name",
  "schema:description",
  "schema:author",
  "rdfs:comment",
  "schema:version",
  "schema:schemaVersion",
  "ds:usedVocabularies",
  "sh:closed",
  "sh:order",
  "sh:path",
  "sh:minCount",
  "sh:maxCount",
  "sh:equals",
  "sh:disjoint",
  "sh:lessThan",
  "sh:lessThanOrEquals",
  "sh:defaultValue",
  "ds:defaultLanguage",
  "sh:minExclusive",
  "sh:minInclusive",
  "sh:maxExclusive",
  "sh:maxInclusive",
  "sh:minLength",
  "sh:maxLength",
  "sh:pattern",
  "sh:flag",
  "sh:languageIn",
  "ds:hasLanguage",
  "sh:uniqueLang",
  "sh:in",
  "sh:hasValue",
  "sh:property",
  "sh:or",
  "sh:node",
];

const standardContext = {
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  sh: "http://www.w3.org/ns/shacl#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  schema: "http://schema.org/",
  ds: "http://vocab.sti2.at/ds/",
  "ds:usedVocabularies": {
    "@id": "ds:usedVocabularies",
    "@type": "@id",
  },
  "sh:targetClass": {
    "@id": "sh:targetClass",
    "@type": "@id",
  },
  "sh:property": {
    "@id": "sh:property",
  },
  "sh:path": {
    "@id": "sh:path",
    "@type": "@id",
  },
  "sh:datatype": {
    "@id": "sh:datatype",
    "@type": "@id",
  },
  "sh:node": {
    "@id": "sh:node",
  },
  "sh:class": {
    "@id": "sh:class",
    "@type": "@id",
  },
  "sh:or": {
    "@id": "sh:or",
    "@container": "@list",
  },
  "sh:in": {
    "@id": "sh:in",
    "@container": "@list",
  },
  "sh:languageIn": {
    "@id": "sh:languageIn",
    "@container": "@list",
  },
  "sh:equals": {
    "@id": "sh:equals",
    "@type": "@id",
  },
  "sh:disjoint": {
    "@id": "sh:disjoint",
    "@type": "@id",
  },
  "sh:lessThan": {
    "@id": "sh:lessThan",
    "@type": "@id",
  },
  "sh:lessThanOrEquals": {
    "@id": "sh:lessThanOrEquals",
    "@type": "@id",
  },
};

module.exports = {
  nodeTermsDsObject,
  dsNodePropertyOrder,
  standardContext,
};

},{}],13:[function(_dereq_,module,exports){
/*
 * This file contains data describing the components and structure used by Domain Specifications in DS-V7
 */

// These are the terms used by a DS Object for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsDsObject = [
  {
    term: "@context",
    required: true,
    valueType: "object",
  },
  {
    term: "@graph",
    required: true,
    valueType: "array",
  },
];

// These are the terms used by the @context for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
// This list is dynamically built out of the standard @context
const nodeTermsContext = () => {
  const result = [];
  for (const t of Object.keys(standardContext)) {
    const entry = {
      term: t,
      required: true,
    };
    if (typeof standardContext[t] === "string") {
      entry.valueType = "string";
    } else {
      entry.valueType = "object";
    }
    entry.value = standardContext[t];
    result.push(entry);
  }
  return result;
};

// These are the terms used by a DS Root node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsRootNode = [
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "ds:DomainSpecification",
  },
  {
    term: "ds:subDSOf",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:targetClass",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:targetObjectsOf",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:targetSubjectsOf",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:class",
    required: false,
    valueType: "array",
  },
  {
    term: "schema:name",
    required: false,
    valueType: "array",
  },
  {
    term: "schema:description",
    required: false,
    valueType: "array",
  },
  {
    term: "schema:author",
    required: false,
    valueType: "object",
  },
  {
    term: "ds:version",
    required: true,
    valueType: "string",
  },
  {
    term: "schema:version",
    required: false,
    valueType: "string",
  },
  {
    term: "schema:schemaVersion",
    required: true,
    valueType: "string",
  },
  {
    term: "ds:usedVocabulary",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:closed",
    required: false,
    valueType: "boolean",
  },
  {
    term: "ds:propertyDisplayOrder",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:property",
    required: true,
    valueType: "array",
  },
];

// These are the terms used by a property node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsPropertyNode = [
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:PropertyShape",
  },
  {
    term: "sh:order",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:path",
    required: true,
    valueType: "string",
  },
  {
    term: "rdfs:comment",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:minCount",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:maxCount",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:equals",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:disjoint",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:lessThan",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:lessThanOrEquals",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:or",
    required: true,
    valueType: "array",
  },
];

// These are the terms used by a Class node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsClassNode = [
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:NodeShape",
  },
  {
    term: "sh:class",
    required: true,
    valueType: "array",
  },
  {
    term: "sh:closed",
    required: false,
    valueType: "boolean",
  },
  {
    term: "ds:propertyDisplayOrder",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:property",
    required: false,
    valueType: "array",
  },
];

// These are the terms used by an enumeration node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsEnumerationNode = [
  {
    term: "@id",
    required: true,
    valueType: "string",
  },
  {
    term: "@type",
    required: true,
    valueType: "string",
    value: "sh:NodeShape",
  },
  {
    term: "sh:class",
    required: true,
    valueType: "array",
  },
  {
    term: "sh:in",
    required: false,
    valueType: "array",
  },
];

// These are the terms used by a data type node for DS-V7
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsDataTypeNode = [
  {
    term: "sh:datatype",
    required: true,
    valueType: "string",
    valueIn: [
      "xsd:string",
      "rdf:langString",
      "rdf:HTML",
      "xsd:boolean",
      "xsd:date",
      "xsd:dateTime",
      "xsd:time",
      "xsd:double",
      "xsd:integer",
      "xsd:float",
      "xsd:anyURI",
    ],
  },
  {
    term: "sh:defaultValue",
    required: false,
    valueType: "any",
  },
  {
    term: "ds:defaultLanguage",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:minExclusive",
    required: false,
    valueType: "any",
  },
  {
    term: "sh:minInclusive",
    required: false,
    valueType: "any",
  },
  {
    term: "sh:maxExclusive",
    required: false,
    valueType: "any",
  },
  {
    term: "sh:maxInclusive",
    required: false,
    valueType: "any",
  },
  {
    term: "sh:minLength",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:maxLength",
    required: false,
    valueType: "integer",
  },
  {
    term: "sh:pattern",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:flag",
    required: false,
    valueType: "string",
  },
  {
    term: "sh:languageIn",
    required: false,
    valueType: "array",
  },
  {
    term: "ds:hasLanguage",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:uniqueLang",
    required: false,
    valueType: "boolean",
  },
  {
    term: "sh:in",
    required: false,
    valueType: "array",
  },
  {
    term: "sh:hasValue",
    required: false,
    valueType: "array",
  },
];

// These are the terms used by a language tagged value for DS-V7 (e.g. value of schema:name)
// Listed in the recommended order as they should be listed in their lexical representation
const nodeTermsLanguageTaggedValue = [
  {
    term: "@language",
    required: true,
    valueType: "string",
  },
  {
    term: "@value",
    required: true,
    valueType: "string",
  },
];

const standardContext = {
  ds: "https://vocab.sti2.at/ds/",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  schema: "https://schema.org/",
  sh: "http://www.w3.org/ns/shacl#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  "ds:propertyDisplayOrder": {
    "@container": "@list",
    "@type": "@id",
  },
  "ds:subDSOf": {
    "@type": "@id",
  },
  "ds:usedVocabulary": {
    "@type": "@id",
  },
  "sh:targetClass": {
    "@type": "@id",
  },
  "sh:targetObjectsOf": {
    "@type": "@id",
  },
  "sh:targetSubjectsOf": {
    "@type": "@id",
  },
  "sh:class": {
    "@type": "@id",
  },
  "sh:path": {
    "@type": "@id",
  },
  "sh:datatype": {
    "@type": "@id",
  },
  "sh:equals": {
    "@type": "@id",
  },
  "sh:disjoint": {
    "@type": "@id",
  },
  "sh:lessThan": {
    "@type": "@id",
  },
  "sh:lessThanOrEquals": {
    "@type": "@id",
  },
  "sh:in": {
    "@container": "@list",
  },
  "sh:languageIn": {
    "@container": "@list",
  },
  "sh:or": {
    "@container": "@list",
  },
};

module.exports = {
  nodeTermsDsObject,
  nodeTermsContext,
  nodeTermsRootNode,
  nodeTermsPropertyNode,
  nodeTermsClassNode,
  nodeTermsEnumerationNode,
  nodeTermsDataTypeNode,
  nodeTermsLanguageTaggedValue,
  standardContext,
};

},{}],14:[function(_dereq_,module,exports){
/*
 * This file contains the functions used by DsUtilitiesBase
 */

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

/**
 * Returns the used DS specification version used in the given DS.
 *
 * @param ds {object} - The input DS
 * @return {string} - The detected DS specification version used
 */
const getDsSpecificationVersion = (ds) => {
  if (!Array.isArray(ds["@graph"])) {
    throw new Error(
      "The given DS has no @graph array, which is expected for any DS version."
    );
  }
  // check if the version is "7.0" or later
  try {
    // expected root node format for DS-V7 and later
    const rootNode = ds["@graph"].find(
      (el) => el["@type"] === "ds:DomainSpecification"
    );
    if (rootNode) {
      return rootNode["ds:version"];
    }
  } catch (e) {
    // DS is not from 7.0 or later
  }
  // check if the version used is "5.0"
  try {
    // expected root node format for DS-V5
    const rootNode = ds["@graph"].find(
      (el) =>
        Array.isArray(el["@type"]) &&
        el["@type"].includes("sh:NodeShape") &&
        el["@type"].includes("schema:CreativeWork")
    );
    if (rootNode) {
      return "5.0";
    }
  } catch (e) {
    // DS is not from 5.0
  }
  // throw an error if the version could not been determined
  throw new Error(
    "The DS specification version for the given DS could not been determined - the DS has an unexpected structure."
  );
};

/*
 * ===========================================
 * functions that ease the UI interaction with DS
 * ===========================================
 */

/**
 * Returns the "pretty" version of a compacted IRI (single IRI or array of IRIs).
 * If the IRI belongs to schema.org, then the IRI is returned without the vocabulary indicator (schema:)
 *
 * @param iri {string|string[]} - the input IRI or array of IRIs
 * @return {string}
 */
const prettyPrintCompactedIRI = (iri) => {
  if (Array.isArray(iri)) {
    let result = "";
    for (let i = 0; i < iri.length; i++) {
      result += prettyPrintCompactedIRI(iri[i]);
      if (i + 1 < iri.length) {
        result += " + ";
      }
    }
    return result;
  } else {
    if (iri.startsWith("schema:")) {
      return iri.substring("schema:".length);
    }
    return iri;
  }
};

/**
 * Extracts the indicated schema.org version of a given URL. This functions accepts URLs with following formats
 * https://schema.org/docs/releases.html#v10.0
 * https://schema.org/version/3.4/
 * @param schemaVersionValue {string} - a URL specifying a version of schema.org
 * @return {string} - the version as a simple string
 */
const extractSdoVersionNumber = (schemaVersionValue) => {
  if (schemaVersionValue.includes("schema.org/docs/")) {
    let versionRegex = /.*schema\.org\/docs\/releases\.html#v([0-9.]+)(\/)?/g;
    let match = versionRegex.exec(schemaVersionValue);
    if (match && match[1]) {
      return match[1];
    }
  } else if (schemaVersionValue.includes("schema.org/version/")) {
    let versionRegex = /.*schema\.org\/version\/([0-9.]+)(\/)?/g;
    let match = versionRegex.exec(schemaVersionValue);
    if (match && match[1]) {
      return match[1];
    }
  }
  throw new Error(
    "The given url did not fit the expected format for a schema.org version url."
  );
};

module.exports = {
  getDsSpecificationVersion,
  prettyPrintCompactedIRI,
  extractSdoVersionNumber,
};

},{}],15:[function(_dereq_,module,exports){
/**
 * @file This file contains the functions used by DsUtilitiesV5
 */

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

const { cloneJson } = _dereq_("./../../helperFunctions.js");
const data = _dereq_("./../data/dataV5.js");
const { extractSdoVersionNumber } = _dereq_("./functionsBase.js");
/**
 * Returns the root node of the given DS. (reference)
 *
 * @param ds {object} - The input DS
 * @return {object} - The detected root node of the DS (reference)
 */
const getDsRootNodeV5 = (ds) => {
  if (!ds["@graph"]) {
    throw new Error(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V5 format."
    );
  }
  const rootNode = ds["@graph"].find(
    (el) =>
      Array.isArray(el["@type"]) &&
      el["@type"].includes("sh:NodeShape") &&
      el["@type"].includes("schema:CreativeWork")
  );
  if (!rootNode) {
    throw new Error(
      "The given DS has no identifiable root node in DS-V5 format."
    );
  }
  return rootNode;
};

/**
 * Returns the standard @context for DS-V5 (clone - no reference).
 *
 * @return {object} - the standard @context for DS-V5
 */
const getDsStandardContextV5 = () => {
  return cloneJson(data.standardContext);
};

/**
 * Returns the @id of the given DS (for DS-V5 this @id is found in the outermost object).
 * A DS @id is mandatory for DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string} - the @id of the given DS
 */
const getDsIdV5 = (ds) => {
  if (!ds["@id"]) {
    throw new Error(
      "The given DS has no @id, which is mandatory for a DS in DS-V5 format."
    );
  }
  return ds["@id"];
};

/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the name of the given DS
 */
const getDsNameV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["schema:name"]) {
    return rootNode["schema:name"];
  }
  return undefined;
};

/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the description of the given DS
 */
const getDsDescriptionV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["schema:description"]) {
    return rootNode["schema:description"];
  }
  return undefined;
};

/**
 * Returns the author name (schema:author -> schema:name) of the given DS.
 * schema:author is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the author name of the given DS
 */
const getDsAuthorV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["schema:author"] && rootNode["schema:author"]["schema:name"]) {
    return rootNode["schema:author"]["schema:name"];
  }
  return undefined;
};

/**
 * Returns the used schema.org version (schema:schemaVersion) of the given DS.
 * schema:schemaVersion is mandatory in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string} the schema.org version identifier as simple string, e.g. "11.0"
 */
const getDsSchemaVersionV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (!rootNode["schema:schemaVersion"]) {
    throw new Error(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V5 format."
    );
  }
  return extractSdoVersionNumber(rootNode["schema:schemaVersion"]);
};

/**
 * Returns the version (schema:version) of the given DS.
 * schema:version is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {?string} the ds version as simple string, e.g. "1.04"
 */
const getDsVersionV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["schema:version"]) {
    return rootNode["schema:version"];
  }
  return undefined;
};

/**
 * Returns the used external vocabularies (ds:usedVocabularies) of the given DS (clone - no reference).
 * ds:usedVocabularies is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the used external vocabularies (empty if none)
 */
const getDsExternalVocabulariesV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (rootNode["ds:usedVocabularies"]) {
    return cloneJson(rootNode["ds:usedVocabularies"]);
  }
  return []; // instead of undefined, send an empty array for convenience
};

/**
 * Returns the target classes (sh:targetClass) of the given DS (clone - no reference).
 * sh:targetClass is optional in DS-V5.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the target classes
 */
const getDsTargetClassesV5 = (ds) => {
  const rootNode = getDsRootNodeV5(ds);
  if (!rootNode["sh:targetClass"]) {
    throw new Error(
      "The given DS has no sh:targetClass in its root node, which is mandatory for a DS in DS-V5 format."
    );
  }
  // return targetClass always as array for convenience
  if (!Array.isArray(rootNode["sh:targetClass"])) {
    return cloneJson([rootNode["sh:targetClass"]]);
  }
  return cloneJson(rootNode["sh:targetClass"]);
};

module.exports = {
  getDsRootNodeV5,
  getDsStandardContextV5,
  getDsIdV5,
  getDsNameV5,
  getDsDescriptionV5,
  getDsAuthorV5,
  getDsSchemaVersionV5,
  getDsVersionV5,
  getDsExternalVocabulariesV5,
  getDsTargetClassesV5,
};

},{"./../../helperFunctions.js":4,"./../data/dataV5.js":12,"./functionsBase.js":14}],16:[function(_dereq_,module,exports){
/**
 * @file This file contains the functions used by DsUtilitiesV7
 */

const data = _dereq_("./../data/dataV7.js");
const { customAlphabet } = _dereq_("nanoid");
const {
  isObject,
  cloneJson,
  reorderNodeBasedOnNodeTermArray,
  getLanguageString,
} = _dereq_("../../helperFunctions.js");

/*
 * ===========================================
 * functions that handle the structure of DS
 * ===========================================
 */

/**
 * Returns the root node of the given DS (reference)
 *
 * @param ds {object} - The input DS
 * @return {object} The detected root node of the DS (reference)
 */
const getDsRootNodeV7 = (ds) => {
  if (!ds["@graph"]) {
    throw new Error(
      "The given DS has no @graph array, which is mandatory for a DS in DS-V7 format."
    );
  }
  const rootNode = ds["@graph"].find(
    (el) => el["@type"] === "ds:DomainSpecification"
  );
  if (!rootNode) {
    throw new Error(
      "The given DS has no identifiable root node in DS-V7 format."
    );
  }
  return rootNode;
};

/**
 * Returns the standard @context for DS-V7 (clone - no reference).
 *
 * @return {object} the standard @context for DS-V7
 */
const getDsStandardContextV7 = () => {
  return cloneJson(data.standardContext);
};

/**
 * Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
 * A DS @id is mandatory for DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string} the @id of the given DS
 */
const getDsIdV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (!rootNode["@id"]) {
    throw new Error(
      "The given DS has no @id for its root node, which is mandatory for a DS in DS-V7 format."
    );
  }
  return rootNode["@id"];
};

/**
 * Reorders all nodes of the given DS according to the DS specification for DS-V7
 *
 * @param ds {object} - the input DS
 */
const reorderDsV7 = (ds) => {
  if (!isObject(ds)) {
    throw new Error("The given input was not an object, as required.");
  }
  // reorder the meta values (language-tagged strings) in a given array
  const reorderMetaValues = (valuesArray) => {
    for (const valObj of valuesArray) {
      reorderNodeBasedOnNodeTermArray(
        valObj,
        data.nodeTermsLanguageTaggedValue
      );
    }
  };
  const reorderClassNode = (classNode) => {
    reorderDsNodeV7(classNode);
    if (classNode["schema:name"]) {
      reorderMetaValues(classNode["schema:name"]);
    }
    if (classNode["schema:description"]) {
      reorderMetaValues(classNode["schema:description"]);
    }
    if (classNode["sh:property"]) {
      for (const propertyNode of classNode["sh:property"]) {
        reorderPropertyNode(propertyNode);
      }
    }
  };
  const reorderPropertyNode = (propertyNode) => {
    reorderDsNodeV7(propertyNode);
    if (propertyNode["rdfs:comment"]) {
      reorderMetaValues(propertyNode["rdfs:comment"]);
    }
    for (const rangeNode of propertyNode["sh:or"]) {
      reorderDsNodeV7(rangeNode);
      if (rangeNode["sh:node"]) {
        reorderClassNode(rangeNode["sh:node"]);
      }
    }
  };
  // reorder DS object
  reorderNodeBasedOnNodeTermArray(ds, data.nodeTermsDsObject);
  // reorder context
  reorderNodeBasedOnNodeTermArray(ds["@context"], data.nodeTermsContext());
  // reorder graph nodes (root node + internal references)
  // root node should be the first in the @graph array
  const indexOfRootNode = ds["@graph"].findIndex(
    (el) => el["@type"] === "ds:DomainSpecification"
  );
  if (indexOfRootNode !== 0) {
    ds["@graph"] = [
      ds["@graph"][indexOfRootNode],
      ...ds["@graph"].slice(0, indexOfRootNode),
      ...ds["@graph"].slice(indexOfRootNode + 1),
    ];
  }
  for (const graphNode of ds["@graph"]) {
    reorderClassNode(graphNode);
  }
};

/**
 * Reorders the given DS node according to the DS specification for DS-V7. The corresponding node type is detected automatically.
 *
 * @param dsNode
 */
const reorderDsNodeV7 = (dsNode) => {
  // automatically detect the dsNode type
  // ds object, context, root node, property node, class node, datatype node, enumeration node
  if (!isObject(dsNode)) {
    throw new Error("The given input was not an object, as required.");
  }
  if (dsNode["@type"]) {
    switch (dsNode["@type"]) {
      // root node
      case "ds:DomainSpecification":
        reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsRootNode);
        break;
      // property node
      case "sh:PropertyShape":
        reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsPropertyNode);
        break;
      // class node / enumeration node
      case "sh:NodeShape":
        if (dsNode["sh:in"]) {
          reorderNodeBasedOnNodeTermArray(
            dsNode,
            data.nodeTermsEnumerationNode
          );
        } else {
          // class node (restricted, standard class, standard enumeration)
          reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsClassNode);
        }
        break;
    }
  } else if (dsNode["@context"]) {
    // ds object
    reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsDsObject);
  } else if (dsNode.ds && dsNode.schema && dsNode.sh) {
    // context
    reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsContext());
  } else if (dsNode["sh:datatype"]) {
    // datatype node
    reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsDataTypeNode);
  } else if (dsNode["sh:node"]) {
    // wrapper for class node / enumeration node - typically no term would be added here
  } else if (dsNode["@value"]) {
    // a language tagged-value
    reorderNodeBasedOnNodeTermArray(dsNode, data.nodeTermsLanguageTaggedValue);
  }
};

/**
 * Creates a new fragment id according to the DS-V7 specification.
 * See https://gitbook.semantify.it/domainspecifications/ds-v7/devnotes#3-generating-ids-for-inner-nodeshape
 * It is possible to pass the current DS, this way it is ensured that the generated fragment id has not been used yet in the given DS
 *
 * @param {object} ds - the input DS (optional)
 * @return {string} returns a new the fragment id
 */
const generateInnerNodeIdV7 = (ds = undefined) => {
  let dsId;
  let newId;
  if (ds) {
    dsId = getDsIdV7(ds);
  }
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    5
  );
  do {
    newId = nanoid();
  } while (ds !== undefined && JSON.stringify(ds).includes(dsId + "#" + newId));
  return newId;
};

/*
 * ===========================================
 * functions for the handling of DS Paths
 * ===========================================
 */

const NODE_TYPE_ROOT = "RootNode";
const NODE_TYPE_PROPERTY = "Property";
const NODE_TYPE_CLASS = "Class";
const NODE_TYPE_ENUMERATION = "Enumeration";
const NODE_TYPE_DATATYPE = "DataType";
const NODE_TYPE_REF_ROOT = "RootReference";
const NODE_TYPE_REF_INTERNAL = "InternalReference";
const NODE_TYPE_REF_EXTERNAL = "ExternalReference";
const NODE_TYPE_REF_INTERNAL_EXTERNAL = "InternalExternalReference";
const NODE_TYPE_DEF_INTERNAL = "InternalReferenceDefinition";
const NODE_TYPE_DEF_EXTERNAL = "ExternalReferenceDefinition";
const NODE_TYPE_DEF_INTERNAL_EXTERNAL = "InternalExternalReferenceDefinition";
// "@context" is a special dsPath that points to the @context object of the DS

const nodeTypesV7 = {
  NODE_TYPE_ROOT,
  NODE_TYPE_PROPERTY,
  NODE_TYPE_CLASS,
  NODE_TYPE_ENUMERATION,
  NODE_TYPE_DATATYPE,
  NODE_TYPE_REF_ROOT,
  NODE_TYPE_REF_INTERNAL,
  NODE_TYPE_REF_EXTERNAL,
  NODE_TYPE_REF_INTERNAL_EXTERNAL,
  NODE_TYPE_DEF_INTERNAL,
  NODE_TYPE_DEF_EXTERNAL,
  NODE_TYPE_DEF_INTERNAL_EXTERNAL,
};

/**
 * Initializes a DS Path string, based on the given inputs
 *
 * @param [nodeType=RootNode] {string} - the type of the initial token, "RootNode" being the standard. Other possibilities are: "InternalReferenceDefinition", "ExternalReferenceDefinition", "InternalExternalReferenceDefinition"
 * @param [nodeId] {string} - the id of the node which starts the DS path (e.g. "https://semantify.it/ds/_1hRVOT8Q"). Can be left blank in case of "RootNode".
 * @return {string} - the generated DS Path
 */
const dsPathInitV7 = (nodeType = NODE_TYPE_ROOT, nodeId = undefined) => {
  switch (nodeType) {
    case NODE_TYPE_ROOT:
      return "$";
    case NODE_TYPE_DEF_INTERNAL:
      return "#" + nodeId.split("#")[1]; // nodeId = @id of the internal node, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
    case NODE_TYPE_DEF_EXTERNAL:
      return nodeId.split("/").pop(); // nodeId = @id of the external node, e.g. "https://semantify.it/ds/_1hRVOT8Q"
    case NODE_TYPE_DEF_INTERNAL_EXTERNAL:
      return nodeId.split("/").pop(); // nodeId = @id of the internal node from an external reference, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
    default:
      throw new Error("Unknown node type to initialize a DS Path: " + nodeType);
  }
};

/**
 * Appends a new token to a given DS Path. The inputs and additions depend on the token type to be added.
 *
 * @param dsPath {string} - the given DS Path to augment
 * @param additionType {string} - the kind of addition to be added
 * @param [inputForPath] {string|string[]} - input that depends on the given additionType, which is used for the dsPath addition
 * @return {string} - the resulting DS Path
 */
const dsPathAdditionV7 = (dsPath, additionType, inputForPath = undefined) => {
  // Property
  if (additionType === NODE_TYPE_PROPERTY) {
    return dsPath + "." + inputForPath; // inputForPath = IRI of Property, e.g. schema:url
  }
  // DataType
  if (additionType === NODE_TYPE_DATATYPE) {
    return dsPath + "/" + inputForPath; // inputForPath = IRI of DataType, e.g. xsd:string
  }
  // Class/Enumeration
  if (
    additionType === NODE_TYPE_CLASS ||
    additionType === NODE_TYPE_ENUMERATION
  ) {
    return dsPath + "/" + inputForPath.join(","); // inputForPath = sh:class array, e.g. ["schema:Room", "schema:Product"]
  }
  // Reference - Root Node
  if (additionType === NODE_TYPE_REF_ROOT) {
    return dsPath + "/@$"; // inputForPath is not needed
  }
  // Reference - Internal reference
  if (additionType === NODE_TYPE_REF_INTERNAL) {
    return dsPath + "/@#" + inputForPath.split("#")[1]; // inputForPath = @id of the internal node, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
  }
  // Reference - External reference
  if (additionType === NODE_TYPE_REF_EXTERNAL) {
    return dsPath + "/@" + inputForPath.split("/").pop(); // inputForPath = @id of the external node, e.g. "https://semantify.it/ds/_1hRVOT8Q"
  }
  // Reference - Internal node of an External reference
  if (additionType === NODE_TYPE_REF_INTERNAL_EXTERNAL) {
    return dsPath + "/@" + inputForPath.split("/").pop(); // inputForPath = @id of the internal node from an external reference, e.g. "https://semantify.it/ds/_1hRVOT8Q#sXZwe"
  }
};

/**
 * Returns a node within the given DS based on the given ds-path. (reference)
 *
 * @param ds {object} - The input DS
 * @param dsPath {string} - The input ds-path
 * @return {object} - The node at the given ds-path (reference)
 */
const dsPathGetNodeV7 = (ds, dsPath) => {
  // helper function to check if a given class combination array matches another class combination array
  function checkClassMatch(arr1, arr2) {
    return (
      !arr1.find((el) => !arr2.includes(el)) &&
      !arr2.find((el) => !arr1.includes(el))
    );
  }

  //  helper function - actDsObj is an array of ranges
  function getRangeNode(actDsObj, actRestPath, ds) {
    const rootNode = getDsRootNodeV7(ds);
    const pathTokens = actRestPath.split(".");
    const rangeToken = pathTokens[0];
    let actRange;
    let referencedNode;
    // reference node
    if (rangeToken.startsWith("@")) {
      if (rangeToken === "@$") {
        // root node reference
        actRange = actDsObj.find(
          (el) => el["sh:node"] && el["sh:node"]["@id"] === rootNode["@id"]
        );
        referencedNode = rootNode;
      } else if (rangeToken.startsWith("@#")) {
        // internal node reference
        actRange = actDsObj.find(
          (el) =>
            el["sh:node"] &&
            el["sh:node"]["@id"] === rootNode["@id"] + rangeToken.substring(1)
        );
        if (actRange) {
          referencedNode = ds["@graph"].find(
            (el) => el["@id"] === actRange["sh:node"]["@id"]
          );
        }
      } else {
        // external (internal) node reference
        actRange = actDsObj.find(
          (el) =>
            el["sh:node"] &&
            el["sh:node"]["@id"].endsWith(rangeToken.substring(1))
        );
        if (actRange) {
          referencedNode = ds["@graph"].find(
            (el) => el["@id"] === actRange["sh:node"]["@id"]
          );
        }
      }
    } else {
      actRange = actDsObj.find(
        (el) =>
          el["sh:datatype"] === pathTokens[0] ||
          (el["sh:node"] &&
            el["sh:node"]["sh:class"] &&
            checkClassMatch(
              el["sh:node"]["sh:class"],
              pathTokens[0].split(",")
            )) ||
          (el["sh:node"] &&
            el["sh:node"]["@id"].endsWith(pathTokens[0].substring(1)))
      );
    }
    if (!actRange) {
      throw new Error(
        "Could not find a fitting range-node for path-token " + pathTokens[0]
      );
    }
    if (pathTokens.length === 1) {
      if (actRange["sh:node"]) {
        return actRange["sh:node"];
      } else {
        return actRange;
      }
    } else {
      if (referencedNode) {
        return getPropertyNode(
          referencedNode["sh:property"],
          actRestPath.substring(pathTokens[0].length + 1),
          ds
        );
      } else {
        return getPropertyNode(
          actRange["sh:node"]["sh:property"],
          actRestPath.substring(pathTokens[0].length + 1),
          ds
        );
      }
    }
  }

  // helper function
  function getPropertyNode(actDsObj, actRestPath, ds) {
    const pathTokens = actRestPath.split("/");
    const actProp = actDsObj.find((el) => el["sh:path"] === pathTokens[0]);
    if (!actProp) {
      throw new Error(
        "Could not find a fitting property-node for path-token " + pathTokens[0]
      );
    }
    if (pathTokens.length === 1) {
      return actProp;
    } else {
      // check next token -> range
      return getRangeNode(
        actProp["sh:or"],
        actRestPath.substring(pathTokens[0].length + 1),
        ds
      );
    }
  }

  if (dsPath === "@context") {
    // special case for @context
    if (!ds["@context"]) {
      throw new Error(
        "The given DS has no @context, which is mandatory for a DS in DS-V7 format."
      );
    }
    return ds["@context"];
  } else if (dsPath.startsWith("$")) {
    // normal DS root
    const dsRoot = getDsRootNodeV7(ds);
    if (dsPath === "$") {
      return dsRoot;
    } else {
      return getPropertyNode(dsRoot["sh:property"], dsPath.substring(2), ds);
    }
  } else {
    // could be:
    // Internal reference definition
    // External reference definition
    // Internal node of an External reference
    const pathTokens = dsPath.split(".");
    const referenceDefinition = ds["@graph"].find((el) =>
      el["@id"].endsWith(pathTokens[0])
    );
    if (!referenceDefinition) {
      throw new Error(
        "Could not find a fitting reference definition for path-token " +
          pathTokens[0]
      );
    }
    if (pathTokens.length === 1) {
      return referenceDefinition;
    } else {
      return getPropertyNode(
        referenceDefinition["sh:property"],
        dsPath.substring(pathTokens[0].length + 1),
        ds
      );
    }
  }
};

/**
 * Returns the type/role of the given DS Node within the given DS
 *
 * @param dsNode {object?} - the input DS Node
 * @param ds {object} - the input DS
 * @return {string} the type of the given node
 */
const dsPathIdentifyNodeTypeV7 = (dsNode, ds) => {
  const rootNode = getDsRootNodeV7(ds);
  // if there is only 1 attribute that is @id, then this is a reference node
  if (dsNode["@id"] && Object.keys(dsNode).length === 1) {
    if (dsNode["@id"] === rootNode["@id"]) {
      return NODE_TYPE_REF_ROOT;
    } else if (dsNode["@id"].startsWith(rootNode["@id"])) {
      return NODE_TYPE_REF_INTERNAL;
    } else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
      return NODE_TYPE_REF_INTERNAL_EXTERNAL;
    } else {
      return NODE_TYPE_REF_EXTERNAL;
    }
  }
  // nodes in @graph array
  if (dsNode["@type"] === "ds:DomainSpecification") {
    return NODE_TYPE_ROOT; // root node
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    ds["@graph"].find((el) => el["@id"] === dsNode["@id"]) !== undefined
  ) {
    // a reference definition
    if (dsNode["@id"].startsWith(rootNode["@id"])) {
      return NODE_TYPE_DEF_INTERNAL;
    } else if (dsNode["@id"].charAt(dsNode["@id"].length - 6) === "#") {
      return NODE_TYPE_DEF_INTERNAL_EXTERNAL;
    } else {
      return NODE_TYPE_DEF_EXTERNAL;
    }
  }
  // other nodes
  if (dsNode["@type"] === "sh:PropertyShape") {
    return NODE_TYPE_PROPERTY;
  }
  if (dsNode["sh:datatype"] !== undefined) {
    return NODE_TYPE_DATATYPE;
  }
  if (dsNode["@type"] === "sh:NodeShape" && dsNode["sh:in"] !== undefined) {
    return NODE_TYPE_ENUMERATION;
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    dsNode["sh:property"] !== undefined
  ) {
    return NODE_TYPE_CLASS;
  } else if (
    dsNode["@type"] === "sh:NodeShape" &&
    dsNode["sh:class"] !== undefined
  ) {
    // this could be a standard class or a standard enumeration, we can not tell for sure without SDO Adapter
    return NODE_TYPE_CLASS;
  }
};

/*
 * ===========================================
 * functions that ease the UI interaction with DS
 * ===========================================
 */

/**
 * Returns the name (schema:name) of the given DS.
 * schema:name is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the name (optional)
 * @return {?string} the name of the given DS
 */
const getDsNameV7 = (ds, language = undefined) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["schema:name"]) {
    return getLanguageString(rootNode["schema:name"], language);
  }
  return undefined;
};

/**
 * Returns the description (schema:description) of the given DS.
 * schema:description is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @param language {string?} - the wished language for the description (optional)
 * @return {?string} the description of the given DS
 */
const getDsDescriptionV7 = (ds, language = undefined) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["schema:description"]) {
    return getLanguageString(rootNode["schema:description"], language);
  }
  return undefined;
};

/**
 * Returns the author name (schema:author -> schema:name) of the given DS.
 * schema:author is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {?string} the author name of the given DS
 */
const getDsAuthorNameV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["schema:author"] && rootNode["schema:author"]["schema:name"]) {
    return rootNode["schema:author"]["schema:name"];
  }
  return undefined;
};

/**
 * Returns the used schema.org version (schema:schemaVersion) of the given DS.
 * schema:schemaVersion is mandatory in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string} the schema.org version identifier as simple string, e.g. "11.0"
 */
const getDsSchemaVersionV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (!rootNode["schema:schemaVersion"]) {
    throw new Error(
      "The given DS has no schema:schemaVersion for its root node, which is mandatory for a DS in DS-V7 format."
    );
  }
  return rootNode["schema:schemaVersion"];
};

/**
 * Returns the used ds version (schema:version) of the given DS.
 * schema:version is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {?string} the ds version as simple string, e.g. "1.04"
 */
const getDsVersionV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["schema:version"]) {
    return rootNode["schema:version"];
  }
  return undefined;
};

/**
 * Returns the used external vocabularies (ds:usedVocabulary) of the given DS (clone - no reference).
 * ds:usedVocabulary is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the used external vocabularies (empty if none)
 */
const getDsExternalVocabulariesV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["ds:usedVocabulary"]) {
    return cloneJson(rootNode["ds:usedVocabulary"]);
  }
  return []; // instead of undefined, send an empty array for convenience
};

/**
 * Returns the target classes (sh:targetClass) of the given DS (clone - no reference).
 * sh:targetClass is optional in DS-V7.
 *
 * @param ds {object} - the input DS
 * @return {string[]} array with the target classes (empty if none)
 */
const getDsTargetClassesV7 = (ds) => {
  const rootNode = getDsRootNodeV7(ds);
  if (rootNode["sh:targetClass"]) {
    return cloneJson(rootNode["sh:targetClass"]);
  }
  return []; // instead of undefined, send an empty array for convenience
};

//
/**
 * Returns true if the given classes are a valid match for the given targetClasses following the DS-V7 semantics
 * This matching is important for the Class-SubClass relationship (e.g. subDS, or range subclass)
 * https://gitbook.semantify.it/domainspecifications/ds-v7/grammar/verificationreport/ds-verification#semantics-for-class-matching
 * This function needs the SDO-Adapter library to work - https://www.npmjs.com/package/schema-org-adapter
 *
 * @param targetClasses {string[]} - The target classes (DS)
 * @param classesToCheck {string[]} - The classes to be checked (Data)
 * @param sdoAdapter {SDOAdapter} - A SDO-Adapter instance (already initialized with the wished vocabularies)
 * @return {boolean} - True if the given classes to check are valid for the given target classes
 */
const checkClassMatchV7 = (targetClasses, classesToCheck, sdoAdapter) => {
  // get a set of all superclasses (including themselves) from the classesToCheck
  const superClassSet = Array.from(
    new Set(
      classesToCheck.flatMap((c) => [
        c,
        ...sdoAdapter.getClass(c).getSuperClasses(),
      ])
    )
  );
  return targetClasses.every((tc) => superClassSet.includes(tc));
};

module.exports = {
  getDsRootNodeV7,
  getDsStandardContextV7,
  getDsIdV7,
  reorderDsV7,
  reorderDsNodeV7,
  generateInnerNodeIdV7,
  dsPathInitV7,
  dsPathAdditionV7,
  dsPathGetNodeV7,
  dsPathIdentifyNodeTypeV7,
  getDsNameV7,
  getDsDescriptionV7,
  getDsAuthorNameV7,
  getDsSchemaVersionV7,
  getDsVersionV7,
  getDsExternalVocabulariesV7,
  getDsTargetClassesV7,
  nodeTypesV7,
  checkClassMatchV7,
};

},{"../../helperFunctions.js":4,"./../data/dataV7.js":13,"nanoid":1}]},{},[5])(5)
});
