if (Meteor.isClient) {
	Meteor.subscribe('allUsers');

  Meteor.subscribe('Posts')
  Meteor.subscribe("files")
  Meteor.subscribe("data")
}