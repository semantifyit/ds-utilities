2.1.0 / 2022-03-03
==================
* Node/TypeScript: All types and interfaces that may be interesting for the user are being reexported in index.d.ts now.
* Update of dependencies.
* Renamed type `PathTokenObject` to `PathTokenObjectV7`.

2.0.2 / 2022-03-02
==================

* `identifyDsGrammarNodeType()` now has a parameter called `followReference` (boolean), which tells if the function should follow the reference to return the node type of the referenced node instead of the reference type itself.

2.0.1 / 2022-02-25
==================

* Removed the type `DsV7Unpopulated`, since it was ignoring internal references. Correcting this type results in being the same as `DSV7` (populated), so it was deleted.

2.0.0 / 2022-02-23
==================

* Refactored the whole library in **TypeScript**. Better support for types and the TS environment.
* The way how this library is supposed to be imported has changed, see README.MD for details.
* Function `prettyPrintCompactedIRI()` has been renamed to `prettyPrintCompactedIRIs()` - there is an `s` at the end. There have been other minor renames.
* Documentation must be updated yet!

1.5.0 / 2022-01-27
==================

* new DS-V7 functions:
  * `getDataTypeLabel()`
  * `getDsDataTypeForSchemaDataType()`
  * `getSchemaDataTypeForDsDataType()`
  * `identifyDsGrammarNodeType()`
  * `tokenizeDsPath()`
* Changes for DS-V7 functions:
  * `dsPathInit()` also usable with `"Context"` as initial token.
  * `dsPathGetNode()` now has the new argument "resolveReference" (default is `false`)

1.4.2 / 2021-12-20
==================

* Upgraded used version of [schema-org-adapter](https://www.npmjs.com/package/schema-org-adapter). DS-utilities still works with the previous version though.

1.4.1 / 2021-12-15
==================

* Refactoring of the checkClassMatch function to use only functions that are available in Node 10. (flatMap() is 11+)

1.4.0 / 2021-11-12
==================

* Introduction of the `checkClassMatch()` function to DS-v7.

1.3.0 / 2021-11-03
==================

* Introduction of the `verifyDs()` function to DS-v7.

1.2.0 / 2021-10-13
==================

* Improved comments on functions to clarify if returned values are references or clones.
* Changed `getDsTargetClasses()` and `getDsExternalVocabularies()` to return clones instead of references of the original DS.

1.1.0 / 2021-10-11
==================

* Added `ds:propertyDisplayOrder` to the DS-V7 standard @context

1.0.0 / 2021-09-14
==================

* First Release!