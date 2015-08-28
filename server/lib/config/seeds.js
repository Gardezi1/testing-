if (Meteor.isServer) {
  Meteor.startup(function(){
    if(Topics.find().count() == 0){
      ["Depression", "ADHD", "Bipolar Disorder"].forEach(function(topic){
        Topics.insert({name:topic})
      });
    }
  });

  if (!Meteor.users.findOne({"emails.address": "admin@medcircle.com"})) {
    var admins = [
      { firstName: "medcircle", email: "admin@medcircle.com", password: "medcircle123", phone: '92321434343', code_verified: true, code_verified: true, type: "admin", roles: ['admin'] }
    ];
    
    _.each(admins, function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: { firstName: user.firstName, phone: user.phone, type: user.type, code_verified: user.code_verified }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles);
      }

      Meteor.users.update(id, {$set: {"emails.0.verified" :true}});
      // Meteor.users.update(id, {$set: {"profile.code_verified" :true}});
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
      user.profile.firstCircle = [];
      user.profile.firstCircle.push(admin_user);
      user.profile.secondCircle = [];
      user.profile.secondCircle.push(admin_user);
      var ph = user.profile.phone
      var code = Math.floor(Math.random()*9000) + 1000;
      user.profile.code = code;


      // Meteor.setTimeout(function() {
      //   Accounts.sendVerificationEmail(user._id);
      // }, 10 * 1000);

      // if(ServerSession.get("ifInvited") === "true"){
      //    code_subject = "Hi " + user.profile.firstName + ",\n\n" + 'Here is your 4 digit verification code: ' + code +'.'+
      //       "\n\n" + "Thanks";
      //   Meteor.call('sendCodeToEmail',user, user.emails[0].address, code_subject, code);
      // }

      // Meteor.call('sendTwilioMessage',user, ph, code);
    }
    else
      if(user.profile.type === 'doctor'){
        user.profile.approve = false;

        Accounts.emailTemplates.verifyEmail.text = function(user, url) {
          return "Dear " + user.profile.firstName + ",\n\n" +
            'To verify your account email, simply click the link below. ' + url +
            "\n\n" + "Thanks";
        };
      }

    return user;
    }
  });

  Accounts.validateLoginAttempt(function(attemptInfo) {
    if (attemptInfo.type == 'resume') return true;

    if (attemptInfo.methodName == 'createUser') return false;

    if (attemptInfo.methodName == 'login' && attemptInfo.allowed) {
        var verified = false;
        var email = attemptInfo.methodArguments[0].user.email;
        attemptInfo.user.emails.forEach(function(value, index) {
            if (email == value.address && value.verified) verified = true;
        });
        if (!verified){
          if(attemptInfo.user.profile.type == "doctor"){
            throw new Meteor.Error(403, 'You will be sent a verification link to complete your registration process in you email after Medcircle administrator approves it.');  
          }
          else{
            throw new Meteor.Error(403, 'Successful Registration! Please check your email and follow the instructions.');
          }
        } 
    }

    return true;
});

  Accounts.onLogin(function (info) {
    var user = info.user;

    if(user.profile.type === "admin"){
      topics = Topics.find().fetch();
      topic_list = [];
      var groupedDates = _.groupBy(_.pluck(topics, '_id'));
      _.each(_.values(groupedDates), function(topic) {
        topic_list.push(topic[0]);
      });
      Meteor.users.update(user._id, {$addToSet: {"profile.topics" :{$each: topic_list}}});
    }
    return user;
  });


}
