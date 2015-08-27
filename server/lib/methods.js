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
    id = Notifications.insert({'userId':userId, 'startedFollowing': true, 'read': false, 'followerId': Meteor.userId()}, function(error) {
      if (error) {
        return console.log(error);
      }
    }); 

    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Advocate])){
      Meteor.users.update(Meteor.userId(), {$push: { "profile.secondCircle": userId} });
    }

    topics = Meteor.users.findOne({_id: userId}).profile.topics;
    FollowerTopics.insert({'topicOwnerId': Meteor.userId(), 'topicFollowerId': userId, 'topics': topics}, function(error) {
      if (error) {
        return console.log(error);
      }
    });
  },
  removeFromFollowing: function(userId) {
    Meteor.users.update(Meteor.userId(), { $pull: { "profile.following": userId}});
    Meteor.users.update(userId, { $pull: { "profile.followers": Meteor.userId()}});
    id = Notifications.insert({'userId':userId, 'startedFollowing': false, 'read': false, 'followerId': Meteor.userId()}, function(error) {
      if (error) {
        return console.log(error);
      }
    }); 
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Advocate])){
      Meteor.users.update(Meteor.userId(), {$pull: { "profile.firstCircle": userId} });
      Meteor.users.update(Meteor.userId(), {$pull: { "profile.secondCircle": userId} });
    }
    FollowerTopics.remove({_id: FollowerTopics.findOne({'topicOwnerId': Meteor.userId(), 'topicFollowerId': userId})._id});
  },
  sendEmailInvite: function (invitee, from, subject, text, token, inviteId) {
    check([invitee.email, from, subject, text, token, inviteId], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    ServerSession.set("ifInvited", "true");
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
    twilio = Twilio('AC6bc5064c8ae8ad8cc215bea092304ade', '210dd15e83d373b9af0d732f62573012');
    twilio.sendSms({
      to: phone,
      from: '+13235242360',
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
    twilio = Twilio('AC6bc5064c8ae8ad8cc215bea092304ade', '210dd15e83d373b9af0d732f62573012');
    twilio.sendSms({
      to: phone,
      from: '+13235242360',
      body: body
    }, function(err, responseData) {
      if (!err) {
        // console.log(responseData.from);
        // console.log(responseData.body);

      }
      else{
        alert(err);
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
        Meteor.users.update(id, {$set: {"profile.approve": false}});
        inviteUid = ServerSession.get("inviteId");
        Meteor.users.update(id, { $addToSet: { "profile.following": inviteUid}});
        Meteor.users.update(inviteUid, { $addToSet: { "profile.followers": id}});
        Roles.addUsersToRoles(id, [ROLES.Doctor]);
      }else{
        Roles.addUsersToRoles(id, [ROLES.Advocate]);
        Meteor.users.update(id, {$set: {"emails.0.verified" :true}});
      }
      
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
  addToMessageList: function(data, convId){

    id = Messages.insert({'name':data.name ,'from':data.fromId,'to':data.toId, 'body': data.message, 'conversationId': convId, 'read': false}, function(error) {
      if (error) {
        return console.log(error);
      }
    }); 
  },
  updateEmail: function(email){
    Meteor.users.update(Meteor.userId(), {$set: {"emails.0.address" :email}});
  },
  acceptUser: function(id, email){
    Meteor.users.update(id, {$set: {"profile.approve" :true}});
    Accounts.sendVerificationEmail(id, email);
  },
  rejectUser: function(id, email){
    if(id){
      Meteor.users.update(id, {$set: {"profile.approve": true}});
      user = Meteor.users.findOne({_id: id});
      Email.send({
        to: email,
        from: "medcircle.staging@gmail.com",
        subject: "Request Rejected",
        text: "Dear "+user.profile.name+",\n\n" +
              'Sorry, you got rejected. ' +
              "\n\n" + "Thanks"
      });
      Meteor.users.remove({_id:id});
    }
  }
});