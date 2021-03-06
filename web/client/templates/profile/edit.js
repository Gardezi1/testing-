var userHooks = {
  after: {
    update: function(doc, error, result) {

        Router.go('/profile');
    }
  }
}
 
AutoForm.addHooks('editProfile', userHooks);

Template.editProfile.helpers({
  onWeb: function(){
    if(Meteor.isCordova)
      return false;
    else
      return true;
  },
  showUpload: function(){
    return Session.get("startRecording");
  },
  userId: function(){
    return Meteor.user()._id;
  }
});

Template.editProfile.onRendered(function() {
  $('select').material_select();
  //  this.autorun(function () {
  //   if (GoogleMaps.loaded()) {
  //     $("#geomap").geocomplete();
  //     $('#geomap').removeAttr('placeholder');
  //   }
  // });
  if (Meteor.isCordova){
    user = Meteor.user();
    if(user && user.profile.picture){
      var file = Data.findOne({_id:user.profile.picture});
      console.log(file);
      if(file){
        if(file.name() == undefined){
          console.log("innn");
          console.log(file._id);
          url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-undefined";
          console.log(url);
        }
        else
          url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
      }
    }
    $('#showImg .img-fileUpload-thumbnail').attr("src",url);
  }
});
Template.editProfile.events({  
  'click .save-my-profile': function(event) {
    console.log("inn");
    $(".save-profile").click();
  },
  'click .record-video': function () {
    if (Meteor.isCordova){
      Session.set("startRecording", true);
      navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1, duration: 180});
    } else {
      // do something for web.
    }
  },
  'click .profile-video': function(){
    Session.set("isVideo", true);
    console.log("inside click");
  }
});

Template.editProfile.rendered = function(){
  console.log("inside rendered");
  Session.set("isVideo", false);
  var user = Meteor.users.findOne({_id: Meteor.userId() });
  $("#gender input[value='"+user.profile.gender+"']").prop("checked", true)
}

if (Meteor.isClient) {

  if (Meteor.isCordova) {
      Meteor.startup(function(){
        console.log("device capability: " + JSON.stringify(navigator.device.capture));
    });
  }
  else{
    // Meteor.setTimeout(function(){
    //   console.log("inside");
    //   CameraTag.observe('Medcircle', 'initialized', function(){
    //     console.log("inside camera");
    //     var myCamera = CameraTag.cameras["Medcircle"];
    //     var myVideo = myCamera.getVideo();
    //     console.log("vid"+ myVideo);
    //     var mp4_url = myVideo.formats[0].mp4_url;
    //     console.log("url"+mp4_url);
    //   });
    // }, 1000);
  }

  var captureError = function(error) {
    navigator.notification.alert('ERROR:' + error.message, null, "Capture Error");
  }

  var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i=0, len = mediaFiles.length; i < len; i += 1) {
      path = mediaFiles[i].fullPath;

      // do something with this file... upload to S3 ?
      console.log("path = " + path);
    }
  }
}
