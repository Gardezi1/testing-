Template.verify.helpers({
  verify: function() {
    if(Meteor.user().profile.type === 'doctor') {
      return true;
    } else {
      return false;
    }
  }
});