Meteor.methods({
  returnDoctorUsers: function(){
    var results = [];

    var results = Roles.getUsersInRole(['doctor']).map(function(user, index, originalCursor){
      // console.log(user);
      var result = {
        _id: user._id,
        emails: user.emails,
        name: user.profile.name,
        pictureId: user.profile.picture,
        city: user.profile.city,
        state: user.profile.state,
        createdAt: user.createdAt,
        roles: user.roles
      };
      // console.log("result: ", result);
      return result;
    });

    // console.log("all results - this needs to get returned: ", results);

    return results;
  },
  addToFollowing: function(userId) {
    Meteor.users.update(Meteor.userId(), { $addToSet: { "profile.following": userId}});
    Meteor.users.update(userId, { $addToSet: { "profile.followers": Meteor.userId()}});
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Advocate])){
      Meteor.users.update(Meteor.userId(), {$push: { "profile.secondCircle": userId} });
    }
  },
  removeFromFollowing: function(userId) {
    Meteor.users.update(Meteor.userId(), { $pull: { "profile.following": userId}});
    Meteor.users.update(userId, { $pull: { "profile.followers": Meteor.userId()}});
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Advocate])){
      Meteor.users.update(Meteor.userId(), {$pull: { "profile.firstCircle": userId} });
      Meteor.users.update(Meteor.userId(), {$pull: { "profile.secondCircle": userId} });
    }
  },
  sendEmailInvite: function (invitee, from, subject, text, token, inviteId) {
    check([invitee.email, from, subject, text, token, inviteId], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    ServerSession.set("ifInvited", true);
    Invites.update(inviteId, {
      $set: {
        token: token,
        invited: true,
        accountCreated: false
      }
    }, function(error) {
      if (error) {
        return console.log(error);
      } else {
        return Email.send({
          to: invitee.email,
          from: from,
          subject: subject,
          text: text
        });
      }
    });
  },
  sendCodeToEmail: function(user, email, text ,code){
    Email.send({
      to: email,
      from: "medcircle.staging@gmail.com",
      subject: "Verification Code",
      text: text
    });
},
  sendTwilioMessage: function(user, phone, code){
    twilio = Twilio('ACc4dc855ca070a1db07f086566f561a30', 'a6ded70636ffb413789396296b12e449');
    twilio.sendSms({
      to: phone,
      from: '+14028755543',
      body: "Dear " + user.profile.name + ",\n\n" +'Your 4 pin code is: '+code
    }, function(err, responseData) {
      if (!err) {

      }
      else{
        console.log(err)
      }
    });
  },
  sendTwilioInvite: function(phone, body){
    twilio = Twilio('ACc4dc855ca070a1db07f086566f561a30', 'a6ded70636ffb413789396296b12e449');
    twilio.sendSms({
      to: phone,
      from: '+14028755543',
      body: body
    }, function(err, responseData) {
      if (!err) {
        console.log(responseData.from);
        console.log(responseData.body);

      }
      else{
        console.log(err)
      }
    });
  },
  validateBetaToken: function(user) {
    var id, testInvite;
    check(user, {email: String, password: String, betaToken: String, name: String, phone: String, type: String});
    testInvite = Invites.findOne({
      email: user.email,
      token: user.betaToken
    }, {
      fields: {
        "_id": 1,
        "email": 1,
        "token": 1
      }
    });

    if (!testInvite) {
      throw new Meteor.Error("bad-match", "Hmm, this token doesn't match your email. Try again?");
    } else {
      id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: { name: user.name, phone: user.phone, type: user.type }
      });
      if(user.type == "doctor"){
        Roles.addUsersToRoles(id, [ROLES.Doctor]);
      }else{
        Roles.addUsersToRoles(id, [ROLES.Advocate]);
      }
      Meteor.users.update(id, {$set: {"emails.0.verified" :true}});
      Invites.update(testInvite._id, {
        $set: {
          accountCreated: true
        },
        $unset: {
          token: ""
        }
      });
      return true;
    }
  },
  addToMessageList: function(data){
    id = Messages.insert({'name':data.name ,'from':data.fromId,'to':data.toId, 'body': data.message}, function(error) {
      if (error) {
        return console.log(error);
      }
    }); 
  },
  // groupMessages: function(id){
  //   var pipeline = [
  //     {$group: {_id: "$to", resTime: {$sum: "$resTime"}}}
  //   ];
  //   var result = Messages.aggregate(pipeline);
  // }
});