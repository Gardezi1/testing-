Template.conversationView.helpers({
  getMessages: function(){
    console.log(Router.current().params["id"])
    return Messages.find({to: Router.current().params["id"]});
  }
});