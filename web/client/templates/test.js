Template.test.helpers({
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

events = new Meteor.Collection('events');

Template.test.events({
  'click .record-video': function () {
    if (Meteor.isCordova){
      navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1, duration: 13});
    } else {
      // do something for web.
    }
  },
  'click .testVid': function(event){
    console.log(Session.get("vidResponse"));
  }
});


if (Meteor.isClient) {

   Template.hello.helpers({
      fshttp: function (){
          return FS.HTTP.uploadUrl;
      }
    });

   Template.imageView.helpers({
    images: function () {
        //console.log("passed through image id:" + this.img_id);
        return Files.find(); // Where Images is an FS.Collection instance
    },
    root_url: function() {
        if(Meteor.isCordova)
        {
            return __meteor_runtime_config__.ROOT_URL+FS.HTTP.uploadUrl.slice(1);
        }else{
            return __meteor_runtime_config__.ROOT_URL.slice(0,-1);
        }
    }
  });

  Template.hello.events({
    'change #upload-btn': function (event, template) {
        var files = event.target.files;
        console.log(files);
        console.log(files.length);
        for (var i = 0, ln = files.length; i < ln; i++) {
          Files.insert(files[i], function (err, fileObj) {
            //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
          });
        }
    }
  });

  if (Meteor.isCordova) {
      Meteor.startup(function(){
        console.log("device capability: " + JSON.stringify(navigator.device.capture));
    });
  }
  else{
   // CameraTag.observe("myVid", "initialized", function(){
   //    myCamera = CameraTag.cameras["myVid"];
   //    var myVideo = myCamera.getVideo();
   //    console.log("vid"+ myVideo);
   //    var mp4_url = myVideo.formats[0].mp4_url;
   //    console.log("url"+mp4_url);
   //  }); 
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