Template.topicsView.helpers({
  topicsCollectionId: function(){
    user = FollowerTopics.findOne({topicOwnerId: Meteor.userId()}, {topicFollwerId: Router.current().params["id"]});
    if(user){
      return user._id;
    }
  },
  getMyTopics: function(){
    // return FollowerTopics.findOne({topicOwnerId: Meteor.userId()}, {topicFollwerId: Router.current().params["id"]}).topics;
    user =  Meteor.users.findOne({_id: Router.current().params["id"]});
    if(user){
      return user.profile.topics;
    }
  },
  getName: function(tid){
    if(tid){
      return Topics.findOne({_id:tid}).name;
    }
  },
  isChecked: function(id){
    // var id = this._id;
    topics_list = FollowerTopics.findOne({topicOwnerId: Meteor.userId()}, {topicFollwerId: Router.current().params["id"]});
    if(topics_list){
      topic  = topics_list.topics;
      if(topic == undefined || topic.length <= 0){
        return "";
      }
      if(topic.indexOf(id) >= 0){
        return "checked";
      }
      else{
        return "";
      }
    }
  }
});

Template.topicsView.events({  
  'click .myTopics': function(e) {
    tid = $(".topicsCollection").attr('id');
    var id = $(e.target).closest('.myTopics').attr('id');
    if(id){
      topics_list = FollowerTopics.findOne({topicOwnerId: Meteor.userId()}, {topicFollwerId: Router.current().params["id"]}).topics;
      if(topics_list == undefined || topics_list.length <= 0){
        // console.log("push")
        FollowerTopics.update(tid, {$addToSet: { topics: id} });
      }
      else
      if(topics_list.indexOf(id) >= 0){
        console.log("pop");
        FollowerTopics.update(tid, {$pull: { topics: id}});
      }
      else{
        console.log("push");
        FollowerTopics.update(tid, {$addToSet: { topics: id} });
      }
    }
   }
});