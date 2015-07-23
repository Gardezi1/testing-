Router.route('/doctors', {
  name: 'doctorsListing'
});


Router.route("/doctor/:id", {
  name: "doctorView",
  onBeforeAction: function(){
    if(Roles.userIsInRole(Meteor.userId(), [ROLES.Admin, ROLES.Doctor]))
      this.next();
    else
      this.render("/pageNotAuthorize");
  },
  waitOn: function(){
    return [
      Meteor.subscribe("allUsers")
    ]
  },
  data: function(){
    return Meteor.users.findOne({_id: this.params.id});
  }
});