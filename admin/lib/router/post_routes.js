Router.route("article/new",{

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

Router.route("/article/:id/edit", {
  name: "articleEdit",
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

Router.route("/article/:id", {
  name: "articleView",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate]))
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

Router.route('/articles', 'articleList', {
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("Posts"),
      Meteor.subscribe("followerTopics")
    ]
  }
});

Router.route('/article/:id/repost', {
  name: 'rePost',
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate]))
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
    return { posts: Posts.find({_id: this.params.id})};
  }
});

