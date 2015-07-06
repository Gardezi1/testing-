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

Template.nav.rendered = function () {
  $(".button-collapse").sideNav();
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false // Displays dropdown below the button
    }
  );
};