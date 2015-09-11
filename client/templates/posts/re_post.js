Template.rePost.helpers({
  getThisPost: function(){
    return Posts.findOne({_id: Router.current().params["id"] });
  }
});

Template.rePost.onRendered(function() {
  $('select').material_select();
});

Template.rePost.events({
  'submit #rePostForm': function(event) {
    event.preventDefault();
    var title = event.target.articleTitle.value;
    var source = event.target.articleSource.value;
    var group = event.target.articleGroup.value;
    var comment = event.target.articleComment.value;
    var id = event.target.articleId.value;
    var article = Posts.findOne({_id: id});
    Posts.insert({'fileId':article.fileId ,'title':title,'source':source, 'url': article.url,'articleTopic': article.articleTopic, 'articleType': article.articleType, 'articleCategory': article.articleCategory,'postTo':group,'body': article.body, 'comment': comment});
    Router.go('/articles');
  },
});