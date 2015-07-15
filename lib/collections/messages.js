Messages = new Mongo.Collection("messages");

Messages.attachSchema(new SimpleSchema({
  name:{
    type: String
  },
  from: {
    type: String,
    autoValue: function(){
      if(this.isInsert)
        return this.userId;
    }
  }
}));