Template.startConversation.helpers({
  settings: function() {
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
    name = $("#advocate_name").val();
    message = $("#advo_message").val();
    if(name && message){
      toUser = Meteor.users.findOne({"profile.firstName": name});
      toId = toUser._id;
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
          Router.go('/conversation/' + toId);
        }
      }); 
    } 
   }
});

Template.userPill.helpers({
  getImage: function(pid){
    console.log(pid);
    var file = Data.findOne({_id:pid});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  }
});