Template.admin.helpers({
  users: function() {
    return Meteor.users.find({$and: [{"profile.type": "doctor"}, {"profile.approve": false} ]});
  },
  usersCount: function(){
    return Meteor.users.find({$and: [{"profile.type": "doctor"}, {"profile.approve": false} ]}).count();
  },
  getImage: function(pictureId){
    var file = Data.findOne({_id:pictureId});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  },
});

Template.admin.events({
  'click .accept-doctor': function(e) {
    var id = $(e.target).attr('id');
    user = Meteor.users.findOne({_id:id});
    if(user){
      email = user.emails[0].address
      Meteor.call("acceptUser", id, email, function(error, result){
        if(error){
          sAlert.error(error.reason, {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
          console.log("error from acceptUser: ", error);
        } else {
          sAlert.error('User approved.', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
        }
      });   
    }
  },
  'click .reject-doctor': function(e) {
    var id = $(e.target).attr('id');
    user = Meteor.users.findOne({_id:id});
    if(user){
      email = user.emails[0].address;
      Meteor.call("rejectUser", id, email, function(error, result){
        if(error){
          sAlert.error(error.reason, {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
          console.log("error from rejectUser: ", error);
        } else {
          sAlert.error('User rejected.', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
        }
      });
    }
  }
});