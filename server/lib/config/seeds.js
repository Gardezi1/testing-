if (Meteor.isServer) {

  if (Meteor.users.find().count() === 0) {
    var admins = [
      { name: "Admin", email: "test@kwanso.com", password: "123456", phone: '12345678', roles: ['admin'] }
    ];
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
      return "Dear " + user.profile.name + ",\n\n" +
        'To verify your account email, simply click the link below. ' + url +
        "\n\n" + "Thanks";
    };
    _.each(admins, function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: { name: user.name, phone: user.phone }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles);
      }
      Meteor.users.update(id, {$set: {"emails.0.verified" :true}});
    });
  }

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
      twilio = Twilio('ACc4dc855ca070a1db07f086566f561a30', 'a6ded70636ffb413789396296b12e449');
      twilio.sendSms({
        to: ph,
        from: '+14028755543',
        body: "Dear " + user.profile.name + ",\n\n" +'Your 4 pin code is: '+code
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

  Accounts.onLogin(function (info) {
    var user = info.user;

    if(user.profile.type === "doctor"){
      Roles.addUsersToRoles(user, [ROLES.Doctor])
    }
    else
      if(user.profile.type === "advocate"){
        Roles.addUsersToRoles(user, [ROLES.Advocate])
        }
    return user;
  });

}
