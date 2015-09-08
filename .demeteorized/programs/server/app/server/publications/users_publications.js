(function(){Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});

Meteor.publish("userSettings", function () {
  return Meteor.users.find({_id: this.userId});
});

// Meteor.publish("followerUsers", function () {
//   users =  Meteor.users.findOne({_id: this.userId}).profile.followers;
//   return Meteor.users.find({_id: { $in: users}});
// });

Meteor.publish("doctorUsers", function () {
  return Meteor.users.find({$and: [{"profile.type": "doctor"}, {"profile.approve": true} ]});
});

Meteor.publish(null, function (){
  return Meteor.roles.find({});
});

})();
