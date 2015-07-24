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
      // return Posts.find({$and: [{tid: { $in: articleTopic}},{articleCategory: type}] });
      return Posts.find({$and: [{authorId: uid}, {articleCategory: type}, {articleTopic: tid} ]});
    }
    else
      return Posts.find({articleCategory: type});
  },
  getAuthorName: function(authorId){
    return Meteor.users.findOne({_id: authorId}).profile.name;
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
  $('.tooltipped').tooltip({delay: 50});
});