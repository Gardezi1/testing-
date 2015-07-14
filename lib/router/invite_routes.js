Router.route('/invite/advocate', {
  name: 'inviteAdvocate',
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Doctor])){
      this.next();
    }
    else
      this.render("/pageNotAuthorize");
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