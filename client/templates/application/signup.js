Template.signup.events({
  'submit .advocate-sign-up-form': function(e) {
    e.preventDefault()
    var  user = {
      fName: $("#advo-first-name").val(),
      lName: $("#advo-last-name").val(),
      email: $("#advocateEmail").val().toLowerCase(),
      password: $("#advocatePassword").val(),
      phone: $("#advocatePhone").val(),
      type: "advocate",
      betaToken: Session.get('betaToken')
    };

    Meteor.call('validateBetaToken', user, function(error) {
      if (error) {
        sAlert.error(error.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
        console.log(error);
      } else {
          return Meteor.loginWithPassword(user.email, user.password, function(error) {
            if (error) {
              console.log(error);
              // return alert(error.reason);
            } else {
              inviteUid = Session.get('inviteOwnerId')
              if(inviteUid){
                Meteor.users.update(Meteor.userId(), { $addToSet: { "profile.following": inviteUid}});
                Meteor.users.update(inviteUid, { $addToSet: { "profile.followers": Meteor.userId()}});
                Meteor.users.update(Meteor.userId(), {$push: { "profile.firstCircle": inviteUid} });
              }   
              return Router.go('/');
            }
          });
      }
    });
  },
  'submit .doctor-sign-up-form': function(e) {
    e.preventDefault()
    var  user = {
      fName: $("#doc-first-name").val(),
      lName: $("#doc-last-name").val(),
      email: $("#doctorEmail").val().toLowerCase(),
      password: $("#doctorPassword").val(),
      phone: $("#doctorPhone").val(),
      type: "doctor",
      betaToken: Session.get('betaToken')
    };

    Meteor.call('validateBetaToken', user, function(error) {
      if (error) {
        sAlert.error(error.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
        console.log(error);
      } else {
          sAlert.error('You will be sent a verification link to complete your registration process in your email after Medcircle administrator approves it.', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
      }
    });
  }
});

Template.signup.onRendered(function() {
  $('select').material_select();
  //$('ul.tabs').tabs();
});

Template.signup.onRendered(function() {
  $('ul.tabs').tabs();
});