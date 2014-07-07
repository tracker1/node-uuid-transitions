node-uuid-transitions
=====================

Utilities for transitional UUID data.  The main points of use for this module are to convert from a safe range (-2^53 + 1 to 2^53 - 1) integer value to/from a placeholder uuid format.

The transition-uuid format is: `00000000-0000-000B-NNNN-NNNNNNNNNNNN`
* B is a negative check bit 
 * 0 if it was a positive number
 * 1 if it was negative
* N is the number portion
 * Base-10 encoding
 * Left-Padding with Zeros
 * Separated between the first 4 characters and the last 12 


## Installation

```
npm install --save uuid-transitions
```


## Use

### Convert

```javascript
var uuidconvert = require('uuid-transitions').convert;

```

#### .toUuid(input)

Returns null or a uuid version of the input.
* A uuid formatted string will return as-is.
* A string that is a number format (base-10) will be converted to a number
* A number outside of range for safe integers in JS will return null.
* The UUID is formatted per the above notation.

```javascript
uuidconvert.toUuid('-1234123456789012')
// '00000000-0000-0001-1234-123456789012'

uuidconvert.toUuid(12345678901234567890)
// null -- out of range

uuidconvert.toUuid('a1b2c3d4-1111-2222-3333-1234567890ab')
// 'a1b2c3d4-1111-2222-3333-1234567890ab'
```

#### .fromUuid(input)

Converts the transition-uuid input to a Long (52-bit range limited)
* if it's invalid or out of range, null is returned.

```javascript
uuidconvert.fromUuid('00000000-0000-0001-1234-123456789012');
// -1234123456789012

uuidconvert.fromUuid('a00000000-0000-0000-0000-000000000000');
// null - invalid structure

uuidconvert.fromUuid('000000000-0000-0000-9999-999999999999');
// null - out of range

uuidconvert.fromUuid(1234);
// null - invalid structure
```

#### .toLong(input)

Converts from either a numeric value, or from a transition-uuid to a long (52-bit range limited)
* if invalid or out of range, null is returned

```javascript
uuidconvert.toLong(1234);
// 1234

uuidconvert.toLong('00000000-0000-0001-1234-123456789012');
// -1234123456789012

uuidconvert.fromUuid('a00000000-0000-0000-0000-000000000000');
// null - invalid structure
```
