
// Doctors = new Mongo.Collection("doctors");

// Doctors.attachSchema(new SimpleSchema({
//   picture: {
//     type: String,
//     optional: true,
//     autoform: {
//       // label: "Add a photo",
//       afFieldInput: {
//         type: "fileUpload",
//         collection: "data"
//       }
//     }
//   },
//   name: {
//     type: String,
//     label: "Name",
//     max: 200
//   },
//   speciality: {
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
//   },
//   // doctorId: {
//   //   type: String,
//   //   autoValue: function(){
//   //     if(this.isInsert)
//   //       return this.userId;
//   //   }
//   // },
//   // body: {
//   //   type: String,
//   //   label: "Body",
//   //   max: 2000,
//   //   autoform: {
//   //     class:"materialize-textarea",
//   //     afFieldInput: {
//   //       type: "textarea",
//   //       rows: 10
//   //     }
//   //   }
//   // },
//   // comment: {
//   //   type: String,
//   //   label: "Add Comments",
//   //   max: 2000,
//   //   autoform: {
//   //     class:"materialize-textarea",
//   //     afFieldInput: {
//   //       type: "textarea",
//   //       rows: 10
//   //     }
//   //   }
//   // }
// }));

// var imageStore = new FS.Store.S3("profileImages", {
//   accessKeyId: "AKIAI5HRPLEJZQ5LOG4Q", //required if environment variables are not set
//   secretAccessKey: "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", //required if environment variables are not set
//   bucket: "medcircle", //required
//   folder: "upload" //optional, which folder (key prefix) in the bucket to use 
// });

// Data = new FS.Collection("data", {
//   stores: [imageStore]
// });
