if (Meteor.isClient) {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          console.log('Sorry this verification link has expired.')
        }
      } else {

        Router.go('/verify');
      }
    });
  }
    Template.verifyDoctor.events({
        'submit form': function(event) {
            event.preventDefault();
            var zipcode = event.target.zipcode.value;
            var birthday_month = event.target.birthday.value;
            var birthday_day = event.target.birthday_day.value;
            var birthday_year = event.target.birthday_year.value;
            var dob = birthday_day +'-'+birthday_month+'-'+birthday_year
          
            Meteor.users.update(Meteor.userId(), {$set: {"profile.zipcode": [zipcode], "profile.dob": [dob], "profile.code_verified": [true]}});
            Meteor.users.update(id, {$set: {"emails.$.verified" :true}});
            Router.go('/');
        }
    });

    Template.verifyAdvocate.events({
        'submit form': function(event) {
            event.preventDefault();
            var phonecode = event.target.phonecode.value;
            if(phonecode != Meteor.user().profile.code){
                sAlert.error('Wrong Code.  :-/', {effect: 'genie', position: 'top-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
            }
            else{
                Meteor.users.update(Meteor.userId(), {$set: {"profile.code_verified": [true]}});
                Router.go('/');
            }
        }
    });
}