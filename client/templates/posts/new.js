Template.articleNew.events({
	"change [data-schema-key='articleType']": function(e){
		console.log(e.target.value);
		if (e.target.value == "video"){
			$(".videoUpload").css("display","block");
		}else if(e.target.value =="article" || e.target.value == "podcast" || e.target.value=="other"){
			$(".videoUpload").css("display","none");
		}
	}
});
