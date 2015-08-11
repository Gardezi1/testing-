Schema = {};

Schema.UserProfile = new SimpleSchema({
  picture: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'data'
      }
    }
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  code_verified: {
    type: Boolean
  },
  code: {
    optional: true,
    type: Number
  },
  speciality: {
    type: String,
    label: "Speciality",
    optional: true
  },
  phone: {
    type: String,
    label: "Contact Phone Number"
  },
  addressOne: {
    type: [Number],
    optional: true,
    decimal: true,
    autoform: {
      label: false,
      type: 'map',
      afFieldInput: {
        geolocation: true,
        searchBox: true,
        autolocate: true
      }
    }
  },
  // addressOne: {
  //   type: String,
  //   optional: true,
  //   label: "Address Line 1"
  // },
  addressTwo: {
    type: String,
    optional: true,
    label: "Address Line 2"
  },
  city: {
    type: String,
    optional: true,
    label: "City"
  },
  state: {
      type: String,
      label: "State",
      optional: true,
      allowedValues: ['State 1', 'State 2']
  },
  dob: {
    type: String,
    optional: true,
    // autoform: {
    //   afFieldInput: {
    //     type: 'time'
    //   }
    // }
  },
  zipcode: {
    type: String,
    optional: true,
    label: "Zipcode"
  },
  bio: {
    type: String,
    optional: true
  },
  following: {
    type: [String],
    optional: true
  },
  followingTopics: {
    type: [Object],
    optional: true
  },
  'followingTopics.$.userId': {
    type: String,
    optional: true
  },
  'followingTopics.$.topics': {
    type: [String],
    optional: true
  },
  followers: {
    type: [String],
    optional: true
  },
  // doctorCircle: {
  //   type: String,
  //   optional: true
  // },
  firstCircle: {
    type: [String],
    optional: true
  },
  secondCircle: {
    type: [String],
    optional: true
  },
  topics: {
    type: [String],
    optional: true
  }
});

Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    emails: {
        type: [Object],

        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean,
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    }
});


Meteor.users.attachSchema(Schema.User);

Meteor.users.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function(userId, doc){
    return true;
  }
});


var imageStore = new FS.Store.S3("profileImages", {
  accessKeyId: "AKIAI5HRPLEJZQ5LOG4Q", //required if environment variables are not set
  secretAccessKey: "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", //required if environment variables are not set
  bucket: "medcircle", //required
  folder: "upload" //optional, which folder (key prefix) in the bucket to use 
});

Data = new FS.Collection("data", {
  stores: [imageStore]
});