if (Meteor.isServer) {
  Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
  });

  Meteor.publish(null, function (){ 
    return Meteor.roles.find({});
  });
}

var adminUser = Meteor.users.findOne({roles:{$in:["admin"]}});

  // if(!adminUser){
  //   adminUser = Accounts.createUser({
  //     email: "mohsin.rafi@kwanso.com",
  //     password: "admin",
  //     profile: { name: "admin", phone: '12345678' }
  //   });
  //   Roles.addUsersToRoles(adminUser, [ROLES.Admin]);
  // //  Meteor.users.update(adminUser, {$set: {"emails.0.verified" :true}});
  // }

//    // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
// Accounts.emailTemplates.from = 'kwanso <no-reply@kwanso.com>';

// // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
// Accounts.emailTemplates.siteName = 'kwanso';

// // A Function that takes a user object and returns a String for the subject line of the email.
// Accounts.emailTemplates.verifyEmail.subject = function(user) {
//   return 'Confirm Your Email Address';
// };


Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};
  user.profile.code_verified = false;
  
  if(user.profile.type === 'advocate'){
    var ph = user.profile.phone
    var code = Math.floor(Math.random()*9000) + 1000;
    user.profile.code = code;

    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
      return "Dear " + user.profile.name + ",\n\n" +
       'Here is your 4 digit verification code: ' + code +'.  Click on the link to verify code: ' + url +
          "\n\n" + "Thanks";
    };
    // Session.set('phcode', code);
    twilio = Twilio('ACc4dc855ca070a1db07f086566f561a30', 'a6ded70636ffb413789396296b12e449');
    twilio.sendSms({
      to: ph,
      from: '+14028755543',
      body: code
    }, function(err, responseData) { 
      if (!err) { 
        console.log(responseData.from);
        console.log(responseData.body);

      }
      else{
        console.log(err)
      }
    });

  }
  else
    if(user.profile.type === 'doctor'){
      Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return "Dear " + user.profile.name + ",\n\n" +
          'To verify your account email, simply click the link below. ' + url +
          "\n\n" + "Thanks";
      };
    }
  
  return user;
});