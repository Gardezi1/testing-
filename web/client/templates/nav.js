
Template.nav.helpers({
  file_S3: function(){
    if(Meteor.user()){
      var path = Meteor.user().profile.picture;
      var file = Data.findOne({_id:path});
      if(file){
        url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
      }
    }
  },
  ifDoctor: function(){
    return Meteor.user().profile.type == "doctor";
  },
  getFollowing: function(){
    uid = Meteor.userId();
    if(uid){
      result = Meteor.users.findOne({_id: uid});
      if(result){
        following = result.profile.following;
        return following;
      }
    }
  },
  checkDevice: function(){
    var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
    console.log(deviceType);
    if (deviceType =="null"){
      console.log("This is niether ipad or iphone or android or blackbary");
    }
    if(deviceType == "iPhone"){
      return "top-space";
    }
    else{
      return "";
    }
  },
  getAdminImage: function(){
    uid = Session.get("docId");
    if(uid && (uid != 99)){
      user = Meteor.users.findOne({_id: uid});
    }
    else{
      user = Meteor.users.findOne({roles: [ROLES.Admin]});
    }

    if(user){
      pic = user.profile.picture;
      var file = Data.findOne({_id:pic});
      if(file){
        url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
      }
    }
  },
  getDoctorName: function(uid){
    if(uid){
      var user = Meteor.users.findOne({_id: uid});
       if(user && user.profile.lastName != undefined)
      return user && user.profile.firstName+" "+user.profile.lastName;
    return user && user.profile.firstName;
      //return user && user.profile.firstName;
    }
  },
  notCurrentUser: function(uid){
    return Meteor.userId() != uid;
  },
  doctorTopics: function(){
    uid = Session.get("doctorTopicsId");
    if(uid){
      Session.set("docId", uid);
      // topics = Meteor.users.findOne({_id: uid});
      topics = FollowerTopics.findOne({$and: [{topicOwnerId: Meteor.userId()}, {topicFollowerId: uid}] });
      if(topics && topics.topics){
        return _.map(topics.topics, function(value, index){
          return {value: value, index: index};
        });
      }
    }
  },
  getDocId: function(){
    if(Session.get("doctorTopicsId") != 99){
      return Session.get("doctorTopicsId");
    }
    else
      return null;
  },
  getTopicName: function(tid){
    if(tid){
      return Topics.findOne({_id: tid}).name;
    }
  },
  getImage: function(uid){
    if(uid){
      var user = Meteor.users.findOne({_id: uid});
      if(user && user.profile.picture){
        pid = user.profile.picture;
        var file = Data.findOne({_id:pid});
        if(file){
          url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
            return url;
        }
      }
    }
  },
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  },
  messageCount: function(){
    //console.log("count"+Messages.find({to: Meteor.user()._id, read: false}).count())
    // var temp = Messages.find({to: Meteor.user()._id, read: false}).fetch();
    // for(var i = 0; i <temp.length ; i ++)
    // {
    //   for(var j = 0; j< temp.length; j++)
    //   {
    //     temp[i].from
    //   }
    // }

    return Messages.find({to: Meteor.user()._id, read: false}).count();
  }
});

Template.nav.onRendered(function() {
  $('.dropdown-button-topic').dropdown();
  $(".button-collapse").sideNav({edge: 'right',closeOnClick: true});
  $('.dropdown-button').dropdown();
  // $(".button-collapse-side").sideNav();
  $('.dropdown-button-side').dropdown();
  $('select').material_select();
  $('.tooltipped').tooltip({delay: 50});
  $('.collapsible').collapsible({accordion : false});
  $('#doc-select').ddslick();
  $('#doc-select li').on("click", function(event){
    var id = $(event.target).closest('.dd-option').find('.dd-option-value').val();
    if(id){
      // if(id == 99){
      //   $('.button-collapse-side').sideNav();
        
      // }
      // Router.go('/doctors');
      Session.set('doctorTopicsId', id);
    }
    $(".show-topic").css("visibility", "visible");
  });
});

Template.nav.events({
  'click .button-collapse-side': function(event) {
    $(".button-collapse-side").sideNav();
   $('#doc-select').ddslick();
    following = Meteor.users.find({_id: Meteor.userId()});
    if(following != undefined){
      $(".dd-option-selected").click();
    }
    $(".button-collapse-side").sideNav('show');
    $('#doc-select li').on("click", function(event){
      var id = $(event.target).closest('.dd-option').find('.dd-option-value').val();
      if(id){
        // if(id == 99){
        //   $('.button-collapse-side').sideNav();
          
        // }
        // Router.go('/doctors');
        Session.set('doctorTopicsId', id);
      }
      $(".show-topic").css("visibility", "visible");
    })
  },
  'click .hide-nav': function(event) {
    $('.button-collapse-side').sideNav('hide');
  },
  'click .article-feed': function(event) {
    $('.button-collapse-side').sideNav('hide');
    $('#slide-out li.active-topic').removeClass('active-topic');
    $(event.target).closest('li').addClass('active-topic');
    var id = $(event.target).closest('li').attr('id');
    if(id){
      Session.set('feedTopicsId', id);
    }
  },
  'click .manageDocTopics': function(event){
    $('.button-collapse-side').sideNav('hide');
  },
  'click .brand-logo': function(event) {
    Session.set('feedTopicsId', "");
    user = Roles.getUsersInRole([ROLES.Admin]);
    if(user){
      Session.set('doctorTopicsId', user.fetch()[0]._id);
    }
    location.reload();
  },
  'click .fa-envelope-o': function(event) {
    Session.set("messageLimit", 5);
    Session.set("conversationLimit", 5);
  },
  'click .normal-nav li a': function(event){
    $(event.target).parent().addClass('selected').siblings().removeClass('selected');
  },
  'click .normal-nav li a b, img': function(event){
    $(event.target).parent().parent().addClass('selected').siblings().removeClass('selected');
  },
  'click .normal-nav li a img': function(event){
    $(event.target).parent().parent().addClass('selected').siblings().removeClass('selected');
  }
});
