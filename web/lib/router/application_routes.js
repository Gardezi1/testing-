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
  name: 'home',
  // layoutTemplate: "home",
  action: function() {
    if (Meteor.settings && Meteor.settings.public.comingSoon)
      this.layout('comingSoon');
    else if (!Meteor.user()) {
      this.layout('home');
      // Router.go("/sign-in");
      this.next();
    }
    else{
      Router.go("/articles");
    }
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


Router.onAfterAction(function(){
    var routeName = Router.current().route.getName();
    if ( routeName.indexOf("adminDashboard") == 0 ) {
        $("head #injectedBootstrap").remove(); //removes duplicates
        $("head").append($("<link rel='stylesheet' id='injectedBootstrap' href='/css/bootstrap.min.css' type='text/css' media='screen' />"));
        $("head #injectedBootstrapJs").remove(); //removes duplicates
        $("head").append($("<script type='text/javascript' src='/js/bootstrap.min.js'></script>"));
    }
});

Router.configureBodyParsers = function() {
  Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
    extended: true,
    limit: '500mb'
  }));
};


Router.route('/test', {
  name: 'test',
  // layoutTemplate: "home",
  action: function() {
    this.layout('test');
      Session.set("vidResponse", this.request.body);
      console.log(this.request.body);
      this.next();
  }

});