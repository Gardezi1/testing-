Template.conversationView.helpers({
  getMessages: function(){
    if(!Session.get("messageLimit")){
      Session.set("messageLimit", 5);
    }
    limit = Session.get("messageLimit");
    uid = Meteor.userId();
    if(uid){
      return Messages.find({$or: [ {$and: [{from: uid}, {to: Router.current().params["id"]} ]}, {$and: [{from: Router.current().params["id"]}, {to: uid} ]} ]} , {sort: {createdAt: -1}, limit: limit});
    }
  },
  chatCount: function(){
    count = Messages.find({$or: [ {$and: [{from: uid}, {to: Router.current().params["id"]} ]}, {$and: [{from: Router.current().params["id"]}, {to: uid} ]} ]}).count();
    if(count > Session.get("messageLimit"))
      return true;
    else
      return false;
  },
  gteMyImage: function(){
    var path = Meteor.user().profile.picture;
      var file = Data.findOne({_id:path});
      if(file){
        url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
      }
  },
  fromMe: function(fromId){
    return fromId == Meteor.userId();
  },
  getSenderName: function(id){
    user = Meteor.users.findOne({_id:id});
    return user && user.profile.name
  },
  gteUserImage: function(id){
    if(id){
      user = Meteor.users.findOne({_id:id});
      if(user && user.profile.picture){
        var file = Data.findOne({_id:user.profile.picture});
        if(file){
          url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
            return url;
        }
      }
    }
  },
  messageTime: function(date){
    return moment(date).format('MM/DD/YY');
  }
});

Template.conversationView.events({  
  'click #message-reply': function(e) {
    text = $("#reply-textarea").val();
    if(text){
      to = Router.current().params["id"];
      from = Meteor.userId();
      if(to){
        name = Meteor.users.findOne({_id: to}).profile.name;
      }
      var data = {
        name: name,
        message: text,
        toId: to,
        fromId: from
      }

      convId = Random.hexString(10);
      message = Messages.findOne({$or: [ {$and: [{from: data.fromId}, {to: data.toId} ]}, {$and: [{from: data.toId}, {to: data.fromId} ]} ]} , {sort: {createdAt: -1}});
      if(message  != undefined || message.length > 0){
        convId = message.conversationId;
      }
      Meteor.call('addToMessageList', data, convId, function(error) {
        if (error) {
          console.log(error);
          return alert(error.reason);
        }else{
          $("#reply-textarea").val('');
        }
      });
    }    
   },
   'click .more-messages a': function(e){
      limit = Session.get("messageLimit");
      limit+=5;
      Session.set("messageLimit", limit);
   }
});