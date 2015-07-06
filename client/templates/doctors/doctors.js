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
  }
});

Template.doctorsListing.events({  
  'keyup [type=text]': function(event, template) {
    console.log(event.target.value);
    Session.set('doctorSearchQuery', event.target.value);
  }
});