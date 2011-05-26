
var methods = {
  verifyAccount : {
    path : '/account/verify'
  },
  getGroup : {
    path : '/groups/:groupid',
    params : {
      groupid : { required : true, postdata : false }
    }
  },
  createGroup : {
    path : '/groups/create',
    method : 'post',
    params : {
      name : { required : true, postdata : true },
      kind : { required : true, postdata : true },
      description : { required : false, postdata : true },
      slug : { required : false, postdata : true }
    }
  },
  markRead : {
    path : '/account/mark_read',
    method : 'post'
  },
  getOnline : {
    path : '/account/online'
  },
  getMentions : {
    path : '/account/mentions'
  },
  getGroups : {
    path : '/groups'
  },
  getGroupMembers : {
    path : '/groups/:id/members',
    params : {
      id : { required : true },
      filter : { required : false, postdata : true }
    }
  },
  joinPublicGroup : {
    path : '/groups/:id/join',
    method : 'post',
    params : {
      id : { required : true }
    }
  },
  joinPrivateGroup : {
    path : '/groups/:id/request',
    method : 'post',
    params : {
      id : { required : true }
    }
  },
  leaveGroup : {
    path : '/groups/:id/leave',
    method : 'post',
    params : {
      id : { required : true }
    }
  },
  getGroupOnline : {
    path : '/groups/:id/online',
    params : {
      id : { required : true }
    }
  },
  getGroupTopics : {
    path : '/groups/:id/topics',
    params : {
      id : { required : true }
    }
  },
  createTopic : {
    path : '/groups/:id/topics/create',
    params : {
      id : { required : true },
      name : { required : true, postdata : true }
    },
    method : 'post'
  },
  trackGroup : {
    path : '/groups/:id/track',
    method : 'post',
    params : {
      id : { required : true }
    }
  },
  markGroupRead : {
    path : '/groups/:id/mark_read',
    method : 'post',
    params : {
      id : { required : true }
    }
  },
  getTopic : {
    path : '/topics/:id',
    params : {
      id : { required : true }
    }
  },
  deleteTopic : {
    path : '/topics/:id/delete',
    method : 'post',
    params : {
     id : { required : true }
    }
  },
  editTopic : {
    path : '/topics/:id/edit',
    method : 'post',
    params : {
      id : { required : true },
      name : { required : true, postdata : true }
    }
  },
  trackTopic : {
    path : '/topics/:id/track',
    method : 'post',
    params : {
      id : { required : true }      
    }
  },
  markTopicRead : {
    path : '/topics/:id/mark_read',
    method : 'post',
    params : { 
      id : { required : true }
    }
  },
  getTopicMessages : {
    path : '/topics/:id/messages',
    params : {
      id : { required : true },
      until_id : { required : false, postdata : true },
      mark_read : { required : false, postdata : true }
    }
  },
  createMessage : {
    path : '/topics/:topic_id/messages/create',
    method : 'post', 
    params : {
      topic_id : { required : true },
      message : { required : true , postdata : true },
      pasted : { required : true, postdata : true }
    }
  },
  starMessage : {
    path : '/messages/:id/star',
    method : 'post',
    params : {
      id : { required : true }
    }
  },
  deleteMessage : {
    path : '/messages/:id/delete',
    method : 'post',
    params : {
      id : { required : true }
    }
  },
  getUserById : {
    path : '/users/:id',
    params : {
      id : { required : true }
    }
  },
  getUserByName : {
    path : '/users/username/:username',
    params : {
      username : { required : true }
    }
  },
  getUserMessages : {
    path : '/messages',
    params : {
      until_id : { required : false, postdata : true }
    }
  },
  getMessagesToUser : {
    path : '/messages/:id',
    params : {
      id : { required : true }
    }
  },
  createMessage : {
    path : '/messages/:to_user/create',
    method : 'post',
    params : {
      to_user : { required : true },
      message : { required : true, postdata : true }
    }
  },
  starMessage : {
    path : '/messages/message/:id/star',
    method : 'post',
    params : {
      id : { required : true }
    }
  },
  deleteMessage : {
    path : '/messages/message/:id/delete',
    method : 'post',
    params : {
      id : { required : true }
    }
  },

  discoverUserGroups : {
    path : '/groups/discover/friend'
  },
  discoverCategories : {
    path : '/groups/discover/category'
  },
  discoverGroupsByCategory : {
    path : '/groups/discover/category/:category_slug',
    params : {
      category_slug : { required : true }
    }
  },
  searchGroups : {
    path : '/groups/discover/search',
    params : {
      q : { required : true, postdata : true }
    }
  },
  listGroupsSorted : {
    path : '/groups/discover/explore/:sort',
    params : {
      sort : { required : true }
    }
  },
  getTrending : {
    path : '/groups/discover/trending'
  },
  live : {
    path : '/live',
    method : 'live',
    params : {
      group_id : { required : false, postdata : true },
      cursor : { required : false, postdata : true },
      topic_id : { required : false, postdata : true },
      immediate : { required : false, postdata : true}
    }
  }


};

exports.api = methods;
