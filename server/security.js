Posts.allow({
  insert:function(userId,project){
    return true;
  },
  update:function(userId,project,fields,modifier){
   return true;
  },
  remove:function(userId,project){
    return true;
  },
});

Files.allow({
  insert:function(userId,doc){
    return true;
  },
  update:function(userId,doc){
    return true;
  },
  download:function(userId){
   return true;
  }
});

VideoFiles.allow({
  insert:function(userId,doc){  
    return true;
  },
  update:function(userId,doc){
    return true;
  },
  download:function(userId){
   return true;
  }
});

Data.allow({
  insert:function(userId,doc){
    return true;
  },
  update:function(userId,doc){
    return true;
  },
  download:function(userId){
   return true;
  }
});

Topics.allow({
  insert:function(userId,doc){
    return true;
  },
  update:function(userId,doc){
    return true;
  },
  remove:function(userId,project){
    return true;
  },
});

Notifications.allow({
  insert:function(userId,doc){
    return true;
  },
  update:function(userId,doc){
    return true;
  },
  remove:function(userId,project){
    return true;
  },
});

FollowerTopics.allow({
  insert:function(userId,doc){
    return true;
  },
  update:function(userId,doc){
    return true;
  },
  remove:function(userId,project){
    return true;
  },
});