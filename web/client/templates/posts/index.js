Template.articleList.helpers({
  beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.title + '"?')) {
        this.remove();
      }
    };
  },
  file_S3: function(){
    var file = Files.findOne({_id:this.fileId});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/files/"+file._id+"-"+file.name();
      return url;
    }
  },
  video_S3: function(){
    var file = VideoFiles.findOne({_id:this.videoId});
    if(file){
      url = "https://s3.amazonaws.com/medcircle/upload/Videofiles/"+file._id+"-"+file.name();
      return url;
    }
  },
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        // center: new google.maps.LatLng(Session.get('lat') , Session.get('lon')),
        zoom: 13
      };
    }
  },

  getArticlesByCategory: function(type){
    // console.log(type + "type was called")
    tid = Session.get("feedTopicsId");
    uid = Session.get("doctorTopicsId");
    if(tid && uid){
      post_lists = [];
      post = Posts.find({$and: [{authorId: uid}, {articleCategory: type}, {articleTopic: tid} ]}).fetch();
      if(post.length != 0){
        $('ul.article-tabs').tabs('select_tab', type);
      }
      post_lists.push(post);

      return post_lists;
      // return Posts.find({$and: [{authorId: uid}, {articleCategory: type}, {articleTopic: tid} ]});
    }
    else{

      var topics_list = FollowerTopics.find({topicOwnerId: Meteor.userId()}).fetch();
      post_list = [];
      var groupedDates = _.groupBy(_.pluck(topics_list, 'topicFollowerId'));
      _.each(_.values(groupedDates), function(followId) {
        topics = FollowerTopics.findOne({$and: [{topicOwnerId: Meteor.userId()}, {topicFollowerId: followId[0]}] }).topics;
        result = Posts.find({$and: [{authorId: followId[0]}, {articleTopic: {$in: topics}}, {articleCategory: type}]});
        post_list.push(result);
      });
      return post_list;
    }


      // return Posts.find({articleCategory: type});
  },
  getAuthorName: function(authorId){
    if(authorId){
      user = Meteor.users.findOne({_id: authorId});
      if(user.profile.lastName != undefined)
      return user && user.profile.firstName+" "+user.profile.lastName;
    return user && user.profile.firstName;
    }
  },
  checkIfAuthor: function(authorId){
    return authorId == Meteor.userId();
  },
  getArticleName: function(tid){
    if(tid){
      topic = Topics.findOne({_id: tid});
      if(topic)
        return topic.name;
    }
    else{
      return [];
    }
  },
  checkIfVideo: function(id){
    if(id)
      return "myVideo";
    else
      return "";
  },
  imageOpacity: function(id){
    if(id)
      return "image-opacity";
    else
      return "";
  }
});

Template.articleList.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  //var infowindow = new google.maps.InfoWindow();
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var image ='imgs/pin2.png';
    var markers = [];
    var marker = new google.maps.Marker({
      position: {lat:Meteor.user().profile.lat , lng:Meteor.user().profile.lon},
      map: map.instance
    });
    var temp = Meteor.users.find({"profile.type":"doctor"}).fetch();
    for(var i = 0 ; i <temp.length ; i++)
    {
      var obj = {};
      obj.lat = temp[i].profile.location.coordinates[1];
      obj.lng = temp[i].profile.location.coordinates[0];
      markers.push(new google.maps.Marker({
        position: obj,
        map:  map.instance,
        animation: google.maps.Animation.DROP,
        icon: image
      }));
      attachSecretMessage(markers[i], temp[i].profile.address);
    }
  });

function attachSecretMessage(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}

});

Template.articleList.onRendered(function() {
  $('ul.tabs').tabs();
  var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
  if(deviceType != "iPhone"){
    $('.tooltipped').tooltip({delay: 50});
  }
});

Template.articleList.events({
  'click .pluse-icon': function(event) {
    $('.pluse-icon').tooltip( "close");
  }
});
