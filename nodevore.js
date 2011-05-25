var connector = require('./lib/connector');
var Connector = connector.Connector;

exports.setCredentials = connector.setCredentials;
exports.setHost = connector.setHost;

var c = new Connector();

function Nodevore(user, pass) {
  
  if(user && pass) {
    connector.setCredentials(user, pass);
  }

};

Nodevore.prototype = {
  
  verifyAccount : function(callback) { 
    c.get('/account/verify','', function(err, data) {
   
      if(err) {
        return callback(err);   
      }
   
      callback(null, JSON.parse(data));
    });
  },

  getOnline : function(callback) {
    c.get('/account/online','', function(err, data) {
    
      if(err){
        return callback(err);
      }

      callback(null, JSON.parse(data));
    });
  },

  markAllRead : function(callback) {
    c.get('/account/mark_read','', function(err, data) {
    
      if(err) {
        return callback(err);
      }
      
      callback(null, true);
    });
  },

  getAllGroups : function(callback) {
    c.get('/groups','', function(err, data) {
    
      if(err) {
        return callback(err);
      }

      callback(null, JSON.parse(data));
    });
  },

  getMentions : function(callback) {
    c.get('/account/mentions','', function(err, data) {
    
      if(err) {
        return callback(err);
      }

      callback(null, JSON.parse(data));
    });
  },

  createGroup : function(data, callback) {
    if (!data.name || !data.kind) {
      return callback('A group requires data and kind');
    }

    if (data.kind != 'public' || data.kind != 'private') {
      return callback('Kind must be either "public" or "private"');
    }

    var request = ['name=', data.name ,'&',
                   'kind=', data.kind ,'&',
                   'description=', data.description || '', '&',
                   'slug=', data.slug || ''
                  ].join('');
    
    c.post('/groups/create', request, function(err, data) {
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
