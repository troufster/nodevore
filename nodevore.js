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
    c.get('/account/verify', function(err, data) {
   
      if(err) {
        return callback(err);   
      }
   
      callback(null, JSON.parse(data));
    });
  },

  getOnline : function(callback) {
    c.get('/account/online', function(err, data) {
    
      if(err){
        return callback(err);
      }

      callback(null, JSON.parse(data));
    });
  },

  markAllRead : function(callback) {
    c.get('/account/mark_read', function(err, data) {
    
      if(err) {
        return callback(err);
      }
      
      callback(null, true);
    });
  },

  getAllGroups : function(callback) {
    c.get('/groups', function(err, data) {
    
      if(err) {
        return callback(err);
      }

      callback(null, JSON.parse(data));
    });
  }






};

exports.Nodevore = Nodevore;
