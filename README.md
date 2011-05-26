#nodevore

  A Convore API wrapper for node.js

  Currently under heavy development

##Usage

###Getting started
```javascript
  var Nodevore = require('nodevore').Nodevore;

  var n = new Nodevore({ username : 'user', : password : 'pass'});

  n.verifyAccount(function(err, data) {
    console.log(data);
  });
```

###Methods

###verifyAccount(callback)

  Verify that user is properly logged in

###getGroup( { groupid } , callback)

  Get detailed information about a group

###createGroup( { name, kind, description, slug }, callback)

  Create a new group.
  Name & kind are required parameters.
  
  For a complete reference of the Convore API, please visit
  https://convore.com/api/


  

  refer to test/ for more example of how to use nodevore
