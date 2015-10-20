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
  },
  onWeb: function(){
    if(Meteor.isCordova)
      return false;
    else
      return true;
  }
});

Template.profileView.events({
  'click .record-video': function () {
    if (Meteor.isCordova){
      navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1, duration: 13});
    } else {
      // do something for web.
    }
  }
})


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