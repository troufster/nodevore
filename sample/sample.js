var Nodevore = require('../nodevore').Nodevore;


var n = new Nodevore('username', 'password');

n.verifyAccount(function(err, data) {
  console.log(err, data);
});

n.getOnline(function(err, data) {
  console.log(err, data);
});

n.markAllRead(function(err, data) {
  console.log(err, data);
});

n.getAllGroups(function(err, data) {

  console.log(err, data);
});
