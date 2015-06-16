Posts = new Mongo.Collection("posts");
Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  source: {
    type: String,
    label: "source"
  },
  url: {
    type: String,
    label: "source URL"
  },
  articleType: {
    type: String,
    label: "Article Type",
    allowedValues: ['type 1', 'type 2', 'type 3', 'type 4'],
  },
  postto: {
    type: String,
    label: "Post To",
    allowedValues: ['1st Circle', '2nd Circle'],
  },
  body: {
    type: String,
    label: "Body",
    max: 2000,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 10,
        class: "foo"
      }
    }
  },
  comment: {
    type: String,
    label: "Add Comments",
    max: 200
  }
}));

Posts.allow({
  insert:function(userId,project){
    return true;
  },
  update:function(userId,project,fields,modifier){
   return true;
  },
  remove:function(userId,project){
    return true;
  },
})
