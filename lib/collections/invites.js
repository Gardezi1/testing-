Invites = new Meteor.Collection('invites');

Invites.allow({
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