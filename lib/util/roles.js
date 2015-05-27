ROLES = {
  Admin :'admin',
  Doctor : 'doctor',
  Advisor : 'advisor',
  authorize : function (roles){
    return Roles.userIsInRole(Meteor.userId(), roles)
  }
}