
    // var adminUser = Meteor.users.findOne({roles:{$in:["admin"]}});

    // if(!adminUser){
    //   adminUser = Accounts.createUser({
    //     email: "mohsin.rafi@kwanso.com",
    //     password: "admin",
    //     profile: { name: "admin" }
    //   });
    //   Roles.addUsersToRoles(adminUser, [ROLES.Admin]);
      
    // }

    Accounts.onLogin(function (info) {
      var user = info.user;
      if(user.profile.type === "doctor"){
        Roles.addUsersToRoles(user, [ROLES.Doctor])
      }
      else 
        if(user.profile.type === "advisor"){
          Roles.addUsersToRoles(user, [ROLES.Advisor])
          }
      return user;
    });
