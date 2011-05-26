var assert = require('assert');
var Nodevore = require('../nodevore').Nodevore;

var username = '';
var password = '';
var grpid = ;

function t() {
  return new Nodevore({ username : username, password : password });
};

module.exports = {
  verifyAccount : function() {
    var n = t();

    n.verifyAccount(function(err, data) {
      assert.ok(data);
    });
  } ,
  getGroup : function(){
    var n = t();
    n.getGroup({groupid:grpid}, function(err, data) {
      assert.ok(data);
    });
  }, 
  markRead : function() {
    var n = t();

    n.markRead(function(err, data) {
      assert.ok(data);
    });
  },
  getOnline : function() {
    var n = t();
    
    n.getOnline(function(err, data) {
      assert.ok(data);
    }); 
  },
  getMentions : function() {
    var n = t();

    n.getMentions(function(err, data) {
      assert.ok(data);
    });
  },
  getGroups : function() {
    var n = t();

    n.getGroups(function(err, data) {
      assert.ok(data);
    });
  },
  getGroupMembers : function() {
    var n = t();
    
    n.getGroupMembers({ id : grpid}, function(err, data) {
      assert.ok(data);
    });
  },
  joinPublicGroup : function(){
    var n = t();
  
    //grpid is private so this should err
    n.joinPublicGroup({ id : grpid }, function(err, data) {
      assert.ok(err);
    });
  },
  joinPrivateGroup : function() {
    var n = t();

    n.joinPrivateGroup({ id : grpid }, function(err, data) {
      assert.ok(data);
    });
  },
  getGroupOnline : function() {
    var n = t();
    
    n.getGroupOnline({ id : grpid},function(err, data) {
      assert.ok(data);
    });
  },
  getGroupTopics : function() {
    var n = t();

    n.getGroupTopics({ id : grpid }, function(err, data) {
      assert.ok(data);
    });
  
  },
  trackGroup : function() {
    var n = t();

    n.trackGroup({ id : grpid }, function(err, data) {
      assert.ok(data);
    });
  },
  markGroupRead: function() {
    var n = t();

    n.trackGroup({ id : grpid }, function(err, data) {
      assert.ok(data);    
    });
  },
  live : function() {
    var n = t();

    var num = 0;

    n.live(function(err,data) {
      num++;
      console.log(err, data);

        setTimeout(n.hangup, 300);
    });
  
  }
};
