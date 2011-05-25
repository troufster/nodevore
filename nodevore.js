var connector = require('./lib/connector');
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

/**
 * Nodevore API wrapper, see
 * https://convore.com/api/ for further method details
 */
Nodevore.prototype = {
  
  /**
   * Verify the current user
   * @param {Function} callback Callback function
   */
  verifyAccount : function(callback) { 
    _conn().get('/account/verify','', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Get all members currently online
   * @param {Function} callback Callback function
   */ 
  getOnline : function(callback) {
    _conn().get('/account/online','', function(err, data) {
      return _errorOrData(err, data, callback); 
    });
  },

  /**
   * Mark all messages as read
   * @param {Function} callback Callback function
   */
   markAllRead : function(callback) {
    _conn().get('/account/mark_read','', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Get a list of the current users groups
   * @param {Function} callback Callback function
   */
  getAllGroups : function(callback) {
    _conn().get('/groups','', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Get the user's mentions
   * @param {Function} callback Callback function
   */ 
  getMentions : function(callback) {
    _conn().get('/account/mentions','', function(err, data) {
      return _errorOrData(err, data, callback);
    });

  },
  
  /**
   * Create a new group
   * @param {Object} data Group data
   * @param {Function} callback Callback function
   *
   * Usage:
   *
   * c.createGroup({ name : 'groupname', kind : 'public|private', description : 'grpdesc', slug : 'grpslug', callback);
   */
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
      return _errorOrData(err, data, callback);
    });
  
  },

  /**
   * Get detailed info about a group
   * @param {Number} id Group id
   * @param {Function} callback Callback function
   */
  getGroup : function(id, callback) {
    if(!id) {
      return callback(_err('getGroup requires a group id'));
    }
    
    _conn().get('/groups/' + id, '', function(err, data) {
      return _errorOrData(err, data, callback); 
    }); 
  },

  /**
   * Get group members
   * @param {Number} id Group id
   * @param {String} filter Search filter, use 'admin' to only show admins
   * @param {Function} callback Callback function
   */ 
  getGroupMembers : function(id, filter,  callback) {
    if(!id) {
      return callback(_err('getGroupMembers requires a group id'));
    }
    
    var request = filter ? 'filter=' + filter : '';

    _conn().get('/groups/' + id + '/members', request, function(err, data) {
      return _errorOrData(err, data, callback);
    }); 
  },

  /**
   * Join a public group
   * @param {Number} id Group id
   * @param {Function} callback Callback function
   */ 
  joinGroup : function(id, callback) {
    if(!id) {
      return callback(_err('joinGroup requires a group id'));
    }

    _conn().get('/groups/' + id + '/join', '', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },
  
  /**
   * Request to join a private group
   * @param {Number} id Group id
   * @param {Function} callback Callback function
   */ 
  joinPrivateGroup : function(id, callback) {
    if(!id) {
      return callback(_err('joinPrivateGroup requires a group id'));
    }

    _conn().get('/groups/' + id + '/request', '', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Leave a group
   * @param {Number} id Group id
   * @param {Function} callback Callback function
   */ 
  leaveGroup : function(id, callback) {
    if(!id) {
      return callback(_err('leaveGroup requires a group id'));
    }

    _conn().get('/groups/' + id + '/leave', '', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Get group members online now
   * @param {Number} id Group id
   * @param {Function} callback Callback function
   */ 
  getGroupOnline : function(id, callback) {
    if(!id) {
      return callback(_err('getGroupOnline requires a group id'));
    }

    _conn().get('/groups/' + id + 'online', '', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Get the latest topics in a group.
   * @param {Number} id Group id
   * @param {Number} until Use to paginate and show prior topics
   * @param {Function} callback Callback function
   */ 
  getGroupTopics : function (id, until, callback) {
    if(!id) {
      return callback(_err('getGroupToics requires a group id'));
    }

    var request = until ? 'until=' + until : '' ;

    _conn().get('/groups/' + id + 'topics', request, function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Create a new topic in a group
   * @param {Number} groupid Group id
   * @param {String} name Topic name
   * @param {Function} callback Callback function
   */ 
  createTopic : function(groupid, name, callback) {
    if(!groupid || !name) {
      return callback(_err('createTopic requires a group id and a topic name'));
    }

    var request = 'name=' + name;

    _conn().get('/groups/' + groupid + '/topics/create', request, function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Track or mute a group
   * @param {Number} id Group id
   * @param {Function} callback Callback function
   */ 
  trackGroup : function(id, callback) {
    if(!id) {
      return callback(_err('trackGroup requires a group id'));
    }

    _conn().get('/groups/' + id + '/track', '', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
   * Mark all messages in a group as read
   * @param {Number} id Group id
   * @param {Function} callback Callback function
   */ 
  markGroupRead : function(id, callback) {
    if(!id) {
      return callback(_err('markGroupRead requires a group id'));
    }

    _conn().get('/groups/' + id + '/mark_read', '', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  /**
  * Get detailed info on a topic
  * @param {Number} id Topic id
  * @param {Function} callback Callback function
  */
  getTopic : function(id, callback) {
    if(!id) {
      return callback(_err('getTopic requires a topic id'));
    }

    _conn().get('/topics/' + id, '', function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },
  
  /**
   * Remove a topic 
   * User must be creator of the topic or a group admin
   * @param {Number} id Topic id
   * @param {Function} callback Callback function
   */
  removeTopic : function(id, callback) {
    if(!id) {
      return callback(_err('removeTopic requires a topic id'));
    }

    _conn().get('/topics/' + id + '/delete', '', function(err, data) {
      return _errorOrData(err, data, callback);
    }); 
  },

  /**
   * Edit a topic
   * User must be creator of the topic or a group admin
   * @param {Number} id Topic id
   * @param {String} name New topic name
   * @param {Function} callback Callback function
   */ 
  editTopic : function(id, name, callback) {
    if(!id || !name) {
      return callback(_err('editTopic requires a topic id and a new topic name'));
    }

    var request = 'name=' + name;

    _conn().get('/topics/' + id + '/edit', request, function(err, data) {
      return _errorOrData(err, data, callback);
    }); 
  },

  /**
   * Track or mute a topic
   * @param {Number} id Topic id
   * @param {Function} callback Callback function
   */ 
  trackTopic : function(id, callback) {
    if(!id) {
      return callback(_err('trackTopic requires a topic id'));
    }

    _conn().get('/topics/' + id + '/track', '', function(err, data) {
      return _errorOrData(err, data, callback);
    }); 
  },

  /**
   * Mark all messages in a topic as read
   * @param {Number} id Topic id
   * @param {Function} callback Callback functions
   */ 
  markTopicRead : function(id, callback) {
    if(!id) {
      return callback(_err('markTopicRead requires a topic id'));
    }

    _conn().get('/topics/' + id + '/mark_read', '', function(err, data) {
      return _errorOrData(err, data, callback);
    }); 
  },

  /**
   * Get latest messages in a topic
   * @param {Number} id Topic id
   * @param {Number} until Until id, use to paginate
   * @param {Boolean} markread Mark as read, set to false to leave fetched messages unread
   * @param {Function} callback Callback function
   */ 
  getTopicMessages : function(id, until, markread, callback) {
    if(!id) {
      return callback(_err('getTopicMessages requires a topic id'));
    }

    var request = ['until_id=', until || '', '&',
                  'mark_read=', markread || ''].join('');
  
    _conn().get('/topics/' + id + '/messages', request, function(err, data) {
      return _errorOrData(err, data, callback);
    });
  },

  createMessage : function(id, message, pasted, callback) {
    if(!id || !message) {
      return callback(_err('createMessage requires topic id and message text'));
    }

    var request = ['message=', message, '&',
                   'pasted=', pasted || ''].join('');

    _conn().get('/topics/' + id + '/messages/create', request, function(err, data) {
      return _errorOrData(err, data, callback);
    });
  }

  
};

exports.Nodevore = Nodevore;
