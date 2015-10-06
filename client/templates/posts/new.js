Template.articleNew.events({
	// "change [data-schema-key='articleType']": function(e){
	// 	// console.log("inn");
	// 	console.log(e.target.value);
	// 	if (e.target.value == "video"){
	// 		$(e.target).after("<div class='file-field input-field'><input type='text' class='file-path validate'><div class='btn'><span>Choose file</span><input type='file' class='hidden file-upload' id='file-videoId' file-input='videoId'></div></div>");
	// 	}else if(e.target.value =="article" || e.target.value == "podcast" || e.target.value=="other"){
	// 		$(".btn").remove();
	// 	}
	// }

	"change [id$=video]":function(e){
		if(e.target.value == "video"){
			$(e.target).after({{> afQuickField name='videoId'}});
		}
	}
});



// "change [id$=video]":function(e){
// 		if(e.target.value == "video"){
// 			$(e.target).after("<div class='file-field input-field'><input type='text' class='file-path validate'><div class='btn'><span>Choose file</span><input type='file' class='hidden file-upload' id='file-videoId' file-input='videoId'></div></div>");
// 		}else
// 	}



// <input class='file-path validate' type='text'><div class='btn'><span>Choose file</span><input class='hidden file-upload' id='file-videoId' file-input='videoId' type='file'></div></div><input type='text' style='display:none;'  label='ADD Video' name='videoId'  data-schema-key='videoId'></div>