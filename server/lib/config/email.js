
Accounts.emailTemplates.siteName = "Kwanso";

Accounts.emailTemplates.from = "kwanso <no-reply@kwanso.com>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for " + user.profile.name;
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
  var signature = "MySite Bot";
  //var president = President.findOne();
  //if (president)
  //    president = Meteor.users.findOne(president.presidentId);
  //    signature = president.profile.displayName + ", the MySite President.";

  return "Dear " + user.profile.name + ",\n\n" +
    "Click the following link to set your new password:\n" +
    url + "\n\n" +
    "Please never forget it again!!!\n\n\n" +
    "Cheers,\n" +
    signature;
};

