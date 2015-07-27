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
      return Meteor.user().profile.following;
    }
  },
  getDoctorName: function(uid){
    if(uid){
      return Meteor.users.findOne({_id: uid}).profile.name;
    }
  },
  notCurrentUser: function(uid){
    return Meteor.userId() != uid;
  },
  doctorTopics: function(){
    uid = Session.get("doctorTopicsId");
    if(uid){
      return Meteor.users.findOne({_id: uid}).profile.topics;
    }
  },
  getTopicName: function(tid){
    if(tid){
      return Topics.findOne({_id: tid}).name;
    }
  },
  getImage: function(uid){
    if(uid){
      pid = Meteor.users.findOne({_id: uid}).profile.picture;
    }
    var file = Data.findOne({_id:pid});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/data/"+file._id+"-"+file.name();
        return url;
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
});

Template.nav.events({  
  'click .drop-side': function(event) {
    var id = $(event.target).closest('li').attr('id');
    if(id){
      Session.set('doctorTopicsId', id);
    }
    $(".show-topic").css("visibility", "visible");
  },
  'click .hide-nav': function(event) {
    $('.button-collapse-side').sideNav('hide');
  },
  'click .article-feed': function(event) {
    console.log("okkk");
    $('.button-collapse-side').sideNav('hide');
    var id = $(event.target).closest('li').attr('id');
    console.log(id);
    if(id){
      Session.set('feedTopicsId', id);
    }
  },
  'click .brand-logo': function(event) {

    Session.set('feedTopicsId', "");

  }
});