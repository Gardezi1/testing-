Router.route("/posts",{

  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("Posts")
    ]
  },
  data: function(){
    return { posts: Posts.find()};
  }
});
