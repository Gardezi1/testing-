Template.conversationView.helpers({
  getMessages: function(){
    uid = Meteor.userId();
    if(uid){
      return Messages.find({$or: [ {$and: [{from: uid}, {to: Router.current().params["id"]} ]}, {$and: [{from: Router.current().params["id"]}, {to: uid} ]} ]} , {sort: {createdAt: -1}});
    }
  },
  gteMyImage: function(){
    var path = Meteor.user().profile.picture;
      var file = Data.findOne({_id:path});
      if(file){
        url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
      }
  },
  ifMyMessage: function(fromId){
    if(fromId == Meteor.userId()){
      return "border-blue";
    }
    else
      return "blue-dot";
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
    
    // console.log("to: " + to);
    // console.log("from: " + from);
    // console.log(name);
    // console.log(text);
    Meteor.call('addToMessageList', data, function(error) {
      if (error) {
        console.log(error);
        return alert(error.reason);
      }else{
        $("#reply-textarea").val('');
      }
    });    
   }
});