Template.masterLayout.events({  
  'click .save-my-profile': function(event) {
    $(".save-profile").click();
  },
  'click .back-btn': function(e){
    $('.normal-nav li').removeClass('selected');
  }
  // 'click .start-follow': function(e){
  //   var id = $(".start-follow").attr('id');
  //   console.log(id);
  //   e.preventDefault();
  //   Meteor.call('addToFollowing', id, function(id,error, result){
  //     if(error){
  //       console.log("error from addToFollowing: ", error);
  //     } else {
  //       location.reload();
  //     } 
  //   });
  // },
  // 'click .start-unfollow': function(e){
  //   var id = $(".start-unfollow").attr('id');
  //   console.log(id);
  //   e.preventDefault();
  //   Meteor.call('removeFromFollowing', id, function(id,error, result){
  //     if(error){
  //       console.log("error from removeFromFollowing: ", error);
  //     } else {
  //       location.reload();
  //     } 
  //   });
  // }
});