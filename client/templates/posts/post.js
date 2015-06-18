var postHooks = {
  after: {
    update: function(doc) {
      Router.go('/show');
    }
  }
}
 
AutoForm.addHooks('updatePostForm', postHooks);

Template.post.helpers({
    file_S3_url: function(){
        var file = Files.findOne({_id:this.fileId});
        if(file){
          url = "https://s3.amazonaws.com/medcircle/upload/files/"+file._id+"-"+file.name();
          return url;
        }
    },
})