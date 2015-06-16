Template.show.helpers({
    list: function() {
      console.log(Posts.find());
    return Posts.find(); 
  },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        if (confirm('Really delete "' + doc.title + '"?')) {
          this.remove();
        }
      };
    }
})