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
  }
});