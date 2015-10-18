Template.startConversation.helpers({
  settings: function() {
    debugger;
    user =  Meteor.users.findOne({_id: Meteor.userId()});
    if(Roles.userIsInRole(user._id, [ROLES.Admin])){
      return {
        position: "top",
        limit: 3,
        rules: [
          {
            // token: '@',
            collection: Meteor.users,
            field: 'profile.firstName',
            // field: 'profile.lastName',
            filter: {$or: [{ 'profile.type': "advocate" }, {'profile.type': "doctor"} ]},
            // filter: {_id: {$in: user.profile.followers}},
            template: Template.userPill
          }
        ]
      };
    }else if(Roles.userIsInRole(user._id, [ROLES.Advocate])){
      return {
        position: "top",
        limit: 3,
        rules: [
          {
            // token: '@',
            collection: Meteor.users,
            field: 'profile.firstName',
            // field: 'profile.lastName',
            filter: {_id: {$in: user.profile.firstCircle}},
            // filter: {_id: {$in: user.profile.followers}},
            template: Template.userPill
          }
        ]
      };
    }
    else{
        return {
        position: "top",
        limit: 3,
        rules: [
          {
            // token: '@',
            collection: Meteor.users,
            field: 'profile.firstName',
            // field: 'profile.lastName',
            // filter: {$or: [{ 'profile.type': "advocate" }, {'profile.type': "doctor"} ]},
            filter: {_id: {$in: user.profile.followers}},
            template: Template.userPill
          }
        ]
      };
    }
  }
});

Template.startConversation.events({  
  'click #send_message_to_advo': function(e) {
    debugger;
    name = $("#advocate_name").val();
    message = $("#advo_message").val();
    if(name && message){
      if(Session.get('startConversationForNotificationUserId') != undefined){
        toUser =  Session.get('startConversationForNotificationUserId');
        toId = toUser;
      }
      else{
        toUser = Meteor.users.findOne({"profile.firstName": name});
        toId = toUser._id;
      }
      fromId = Meteor.userId();
      var data = {
        name: name,
        message: message,
        toUser: toUser,
        toId: toId,
        fromId: fromId
      }
      convId = Random.hexString(10);
      message = Messages.findOne({$or: [ {$and: [{from: data.fromId}, {to: data.toId} ]}, {$and: [{from: data.toId}, {to: data.fromId} ]} ]} , {sort: {createdAt: -1}});
      if(message  != undefined){
        convId = message.conversationId;
      }

      Meteor.call('addToMessageList', data, convId, function(error) {
        if (error) {
          console.log(error);
          return alert(error.reason);
        }else{
          Session.set('startConversationForNotificationUserId',"");
          Session.set('startConversationForNotificationName',"");
          Router.go('/conversation/' + toId);
        }
      }); 
    } 
   }
});

Template.userPill.helpers({
  getImage: function(pid){
    var file = Data.findOne({_id:pid});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  }
});




Template.startConversation.onRendered(function() {
  if((Session.get('startConversationForNotificationUserId') != undefined) && Session.get('startConversationForNotificationUserId') != "")
  {
      $("#advocate_name").val(Session.get('startConversationForNotificationName'));
      $("#newConversationFromNotification label").addClass("active");
     // $("#advo_message").focus();
  }
});