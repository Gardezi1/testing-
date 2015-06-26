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
})