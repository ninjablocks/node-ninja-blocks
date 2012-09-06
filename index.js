var request       = require('request');
var uri           = 'https://api.ninja.is/rest/v0/';


exports.app = function(opts) {
  var access_token = opts.access_token;
  return {

    device: function(device) {

      return {

        /*
            Actuate a device
         */
        actuate: function(command,cb) {
          var opts = {
            url: uri + 'device/'+device,
            method: 'PUT',
            qs: { access_token:access_token },
            json: { DA:command }
          };
          request(opts,function(e,r,b) {
            if (e) cb(e)
            else {
              if (b.result===1) cb(null)
              else cb({statusCode:b.id||200,error:b.error})
            }
          });
        },

        /**
         * Subscribe to the device's data feed
         * Optionally `overwrite` an existing callback url with the provided
         * `url`. Default is false.
         *
         * Example:
         *     app.device(guid).subscribe('example.com',true)
         *
         * @param {String} url
         * @param {Boolean} overwrite
         * @param {Function} cb
         * @api public
         */

        subscribe: function(url,overwrite,cb) {
          if (typeof overwrite==="function") {
            cb = overwrite;
            overwrite = false;
          }
          var opts = {
            url: uri + 'device/'+device+'/callback',
            method: 'POST',
            qs: { access_token:access_token },
            json: { url:url }
          };
          request(opts,function(e,r,b) {
            if (e) cb(e)
            else {
              if (b.result===1) cb(null)
              else if (b.id===409 && overwrite) {
                // A url already exists, let's update it
                var opts = {
                  url: uri + 'device/'+device+'/callback',
                  method: 'PUT',
                  qs: { access_token:access_token },
                  json: { url:url }
                };
                request(opts,function(e,r,b) {
                  if (e) cb(e)
                  else {
                    if (b.result===1) cb(null)
                    else cb({statusCode:b.id||200,error:b.error})
                  }
                });
              }
              else {
                cb({statusCode:b.id||200,error:b.error})
              }
            }
          });
        },

        /*
            Fetch historical data
         */
        
        data: function(from, to, cb) {
          var qs = {access_token:access_token};

          if (typeof from === "function") {
            cb = from;
            from = false;
          } else if (typeof to === "function") {
            cb = to;
            to = false;
          }
          if (from instanceof Date) from = from.getTime();
          if (from) qs.from = from;
          if (to instanceof Date) to = to.getTime();
          if (to) qs.to = to;

          var opts = {
            url: uri + 'device/'+device+'/data',
            method: 'GET',
            qs: qs,
            json: true
          };

          request(opts,function(e,r,b) {
            console.dir(b);
            if (e) cb(e)
            else {
              if (b.result===1) cb(null, b.data)
              else cb({statusCode:b.id||200,error:b.error})
            }
          });
        },

        /*
            Fetch latest data
         */
        
        last_heartbeat: function(cb) {
          var opts = {
            url: uri + 'device/'+device+'/heartbeat',
            method: 'GET',
            qs: { access_token:access_token },
            json: true
          };
          request(opts,function(e,r,b) {
            if (e) cb(e)
            else {
              if (b.result===1) cb(null, b.data)
              else cb({statusCode:b.id||200,error:b.error})
            }
          });
        }

      }

    },

    devices: function(cb) {
      var opts = {
        url: uri + 'devices',
        method: 'GET',
        qs: { access_token:access_token },
        json: true
      };
      request(opts,function(e,r,b) {
        if (e) cb(e)
          else {
            if (b.result===1) cb(null, b.data)
            else {
              cb({statusCode:b.id||200,error:b.error})
            }
          }
      });
    }
  }
}