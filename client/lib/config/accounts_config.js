if (Meteor.isClient) {
	Meteor.subscribe('allUsers');

  Meteor.subscribe('Posts')
  Meteor.subscribe("files")
  Meteor.subscribe("data")
  Meteor.subscribe("doctor");
  Meteor.subscribe("Topics");

  Meteor.call("returnAdminUsers", function(error, result){
    if(error){
      console.log("error from returnAdminUsers: ", error);
    } else {
      Session.set("adminUsers", result);
    }
  });
}