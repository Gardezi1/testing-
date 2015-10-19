Template.doctorsListing.helpers({
  adminUsers: function(){ 
    return Meteor.users.find({$and: [{"profile.type": "doctor"}, {"profile.approve": true} ]}); 
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
      lat = Meteor.user().profile.lat;
      lon = Meteor.user().profile.lon;
      var cor = [lon,lat];
      var name = (Session.get("doctorSearchQuery"));
      results = new Mongo.Collection(null);
      r = Meteor.users.find( { 'profile.location' : { $near : { $geometry: { type: 'Point', coordinates: cor } } } } ).fetch();  
      for(var i =0 ; i<r.length; i++)
      {  
          results.insert(r[i]);
      }
      
      t= Session.get("doctorSearchQuery").split(" ");
      
      regexQueryString = t[0];
      for(var i = 1 ; i < t.length ; i++){
        if (t[i]!= ""){
          regexQueryString= regexQueryString+ "|"
          regexQueryString =regexQueryString+ t[i];
        }
      }
      //debugger;
     return results.find({ $and:[{"profile.type": "doctor"},{$or: [{"profile.firstName": {$regex: new RegExp(p, "i")}} , {"profile.lastName": {$regex: new RegExp(p, "i")}}]}]});
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
        location.reload();
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
        location.reload();
      } 
    });
  }
});

Template.nav.onRendered(function(){
navigator.geolocation.getCurrentPosition(function(position) {
      Session.set('lat', position.coords.latitude);
      Session.set('lon', position.coords.longitude);
      ServerSession.set('latt', position.coords.latitude);
      ServerSession.set('lonn', position.coords.longitude);
  });
})