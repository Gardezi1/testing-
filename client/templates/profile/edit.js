var userHooks = {
  after: {
    update: function(doc, error, result) {

        Router.go('/profile');
    }
  }
}
 
AutoForm.addHooks('editProfile', userHooks);

Template.editProfile.onRendered(function() {
  $('select').material_select();
});

Template.editProfile.events({  
  'click .save-my-profile': function(event) {
    console.log("inn");
    $(".save-profile").click();
  }
});