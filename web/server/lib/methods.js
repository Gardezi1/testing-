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
  registerAdvocate: function(user){
    check(user, {email: String, password: String, firstName: String, lastName: String, phone: String});
    if (!user.firstName)
       throw new Meteor.Error(422, 'Please include a first name.');

    if (!user.lastName)
      throw new Meteor.Error(422, 'Please include a last name.');

    if (!user.phone)
      throw new Meteor.Error(422, 'Please include phone.');

    if (!user.email)
      throw new Meteor.Error(422, 'Please include an email.');

    if (!user.password)
      throw new Meteor.Error(422, 'Please include password.');

    if (!Meteor.users.findOne({"emails.address": user.email})) {
      id  =  Accounts.createUser({
              email: user.email,
              password: user.password,
              profile: { firstName: user.firstName, lastName: user.lastName, phone: user.phone, type: "advocate"}
            });

      Roles.addUsersToRoles(id, [ROLES.Advocate]);
      
      Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return "Dear " + user.profile.firstName + ",\n\n" +
         'Here is your 4 digit verification code: ' + user.profile.code +'.  Click on the link to verify code: ' + url +
            "\n\n" + "Thanks";
      };
      Accounts.sendVerificationEmail(id);
      u =  Meteor.users.findOne({_id: id});
      Meteor.call('sendTwilioMessage',u, u.profile.phone, u.profile.code);
    } 
    else 
    {
      throw new Meteor.Error(403, "Email address is already registered");
    }

  },
  registerDoctor: function(user){
    check(user, {email: String, password: String, firstName: String, lastName: String, phone: String, speciality: String});
    if (!user.firstName)
       throw new Meteor.Error(422, 'Please include a first name.');

    if (!user.lastName)
      throw new Meteor.Error(422, 'Please include a last name.');

    if (!user.phone)
      throw new Meteor.Error(422, 'Please include phone.');

    if (!user.email)
      throw new Meteor.Error(422, 'Please include an email.');

    if (!user.speciality)
      throw new Meteor.Error(422, 'Please include your speciality.');

    if (!user.password)
      throw new Meteor.Error(422, 'Please include password.');

    if (!Meteor.users.findOne({"emails.address": user.email})) {
      id  =  Accounts.createUser({
              email: user.email,
              password: user.password,
              profile: { firstName: user.firstName, lastName: user.lastName, phone: user.phone, speciality: user.speciality, type: "doctor"}
            });

      Roles.addUsersToRoles(id, [ROLES.Doctor]);
    } 
    else 
    {
      throw new Meteor.Error(403, "Email address is already registered");
    }

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
      body: "Dear " + user.profile.firstName + ",\n\n" +'Your 4 pin code is: '+code
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
        console.log(err)
      }
    });
  },
  validateBetaToken: function(user) {
    var id, testInvite;
    check(user, {email: String, password: String, betaToken: String, fName: String, lName: String, phone: String, type: String});
    if (!user.fName)
       throw new Meteor.Error(422, 'Please include a first name.');

    if (!user.lName)
      throw new Meteor.Error(422, 'Please include a last name.');

    if (!user.email)
      throw new Meteor.Error(422, 'Please include an email.');

    if (!user.phone)
      throw new Meteor.Error(422, 'Please include your phone');

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
        profile: { firstName: user.fName, lastName: user.lName, phone: user.phone, type: user.type }
      });
      if(user.type == "doctor"){
        Meteor.users.update(id, {$set: {"profile.approve": false}});
        inviteUid = ServerSession.get("inviteId");
        if(Meteor.users.findOne({_id: inviteUid}).profile.type != "advocate"){
          Meteor.users.update(id, { $addToSet: { "profile.following": inviteUid}});
          Meteor.users.update(inviteUid, { $addToSet: { "profile.followers": id}});
        }
        Roles.addUsersToRoles(id, [ROLES.Doctor]);
      }else{
        Roles.addUsersToRoles(id, [ROLES.Advocate]);
        Meteor.users.update(id, {$set: {"emails.0.verified" :true}});
        u =  Meteor.users.findOne({_id: id});
        Meteor.call('sendTwilioMessage',u, u.profile.phone, u.profile.code);
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
    // var temp = Messages.find({$and: [{ $and: [  {to: data.fromId}, { from: data.fromId} ]  },{ read:false }] }).fetch();
    // console.log(temp);
    // for(var i = 0 ; i <temp.length; i++)
    // {
    //   Messages.update(temp[i]._id, {$set: {read: true}});
    // }
    id = Messages.insert({'name':data.name ,'from':data.fromId,'to':data.toId, 'body': data.message, 'conversationId': convId, 'read': false}, function(error) {
      if (error) {
        return console.log(error);
      }
    }); 
  },
  removeUser: function(id){
    Meteor.users.remove({"_id":id});
  },
  updateEmail: function(email){
    Meteor.users.update(Meteor.userId(), {$set: {"emails.0.address" :email}});
  },
  acceptUser: function(id, email){
    Meteor.users.update(id, {$set: {"profile.approve" :true}});
    Accounts.sendVerificationEmail(id, email);
  },
  readMessages: function(sender, receiver){
    console.log(sender);
    console.log(receiver);
    var temp = Messages.find({$and: [{ $and: [  {to: receiver}, { from: sender} ]  },{ read:false }] }).fetch();
    console.log(temp);
    for(var i = 0 ; i <temp.length; i++)
    {
      Messages.update(temp[i]._id, {$set: {read: true}});
    }
  },
  locationSpecification :function(address)
  {
    Meteor.users.update(Meteor.userId(), {$set: {"profile.address": address}});
    var geo = new GeoCoder();
    var result = geo.geocode(address);
   // Meteor.users.update(Meteor.userId(), {$set: {"profile.state": result[0].state}});
    Meteor.users.update(Meteor.userId(), {$set: {"profile.city": result[0].city}});
    Meteor.users.update(Meteor.userId(), {$set: {"profile.country": result[0].country}});
    var lat =  parseFloat(result[0].latitude);
    var lon =  parseFloat(result[0].longitude);
    
     var obj =  {};
     obj.type = "Point";
     obj.coordinates = [ lon, lat ]

     Meteor.users.update(Meteor.userId(), {$set: {"profile.location": obj}});

    Meteor.users.update(Meteor.userId(), {$set: {"profile.state": result[0].state}});
    return result;
  },
  rejectUser: function(id, email){
    if(id){
      Meteor.users.update(id, {$set: {"profile.approve": true}});
      user = Meteor.users.findOne({_id: id});
      Email.send({
        to: email,
        from: "medcircle.staging@gmail.com",
        subject: "Request Rejected",
        text: "Dear "+user.profile.firstName+",\n\n" +
              'Sorry, you got rejected. ' +
              "\n\n" + "Thanks"
      });
      Meteor.users.remove({_id:id});
    }
  },
  storeCoordinates: function(id, lat1 ,lon1){
    // check(lat1, Match.Any);
    // check(lon1, Match.Any);
    // var lat = ServerSession.get('latt');
    // var lat1 = parseFloat(lat);
    // var lon = ServerSession.get('lonn');
    // var lon1 = parseFloat(lon);
    if((lat1 != undefined) && (lon1 != undefined)){
      Meteor.users.update(id, {$set: {"profile.lat": lat1}});
      Meteor.users.update(id, {$set: {"profile.lon": lon1}});
    }
  }
});
