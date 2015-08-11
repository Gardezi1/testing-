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
    return user && user.profile.name;
  },
  ifRead: function(status){
    if(status)
      return "not";
    else
      return "not-overly";
  }
});

Template.notifications.events({
  'click .notification': function(e) {
    Notifications.update(this._id, {$set: {read: true}});
  }
});