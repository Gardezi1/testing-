Router.route("/start/conversation",{
  name: "startConversation",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("Messages")
    ]
  },
  data: function(){
    return Messages.find();
  }
});

Router.route("/view/conversation", {
  name: "conversationView",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("Messages")
    ]
  },
  data: function(){
    return Messages.find();
  }
});