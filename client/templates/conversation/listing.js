Template.conversationListing.helpers({
  getMessages: function(){
    return Messages.find();
  },
  getSenderName: function(id){
    user = Meteor.users.findOne({_id:id});
    console.log(user);
    return user && user.profile.name
  }
});