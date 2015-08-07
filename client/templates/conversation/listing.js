Template.conversationListing.helpers({
  getMessages: function(){
    uid = Meteor.userId();
    if(uid){
      return Messages.find({$or: [{to: uid}, {from:uid} ]}, {sort: {createdAt: -1}});

      // Meteor.call('groupMessages', id, function(error) {
      //   if (error) {
      //     console.log(error);
      //     return alert(error.reason);
      //   }else{
          
      //   }
      // });

      // var messages = Messages.find({$or: [{to: uid}, {from:uid} ]}, {sort: {createdAt: -1}}).fetch();
      // console.log(messages);
      // var groupedDates = _.pluck(messages, 'to');
      // console.log(groupedDates);
      // _.each(_.values(groupedDates), function(dates) {
      //   console.log({Date: dates[0], Total: dates.length});
      // });

    }
  },
  getSenderName: function(id){
    user = Meteor.users.findOne({_id:id});
    return user && user.profile.name
  },
  toUser: function(fromId){
    return fromId == Meteor.userId();
  },
  ifMyMessage: function(fromId){
    if(fromId == Meteor.userId()){
      return "border-blue";
    }
    else
      return "blue-dot";
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
  }
});