Template.verifyAdvocate.helpers({
  phcode: function() {
    return Meteor.user().profile.code;
  }
});