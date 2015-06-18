Template.show.helpers({
    list: function() {
    return Posts.find(); 
  },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        if (confirm('Really delete "' + doc.title + '"?')) {
          this.remove();
        }
      };
    },
  file_S3: function(){
        var file = Files.findOne({_id:this.fileId});
        if(file){
          url = "https://s3.amazonaws.com/medcircle/upload/files/"+file._id+"-"+file.name();
          return url;
        }
    },  
})