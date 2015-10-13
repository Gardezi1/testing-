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
     $(".button-collapse-side").click();
   // $(".button-collapse-side").sideNav('show');
  },
  'click .button-collapse-side': function(event) {
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
  'click .where': function(){
    var lat = Meteor.user().profile.lat;
    var lon = Meteor.user().profile.lon;
    google.maps.event.trigger(GoogleMaps.maps.exampleMap.instance , 'resize');
    GoogleMaps.maps.exampleMap.instance.setCenter({lat:lat , lng:lon});
  },
  'click .video-holder':function(e){
    if(e.target.tagName == "DIV"){
      $('#'+e.target.id).css("display","none")
      $(".video-holder #"+ e.target.id).siblings().first().css("display" , "none");
      $('#playVideo-'+ e.target.id.split("-")[1]).css("display","block");
      var vid = document.getElementById('playVideo-'+ e.target.id.split("-")[1]); 
      vid.play();
    }
  }
});