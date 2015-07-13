Template.topicsListing.helpers({
  getAllTopics: function(){
    return Topics.find();
  },
  isChecked: function(){
    console.log("inn");
    var id = this._id;
    return Session.get(id) ? "checked" : "";
  }
});

Template.topicsListing.events({  
  'click input': function(e) {
    var id = $(e.target).attr('id');
    console.log(id);
    topics_list = Meteor.users.findOne({_id:Meteor.userId()}).profile.topics;
    temp = Topics.find({_id: { $in: topics_list}}).fetch();
    console.log(temp);
    // Meteor.users.update(Meteor.userId(), {$push: { "profile.topics": id} });
    console.log(topics_list);
   }
});