'use strict';

module.exports = {
  toLong: convertToLong,
  fromUuid: convertFromUuid,
  toUuid: convertToUuid
};

var maximumWholeNumberForJS = 9007199254740992; // largest whole number with fidelity in JS is 2^53-1
var minimumNegativeNumberForJS = -9007199254740992; //largest negative whole number with fidelity in JS

function getBaseIntegerNumber(input) {
  var ret;

  //single out 0, since it's falsey, return it directly
  if (input === 0) return 0;

  // falsey input
  if (!input) return null;

  //already a number, use it
  if (typeof input === 'number') {
    ret = Math.round(input);
    return (ret <= minimumNegativeNumberForJS || ret >= maximumWholeNumberForJS) ? null : ret;
  }

  //not a number, ensure it is a string...
  input = input.toString();

  if (!(/^[\-\+]?\d+(\.\d+)?$/).test(input)) return null;

  ret = parseInt(input, 10);
  if (ret <= minimumNegativeNumberForJS || ret >= maximumWholeNumberForJS) return null;
  return ret;
}


function convertToLong(input) {
  var ret = getBaseIntegerNumber(input);
  if (ret === null) ret = convertFromUuid(input);
  return ret;
}


function convertFromUuid(input) {
  var matches = (input).toString().match(/^00000000\-0000\-(000[01])\-(\d{4}\-\d{12})$/);
  if (!matches) return null; //invalid input
  var ret = parseInt(matches[2].split('-').join(''), 10);
  if (matches[1] === '0001') ret = 0-ret;
  return (ret <= minimumNegativeNumberForJS || ret >= maximumWholeNumberForJS) ? null : ret;
}


function convertToUuid(input) {
  //already a uuid - return it (ensure lowercased
  if ((/^[\da-f]{8}\-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i).test(input)) return input.toLowerCase();

  //convert from a number (if possible)
  var num = convertToLong(input);
  if (num === null || num <= minimumNegativeNumberForJS || num >= maximumWholeNumberForJS) return null;

  var ret = '00000000-0000'.split('-');
  ret.push(num < 0 ? '0001' : '0000');

  num = ('0000000000000000' + num.toString()).substr(-16);
  ret.push(num.substr(0,4));
  ret.push(num.substr(4,12));
  return ret.join('-');
}


