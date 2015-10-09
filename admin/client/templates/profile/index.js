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
  ifDoctor: function(){ 
   return Meteor.user().profile.type == "doctor";
  }
});
