Template.nav.helpers({
  file_S3: function(){
    var path = Meteor.user().profile.picture;
        var file = Data.findOne({_id:path});
        if(file){
          url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
          return url;
        }
    },
  userTopics: function(){
    // uid = Meteor.userId();
    // user = Meteor.users.findOne(uid);
    topics_list = [];
    if (Meteor.user()){
      topics_list = Meteor.user().profile.topics;
      if(topics_list == undefined || topics_list.length <= 0){
        return topics_list;
      }
      return Topics.find({_id: { $in: topics_list}});
    }
  },
  ifDoctor: function(){
    return Meteor.user().profile.type == "doctor";
  }  
});

Template.nav.onRendered(function() {
  $('.dropdown-button-topic').dropdown();
  $(".button-collapse").sideNav();
  $('.dropdown-button').dropdown();
});
