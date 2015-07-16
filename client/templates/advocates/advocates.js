Template.advocatesListing.helpers({
  advocateUsers: function(){ 
   follower_list = Meteor.user().profile.followers;
   if(follower_list  == undefined || follower_list.length < 0){
    return;
   }
   else
    return Meteor.users.find({_id: { $in: follower_list}});
  },
  getImage: function(pictureId){
    var file = Data.findOne({_id:pictureId});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  },
  isChecked: function(uid){
    var id = this._id;
    // console.log(id);
    circle = Meteor.users.findOne({_id:uid}).profile.doctorCircle;
    if(circle == undefined || circle.length <= 0){
      return "";
    }
    if(circle.indexOf("1st") >= 0){
      return "checked";
    }
    else{
      return "";
    }
  }
});

Template.advocatesListing.events({  
  'click input': function(e) {
    var id = $(e.target).attr('id');
    circle = Meteor.users.findOne({_id:id}).profile.doctorCircle;
    if(circle == undefined || circle.length <= 0){
      // console.log("push")
      Meteor.users.update(id, {$set: { "profile.doctorCircle": "1st"}});
    }
    else
    if(circle.indexOf("1st") >= 0){
      // console.log("pop");
      Meteor.users.update(id, {$set: { "profile.doctorCircle": "2nd"}});
    }
    else
    if(circle.indexOf("2nd") >= 0){
      // console.log("pop");
      Meteor.users.update(id, {$set: { "profile.doctorCircle": "1st"}});
    }
   }
});