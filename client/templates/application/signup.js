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
        return Meteor.loginWithPassword(user.email, user.password, function(error) {
          if (error) {
            console.log(error);
            return alert(error.reason);
          } else {
            inviteUid = Session.get('inviteOwnerId')
            if(inviteUid){
              Meteor.users.update(Meteor.userId(), { $addToSet: { "profile.following": inviteUid}});
              if(user.type == "advocate"){
                Meteor.users.update(Meteor.userId(), {$set: { "profile.doctorCircle": "2nd"}});
              }
            }   
            return Router.go('/');
          }
        });
      }
    });

  }
});