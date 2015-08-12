Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});

Meteor.publish("userSettings", function () {
  return Meteor.users.find({_id: this.userId});
});

Meteor.publish(null, function (){
  return Meteor.roles.find({});
});