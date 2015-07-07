Template.nav.helpers({
  file_S3: function(){
    var path = Meteor.user().profile.picture;
        var file = Data.findOne({_id:path});
        if(file){
          url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
          return url;
        }
    },
});

// Template.nav.onRendered = function () {
//   $(".button-collapse").sideNav();
// };

Template.nav.onRendered(function() {
  $(".button-collapse").sideNav();
  $('.dropdown-button').dropdown();
});