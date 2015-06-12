Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});

Meteor.publish(null, function (){
  return Meteor.roles.find({});
});
