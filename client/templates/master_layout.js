Template.masterLayout.events({  
  'click .save-my-profile': function(event) {
    $(".save-profile").click();
  },
  'click .back-btn': function(e){
    $('.normal-nav li').removeClass('selected');
  },
  'click #backToNav': function(){
   $(".button-collapse-side").sideNav('show');
  },
  'click #backToNavFromDrSearch': function(){
     $(".button-collapse-side img").click();
   // $(".button-collapse-side").sideNav('show');
  },
  'click .button-collapse-side img': function(event) {
    console.log("inside master");
    // $(".button-collapse-side").sideNav();
   $('#doc-select').ddslick();
    following = Meteor.users.find({_id: Meteor.userId()});
    if(following != undefined){
      $(".dd-option-selected").click();
    }
    // $(".button-collapse-side").sideNav('show');
    $('#doc-select li').on("click", function(event){
      var id = $(event.target).closest('.dd-option').find('.dd-option-value').val();
      if(id){
        if(id == 99){
          $('.button-collapse-side').sideNav('hide');
          Router.go('/doctors');
        }
        Session.set('doctorTopicsId', id);
      }
      $(".show-topic").css("visibility", "visible");
    })
  },
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
