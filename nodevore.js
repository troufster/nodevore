var connector = require('./lib/connector');
var methods = require('./lib/convoreapi').api;
var Connector = connector.Connector;

exports.setCredentials = connector.setCredentials;
exports.setHost = connector.setHost;

/**
 * Determines if a string result contains an error
 * @param {String} data string to check
 * @private
 */
function _hasError(data) {
  if ( data.indexOf('error') > -1 ) {
    return true;
  }  

  return false;
}

/**
 * Tries to parse a string to JSON
 * @param {String} data string to parse
 * @returns {Object, String} JSON object or unparsed string if fail
 * @private
 */
function _tryParse(data) {
  var ret = null;

  try {
    ret = JSON.parse(data);  
  } catch (err){
    ret = data;
  }

  return ret;
}


/**
 * Returns a new connector
 * @private
 */
function _conn() {
  return new Connector();
} 

/**
 * Wraps a string into an error object
 * @param {String} str error string to wrap
 * @returns {Object} Error object
 * @private
 */
function _err(str) {
  return { error : str };
}



/**
 * Calls a callback function with either error or data
 * parameters.
 * @param {Object} err Error object
 * @param {Object} data Data object
 * @param {Function} callback callback function
 * @private
 */
function _errorOrData(err, data, callback) {
  if(err) {
    return callback(err);
  }

  if(_hasError(data)) {
    return callback(_tryParse(data));
  }

  return callback(null, _tryParse(data));
}

/**
 * Nodevore
 * @param {String} user Convore username
 * @param {String} pass Convore password
 * @constructor
 */
function Nodevore(user, pass) {
  
  if(user && pass) {
    connector.setCredentials(user, pass);
  }

};


function _replacePath(path, data) {
  if(!data) {
    return path;
  }
  
  var p = path;

  for(var d in data) {    
    p = p.replace(':' + d, data[d])
  }

  return p;
}


//Populate methods
for(var m in methods) {
  if(methods.hasOwnProperty(m)) {
    var method = methods[m];

    //Attach to proto
    Nodevore.prototype[m] = (function(innermethod, innerm) {
      return function(data, callback) {
        var _callback = callback ? callback : data;
        var queryparams = [];
        var verb = innermethod.method || 'get';

        if(!_callback) return;

        //Validate input
        if(innermethod.params) {
          var imp = innermethod.params;

          for(var p in imp) {
            var thisp = imp[p];
            
            if(thisp.required) {
            
              if(!data[p]) {                
                return _callback(_err(innerm + ' requires parameter: ' + p));
              }
            }
            
            if(thisp.postdata) {              
              var d = data[p] ? data[p] : '';
              queryparams.push(p + '=' + d );
            }
          } 
        };

        //Update path
        var path = innermethod.params ?  _replacePath(innermethod.path, data) : innermethod.path;

        //Build query
        var query = queryparams.length > 0 ? queryparams.join('&') : '';

        //Call remote
        _conn()[verb](path, query , function(err,data) {
          _errorOrData( err, data, _callback);
        });
      }
    })(method, m);  
  }
}

exports.Nodevore = Nodevore;
