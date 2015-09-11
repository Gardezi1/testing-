Messages = new Mongo.Collection("messages");

Messages.attachSchema(new SimpleSchema({
  conversationId:{
    type: String
  },
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
  read: {
    type: Boolean
  }
}));

Messages.allow({
  insert: function(userId, obj) {
    return true;
  },
  update:function(userId,doc){
    return true;
  },
  remove:function(userId,project){
    return true;
  }
});