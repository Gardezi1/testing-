Template.verify.helpers({
  verify: function() {
    if(Meteor.user().profile.type === 'doctor') {
      return true;
    } else {
      return false;
    }
  }
});

Template.verify.onRendered(function() {
  $('select').material_select();
});