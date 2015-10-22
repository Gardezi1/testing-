Template.profileView.helpers({
  getProfile: function(){
    return Meteor.users.findOne({id:this._id});
  },
  getImage: function(){
    var file = Data.findOne({_id:Meteor.user().profile.picture});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  },
  getProfileVideo: function(){
    var video = ProfileVid.findOne({_id:Meteor.user().profile.profileVideo});
    if(video){
      url = "https://s3.amazonaws.com/medcircle/upload/profileVid/"+video._id+"-undefined";
      // Session.set("profileVideoUrl", url);
      console.log(url);
      return VideoPlayer.play(url);
    }
  },
  ifDoctor: function(){ 
   return Meteor.user().profile.type == "doctor";
  },
  showVideo: function(){
    return Session.get("profileVideoUrl");
  }
});

// Template.profileView.events({
//   'click .playProfileVideo': function(event){
//     console.log("inside play");
//     Session.set("profileVideoUrl", true);
//   }
// })

Template.profileView.onRendered(function(){
  $('.playProfileVideo').on("click", function(event){
    console.log("inside");
    var video = ProfileVid.findOne({_id:Meteor.user().profile.profileVideo});
    if(video){
      url = "https://s3.amazonaws.com/medcircle/upload/profileVid/"+video._id+"-undefined";
      // Session.set("profileVideoUrl", url);
      VideoPlayer.play(url);
    }
  });
});