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


Meteor.methods({
  returnAdminUsers: function(){
    var results = [];

    var results = Roles.getUsersInRole(['doctor']).map(function(user, index, originalCursor){
      // console.log(user);
      var result = {
        _id: user._id,
        emails: user.emails,
        name: user.profile.name,
        pictureId: user.profile.picture,
        city: user.profile.city,
        state: user.profile.state,
        createdAt: user.createdAt,
        roles: user.roles
      };
      // console.log("result: ", result);
      return result;
    });

    // console.log("all results - this needs to get returned: ", results);

    return results;
  },
  addToFollowing: function(userId) {
    Meteor.users.update(Meteor.userId(), { $addToSet: { "profile.following": userId}});
  },
  removeFromFollowing: function(userId) {
    Meteor.users.update(Meteor.userId(), { $pull: { "profile.following": userId}});
  }

});