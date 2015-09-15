Template.home.onRendered(function() {
  $('ul.tabs').tabs();
});

Template.home.events({
  'submit .advocate-sign-in-form': function(event) {
    event.preventDefault();
    var emailVar = $("#advocateEmail").val();
    var passwordVar = $("#advocatePassword").val();
    user = Meteor.users.findOne({"emails.address": emailVar});
    if(user){
      if(Roles.userIsInRole(user._id, [ROLES.Doctor])){
        sAlert.error("Please use your appropriate tab to login.", {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
      }
      else{
        Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
          if (err) {
            sAlert.error(err.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
          } else {
            Router.go('/articles');
          }
        });
      }
    }
    else{
      Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
        if (err) {
          sAlert.error(err.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
        } else {
          Router.go('/articles');
        }
      });
    }
  },
  'submit .doctor-sign-in-form': function(event) {
    event.preventDefault();
    var emailVar = $("#doctorEmail").val();
    var passwordVar = $("#doctorPassword").val();
    user = Meteor.users.findOne({"emails.address": emailVar});
    if(user){
      if(Roles.userIsInRole(user._id, [ROLES.Advocate])){
        sAlert.error("Please use your appropriate tab to login.", {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
      }
      else{
        Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
          if (err) {
            sAlert.error(err.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
          } else {
            Router.go('/articles');
          }
        });
      }
    }
    else{
      Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
        if (err) {
          sAlert.error(err.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
        } else {
          Router.go('/articles');
        }
      });
    }
  }, 'click #member':function(){
     Session.set("clicker","member");
    //$('#member1').click();
  },
  'click #healthCare':function(){
     Session.set("clicker","healthCare");
  }

});

