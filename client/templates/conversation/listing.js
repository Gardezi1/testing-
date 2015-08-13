Template.conversationListing.helpers({
  messageList: function(){
    if(!Session.get("conversationLimit")){
      Session.set("conversationLimit", 1);
    }
    uid = Meteor.userId();
    var messages = Messages.find({$or: [{to: uid}, {from:uid} ]}, {sort: {createdAt: -1}}).fetch();
    conversation_list = [];
    var groupedDates = _.groupBy(_.pluck(messages, 'conversationId'));
    _.each(_.values(groupedDates), function(conversation) {
      result = Messages.findOne({conversationId: conversation[0]}, {sort: {createdAt: -1}});
      conversation_list.push(result);
    });
    Session.set("messageListCount", conversation_list.length);
    return conversation_list.slice(0, Session.get("conversationLimit"));
  },
  conversationListCount: function(){
    count =  Session.get("messageListCount");
    if(count > Session.get("conversationLimit"))
      return true;
    else
      return false;
  },
  getSenderName: function(id){
    user = Meteor.users.findOne({_id:id});
    return user && user.profile.name
  },
  toUser: function(fromId){
    return fromId == Meteor.userId();
  },
  ifMyMessage: function(fromId, status){
    if((fromId == Meteor.userId()) && !status){
      return "border-blue";
    }
    else
      if((fromId != Meteor.userId()) && !status)
      return "blue-dot";
    else
      return "";
  },
  recipient: function(toId){
    return toId == Meteor.userId();
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

Template.conversationListing.events({
  'click .messages-view': function(e) {
    msg = Messages.findOne({_id: this._id});
    if(msg.from != Meteor.userId()){
      Messages.update(this._id, {$set: {read: true}});
    }
  },
  'click .more-conversation': function(e){
    limit = Session.get("conversationLimit");
    limit+=5;
    Session.set("conversationLimit", limit);
  }
});