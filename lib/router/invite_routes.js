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
    token = this.params.token.split('-')[0];
    inviteId = this.params.token.split('-')[1];
    Session.set('betaToken', token);
    Session.set('inviteOwnerId', inviteId);
    ServerSession.set("inviteId", inviteId);
    this.next();
  }
});