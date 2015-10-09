Template.articleNew.events({
	"change [data-schema-key='articleType']": function(e){
		if (e.target.value == "video"){
			$(".videoUpload").css("display","block");
		}else if(e.target.value =="article" || e.target.value == "podcast" || e.target.value=="other"){
			$('.videoUpload .red-text').click();
			$(".videoUpload").css("display","none");
		}
	},

	 'change .videoUpload': function(event, temp) {
		if(!($(".videoUpload .input-field a").hasClass("red-text"))){
			$(".videoUpload .input-field label").css("display", "none");
		}
	},
	'click .videoUpload .red-text':function(e){
		$(".videoUpload label").css("display","block");
	}
	
});


