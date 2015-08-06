Template.articleView.helpers({
    list: function() {
    return Posts.find({_id: this._id}); 
  },
  file_S3: function(){
    var file = Files.findOne({_id:this.fileId});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/files/"+file._id+"-"+file.name();
      return url;
    }
  },
  getArticleName: function(tid){
    topic = Topics.findOne({_id: tid});
    return topic && topic.name;
  },
  getDoctorName: function(uid){
    if(uid){
      return Meteor.users.findOne({_id: uid}).profile.name;
    }
  },
  getImage: function(uid){
    if(uid){
      pid = Meteor.users.findOne({_id: uid}).profile.picture;
    }
    var file = Data.findOne({_id:pid});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
    }
  }     
});