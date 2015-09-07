(function(){Router.route("/topics",{
  name: "topicsListing",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("Topics")
    ]
  },
  data: function(){
    return { topics: Topics.find()};
  }
});

Router.route("/topics/:id", {
  name: "topicsView",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("followerTopics")
    ]
  }
});

})();
