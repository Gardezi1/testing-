Messages = new Mongo.Collection("messages");

Messages.attachSchema(new SimpleSchema({
  name:{
    type: String
  },
  from: {
    type: String,
  },
  to: {
    type: String
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
  }
}));