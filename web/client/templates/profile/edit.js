var userHooks = {
  after: {
    update: function(doc, error, result) {

        Router.go('/profile');
    }
  }
}
 
AutoForm.addHooks('editProfile', userHooks);

Template.editProfile.onRendered(function() {
  $('select').material_select();
  //  this.autorun(function () {
  //   if (GoogleMaps.loaded()) {
  //     $("#geomap").geocomplete();
  //     $('#geomap').removeAttr('placeholder');
  //   }
  // });
});

Template.editProfile.events({  
  'click .save-my-profile': function(event) {
    console.log("inn");
    $(".save-profile").click();
  }
});

Template.editProfile.rendered = function(){
  var user = Meteor.users.findOne({_id: Meteor.userId() });
  $("#gender input[value='"+user.profile.gender+"']").prop("checked", true)
}


// Template.editProfile.helpers({
//   PictureValue:function(){
//     user = Meteor.user();
//       if(user && user.profile.picture){
//         var file = Data.findOne({_id:user.profile.picture});
//         if(file){
//           url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
//             return url;
//         }
//       }
//   }
// });