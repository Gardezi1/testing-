Router.route("post/new",{

  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor]))
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

Router.route("/posts/:id/edit", {
  name: "postEdit",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor]))
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
    return Posts.findOne({_id: this.params.id});
  }
});

Router.route("/post/:id", {
  name: "postView",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor]))
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
    return Posts.findOne({_id: this.params.id});
  }
});

Router.route('/show', 'show', {
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor]))
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
