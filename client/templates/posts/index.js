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
  getArticlesByCategory: function(type){
    tid = Session.get("feedTopicsId");
    uid = Session.get("doctorTopicsId");
    if(tid && uid){
      post_lists = [];
      console.log(type);
      post = Posts.find({$and: [{authorId: uid}, {articleCategory: type}, {articleTopic: tid} ]}).fetch();
      console.log(post);
      post_lists.push(post);
      return post_lists;
      // return Posts.find({$and: [{authorId: uid}, {articleCategory: type}, {articleTopic: tid} ]});
    }
    else{
      var topics_list = FollowerTopics.find({topicOwnerId: Meteor.userId()}).fetch();
      post_list = [];
      var groupedDates = _.groupBy(_.pluck(topics_list, 'topicFollowerId'));
      _.each(_.values(groupedDates), function(followId) {
        topics = FollowerTopics.findOne({topicFollowerId: followId[0]}).topics;
        result = Posts.find({$and: [{authorId: followId[0]}, {articleTopic: {$in: topics}}, {articleCategory: type}]});
        result.forEach(function(topic){
          post_list.push(result);
        });
        
      });
      return post_list;
    }
      // return Posts.find({articleCategory: type});
  },
  getAuthorName: function(authorId){
    if(authorId){
      return Meteor.users.findOne({_id: authorId}).profile.name;
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
  }  

});

Template.articleList.onRendered(function() {
  $('ul.tabs').tabs();
});