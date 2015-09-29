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
            // var birthday_month = event.target.birthday.value;
            // var birthday_day = event.target.birthday_day.value;
            // var birthday_year = event.target.birthday_year.value;
            // var dob = birthday_day +'-'+birthday_month+'-'+birthday_year
            var dob = event.target.birthDate.value;
          
            var v = Meteor.call('locationSpecification', event.target.geomap.value);

            Meteor.users.update(Meteor.userId(), {$set: {"profile.zipcode": zipcode}});
            Meteor.users.update(Meteor.userId(), {$set: {"profile.dob" :dob}});
            Meteor.users.update(Meteor.userId(), {$set: {"profile.code_verified" :true}});
            Meteor.users.update(Meteor.userId(), {$set: {"emails.[0].verified" :true}});
            topics = Topics.find().fetch();
            topic_list = [];
            var groupedDates = _.groupBy(_.pluck(topics, '_id'));
            _.each(_.values(groupedDates), function(topic) {
              topic_list.push(topic[0]);
            });
            Meteor.users.update(Meteor.userId(), {$addToSet: {"profile.topics" :{$each: topic_list}}});
            Router.go('/doctors');
        }
    });

    Template.verifyAdvocate.events({
        'submit form': function(event) {
            event.preventDefault();
                

            var phonecode = event.target.phonecode.value;
            if(phonecode != Meteor.user().profile.code){
                sAlert.error('Wrong Code.  :-/', {effect: 'genie', position: 'top-right', timeout: 5000, onRouteClose: false, stack: false, offset: '80px'});
            }
            else{
                Meteor.users.update(Meteor.userId(), {$set: {"profile.code_verified": true}});       
                var zipcode = event.target.zipcode.value;
                // var birthday_month = event.target.birthday.value;
                // var birthday_day = event.target.birthday_day.value;
                // var birthday_year = event.target.birthday_year.value;
                var gender = event.target.gender.value;
                // var dob = birthday_day +'-'+birthday_month+'-'+birthday_year
                var dob = event.target.birthDate.value;

                Meteor.users.update(Meteor.userId(), {$set: {"profile.zipcode": zipcode}});
                Meteor.users.update(Meteor.userId(), {$set: {"profile.dob" :dob}});
                Meteor.users.update(Meteor.userId(), {$set: {"profile.gender" :gender}});
                Router.go('/doctors');
            }
        }
    });
}