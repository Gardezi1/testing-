Posts = new Mongo.Collection("posts");
// Posts = new Mongo.Collection("posts", {
//   transform: function(doc) {
//         decrypted_body = CryptoJS.AES.decrypt(doc.body, 'Passphrase');
//         decrypted_comment = CryptoJS.AES.decrypt(doc.comment, 'Passphrase');
//         doc.body = decrypted_body.toString(CryptoJS.enc.Utf8);
//         doc.comment = decrypted_comment.toString(CryptoJS.enc.Utf8);

//     return doc;
//   }
// });
Posts.attachSchema(new SimpleSchema({
  fileId: {
    type: String,
    autoform: {
      label: "Add a photo",
      afFieldInput: {
        class: "md",
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
    optional: false,
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "2013", value: "2013"},
          {label: "2014", value: "2014"},
          {label: "2015", value: "2015"}
        ];
      }
    }
  },
  // articleType: {
  //     label: "Article Type",
  //     allowedValues: ['Cardiology', 'Psychology']
  // },
  postTo: {
      type: String,
      label: "Post To",
      allowedValues: ['1st Circle', '2nd Circle']
  },
  body: {
    type: String,
    label: "Body",
    max: 2000,
    autoform: {
      class:"materialize-textarea",
      afFieldInput: {
        type: "textarea",
        rows: 10
      }
    }
  },
  comment: {
    type: String,
    label: "Add Comments",
    max: 2000,
    autoform: {
      class:"materialize-textarea",
      afFieldInput: {
        type: "textarea",
        rows: 10
      }
    }
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


// Posts.before.insert(function (userId, doc) {
//   encrypted_body = CryptoJS.AES.encrypt(doc.body, 'Passphrase');
//   encrypted_comment = CryptoJS.AES.encrypt(doc.comment, 'Passphrase');
//   doc.body = encrypted_body.toString();
//   doc.comment = encrypted_comment.toString();

// });