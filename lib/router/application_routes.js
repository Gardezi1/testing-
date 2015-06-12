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

Router.route('/add', 'posts');
Router.route('/posts/:_id', function () {
  var item = Posts.findOne({_id: this.params._id});
  this.render('post', {data: item});
}, {
  name: 'post.show'
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