var https = require('https');
var convoreHost ='convore.com';
var username = '';
var password = '';



function _getClient(command, method, length) {
  var client = {
    host : convoreHost,
    port : 443,
    path : '/api' + command + '.json',
    method : method,
    headers: {
      'Authorization' : 'Basic ' + new Buffer(username + ':' + password).toString('base64'),
      'Content-Length' : length
    }
  };

  return client;
};

function _httpsRequest(client, data, callback) {

  var request = https.request(client, function(res) {
  
    var chunk = '';

    res.on('data', function(data) {
      chunk += data;
    });

    res.on('end', function(data) {
      callback(null, chunk);
    });

  });

  if(data) {
    request.end(data);
  } else {
    request.end();
  }

  request.on('error', function(err) {
    callback(err);
  });

};

function Connector() {};

Connector.prototype.post = function(command, data, callback) {
  
  var client = _getClient(command, 'POST', data.length);
  
  _httpsRequest(client, data, function(err, data) {

    if(err) {
      return callback(err);
    }

    callback(null, data);

  });

}

Connector.prototype.get = function(command, data,  callback) {
  var client = _getClient(command, 'GET', data.length);

  _httpsRequest(client, data, function(err, data) {
    
    if(err) {
      return callback(err);
    }

    callback(null, data);
  });

};

exports.setCredentials = function(user, pass) {
  username = user;
  password = pass;
};

exports.setHost = function(host) {
  convoreHost = host;
}

exports.Connector = Connector;

