Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId()}).fetch().reverse();
  },
  getImage: function(uid){
    user = Meteor.users.findOne({_id: uid});
    if(user){
      pid = user.profile.picture;
      var file = Data.findOne({_id:pid});
      if(file){
        url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
      }
    }
  },
  getName: function(uid){
    user = Meteor.users.findOne({_id: uid});
    if(user.profile.lastName != undefined)
      return user && user.profile.firstName+" "+user.profile.lastName;
    return user && user.profile.firstName;
  },
  ifRead: function(status){
    if(status)
      return "";
    else
      return "blue-dot";
  }
});

Template.notifications.events({
  'click .notification': function(e) {
    Notifications.update(this._id, {$set: {read: true}});
    var UserId = Notifications.findOne({_id: this._id}).followerId;
    var countOfMessages = Messages.find({$or: [ {$and: [{from: Meteor.userId()}, {to: UserId} ]}, {$and: [{from: UserId}, {to: Meteor.userId()} ]} ]}).count();
    if(countOfMessages != 0){
        Router.go('/conversation/' + UserId);
    }
    else{

      Session.set('startConversationForNotificationUserId',UserId);
      Session.set('startConversationForNotificationName',Meteor.users.findOne({'_id':UserId}).profile.firstName);
      Router.go('/start/conversation/');   
    }
  }

});