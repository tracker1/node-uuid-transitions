'use strict';

//required imports
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

//module to be tested
var convert = require('../../../lib').convert;

describe('lib/util/convert', function(){

  describe('convert.toLong', function(){
    it('will return a string value as a number', function(){
      var ret = convert.toLong('12345');
      expect(ret).to.be.a.number;
      expect(ret).to.equal(12345);
      expect(ret).to.not.equal('12345');
    });

    it('will return zero as-is', function(){
      var ret = convert.toLong(0);
      expect(ret).to.equal(0);
    });

    it('will return null for falsy input', function(){
      var ret = convert.toLong(false);
      expect(ret).to.be.null;
    });

    it('will not return a string for a number too big', function(){
      var ret = convert.toLong(Math.pow(2,53).toString());
      expect(ret).to.be.null;
    });
    it('will not return a string for a number too small', function(){
      var ret = convert.toLong(-Math.pow(2,53).toString());
      expect(ret).to.be.null;
    });

    it('will return a positive whole value rounded to nearest whole.', function(){
      var ret = convert.toLong(5.6);
      expect(ret).to.equal(6);
    });
  });

  describe('convert.fromUuid', function(){
    it('will return an expected numeric value', function(){
      var ret = convert.fromUuid('00000000-0000-0000-1234-123456789012');
      expect(ret).to.equal(1234123456789012);
    });

    it('will return null for a number too big', function(){
      var ret = convert.fromUuid('00000000-0000-0000-9999-999999999999');
      expect(ret).to.be.null;
    });

    it('will return null for a number too small', function(){
      var ret = convert.fromUuid('00000000-0000-0001-9999-999999999999');
      expect(ret).to.be.null;
    });

    it('will return null for an invalid input', function(){
      var ret = convert.fromUuid('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
      expect(ret).to.be.null;
    });

    it('will convert for a negative marker', function(){
      var ret = convert.fromUuid('00000000-0000-0001-1234-123456789012');
      expect(ret).to.equal(-1234123456789012);
    });
  });

  describe('convert.toUuid - returns null or zero-shimmed uuid', function(){
    it('will convert a whole number', function(){
      var ret = convert.toUuid(1234123456789012);
      expect(ret).to.equal('00000000-0000-0000-1234-123456789012');
    });

    it('will convert a negative number', function(){
      var ret = convert.toUuid(-1234123456789012);
      expect(ret).to.equal('00000000-0000-0001-1234-123456789012');
    });


    it('will return null for a number too big', function(){
      var ret = convert.toUuid(Math.pow(2,53).toString());
      expect(ret).to.be.null;
    });

    it('will return null for a number too small', function(){
      var ret = convert.toUuid(-Math.pow(2,53).toString());
      expect(ret).to.be.null;
    });

    it('will not convert an invalid string', function(){
      var ret = convert.toUuid('not a string');
      expect(ret).to.be.null;
    });

    it('will return existing uuid string as lowercase value', function(){
      var ret = convert.toUuid('AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA');
      expect(ret).to.equal('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
    });
  });

});