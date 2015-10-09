Template.upload.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files

        S3.upload({
                files:files,
                path:"upload"
            },function(e,r){
                console.log(r);
        });
    }
})

Template.upload.helpers({
    "files": function(){
        return S3.collection.find();
    }
})