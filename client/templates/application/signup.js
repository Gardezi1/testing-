Template.signup.events({
  'submit form': function(e) {
    e.preventDefault()
    var  user = {
        email: $("#emailAddress").val().toLowerCase(),
        password: $("#userPassword").val(),
        name: $("#userName").val(),
        phone: $("#userPhone").val(),
        type: $( "#userType option:selected" ).val(),
        betaToken: Session.get('betaToken')
      };

    Meteor.call('validateBetaToken', user, function(error) {
      if (error) {
        console.log(error);
        return alert(error.reason);
      } else {
          if(user.type == "advocate"){
            return Meteor.loginWithPassword(user.email, user.password, function(error) {
              if (error) {
                console.log(error);
                // return alert(error.reason);
              } else {
                inviteUid = Session.get('inviteOwnerId')
                if(inviteUid){
                  Meteor.users.update(Meteor.userId(), { $addToSet: { "profile.following": inviteUid}});
                  Meteor.users.update(inviteUid, { $addToSet: { "profile.followers": Meteor.userId()}});
                  Meteor.users.update(Meteor.userId(), {$push: { "profile.secondCircle": inviteUid} });
                }
                return Router.go('/');
              }
            });
          }
          else
            if(user.type == "doctor"){
                sAlert.error('Successful Registration! Please check your email and follow the instructions.', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
            }
      }
    });

  }
});

Template.signup.onRendered(function() {
  $('select').material_select();
});

$(document).ready(function(){
   $('ul.tabs').tabs('select_tab', 'tab_id');
 });
