Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    notAuthorizeTemplate: 'pageNotAuthorize',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'}
    },
    waitOn: function() { 
      return [Meteor.subscribe('notifications')]
    }
});


// Router.route('/', {
//   name: 'home',
// });

Router.route('/', {
  name: 'home',
  waitOn: function(){
    return [
      Meteor.subscribe("allUsers")
    ]
  },
  data: function(){
    return { users: Meteor.users.find()};
  }
});

// Router.route('/', function () {
//   this.render('home', {});
// });

Router.onBeforeAction('loading');

Router.map(function() {
    this.route('private');
    this.route('verify');
});



var OnBeforeActions;

OnBeforeActions = {
  loginRequired: function() {
    if (!Meteor.userId() || Meteor.user().profile.code_verified) {
      this.render('pageNotFound');
      this.next();
    }
    else{
      Router.go('verify');
      this.next();
      // this.render('verify');
    }
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    except: ['verify']
});

Router.plugin('ensureSignedIn', {
  only: ['private', 'verify', 'posts']
});
