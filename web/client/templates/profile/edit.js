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
});

Template.editProfile.events({  
  'click .save-my-profile': function(event) {
    console.log("inn");
    $(".save-profile").click();
  },
  'click .record-video': function () {
    if (Meteor.isCordova){
      Session.set("startRecording", true);
      navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1, duration: 13});
    } else {
      // do something for web.
    }
  }
});

Template.editProfile.rendered = function(){
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