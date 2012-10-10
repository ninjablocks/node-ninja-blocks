Node Ninja Blocks
===
A simple library to help interacting with the Ninja Blocks Platform.

## Installation
```
npm install ninja-blocks
```

## OAuth 2 Usage
```javascript
var ninjaBlocks = require('ninja-blocks');
// ACCESS_TOKEN acquired via OAuth
var ninja = ninjaBlocks.app({access_token:ACCESS_TOKEN});

ninja.devices(function(err,devices) {
  // ...
});
```

## User Access Token Usage
```javascript
var ninjaBlocks = require('ninja-blocks');
// USER_ACCESS_TOKEN acquired via settings page in Ninja Cloud
var ninja = ninjaBlocks.app({user_access_token:USER_ACCESS_TOKEN});

ninja.devices(function(err,devices) {
  // ...
});
```

## API Overview

### User
```javascript
// Fetch a user's profile anyformation
app.user(function(err, data) { ... }); 

// Fetch a user's activity stream
app.user().stream(function(err,data){ ... }) 

// Fetch a user's pusher channel
app.user().pusher_channel(function(err,data){ ... }) 
```

### Device
```javascript
/**
 * Fetch all the user's device details.
 * Optionally if an object is passed as the first argument,
 * it will filter by the parameters. If a string is provided, 
 * it will assume it's the device type intended for filtering. 
 *
 * NOTE: The returned data is in the form guid => meta data
 * You will need the guid for all the other device commands.    
 */
app.devices(function(err, data) { ... });
app.devices({ device_type:'rgb_led' },function(err,data){ ... })
app.devices({ vid:0, shortName:'On Board RGB LED' },function(err,data){ ... })

// Send `command` to device `guid`
app.device(guid).actuate(command,function(err) { ... }) 

// Subscribe to a device's data feed. Ninja Blocks will POST the requested
// device's data to the `url` provided here.
// Optionally `overwrite`s an existing callback `url`
app.device(guid).subscribe(url,overwrite,function(err) { ... }) 

// Unubscribe from a device's data feed.
app.device(guid).unsubscribe(function(err) { ... }) 

// Fetch any historical data about this device. Optionally specify the period's `start` and `end` timestamp.
app.device(guid).data(start, end, function(err, data) { ... })

// Fetch the last heartbeat received by this device.
app.device(guid).last_heartbeat(function(err, data) { ... })
```
This is by no means exhaustive, and more functionality will be forthcoming.
