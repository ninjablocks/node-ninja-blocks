var EventEmitter  = require('events').EventEmitter;
var util          = require('util');
var request       = require('request');
var subscriptions = {};


exports.app = function(opts) {
  var access_token = opts.access_token;
  return {
    subscribe: function(params,cb) {
      var opts = {
        url:'https://api.ninja.is/rest/v0/device/'+params.guid+'/callback',
        method:'POST',
        qs: {
            access_token:access_token
        },
        json: {
          url:params.url
        }
      };
      request(opts,function(e,r,b) {
        if (e) cb(e)
        else {
          if (b.result===1) cb(null)
          else cb(new Error(b.error))
        }
      });
    },

    devices: function(cb) {
      var opts = {
        url:'https://api.ninja.is/rest/v0/devices',
        qs: {
            access_token:access_token
        }
      };

      request(opts,function(e,r,b) {
        cb(e ? null : r.statusCode, JSON.parse(b).data)
      });
    }
  }
}