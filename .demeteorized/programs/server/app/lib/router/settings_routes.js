(function(){Router.route('/settings', {
  name: 'settings',
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate])){
      this.next();
    }
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("userSettings")
    ]
  },
});

})();
