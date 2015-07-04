var postHooks = {
  before: {
    insert: function(doc, template) {
      if(Meteor.userId()){
        doc.userId = Meteor.userId();
      }
        // debugger
        return doc;
      
    }
  },
  after: {
    insert: function(error, result, template) {
      // debugger
      if(error){
        console.log("after");
        console.log(error);
      }
      else{
        Router.go('/articles');
      }
      
    }
  }
}
 
AutoForm.addHooks('insertPostForm', postHooks);