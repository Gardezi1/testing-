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

Template.editProfile.rendered = function(){
  var user = Meteor.users.findOne({_id: Meteor.userId() });
  $("#gender input[value='"+user.profile.gender+"']").prop("checked", true)
}
