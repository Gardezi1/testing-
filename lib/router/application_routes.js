Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    notAuthorizeTemplate: 'pageNotAuthorize',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });

    this.route('private');
    this.route('verify');
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

// Router.route('/post/edit/:_id', function () {
//   var item = Posts.findOne({_id: this.params._id});
//   this.render('psost', {data: item});
// },
//  {
//   name: 'post.show'
// });

Router.route("/posts/:id/edit", {
  name: "postEdit",
  onBeforeAction: function(){
    console.log(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor]))
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

var OnBeforeActions;

OnBeforeActions = {
  loginRequired: function(pause) {
    if (!Meteor.userId() || Meteor.user().profile.code_verified) {
      this.render('pageNotFound');
      return pause();
    }
    else{
      this.render('verify');
    }
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['verify']
});

Router.plugin('ensureSignedIn', {
  only: ['private', 'verify', 'posts']
});
