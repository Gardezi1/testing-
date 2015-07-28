if (Meteor.isServer) {

  if (!Meteor.users.findOne({"emails.address": "admin@medcircle.com"})) {
    var admins = [
      { name: "admin", email: "admin@medcircle.com", password: "medcircle123", phone: '92321434343', roles: ['admin'] }
    ];
    
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

    if(!options || !user) {
      console.log('error creating user');
      return;
    }
    else{
    user.profile = options.profile || {};
    user.profile.code_verified = false;
    var admin_user = Meteor.users.findOne({"emails.address": "admin@medcircle.com"})._id;
    user.profile.following = [];
    user.profile.following.push(admin_user);

    if(user.profile.type === 'advocate'){
      var ph = user.profile.phone
      var code = Math.floor(Math.random()*9000) + 1000;
      user.profile.code = code;

      Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return "Dear " + user.profile.name + ",\n\n" +
         'Here is your 4 digit verification code: ' + code +'.  Click on the link to verify code: ' + url +
            "\n\n" + "Thanks";
      };

      Meteor.call('sendTwilioMessage',user, ph, code);
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
    }
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


  Meteor.startup(function(){
    if(Topics.find().count() == 0){
      ["Topic1", "Topic2", "Topic3", "Topic4", "Topic5", "Topic6", "Topic7", "Topic8", "Topic9", "Topic10", "Topic11", "Topic12"].forEach(function(topic){
        Topics.insert({name:topic})
      });
    }
  });


}
