# Changelog

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