Template.inviteAdvocate.events({
  'click #invite-advocate-by-email': function (e) {
    mail = $("#user-email").val();
    mails_array = mail.split(',');
    uid = Meteor.userId();
    for(i=0; i < mails_array.length; i++){
      mails_array[i] = mails_array[i].toLowerCase().trim();
      var invitee = {
        email: mails_array[i]
      };

      var emailExists = Invites.findOne({"email": invitee.email});

      if (emailExists) {
        sAlert.error('Email '+ invitee.email +' already invited.  :-/', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
      } else {
        id = Invites.insert(invitee, function(error) {
          if (error) {
            return console.log(error);
          }
          else{
            sAlert.error('Invitation has been sent successfully', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
          }
        });  
        token = Random.hexString(10);
        url = Meteor.absoluteUrl();
        url = url + 'sign-up/' + token + "-" + uid;
        subject = 'Invitation';
        text = "Hi there!  You've been invited to the MedCircle. To get started, click the link below to create your account.\n\n"
         + url 
         +"\n\n" + "Thanks"; 

        Meteor.call('sendEmailInvite',
          invitee,
          'medcircle.staging@gmail.com',
          subject,
          text,
          token,
          id
        );
      }
    }    
  },
  'click #invite-advocate-by-phone': function (e) {
    phone = $("#user-phone").val();
    phone_array = phone.split(',');
    uid = Meteor.userId();
    console.log(phone_array);
    for(k=0; k < phone_array.length; k++){
      console.log(phone_array[k]);
      phone_array[k] = phone_array[k].trim();
      user = Meteor.users.findOne({"profile.phone":phone_array[k]})

      if (user) {
        sAlert.error('Phone '+ phone_array[k] +' already invited.  :-/', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
      } else{
        token = Random.hexString(10);
        url = Meteor.absoluteUrl();
        url = url + 'sign-up/' + token + "-" + uid;
        body = "Hi,  You've been invited to the MedCircle. To get started, click the link below:\n\n"
         + url 
         +"\n\n";

         Meteor.call("sendTwilioInvite", phone_array[k], body, function(error, result){
          if(error){
            sAlert.error(error.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
            console.log("error from sendTwilioInvite: ", error);
          } else {
            sAlert.error('Invitation has been sent successfully', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
          }
        });
      }
    }
  }

});