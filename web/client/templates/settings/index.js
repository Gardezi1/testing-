Template.settings.helpers({
  firstName: function(){
    user = Meteor.users.findOne({_id: Meteor.userId()});
    return user && user.profile.firstName;
  },
  lastName: function(){
    user = Meteor.users.findOne({_id: Meteor.userId()});
    return user && user.profile.lastName;
  },
   userEmail: function(){
    user = Meteor.users.findOne({_id: Meteor.userId()});
    return user && user.emails[0].address;
  }
});
Template.settings.onRendered(function (){ 
  $('.modal-trigger').leanModal({
      dismissible: false
    })
});
Template.settings.events({
  'submit #settings-form': function(e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        name = resetPasswordForm.find('#first_name').val(),
        last_name = resetPasswordForm.find('#last_name').val(),
        email = resetPasswordForm.find('#email').val(),
        oldPassword = resetPasswordForm.find('#resetPasswordPassword').val(),
        newPassword = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

        if(name){
          Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.firstName":name, "profile.lastName": last_name}})
        }

        if(email){
          Meteor.call('updateEmail', email);
        }

        if(oldPassword && newPassword){
          Accounts.changePassword(oldPassword, newPassword, function(err) {
            if (err) {
              console.log('We are sorry but something went wrong.');
              sAlert.error(err.reason, {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
            } else {
              console.log('Your password has been changed. Welcome back!');
              sAlert.error('Your password has been changed.', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
            }
          }); 
        } 
  },
  'click #deactive':function(){
      $('#modal1').openModal();
  },
  'click #deactivate':function(){
       Meteor.call("removeUser",Meteor.user()._id);
       $('#modal1').closeModal();
       $('#modal2').openModal();
  },
  'click #cancle':function(){
     $('#modal1').closeModal();
  },
  'click #okay':function(){
    $('#modal2').closeModal();
    window.location.href="/";
  }
});