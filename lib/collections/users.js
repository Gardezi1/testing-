// Schema = {};

// Schema.UserProfile = new SimpleSchema({
//   picture: {
//     type: String,
//     autoform: {
//       afFieldInput: {
//         type: 'fileUpload',
//         collection: 'data'
//       }
//     }
//   },
//     name: {
//         type: String
//     },
//     speciality: {
//     type: String,
//     label: "Speciality"
//   },
//   email: {
//     type: String,
//     label: "Contact Email"
//   },
//   phone: {
//     type: String,
//     label: "Contact Phone Number"
//   },
//   addressOne: {
//     type: String,
//     label: "Address Line 1"
//   },
//   addressTwo: {
//     type: String,
//     label: "Address Line 2"
//   },
//   city: {
//     type: String,
//     label: "City"
//   },
//   state: {
//       type: String,
//       label: "State",
//       allowedValues: ['State 1', 'State 2']
//   },
//   zip: {
//     type: String,
//     label: "Zip"
//   },
//   bio: {
//     type: String,
//     optional: true
//   }
// });

// Schema.User = new SimpleSchema({
//     _id: {
//         type: String,
//         regEx: SimpleSchema.RegEx.Id
//     },
//     email: {
//         type: String,
//         regEx: SimpleSchema.RegEx.Email
//     },
//     createdAt: {
//         type: Date
//     },
//     profile: {
//         type: Schema.UserProfile,
//     },
//     roles: {
//         type: [String],
//         optional: true
//     }
// });


// Meteor.users.attachSchema(Schema.User);

// Meteor.users.allow({
//   insert: function(userId, doc) {
//     return true;
//   },
//   update: function(userId, doc, fieldNames, modifier) {
//     return true;
//   },
//   remove: function(userId, doc){
//     return true;
//   }
// });


/*var imageStore = new FS.Store.S3("profileImages", {
  accessKeyId: "AKIAI5HRPLEJZQ5LOG4Q", //required if environment variables are not set
  secretAccessKey: "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", //required if environment variables are not set
  bucket: "medcircle", //required
  folder: "upload" //optional, which folder (key prefix) in the bucket to use 
});

Data = new FS.Collection("data", {
  stores: [imageStore]
});
*/