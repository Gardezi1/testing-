var postHooks = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.userId = Meteor.userId();
      }
      console.log(doc);
      return doc;
    }
  }
}
 
AutoForm.addHooks('insertPostForm', postHooks);
