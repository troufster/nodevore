#nodevore

  A Convore API wrapper for node.js

##Usage

###Getting started
```javascript
  var Nodevore = require('nodevore').Nodevore;

  var n = new Nodevore({ username : 'user',  password : 'pass'});

  n.verifyAccount(function(err, data) {
    console.log(data);
  });
```

###Methods

###verifyAccount( callback )

  Verify that user is properly logged in

###getGroup( { groupid } , callback )

  Get detailed information about a group

###createGroup( { name, kind, description, slug }, callback)

  Create a new group.
  Name & kind are required parameters.
  
###markRead( callback )

  Mark all messages as read

###getOnline( callback )

  Get members online 

###getMentions( callback )

  Get mentions of current user

###getGroups( callback )

  Get a list of the current users groups

###getGroupMembers( { id } , callback ) 

  Get members of a group, id is required.

###joinPublicGroup( { id } , callback )

  Join a public group, id is required.

###joinPrivateGroup( { id }, callback )

  Request to join a private group, id is required.

###leaveGroup( { id }, callback) 

  Leave a group. Id is required.

###getGroupOnline( { id } , callback )

  Get group members currently online. Id is required

###getGroupTopics( { id }, callback )

  Get the topics of a group. Id is required

###createTopic( { id, name }, callback)

  Create a topic in the group with the provided id. Id and name are
  required.

###trackGroup( { id } , callback)

  Track/mute a group. Id is required.

###markGroupRead( { id }, callback)

  Mark all messages in a group as read. Id is required.

###getTopic( { id } , callback)

  Get detailed info about a topic, id is required.

###deleteTopic( { id } , callback)

  Delete a topic. Id is required

###editTopic( { id, name } , callback )

  Edit a topic. Id and name are required.

###trackTopic( { id } , callback )

  Track/untrack a topic. Id is required.

###markTopicRead( { id } , callback )

  Mark a topic as read. Id is required

###getTopicMessages( { id, until_id, mark_read } , callback)
  
  Get all messages from a topic.
  id is required.

###createMessage( { topic_id, message, pasted } , callback)
  
  Create a message in a topic.
  topic_id, message and pasted are required.

###starMessage( { id } , callback )

  Star a message. id is required.

###deleteMessage( { id } , callback )

  Delete a message. id is required.

###getUserById( { id } , callback ) 

  Get a users info by id. id is required.

###getUserByName( { username } , callback ) 

  Get a users info by username. username is required.

###getUserMessages( { until_id } , callback )

  Get direct messages for current user

###getMessagesToUser( { id } , callback )

  Get messages between the current user and the specified user id. id is
  required.

###createMessage( { to_user, message } , callback ) 

  Create a message to a user id. to_user and message are required.

###starMessage( { id } , callback ) 

  Star a message. id is required.

###deleteMessage( { id } , callback )

  Delete a message. id is required.

###discoverUserGroups( callback ) 

  Get a list of all the groups the current user is a member of

###discoverCategories( callback )

  Get a list of group categories

###discoverGroupsByCategory( { category_slug }, callback)

  Get a list of groups in the given category. category_slug is required.

###searchGroups( { q } , callback )

  Get a list of groups matching the given search. q is required.

###listGroupsSorted( { sort } , callback )

  Get a list of all groups, sorted either by popularity, recency or
  alphabetically. sort is required and should be either 'popular'
  'recent' or 'alphabetical'

###getTrending( callback ) 

  Get a list of groups with recent activity

###live( { group_id, cursor, topic_id, immediate } , callback )

  Get a live stream of events. The provided callback function will be
  called each time new data arrives. Note that this method will continue
  streaming data until the `hangup()` method is called.

###hangup()

  Stops streaming live data

###setCredentials( username, password )

  Set the credentials of the current user

###setHost( host )

  Set the convore base url. Default 'convore.com' 

###Additional

  For a complete reference of the Convore API, please visit
  https://convore.com/api/

  refer to test/ for examples of how to use nodevore
