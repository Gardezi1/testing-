Accounts.onLogin(function (info) {
  var user = info.user;
  if(user.profile.type === "doctor"){
    Roles.addUsersToRoles(user, [ROLES.Doctor])
    }
  else if(user.profile.type === "advisor"){
    Roles.addUsersToRoles(user, [ROLES.Advisor])
    }
    return user;
  });
