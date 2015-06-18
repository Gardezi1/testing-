Posts = new Mongo.Collection("posts");
Posts.attachSchema(new SimpleSchema({
  fileId: {
    type: String,
    autoform: {
      label: false,
      afFieldInput: {
        class:"mdi-content-add",
        type: "cfs-file",
        collection: "files"
      }
    }
  },
  title: {
    type: String,
    label: "Article Title",
    max: 200
  },
  source: {
    type: String,
    label: "Article Source Name"
  },
  url: {
    type: String,
    label: "Article Source URL"
  },
  articleType: {
   type: String,
   autoform: {
     label: false, 
     type: "select",
     options: function () {
       return [
         {label: "type 1", value: 1},
         {label: "type 2", value: 2}
       ];
     }
   }
  },
  postTo: {
   type: String,
   autoform: {
     label: false, 
     type: "select",
     options: function () {
       return [
         {label: "1st Circle", value: 1},
         {label: "2nd Circle", value: 2}
       ];
     }
   }
  },
  // articleType: {
  //   type: String,
  //   label: "Article Type",
  //   allowedValues: ['type 1', 'type 2', 'type 3', 'type 4'],
  // },
  // postto: {
  //   type: String,
  //   label: "Post To",
  //   allowedValues: ['1st Circle', '2nd Circle'],
  // },
  body: {
    type: String,
    label: "Body",
    max: 2000,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 10
      }
    }
  },
  comment: {
    type: String,
    label: "Add Comments",
    max: 200
  }
}));


var imageStore = new FS.Store.S3("images", {
  accessKeyId: "AKIAI5HRPLEJZQ5LOG4Q", //required if environment variables are not set
  secretAccessKey: "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", //required if environment variables are not set
  bucket: "medcircle", //required
  folder: "upload" //optional, which folder (key prefix) in the bucket to use 
});

Files = new FS.Collection("files", {
  stores: [imageStore]
});


