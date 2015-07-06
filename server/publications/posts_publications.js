Meteor.publish('Posts', function(){
  var currentUserId = this.userId;
  return Posts.find({authorId: currentUserId})
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
  }

})