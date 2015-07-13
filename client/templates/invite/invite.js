Template.invite.events({
      'click #invite-advocate-by-email': function (e) {
        var inviteForm = $(e.currentTarget);
        console.log("inn");
            mail = $("#user-email").val();
            console.log(mail);
        var email = {
            to: mail,
            from: 'mistertestkwanso@gmail.com',
            replyTo: 'mistertestkwanso@gmail.com',
        };
        Meteor.call('sendEmail', this.userId, email);
      },
      'click #invite-advocate-by-phone': function (e) {
        var inviteForm = $(e.currentTarget);
        console.log("inn");
            mail = $("#user-phone").val();
      //   var email = {
      //       to: 'xyz@failtracker.com',
      //       from: 'abc@failtracker.com',
      //       replyTo: 'abct@failtracker.com',
      //       subject: "test email",
      //       text: "hello lover boy"
      //   };
      //   Meteor.call('sendEmail', this.userId, email);
      }

});