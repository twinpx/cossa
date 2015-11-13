	function createUploader(){
		var maxWidth = teaserMaxWidth || 644,
			maxHeight = teaserMaxHeight || 390,
			cropSelection = {}, 
			componentPath = "/bitrix/components/cossa/infoportal.element.add.form/",
			uploader = new qq.FileUploader({
				multiple:false,
				element: document.getElementById('file-uploader'),
				action: '/bitrix/components/cossa/infoportal.element.add.form/file.php',
				allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
				params:{maxWidth:maxWidth},
				sizeLimit: 1048576, // max size
				showMessage:function(message) {
					$("#file-uploader").closest("div.teaser_img").find(".image").removeClass("empty").empty().height(266).html('<div id="teaser_message">'+message+'<\/div>');
				},
				onSubmit: function(id, fileName){
					$("div.imgareaselect-outer").remove();
					$("div.imgareaselect-selection").parent().remove();
					$("#file-uploader").closest("div.teaser_img").find(".image").removeClass("empty").empty().height(266).html('<img src="/images/teaser_preloader.gif" id="teaser_preloader" \/>');
				},
				onComplete: function(id, fileName, responseJSON){
					function onPath() {
						var $divImage = $("#file-uploader").closest("div.teaser_img").find("div.image");
						uploader._options.params.remove_prev_image = "/upload/tmp"+responseJSON.path.split('/upload/tmp')[1];
						$("#file-uploader").find("div.apply").remove().end().find("li.qq-upload-fail").remove();
						var teaserImage = new Image;
						teaserImage.src = '/upload/tmp'+responseJSON.path.split("/upload/tmp")[1]+'';
						$divImage
							.removeClass("empty")
							.empty()
							.siblings("input:hidden").val('/upload/tmp'+responseJSON.path.split("/upload/tmp")[1]+'');
						setTimeout(function() {
							if(teaserImage.height!=0) {
								$divImage.css({height:"auto"}).append('<img src="/upload/tmp'+responseJSON.path.split("/upload/tmp")[1]+'" alt="" />');
								if(teaserImage.height < 266) {
									$divImage.height(266).find("img").css({marginTop:(266 - teaserImage.height)/2});
								}
								else if(teaserImage.height > maxHeight) {
									var cropWidth = teaserImage.width, cropHeight = maxHeight*cropWidth/maxWidth;
									$divImage.addClass("imgCrop").find("img").imgAreaSelect({
										x1: 0, y1: 0, x2: cropWidth, y2: cropHeight,
										aspectRatio:maxWidth+":"+maxHeight,
										persistent:true,
										resizable:false,
										onInit:function(img, selection) {
											cropSelection = selection;
										},
										onSelectEnd:function(img, selection) {
											cropSelection = selection;
										}
									}).end()
									.parent().find("div.qq-uploader").prepend('<div class="apply"><\/div>');
								}
							}
						}, 500)
					}
					if(!responseJSON.path) {//exception for IE
						$.ajax({
							url:"/bitrix/components/cossa/form.add/file.php",
							type:"POST",
							data:{ie:true,path:componentPath+fileName, maxWidth:maxWidth, fileName:fileName},
							dataType:"JSON",
							success: function(data){
								responseJSON.path = data.path;
								onPath();
							}
						});
					}
					else {onPath();}
				}, 
				debug: true
			});
		$("div.form_field").delegate("div.apply", "click", function() {
			$.ajax({
			  url:"/bitrix/components/cossa/form.add/resize_crop.php",
			  type:"POST",
			  data:{src:$("#file-uploader").closest("div.teaser_img").find("input:hidden").val(), x1:cropSelection.x1, y1:cropSelection.y1, x2:cropSelection.x2, y2:cropSelection.y2, w:cropSelection.width, h:cropSelection.height},
			  dataType:"JSON",
				beforeSend:function(data) {
					$("#file-uploader").closest("div.teaser_img").find(".image").removeClass("empty").empty().height(266).html('<img src="/images/teaser_preloader.gif" id="teaser_preloader" \/>');
					$("div.imgareaselect-outer").remove();
					$("div.imgareaselect-selection").parent().remove();
				},
			  success: function(data){
			 	 $("#file-uploader div.apply").remove();
				$("#file-uploader").closest("div.teaser_img").find("div.image").find("img").remove().end().prepend('<img src="/upload/tmp'+data.path.split("/upload/tmp")[1]+'?'+new Date().getTime()+'" />');
				var img = $("#file-uploader").closest("div.teaser_img").find("div.image").find("img");
				img.load(function() {
					if(img.height() < 266) {
						$("#file-uploader").closest("div.teaser_img").find("div.image").height(266);
						img.css({marginTop:(266 - img.height())/2});
					}
					else {$("#file-uploader").closest("div.teaser_img").find("div.image").height(img.height());}
				});
			  }
			});
			return false;
		});
	}
	
	// in your app create uploader as soon as the DOM is ready
	// don't wait for the window to load  
	window.onload = createUploader;