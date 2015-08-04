Template.nav.helpers({
  file_S3: function(){
    var path = Meteor.user().profile.picture;
      var file = Data.findOne({_id:path});
      if(file){
        url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
      }
    },
  ifDoctor: function(){
    return Meteor.user().profile.type == "doctor";
  },
  getFollowing: function(){
    if(Meteor.user()){
      uid = Meteor.userId();
      result = Meteor.user().profile.following;
      var index = result.indexOf(uid);
      result.splice(index, 1);;
      return result;
    }
  },
  getDoctorName: function(uid){
    if(uid){
      var user = Meteor.users.findOne({_id: uid});
      return user && user.profile.name;
    }
  },
  notCurrentUser: function(uid){
    return Meteor.userId() != uid;
  },
  doctorTopics: function(){
    uid = Session.get("doctorTopicsId");
    if(uid){
      topics = Meteor.users.findOne({_id: uid});
      if(topics && topics.profile.topics){
        return _.map(topics.profile.topics, function(value, index){
          return {value: value, index: index};
        });
      }
    }
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

  }  
});

Template.nav.onRendered(function() {
  $('.dropdown-button-topic').dropdown();
  $(".button-collapse").sideNav();
  $('.dropdown-button').dropdown();
  $(".button-collapse-side").sideNav();
  $('.dropdown-button-side').dropdown();
  $('select').material_select();
  $('.tooltipped').tooltip({delay: 50});
  $('.collapsible').collapsible({accordion : false});
  $('#doc-select').ddslick();
});

Template.nav.events({
  'change #doc-select': function(event) {
    console.log("innnn");
  },  
  'click .hide-nav': function(event) {
    $('.button-collapse-side').sideNav('hide');
  },
  'click .article-feed': function(event) {
    $('.button-collapse-side').sideNav('hide');
    $('#slide-out li.active-topic').removeClass('active-topic');
    $(event.target).closest('li').addClass('active-topic');
    var id = $(event.target).closest('li').attr('id');
    console.log(id);
    if(id){
      Session.set('feedTopicsId', id);
    }
  },
  'click .brand-logo': function(event) {
    Session.set('feedTopicsId', "");
  },
  'click .dd-options li:last-child': function(event) {
    console.log("inn");
    Router.go('/doctors')
  }
});