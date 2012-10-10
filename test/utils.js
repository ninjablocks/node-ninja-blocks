var should = require('should'),
  utils = require('../lib/utils.js');

describe('utils',function() {
  var set = {
    'INEEDABOUTTHREEFIFTY_0_0_1' : {
      'device_type' : 'pop_reference',
      'shortName' : 'treefity',
      'vid' : 0,

    },
    'MYHATSONFIRE_0_0_2' : {
      'device_type' : 'pop_reference',
      'shortName' : 'spirit of jazz',
      'vid' : 0
    }
  };
  describe('filter',function() {
    it('should return the full set on an empty filter',function() {
      Object
        .keys(utils.filter({},set))
        .should
        .eql(Object.keys(set));
    });
    it('should return the correct element with 1 filter',function() {
      Object
        .keys(utils.filter({'shortName':'treefity'},set))
        .should
        .eql(['INEEDABOUTTHREEFIFTY_0_0_1']);
    });
    it('should return the correct element with 2 filters',function() {
      Object
        .keys(utils.filter({'shortName':'treefity','device_type':'pop_reference'},set))
        .should
        .eql(['INEEDABOUTTHREEFIFTY_0_0_1']);
    });
    it('should not filter by strict equality',function() {
      Object
        .keys(utils.filter({'vid':'0','shortName':'treefity'},set))
        .should
        .eql(['INEEDABOUTTHREEFIFTY_0_0_1']);
    });
    it('should return multiple elements with 1 filter',function() {
      Object
        .keys(utils.filter({'device_type':'pop_reference'},set))
        .should
        .eql(['INEEDABOUTTHREEFIFTY_0_0_1','MYHATSONFIRE_0_0_2']);
    });
    it('should return multiple elements with 2 filters',function() {
      Object
        .keys(utils.filter({'device_type':'pop_reference','vid':0},set))
        .should
        .eql(['INEEDABOUTTHREEFIFTY_0_0_1','MYHATSONFIRE_0_0_2']);
    });
  });
});