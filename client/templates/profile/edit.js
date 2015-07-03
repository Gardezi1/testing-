var userHooks = {
  after: {
    update: function(doc) {
      console.log(doc);
      Router.go('/profile');
    }
  }
}
 
AutoForm.addHooks('editProfile', userHooks);
