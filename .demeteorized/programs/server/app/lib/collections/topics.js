(function(){Topics = new Mongo.Collection("topics");

Topics.attachSchema(new SimpleSchema({
  name:{
    type: String
  }
}));

})();
