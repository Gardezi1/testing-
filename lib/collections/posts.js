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
    optional: true,
    autoform: {
      label: "ADD PHOTO",
      afFieldInput: {
        type: "fileUpload",
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
  articleTopic: {
    label: "Article Topic",
    type: [String],
    autoform: {
      type: "select-checkbox",
      options: function () {
        return [
          {label: "Cardiology", value: "cardiology"},
          {label: "Psychology", value: "psychology"}
        ];
      }
    }
  },
  articleType: {
    label: "Article Type",
    type: String,
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "Article", value: "article"},
          {label: "Podcast", value: "podcast"},
          {label: "Video", value: "video"},
          {label: "Other", value: "other"}
        ];
      }
    }
  },
  articleCategory: {
    label: "Article Category",
    type: String,
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "How", value: "how"},
          {label: "What", value: "what"},
          {label: "Where", value: "where"},
          {label: "More", value: "more"}
        ];
      }
    }
  },
  postTo: {
    label: "Post To",
    type: String,
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "All", value: "all"},
          {label: "1st Circle", value: "1"},
          {label: "2nd Circle", value: "2"}
        ];
      }
    }
  },
  // articleType: {
  //     label: "Article Type",
  //     allowedValues: ['Cardiology', 'Psychology']
  // },
  // postTo: {
  //     type: String,
  //     label: "Post To",
  //     allowedValues: ['1st Circle', '2nd Circle']
  // },
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
    optional: true,
    label: "Add Comments",
    max: 2000,
    autoform: {
      class:"materialize-textarea",
      afFieldInput: {
        type: "textarea",
        rows: 10
      }
    }
  },
  authorId: {
    type: String,
    autoValue: function(){
      if(this.isInsert)
        return this.userId;
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    },
    denyUpdate: true
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date();
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
