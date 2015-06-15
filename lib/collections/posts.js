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
    optional: true,
    label: "Article Type",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "type 1", value: 2013},
          {label: "type 2", value: 2014},
          {label: "type 3", value: 2015}
        ];
      }
    }
  },
  postto: {
    type: String,
    optional: true,
    label: "Post To",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "1st Circle", value: 1},
          {label: "2nd Circle", value: 2}
        ];
      }
    }
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
