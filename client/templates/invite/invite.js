Template.inviteAdvocate.events({
      'click #invite-advocate-by-email': function (e) {
        mail = $("#user-email").val();
        mails_array = mail.split(',');
        for(i=0; i < mails_array.length; i++){
          mails_array[i] = mails_array[i].trim();
          user = Meteor.users.findOne({"emails.address":mails_array[i]});
          if(!user){
            sAlert.error('Email '+ mails_array[i] +' does not exist.  :-/', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
          }
          else{
            url = Meteor.absoluteUrl();
            url = url + "join-circle/" + Meteor.userId();
            subject = 'Invitation';
            text = "Hi "+user.profile.name+", Congratulations..! You just receive invitation request."
             + " To accept invitation, simply click the link below:\n\n"
             + url;

            Meteor.call('sendEmail',
                mails_array[i],
                'mistertestkwanso@gmail.com',
                subject,
                text);
          }
        }
        
      },
      'click #invite-advocate-by-phone': function (e) {
        phone = $("#user-phone").val();
        phone_array = phone.split(',');
        console.log(phone_array);
        for(k=0; k < phone_array.length; k++){
          console.log(phone_array[k]);
          phone_array[k] = phone_array[k].trim();
          user = Meteor.users.findOne({"profile.phone":phone_array[k]})
          if(!user){
            sAlert.error('Phone Number '+ phone_array[k] +' does not exist.  :-/', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
          }
          else{
            url = Meteor.absoluteUrl();
            url = url + "join-circle/" + Meteor.userId();
            user = Meteor.user();
            body = "Hi "+user.profile.name+", To join my circle, simply click the link below:\n\n"
             + url;

             Meteor.call('sendTwilioInvite', phone_array[k], body);
          }
        }
      }

});