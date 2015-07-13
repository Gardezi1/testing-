Router.route("/topics",{
  name: "topicsListing",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor]))
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