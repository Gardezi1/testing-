Template.startConversation.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 3,
      rules: [
        {
          // token: '@',
          collection: Meteor.users,
          field: 'profile.name',
          template: Template.userPill
        }
      ]
    };
  }
});