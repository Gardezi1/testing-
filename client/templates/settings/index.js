Template.settings.helpers({
  userName: function(){
    user = Meteor.users.findOne({_id: Meteor.userId()});
    return user && user.profile.name;
  },
   userEmail: function(){
    user = Meteor.users.findOne({_id: Meteor.userId()});
    return user && user.emails[0].address;
  }
});

Template.settings.events({
  'submit #settings-form': function(e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        name = resetPasswordForm.find('#first_name').val(),
        email = resetPasswordForm.find('#email').val(),
        oldPassword = resetPasswordForm.find('#resetPasswordPassword').val(),
        newPassword = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
        console.log(oldPassword);
        console.log(newPassword);
        if(name){
          Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.name":name}})
        }

        if(email){
          Meteor.call('updateEmail', email);
        }

        if(oldPassword && newPassword){
          Accounts.changePassword(oldPassword, newPassword, function(err) {
            if (err) {
              console.log('We are sorry but something went wrong.');
              sAlert.error(err.reason, {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
            } else {
              console.log('Your password has been changed. Welcome back!');
              sAlert.error('Your password has been changed.', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
            }
          }); 
        } 
  }
});