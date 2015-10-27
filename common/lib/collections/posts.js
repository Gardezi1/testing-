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
      dropEnabled: true,
      afFieldInput: {
        type: "fileUpload",
        collection: "files"
      }
    }
  },
  title: {
    type: String,
    // label: "Article Title",
    max: 200,
    autoform:{
      label: false,
      placeholder: "Article Title",
    }
  },
  source: {
    type: String,
    optional: true,
    // label: "Article Source Name",
    autoform:{
      label: false,
      placeholder: "Article Source Name",
    }
  },
  url: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    // label: "Article Source URL",
    autoform:{
      label: false,
      
      afFieldInput: {
        type: "url",
        placeholder: "Article Source URL",
      }
    }
  },
  articleTopic: {
    label: "Article Topic",
    type: String,
    autoform: {
      label: false,
      type: "select-radio",
      options: function () {
        uid = Meteor.userId();
        user = Meteor.users.findOne(uid)
        topics = user && user.profile.topics;
        if(topics){
          var checkBoxs = []
          for(var i=0; i<topics.length; i++){
            topic = Topics.findOne({_id: topics[i]});
            checkBoxs.push({
              label: topic.name,
              value: topic._id
            })
          }
        }
    return checkBoxs;
      }
    }
  },
  videoId:{
      type: String,
      optional: true,
      autoform: {
        label: "Upload",
        afFieldInput: {
          type: "fileUpload",
          collection: "Videofiles"
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
      label: true,
      type: "select-radio",
      options: function () {
        return [
          {label: "What", value: "what"},
          {label: "How", value: "how"},
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
      label: true,
      type: "select-radio",
      options: function () {
        var temp = window.location.pathname.toString();
        if(temp.indexOf("/admin/Posts/") > -1){
          var pid = temp.substr(13,17);
          var aid = Posts.findOne({"_id":pid}).authorId;
          if(Meteor.users.findOne({"_id":aid}).profile.type == "admin")
          {
              return[{label: "All", value: "hcpmember"},
              {label: "HCP", value: "hcp"},
              {label: "Members", value: "member"}
              ];
          }else
          {
              return[
              {label: "1st Circle", value: "1st"},
              {label: "1st & 2nd Circle", value: "all"}
              ]; 
          }
        }else{   
          if(Meteor.user().profile.type == "admin"){
              return[{label: "All", value: "hcpmember"},
              {label: "HCP", value: "hcp"},
              {label: "Members", value: "member"}
              ];
          }else{
            return [
              {label: "1st Circle", value: "1st"},
              {label: "1st & 2nd Circle", value: "all"}
              // {label: "2nd Circle", value: "2nd"}
            ];
          }
        }
      }
    }
  },
  body: {
    type: String,
    optional: true,
    // label: "Body",
    max: 2000,
    autoform: {
      label: false,
      placeholder: 'Article Content',
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

    max: 2000,
    autoform: {
      label: false,
      placeholder: 'Add Comments (optional)',
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
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});

VideoFiles = new FS.Collection("Videofiles", {
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['video/*'] //allow only images in this FS.Collection
    }
  }
});

// Posts.before.insert(function (userId, doc) {
//   encrypted_body = CryptoJS.AES.encrypt(doc.body, 'Passphrase');
//   encrypted_comment = CryptoJS.AES.encrypt(doc.comment, 'Passphrase');
//   doc.body = encrypted_body.toString();
//   doc.comment = encrypted_comment.toString();

// });
