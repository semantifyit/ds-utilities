## Classes

<dl>
<dt><a href="#DsUtilitiesV5">DsUtilitiesV5</a></dt>
<dd><p>A DsUtilities instance that offers an API for DS-V5</p>
</dd>
<dt><a href="#DsUtilitiesV7">DsUtilitiesV7</a></dt>
<dd><p>A DsUtilities instance that offers an API for DS-V7</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#fBase">fBase</a></dt>
<dd><p>This is the super class for all DsUtilities classes
It includes functions that are shared by all DsUtilities classes</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getDsUtilitiesForDsSpecVersion">getDsUtilitiesForDsSpecVersion(dsSpecVersion)</a> ⇒ <code><a href="#DsUtilitiesV7">DsUtilitiesV7</a></code> | <code><a href="#DsUtilitiesV5">DsUtilitiesV5</a></code></dt>
<dd><p>Returns a new and corresponding DsUtilities instance for the given ds specification version (e.g. &quot;5.0&quot;)</p>
</dd>
<dt><a href="#getDsUtilitiesForDs">getDsUtilitiesForDs(ds)</a> ⇒ <code><a href="#DsUtilitiesV7">DsUtilitiesV7</a></code> | <code><a href="#DsUtilitiesV5">DsUtilitiesV5</a></code></dt>
<dd><p>Returns a new and corresponding DsUtilities instance for the given domain specification</p>
</dd>
<dt><a href="#getDsSpecificationVersion">getDsSpecificationVersion(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the used DS specification version used in the given DS.</p>
</dd>
<dt><a href="#prettyPrintCompactedIRI">prettyPrintCompactedIRI(iri)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the &quot;pretty&quot; version of a compacted IRI (single IRI or array of IRIs).
If the IRI belongs to schema.org, then the IRI is returned without the vocabulary indicator (schema:)</p>
</dd>
<dt><a href="#extractSdoVersionNumber">extractSdoVersionNumber(schemaVersionValue)</a> ⇒ <code>string</code></dt>
<dd><p>Extracts the indicated schema.org version of a given URL. This functions accepts URLs with following formats
<a href="https://schema.org/docs/releases.html#v10.0">https://schema.org/docs/releases.html#v10.0</a>
<a href="https://schema.org/version/3.4/">https://schema.org/version/3.4/</a></p>
</dd>
<dt><a href="#getDsRootNodeV5">getDsRootNodeV5(ds)</a> ⇒ <code>object</code></dt>
<dd><p>Returns the root node of the given DS.</p>
</dd>
<dt><a href="#getDsStandardContextV5">getDsStandardContextV5()</a> ⇒ <code>object</code></dt>
<dd><p>Returns the standard @context for DS-V5</p>
</dd>
<dt><a href="#getDsIdV5">getDsIdV5(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the @id of the given DS (for DS-V5 this @id is found in the outermost object).
A DS @id is mandatory for DS-V5.</p>
</dd>
<dt><a href="#getDsNameV5">getDsNameV5(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the name (schema:name) of the given DS.
schema:name is optional in DS-V5.</p>
</dd>
<dt><a href="#getDsDescriptionV5">getDsDescriptionV5(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the description (schema:description) of the given DS.
schema:description is optional in DS-V5.</p>
</dd>
<dt><a href="#getDsAuthorV5">getDsAuthorV5(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the author name (schema:author -&gt; schema:name) of the given DS.
schema:author is optional in DS-V5.</p>
</dd>
<dt><a href="#getDsSchemaVersionV5">getDsSchemaVersionV5(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the used schema.org version (schema:schemaVersion) of the given DS.
schema:schemaVersion is mandatory in DS-V5.</p>
</dd>
<dt><a href="#getDsVersionV5">getDsVersionV5(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the version (schema:version) of the given DS.
schema:version is optional in DS-V5.</p>
</dd>
<dt><a href="#getDsExternalVocabulariesV5">getDsExternalVocabulariesV5(ds)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the used external vocabularies (ds:usedVocabularies) of the given DS.
ds:usedVocabularies is optional in DS-V5.</p>
</dd>
<dt><a href="#getDsTargetClassesV5">getDsTargetClassesV5(ds)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the target classes (sh:targetClass) of the given DS.
sh:targetClass is optional in DS-V5.</p>
</dd>
<dt><a href="#getDsRootNodeV7">getDsRootNodeV7(ds)</a> ⇒ <code>object</code></dt>
<dd><p>Returns the root node of the given DS</p>
</dd>
<dt><a href="#getDsStandardContextV7">getDsStandardContextV7()</a> ⇒ <code>object</code></dt>
<dd><p>Returns the standard @context for DS-V7</p>
</dd>
<dt><a href="#getDsIdV7">getDsIdV7(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
A DS @id is mandatory for DS-V7.</p>
</dd>
<dt><a href="#generateInnerNodeIdV7">generateInnerNodeIdV7(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Creates a new fragment id according to the DS-V7 specification.
See <a href="https://gitbook.semantify.it/domainspecifications/ds-v7/devnotes#3-generating-ids-for-inner-nodeshape">https://gitbook.semantify.it/domainspecifications/ds-v7/devnotes#3-generating-ids-for-inner-nodeshape</a>
It is possible to pass the current DS, this way it is ensured that the generated fragment id has not been used yet in the given DS</p>
</dd>
<dt><a href="#getDsNameV7">getDsNameV7(ds, language)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the name (schema:name) of the given DS.
schema:name is optional in DS-V7.</p>
</dd>
<dt><a href="#getDsDescriptionV7">getDsDescriptionV7(ds, language)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the description (schema:description) of the given DS.
schema:description is optional in DS-V7.</p>
</dd>
<dt><a href="#getDsAuthorNameV7">getDsAuthorNameV7(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the author name (schema:author -&gt; schema:name) of the given DS.
schema:author is optional in DS-V7.</p>
</dd>
<dt><a href="#getDsSchemaVersionV7">getDsSchemaVersionV7(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the used schema.org version (schema:schemaVersion) of the given DS.
schema:schemaVersion is mandatory in DS-V7.</p>
</dd>
<dt><a href="#getDsVersionV7">getDsVersionV7(ds)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the used ds version (schema:version) of the given DS.
schema:version is optional in DS-V7.</p>
</dd>
<dt><a href="#getDsExternalVocabulariesV7">getDsExternalVocabulariesV7(ds)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the used external vocabularies (ds:usedVocabulary) of the given DS.
ds:usedVocabulary is optional in DS-V7.</p>
</dd>
<dt><a href="#getDsTargetClassesV7">getDsTargetClassesV7(ds)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns the target classes (sh:targetClass) of the given DS.
sh:targetClass is optional in DS-V7.</p>
</dd>
</dl>

<a name="DsUtilitiesV5"></a>

## DsUtilitiesV5
A DsUtilities instance that offers an API for DS-V5

**Kind**: global class  
<a name="DsUtilitiesV7"></a>

## DsUtilitiesV7
A DsUtilities instance that offers an API for DS-V7

**Kind**: global class  
<a name="fBase"></a>

## fBase
This is the super class for all DsUtilities classes
It includes functions that are shared by all DsUtilities classes

**Kind**: global constant  
<a name="getDsUtilitiesForDsSpecVersion"></a>

## getDsUtilitiesForDsSpecVersion(dsSpecVersion) ⇒ [<code>DsUtilitiesV7</code>](#DsUtilitiesV7) \| [<code>DsUtilitiesV5</code>](#DsUtilitiesV5)
Returns a new and corresponding DsUtilities instance for the given ds specification version (e.g. "5.0")

**Kind**: global function  
**Returns**: [<code>DsUtilitiesV7</code>](#DsUtilitiesV7) \| [<code>DsUtilitiesV5</code>](#DsUtilitiesV5) - a corresponding DsUtilities instance for the given version  

| Param | Type | Description |
| --- | --- | --- |
| dsSpecVersion | <code>string</code> | the given DS specification version |

<a name="getDsUtilitiesForDs"></a>

## getDsUtilitiesForDs(ds) ⇒ [<code>DsUtilitiesV7</code>](#DsUtilitiesV7) \| [<code>DsUtilitiesV5</code>](#DsUtilitiesV5)
Returns a new and corresponding DsUtilities instance for the given domain specification

**Kind**: global function  
**Returns**: [<code>DsUtilitiesV7</code>](#DsUtilitiesV7) \| [<code>DsUtilitiesV5</code>](#DsUtilitiesV5) - a corresponding DsUtilities instance for the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the given DS |

<a name="getDsSpecificationVersion"></a>

## getDsSpecificationVersion(ds) ⇒ <code>string</code>
Returns the used DS specification version used in the given DS.

**Kind**: global function  
**Returns**: <code>string</code> - - The detected DS specification version used  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | The input DS |

<a name="prettyPrintCompactedIRI"></a>

## prettyPrintCompactedIRI(iri) ⇒ <code>string</code>
Returns the "pretty" version of a compacted IRI (single IRI or array of IRIs).
If the IRI belongs to schema.org, then the IRI is returned without the vocabulary indicator (schema:)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| iri | <code>string</code> \| <code>Array.&lt;string&gt;</code> | the input IRI or array of IRIs |

<a name="extractSdoVersionNumber"></a>

## extractSdoVersionNumber(schemaVersionValue) ⇒ <code>string</code>
Extracts the indicated schema.org version of a given URL. This functions accepts URLs with following formats
https://schema.org/docs/releases.html#v10.0
https://schema.org/version/3.4/

**Kind**: global function  
**Returns**: <code>string</code> - - the version as a simple string  

| Param | Type | Description |
| --- | --- | --- |
| schemaVersionValue | <code>string</code> | a URL specifying a version of schema.org |

<a name="getDsRootNodeV5"></a>

## getDsRootNodeV5(ds) ⇒ <code>object</code>
Returns the root node of the given DS.

**Kind**: global function  
**Returns**: <code>object</code> - - The detected root node of the DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | The input DS |

<a name="getDsStandardContextV5"></a>

## getDsStandardContextV5() ⇒ <code>object</code>
Returns the standard @context for DS-V5

**Kind**: global function  
**Returns**: <code>object</code> - - the standard @context for DS-V5  
<a name="getDsIdV5"></a>

## getDsIdV5(ds) ⇒ <code>string</code>
Returns the @id of the given DS (for DS-V5 this @id is found in the outermost object).
A DS @id is mandatory for DS-V5.

**Kind**: global function  
**Returns**: <code>string</code> - - the @id of the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsNameV5"></a>

## getDsNameV5(ds) ⇒ <code>string</code>
Returns the name (schema:name) of the given DS.
schema:name is optional in DS-V5.

**Kind**: global function  
**Returns**: <code>string</code> - the name of the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsDescriptionV5"></a>

## getDsDescriptionV5(ds) ⇒ <code>string</code>
Returns the description (schema:description) of the given DS.
schema:description is optional in DS-V5.

**Kind**: global function  
**Returns**: <code>string</code> - the description of the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsAuthorV5"></a>

## getDsAuthorV5(ds) ⇒ <code>string</code>
Returns the author name (schema:author -> schema:name) of the given DS.
schema:author is optional in DS-V5.

**Kind**: global function  
**Returns**: <code>string</code> - the author name of the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsSchemaVersionV5"></a>

## getDsSchemaVersionV5(ds) ⇒ <code>string</code>
Returns the used schema.org version (schema:schemaVersion) of the given DS.
schema:schemaVersion is mandatory in DS-V5.

**Kind**: global function  
**Returns**: <code>string</code> - the schema.org version identifier as simple string, e.g. "11.0"  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsVersionV5"></a>

## getDsVersionV5(ds) ⇒ <code>string</code>
Returns the version (schema:version) of the given DS.
schema:version is optional in DS-V5.

**Kind**: global function  
**Returns**: <code>string</code> - the ds version as simple string, e.g. "1.04"  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsExternalVocabulariesV5"></a>

## getDsExternalVocabulariesV5(ds) ⇒ <code>Array.&lt;string&gt;</code>
Returns the used external vocabularies (ds:usedVocabularies) of the given DS.
ds:usedVocabularies is optional in DS-V5.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - array with the used external vocabularies (empty if none)  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsTargetClassesV5"></a>

## getDsTargetClassesV5(ds) ⇒ <code>Array.&lt;string&gt;</code>
Returns the target classes (sh:targetClass) of the given DS.
sh:targetClass is optional in DS-V5.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - array with the target classes  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsRootNodeV7"></a>

## getDsRootNodeV7(ds) ⇒ <code>object</code>
Returns the root node of the given DS

**Kind**: global function  
**Returns**: <code>object</code> - The detected root node of the DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | The input DS |

<a name="getDsStandardContextV7"></a>

## getDsStandardContextV7() ⇒ <code>object</code>
Returns the standard @context for DS-V7

**Kind**: global function  
**Returns**: <code>object</code> - the standard @context for DS-V7  
<a name="getDsIdV7"></a>

## getDsIdV7(ds) ⇒ <code>string</code>
Returns the @id of the given DS (for DS-V7 this @id is found in the root node).
A DS @id is mandatory for DS-V7.

**Kind**: global function  
**Returns**: <code>string</code> - the @id of the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="generateInnerNodeIdV7"></a>

## generateInnerNodeIdV7(ds) ⇒ <code>string</code>
Creates a new fragment id according to the DS-V7 specification.
See https://gitbook.semantify.it/domainspecifications/ds-v7/devnotes#3-generating-ids-for-inner-nodeshape
It is possible to pass the current DS, this way it is ensured that the generated fragment id has not been used yet in the given DS

**Kind**: global function  
**Returns**: <code>string</code> - returns a new the fragment id  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS (optional) |

<a name="getDsNameV7"></a>

## getDsNameV7(ds, language) ⇒ <code>string</code>
Returns the name (schema:name) of the given DS.
schema:name is optional in DS-V7.

**Kind**: global function  
**Returns**: <code>string</code> - the name of the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |
| language | <code>string</code> | the wished language for the name (optional) |

<a name="getDsDescriptionV7"></a>

## getDsDescriptionV7(ds, language) ⇒ <code>string</code>
Returns the description (schema:description) of the given DS.
schema:description is optional in DS-V7.

**Kind**: global function  
**Returns**: <code>string</code> - the description of the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |
| language | <code>string</code> | the wished language for the description (optional) |

<a name="getDsAuthorNameV7"></a>

## getDsAuthorNameV7(ds) ⇒ <code>string</code>
Returns the author name (schema:author -> schema:name) of the given DS.
schema:author is optional in DS-V7.

**Kind**: global function  
**Returns**: <code>string</code> - the author name of the given DS  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsSchemaVersionV7"></a>

## getDsSchemaVersionV7(ds) ⇒ <code>string</code>
Returns the used schema.org version (schema:schemaVersion) of the given DS.
schema:schemaVersion is mandatory in DS-V7.

**Kind**: global function  
**Returns**: <code>string</code> - the schema.org version identifier as simple string, e.g. "11.0"  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsVersionV7"></a>

## getDsVersionV7(ds) ⇒ <code>string</code>
Returns the used ds version (schema:version) of the given DS.
schema:version is optional in DS-V7.

**Kind**: global function  
**Returns**: <code>string</code> - the ds version as simple string, e.g. "1.04"  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsExternalVocabulariesV7"></a>

## getDsExternalVocabulariesV7(ds) ⇒ <code>Array.&lt;string&gt;</code>
Returns the used external vocabularies (ds:usedVocabulary) of the given DS.
ds:usedVocabulary is optional in DS-V7.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - array with the used external vocabularies (empty if none)  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |

<a name="getDsTargetClassesV7"></a>

## getDsTargetClassesV7(ds) ⇒ <code>Array.&lt;string&gt;</code>
Returns the target classes (sh:targetClass) of the given DS.
sh:targetClass is optional in DS-V7.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - array with the target classes (empty if none)  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>object</code> | the input DS |
