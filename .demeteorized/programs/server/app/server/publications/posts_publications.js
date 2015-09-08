(function(){Meteor.publish('Posts', function(){
  var currentUserId = this.userId;

  if(currentUserId){
    following_list = Meteor.users.findOne({_id:this.userId}).profile.following;
    if(following_list  == undefined || following_list.length < 0){
      Meteor.users.update(this.userId, {$push: { "profile.following": currentUserId} });
      following_list = Meteor.users.findOne({_id:this.userId}).profile.following;
    }
    if(Roles.userIsInRole(currentUserId, [ROLES.Advocate])){
      first_circle = Meteor.users.findOne({_id:currentUserId}).profile.firstCircle;
      second_circle = Meteor.users.findOne({_id:currentUserId}).profile.secondCircle;
      if((first_circle  == undefined || first_circle.length < 0) && (second_circle  == undefined || second_circle.length < 0)){
        return Posts.find({authorId: { $in: following_list}} , {sort: {createdAt: -1}});
      }
      else
        if(first_circle  == undefined || first_circle.length < 0){
          return Posts.find({$and: [{authorId: { $in: second_circle}},{postTo: '2nd'}] }, {sort: {createdAt: -1}});
      }
      else
        if(second_circle  == undefined || second_circle.length < 0){
          return Posts.find({$or: [ {$and: [{authorId: { $in: first_circle}},{postTo: '1st'}] } ]}, {sort: {createdAt: -1}});
      }
      else{
        return Posts.find({$or: [ {$and: [{authorId: { $in: first_circle}},{postTo: '1st'}] }, {$and: [{authorId: { $in: second_circle}},{postTo: '2nd'}] }, {$and: [{authorId: { $in: following_list}},{postTo: 'all'}] } ]}, {sort: {createdAt: -1}});
      }
    }
    else{
      return Posts.find({authorId: { $in: following_list}}, {sort: {createdAt: -1}});
    }
  }
  
  
});

Meteor.publish('files', function() {
  return Files.find();
});

Meteor.publish('data', function() {
  return Data.find();
});

Meteor.publish('Topics', function() {
  return Topics.find();
});

// Meteor.users._ensureIndex({ "addressOne": "2dsphere"});

Meteor.publish('invites', function() {
  if(Roles.userIsInRole(this.userId, [ROLES.Admin, ROLES.Doctor])) {
    return Invites.find({}, {
      fields: {
        "_id": 1,
        "email": 1,
        "token": 1,
        "accountCreated": 1
      }
    });
  }
});

Meteor.publish("Messages", function () {
  return Messages.find();
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('followerTopics', function() {
  return FollowerTopics.find();
});

})();
