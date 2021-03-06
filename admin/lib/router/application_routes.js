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
      return [Meteor.subscribe('notifications'), Meteor.subscribe("followerTopics")]
    }
});


Router.route('verify-email',{
    controller: 'AccountController',
    path: '#/verify-email/:token',
    action: 'verifyEmail'
})

AccountController = RouteController.extend({
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function (err) {
          console.log(err);
          // Router.go('verify');
          if (err != null) {
            if (err.message == 'Verify email link expired [403]') {
              toastr.success('This verification link has expired.')
            }
          } else {
            Router.go('verify');
          }
        });
    }
});

Router.route('/', {
  // name: 'home',
  // layoutTemplate: "home",
  action: function() {
      Router.go("/sign-in");
  }

});


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
    except: ['verify', 'atForgotPwd', 'atResetPwd']
});

Router.plugin('ensureSignedIn', {
  only: ['private', 'verify', 'posts']
});


Router.route("/thankyou",{
  name: 'thankyou',
  layoutTemplate: 'thankyou'
});
