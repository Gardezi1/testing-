if (Meteor.isClient) {
	Meteor.subscribe('allUsers');

  Meteor.subscribe('Posts')
}