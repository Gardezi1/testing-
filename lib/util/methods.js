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
  },
  removeFromFollowing: function(userId) {
    Meteor.users.update(Meteor.userId(), { $pull: { "profile.following": userId}});
    Meteor.users.update(userId, { $pull: { "profile.followers": Meteor.userId()}});
  },
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
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
        console.log(responseData.from);
        console.log(responseData.body);

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
  }

});