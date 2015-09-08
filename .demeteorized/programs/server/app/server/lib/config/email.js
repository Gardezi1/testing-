(function(){
Accounts.emailTemplates.siteName = "Medcircle";

Accounts.emailTemplates.from = "Medcircle <no-reply@medcircle.com>";

Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  return "Dear " + user.profile.firstName + ",\n\n" +
    'To verify your account email, simply click the link below. ' + url +
    "\n\n" + "Thanks";
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for " + user.profile.firstName;
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
  var signature = "MySite Bot";
  return "Dear " + user.profile.firstName + ",\n\n" +
    "Click the following link to set your new password:\n" +
    url + "\n\n" +
    "Please never forget it again!!!\n\n\n" +
    "Cheers,\n" +
    signature;
};
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Hi, " + user.profile.firstName;
};

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "Congratulations..! You just receive invitation request."
     + " To accept invitation, simply click the link below:\n\n"
     + url;
};

})();
