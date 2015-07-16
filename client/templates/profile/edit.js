var userHooks = {
  after: {
    update: function(doc, error, result) {

        Router.go('/profile');
    }
  }
}
 
AutoForm.addHooks('editProfile', userHooks);

Template.editProfile.helpers({
  ifDoctor: function(){ 
   return Meteor.user().profile.type == "doctor";
  }
});

Template.editProfile.onRendered(function() {
  $('select').material_select();
});