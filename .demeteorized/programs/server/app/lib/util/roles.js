(function(){ROLES = {
  Admin :'admin',
  Doctor : 'doctor',
  Advocate : 'advocate',
  authorize : function (roles){
    return Roles.userIsInRole(Meteor.userId(), roles)
  }
}

})();
