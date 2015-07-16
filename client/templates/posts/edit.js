var postHooks = {
  after: {
    update: function(doc) {
      Router.go('/articles');
    }
  }
}

AutoForm.addHooks('updatePostForm', postHooks);

Template.articleEdit.helpers({
    file_S3_url: function(){
        var file = Files.findOne({_id:this.fileId});
        if(file){
          url = "https://s3.amazonaws.com/medcircle/upload/files/"+file._id+"-"+file.name();
          return url;
        }
    },
    setRadioButton: function(selector, value){
        $("#"+selector+" input[value='"+value+"']").prop("checked", true)
    }
})

Template.articleEdit.rendered = function(){

    var post = Posts.findOne({_id: Router.current().params["id"] });
    ["articleCategory", "articleType", "postTo", "articleTopic" ].forEach(function(selector){
      $("#"+selector+" input[value='"+post[selector]+"']").prop("checked", true)
    })
}
