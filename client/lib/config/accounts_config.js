if (Meteor.isClient) {
	Meteor.subscribe('allUsers');

  Meteor.subscribe('Posts')
  Meteor.subscribe("files")
  Meteor.subscribe("data")
  Meteor.subscribe("doctor");
  Meteor.subscribe("Topics");
  Meteor.subscribe("Messages");

  Meteor.call("returnDoctorUsers", function(error, result){
    if(error){
      console.log("error from returnDoctorUsers: ", error);
    } else {
      Session.set("adminUsers", result);
    }
  });
}