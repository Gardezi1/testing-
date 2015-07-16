Template.inviteAdvocate.events({
      'click #invite-advocate-by-email': function (e) {
        mail = $("#user-email").val();
        user = Meteor.users.findOne({"emails.address":mail});
        if(!user){
          sAlert.error('Email does not exist.  :-/', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
        }
        else{
          url = Meteor.absoluteUrl();
          url = url + "join-circle/" + Meteor.userId();
          subject = 'Invitation';
          text = "Hi "+user.profile.name+", Congratulations..! You just receive invitation request."
           + " To accept invitation, simply click the link below:\n\n"
           + url;

          Meteor.call('sendEmail',
              mail,
              'mistertestkwanso@gmail.com',
              subject,
              text);
        }
      },
      'click #invite-advocate-by-phone': function (e) {
        phone = $("#user-phone").val();
        user = Meteor.users.findOne({"profile.phone":phone})
        if(!user){
          sAlert.error('Phone Number does not exist.  :-/', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
        }
        else{
          url = Meteor.absoluteUrl();
          url = url + "join-circle/" + Meteor.userId();
          user = Meteor.user();
          body = "Hi "+user.profile.name+", To join my circle, simply click the link below:\n\n"
           + url;

           Meteor.call('sendTwilioInvite', phone, body);
        }
      }

});