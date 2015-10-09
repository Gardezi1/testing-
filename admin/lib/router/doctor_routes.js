Router.route('/doctors', {
  name: 'doctorsListing',
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("doctorUsers")
    ]
  }
});


Router.route("/doctor/:id", {
  name: "doctorView",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor, ROLES.Advocate]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("doctorUsers")
    ]
  },
  data: function(){
    return Meteor.users.findOne({_id: this.params.id});
  }
});