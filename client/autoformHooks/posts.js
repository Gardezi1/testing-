var postHooks = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.userId = Meteor.userId();
      }
      console.log(doc);

      return doc;
    }
  },
  after: {
    insert: function(doc) {
      Router.go('/show');
    }
  }
}
 
AutoForm.addHooks('insertPostForm', postHooks);