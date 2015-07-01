var postHooks = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.userId = Meteor.userId();
      }
      debugger
      return doc;
    }
  },
  after: {
    insert: function(doc) {
      debugger
      Router.go('/show');
    }
  }
}
 
AutoForm.addHooks('insertPostForm', postHooks);