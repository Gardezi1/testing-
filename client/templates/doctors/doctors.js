Template.doctorsListing.helpers({
  adminUsers: function(){ 
    return Session.get("adminUsers") 
  },
  getImage: function(pictureId){
    var file = Data.findOne({_id:pictureId});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  },
  searchResults: function() {
    if (Session.get("doctorSearchQuery")) {
      var name = (Session.get("doctorSearchQuery"));
      return Meteor.users.find({ $and:[{"profile.type": "doctor"},{"profile.name": {$regex: new RegExp((Session.get("doctorSearchQuery")))}}]});
    }
  },
  checkIfloggedIn: function(authorId){
    return authorId == Meteor.userId();
  },
  checkIfFollowing: function(id){
    return Meteor.users.find({$and: [{_id:Meteor.userId()},{"profile.following": id}]}).count();
  }
});

Template.doctorsListing.events({  
  'keyup [type=text]': function(event, template) {
    Session.set('doctorSearchQuery', event.target.value);
  },
  'click .start-follow': function(e){
    var id = $(e.target).attr('id');
    console.log(id);
    e.preventDefault();
    Meteor.call('addToFollowing', id, function(id,error, result){
      if(error){
        console.log("error from addToFollowing: ", error);
      } else {
        // console.log(id);
      } 
    });
  },
  'click .start-unfollow': function(e){
    var id = $(e.target).attr('id');
    console.log(id);
    e.preventDefault();
    Meteor.call('removeFromFollowing', id, function(id,error, result){
      if(error){
        console.log("error from removeFromFollowing: ", error);
      } else {
        // console.log(id);
      } 
    });
  }
});