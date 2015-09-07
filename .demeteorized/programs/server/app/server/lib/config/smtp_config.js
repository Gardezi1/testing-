(function(){Meteor.startup(function () {
  smtp = {
      username:  'medcircle.staging@gmail.com',
      password:  'medcircle2015',
      server:   'smtp.gmail.com',
      port: 25
  }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

})();
