Router.route("/hcp/approve", {
  name: "adminApproval",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("allUsers")
    ]
  },
  data: function(){
    return Meteor.users.find();
  }
});
