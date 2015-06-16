var postHooks = {
  after: {
    update: function(doc) {
      Router.go('/show');
    }
  }
}
 
AutoForm.addHooks('updatePostForm', postHooks);
