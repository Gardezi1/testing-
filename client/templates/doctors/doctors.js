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
    }
});

Template.doctorsListing.events({  
  'keyup [type=text]': function(event, template) {
    Session.set('doctorSearchQuery', event.target.value);
  }
});