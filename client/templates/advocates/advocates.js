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
  }
});