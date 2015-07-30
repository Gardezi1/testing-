Router.route('/invite/advocate', {
  name: 'inviteAdvocate',
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor])){
      this.next();
    }
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("invites")
    ]
  },
});

Router.route('sign-up/:token', {
  name: 'signup',
  onBeforeAction: function() {
    Session.set('betaToken', this.params.token);
    this.next();
  }
});

Router.route("/join-circle/:id", {

  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Advocate])){
      user = Meteor.users.findOne({_id: this.params.id});
      if(user){
        Meteor.users.update(Meteor.userId(), { $addToSet: { "profile.following": this.params.id}});
        Router.go('/doctors');
      }
      else
        this.render('pageNotFound');
    }
    else
      this.render("/pageNotAuthorize");
  }
});