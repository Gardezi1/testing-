Template.doctorsListing.helpers({
  adminUsers: function(){ 
    return Meteor.users.find({$and: [{"profile.type": "doctor"}, {"profile.approve": true} ]});
    // return Session.get("adminUsers") 
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
      return Meteor.users.find({ $and:[{"profile.type": "doctor"},{"profile.firstName": {$regex: new RegExp((Session.get("doctorSearchQuery")), "i")}}]});
    
    // return Meteor.users.find(
    //    {
    //      location:
    //        { $near :
    //           {
    //             $geometry: { type: "Point",  coordinates: [ 31.55460609999999, 74.35715809999999 ] },
    //             $minDistance: 1000,
    //             $maxDistance: 5000
    //           }
    //        }
    //    }
    // )


    
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
  'click .start-follow-doc': function(e){
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
  'click .start-unfollow-doc': function(e){
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