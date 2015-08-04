Template.masterLayout.events({  
  'click .save-my-profile': function(event) {
    $(".save-profile").click();
  },
  'click .start-follow': function(e){
    var id = $(".start-follow").attr('id');
    console.log(id);
    e.preventDefault();
    Meteor.call('addToFollowing', id, function(id,error, result){
      if(error){
        console.log("error from addToFollowing: ", error);
      } else {
        // console.log(id);
      } 
    });
  },
  'click .start-unfollow': function(e){
    var id = $(".start-unfollow").attr('id');
    console.log(id);
    e.preventDefault();
    Meteor.call('removeFromFollowing', id, function(id,error, result){
      if(error){
        console.log("error from removeFromFollowing: ", error);
      } else {
        // console.log(id);
      } 
    });
  }
});

Template.masterLayout.onRendered(function() {

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

});