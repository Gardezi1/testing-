Template.home.onRendered(function() {
  $('ul.tabs').tabs();
});

Template.home.events({
  'submit .advocate-sign-in-form': function(event) {
    event.preventDefault();
    var emailVar = $("#advocateEmail").val();
    var passwordVar = $("#advocatePassword").val();

    Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
      if (err) {
        sAlert.error(err.reason, {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
      } else {
        Router.go('/articles');
      }
    });
  },
  'submit .doctor-sign-in-form': function(event) {
    event.preventDefault();
    var emailVar = $("#doctorEmail").val();
    var passwordVar = $("#doctorPassword").val();

    Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
      if (err) {
        sAlert.error(err.reason, {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
      } else {
        Router.go('/articles');
      }
    });
  }
});