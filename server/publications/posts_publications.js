Meteor.publish("Posts", function () {
  return Posts.find();
});

Meteor.publish('files', function() {
  return Files.find();
});