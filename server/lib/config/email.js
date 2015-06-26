
Accounts.emailTemplates.siteName = "Medcircle";

Accounts.emailTemplates.from = "Medcircle <no-reply@medcircle.com>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for " + user.profile.name;
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
  var signature = "MySite Bot";
  return "Dear " + user.profile.name + ",\n\n" +
    "Click the following link to set your new password:\n" +
    url + "\n\n" +
    "Please never forget it again!!!\n\n\n" +
    "Cheers,\n" +
    signature;
};
