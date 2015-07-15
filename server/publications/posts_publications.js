Meteor.publish('Posts', function(){
  var currentUserId = this.userId;
  if(currentUserId){
    following_list = Meteor.users.findOne({_id:this.userId}).profile.following;
    if(following_list  == undefined || following_list.length < 0){
      Meteor.users.update(this.userId, {$push: { "profile.following": currentUserId} });
      following_list = Meteor.users.findOne({_id:this.userId}).profile.following;
    }
  return Posts.find({authorId: { $in: following_list}});
  }
  else{
    return Posts.find({authorId: currentUserId});
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