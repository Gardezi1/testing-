Template.doctorView.helpers({
  getImage: function(pid){
    var file = Data.findOne({_id:pid});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  },
  checkIfFollowing: function(id){
    return Meteor.users.find({$and: [{_id:Meteor.userId()},{"profile.following": id}]}).count();
  }
});


Template.doctorView.onRendered(function() {
  $('.start-unfollow').on("click", function(event){
   var id = $(".start-unfollow").attr('id');
    console.log(id);
    Meteor.call('removeFromFollowing', id, function(id,error, result){
      if(error){
        console.log("error from removeFromFollowing: ", error);
      } else {
        location.reload();
      } 
    });
  });

  $('.start-follow').on("click", function(event){
    var id = $(".start-follow").attr('id');
    console.log(id);
    Meteor.call('addToFollowing', id, function(id,error, result){
      if(error){
        console.log("error from addToFollowing: ", error);
      } else {
        location.reload();
      } 
    });
  })

});