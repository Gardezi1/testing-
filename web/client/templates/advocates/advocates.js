Template.advocatesListing.helpers({
  advocateUsers: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin])){
      return Meteor.users.find({roles: [ROLES.Advocate]});
    }
    else{
      if(Meteor.user()){
        follower_list = Meteor.user().profile.followers;
       if(follower_list  == undefined || follower_list.length < 0){
        return;
       }
       else
        return Meteor.users.find({$and: [{_id: { $in: follower_list}}, {"profile.type": "advocate"}] });
      }     
    } 
  },
  getImage: function(pictureId){
    var file = Data.findOne({_id:pictureId});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  },
  isChecked: function(id){

    currentUserId = Meteor.userId();
    first_circle_list = Meteor.users.findOne({_id:id}).profile.firstCircle;
    second_circle_list = Meteor.users.findOne({_id:id}).profile.secondCircle;

    if(first_circle_list != undefined && first_circle_list.length > 0){
      console.log("in first");

      if(first_circle_list.indexOf(currentUserId) >= 0){
        return "checked";
      }
      else{
        return "";
      }
    }
    else
      if(second_circle_list != undefined && second_circle_list.length > 0){
        console.log("in second");

        if(second_circle_list.indexOf(currentUserId) >= 0){
          return "";
        }
        else{
          return "checked";
        }
      }
      else{
        return "";
      }

  },
  isActive: function(id){
    currentUserId = Meteor.userId();
    first_circle_list = Meteor.users.findOne({_id:id}).profile.firstCircle;
    second_circle_list = Meteor.users.findOne({_id:id}).profile.secondCircle;

    if(first_circle_list != undefined && first_circle_list.length > 0){

      if(first_circle_list.indexOf(currentUserId) >= 0){
        return "active";
      }
      else{
        return "";
      }
    }
    else
      if(second_circle_list != undefined && second_circle_list.length > 0){

        if(second_circle_list.indexOf(currentUserId) >= 0){
          return "";
        }
        else{
          return "active";
        }
      }
      else{
        return "";
      }

  }
});

Template.advocatesListing.events({  
  'click input': function(e) {
    var id = $(e.target).attr('id');
    currentUserId = Meteor.userId();
    first_circle_list = Meteor.users.findOne({_id:id}).profile.firstCircle;
    second_circle_list = Meteor.users.findOne({_id:id}).profile.secondCircle;

    if(first_circle_list != undefined && first_circle_list.length > 0){

      if(first_circle_list.indexOf(currentUserId) >= 0){
        Meteor.users.update(id, { $pull: { "profile.firstCircle": currentUserId}});
        Meteor.users.update(id, {$push: { "profile.secondCircle": currentUserId} });
      }
      else{
        Meteor.users.update(id, { $push: { "profile.firstCircle": currentUserId}});
        Meteor.users.update(id, {$pull: { "profile.secondCircle": currentUserId} });
      }
    }
    else
      if(second_circle_list != undefined && second_circle_list.length > 0){

        if(second_circle_list.indexOf(currentUserId) >= 0){
          Meteor.users.update(id, { $push: { "profile.firstCircle": currentUserId}});
          Meteor.users.update(id, {$pull: { "profile.secondCircle": currentUserId} });
        }
        else{
          Meteor.users.update(id, { $pull: { "profile.firstCircle": currentUserId}});
          Meteor.users.update(id, {$push: { "profile.secondCircle": currentUserId} });
        }
      }
      else{
        Meteor.users.update(id, { $push: { "profile.firstCircle": currentUserId}});
      }
  }
});