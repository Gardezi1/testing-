Template.topicsListing.helpers({
  getAllTopics: function(){
    return Topics.find();
  },
  isChecked: function(){
    var id = this._id;
    // console.log(id);
    topics_list = Meteor.users.findOne({_id:Meteor.userId()}).profile.topics;
    if(topics_list == undefined || topics_list.length <= 0){
      return "";
    }
    if(topics_list.indexOf(id) >= 0){
      return "checked";
    }
    else{
      return "";
    }
  }
});

Template.topicsListing.events({  
  'click input': function(e) {
    var id = $(e.target).attr('id');
    topics_list = Meteor.users.findOne({_id:Meteor.userId()}).profile.topics;
    if(topics_list == undefined || topics_list.length <= 0){
      // console.log("push")
      Meteor.users.update(Meteor.userId(), {$push: { "profile.topics": id} });
    }
    else
    if(topics_list.indexOf(id) >= 0){
      // console.log("pop");
      Meteor.users.update(Meteor.userId(), {$pull: { "profile.topics": id}});
    }
    else{
      Meteor.users.update(Meteor.userId(), {$push: { "profile.topics": id} });
    }
   }
});