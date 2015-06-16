Template.postNew.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files

        S3.upload({
                files:files,
                path:"upload"
            },function(e,r){
                console.log(r);
                Session.set('imageObject', r);
                console.log(Session.get('imageObject'));
        });
    }
})

Template.postNew.helpers({
    "files": function(){
        return S3.collection.find();
    },
    imagePath: function() {
    return Session.get('imageObject'); 
  }
})