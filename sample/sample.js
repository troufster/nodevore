var Nodevore = require('../nodevore').Nodevore;


var n = new Nodevore('username', 'password');

/*
n.markRead(function(err, data) {
  console.log(err, data);
});

n.getGroup({ groupid: 10151 }, function(err,data){
  console.log(err, data);
});


n.verifyAccount(function(err, data) {
  console.log(err,data);
});

n.getOnline(function(err, data) {
});

n.markAllRead(function(err, data) {
});

n.getAllGroups(function(err, data) {

});

n.getMentions(function(err, data) {
});

n.createGroup({ 
                name : 'Ygrpname', 
                kind : 'private',
                description : 'grpdesc',
                slug : 'grpslug'
              }, 
              function(err, data) {
                   console.log(err, data);
              });


*/
n.trackGroup({ id : 10151 }, function(err, data) {
  console.log(err, data);
});
