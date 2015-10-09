
Template.verifyAdvocate.onRendered(function() {
  $('select').material_select();
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#geomaping").geocomplete();
    }
  });
});

Template.verifyAdvocate.helpers({
  phcode: function() {
    return Meteor.user().profile.code;
  }
});


