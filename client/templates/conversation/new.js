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
          filter: {$or: [{ 'profile.type': "advocate" }, {'profile.type': "doctor"} ]},
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
    console.log("id: "+fromId);

    var data = {
      name: name,
      message: message,
      toUser: toUser,
      toId: toId,
      fromId: fromId
    }
    
    // console.log("to: " + toId);
    // console.log("from: " + fromId);
    // console.log(name);
    // console.log(message);
    Meteor.call('addToMessageList', data, function(error) {
      if (error) {
        console.log(error);
        return alert(error.reason);
      }else{
        Router.go('/conversation/' + toId);
      }
    });  
   }
});