var connector = require('./lib/connector');
var Connector = connector.Connector;

exports.setCredentials = connector.setCredentials;
exports.setHost = connector.setHost;

function _hasError(data) {
  if ( data.indexOf('error') > -1 ) {
    return true;
  }  

  return false;
}

function _tryParse(data) {
  var ret = null;

  try {
    ret = JSON.parse(data);  
  } catch (err){
    ret = data;
  }

  return ret;
}

function _conn() {
  return new Connector();
} 

function _err(str) {
  return { error : str };
}

function Nodevore(user, pass) {
  
  if(user && pass) {
    connector.setCredentials(user, pass);
  }

};

Nodevore.prototype = {
  
  verifyAccount : function(callback) { 
    _conn().get('/account/verify','', function(err, data) {
   
      if(err) {
        return callback(err);   
      }
      
      if(_hasError(data)) {
        return callback(_tryParse(data));
      } 

      callback(null, _tryParse(data));
    });
  },

  getOnline : function(callback) {
    _conn().get('/account/online','', function(err, data) {
    
      if(err){
        return callback(err);
      }

      if(_hasError(data)) {
        return callback(_tryParse(data));
      }

      callback(null, _tryParse(data));
    });
  },

  markAllRead : function(callback) {
    _conn().get('/account/mark_read','', function(err, data) {
    
      if(err) {
        return callback(err);
      }
     
      if(_hasError(data)) {
        return callback(_tryParse(data));
      } 

      callback(null, _tryParse(data));
    });
  },

  getAllGroups : function(callback) {
    _conn().get('/groups','', function(err, data) {
    
      if(err) {
        return callback(err);
      }
      
      if(_hasError(data)) {
        return callback(_tryParse(data));
      }

      callback(null, _tryParse(data));
    });
  },

  getMentions : function(callback) {
    _conn().get('/account/mentions','', function(err, data) {
    
      if(err) {
        return callback(err);
      }
      
      if(_hasError(data)) {
        return callback(_tryParse(data));
      }

      callback(null, _tryParse(data));
    });
  },

  createGroup : function(data, callback) {
    if (!data.name || !data.kind) {
      return callback(_err('A group requires data and kind'));
    }

    if (data.kind != 'public' && data.kind != 'private') {
      return callback(_err('Kind must be either "public" or "private"'));
    }


    var request = ['name=', data.name ,'&',
                   'kind=', data.kind ,'&',
                   'description=', data.description || '', '&',
                   'slug=', data.slug || ''
                  ].join('');
    
    _conn().post('/groups/create', request, function(err, data) {
      if(err) {
        return callback(err);
      }
      
      callback(data);
    });
  
  },

  getGroup : function(id, callback) {
    if(!id) {
      return callback('getGroup requires a group id');
    }

    
  }




};

exports.Nodevore = Nodevore;
