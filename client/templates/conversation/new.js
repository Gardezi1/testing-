Template.startConversation.helpers({
  settings: function() {
    return {
      position: "top",
      limit: 3,
      rules: [
        {
          // token: '@',
          collection: Meteor.users,
          field: 'profile.name',
          template: Template.userPill
        }
      ]
    };
  }
});

Template.startConversation.events({  
  'click #send_message_to_advo': function(e) {
    name = $("#advocate_name").val();
    message = $("#advo_message").val();
    toUser = Meteor.users.findOne({"profile.name": name});
    toId = toUser._id;
    fromId = Meteor.userId();
    console.log("to: " + toId);
    console.log("from: " + fromId);
    console.log(name);
    console.log(message);
    Messages.insert({'name':name ,'from':fromId,'to':toId, 'body': message});
   }
});