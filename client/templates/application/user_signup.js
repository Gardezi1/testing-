Template.userSignup.onRendered(function() {
  $('ul.tabs').tabs();
   if(Session.get("clicker") == "member"){
     $('#member1').click();
   }
   if(Session.get("clicker") == "healthCare"){
      $('#healthCare1').click();
   }
});

Template.userSignup.events({
  'submit .advocate-sign-up-form': function(event) {
    event.preventDefault();
    var user = {
      firstName : $("#advo-first-name").val(),
      lastName : $("#advo-last-name").val(),
      phone : $("#advocatePhone").val(),
      email : $("#advocateEmail").val(),
      password : $("#advocatePassword").val()
    };

    Meteor.call('registerAdvocate', user, function(error) {
      if (error) {
        sAlert.error(error.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
      }
      else{
        sAlert.error("Successful Registration! Please check your email and follow the instructions.", {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});        
      }
    });
  },
  'submit .doctor-sign-up-form': function(event) {
    event.preventDefault();
    var user = {
      firstName : $("#doc-first-name").val(),
      lastName : $("#doc-last-name").val(),
      speciality : $("#doctorSpeciality").val(),
      phone : $("#doctorPhone").val(),
      email : $("#doctorEmail").val(),
      password : $("#doctorPassword").val()
    };

    Meteor.call('registerDoctor', user, function(error) {
      if (error) {
        sAlert.error(error.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
      }
      else{
        sAlert.error("You will be sent a verification link to complete your registration process in your email after Medcircle administrator approves it.", {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
      }
    });
  },
  'click #signInMember':function(){
    Session.set("SignIn","member");
  },
  'click #signInHealthCare':function(){
    Session.set("SignIn","healthCare");
  }
});