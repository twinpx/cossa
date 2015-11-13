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
					$("#file-uploader").closest("div.teaser_img").find(".image").removeClass("empty").empty().height(266).html('<img src="/images/teaser_preloader.gif" id="teaser_preloader" \/>');
				},
				onComplete: function(id, fileName, responseJSON){
					function onPath() {
						var $divImage = $("#file-uploader").closest("div.teaser_img").find("div.image");
						uploader._options.params.remove_prev_image = "/upload/"+responseJSON.path.split('/upload/')[1];
						$("#file-uploader").find("div.apply").remove().end().find("li.qq-upload-fail").remove();
						var teaserImage = new Image;
						teaserImage.src = '/upload/'+responseJSON.path.split("/upload/")[1]+'';
						$divImage
							.removeClass("empty")
							.empty()
							.siblings("input.new").val('/upload/'+responseJSON.path.split("/upload/")[1]+'');
						setTimeout(function() {
							if(teaserImage.height!=0) {
								$divImage.css({height:"auto"}).append('<img src="/upload/'+responseJSON.path.split("/upload/")[1]+'" alt="" />');
								if(teaserImage.height < 266) {
									$divImage.height(266).find("img").css({marginTop:(266 - teaserImage.height)/2});
								}
								else if(teaserImage.height > maxHeight) {
									crop();
								}
							}
						}, 500)
							
						$("div.imgareaselect-outer").remove();
						$("div.imgareaselect-selection").parent().remove();
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
			  data:{src:$("#file-uploader").closest("div.teaser_img").find("input.new").val(), x1:cropSelection.x1, y1:cropSelection.y1, x2:cropSelection.x2, y2:cropSelection.y2, w:cropSelection.width, h:cropSelection.height},
			  dataType:"JSON",
				beforeSend:function(data) {
					$("#file-uploader").closest("div.teaser_img").find(".image").removeClass("empty").empty().height(266).html('<img src="/images/teaser_preloader.gif" id="teaser_preloader" \/>');
					$("div.imgareaselect-outer").remove();
					$("div.imgareaselect-selection").parent().remove();
				},
			  success: function(data){
			 	 $("#file-uploader div.apply").remove();
				$("#file-uploader").closest("div.teaser_img").find("div.image").find("img").remove().end().prepend('<img src="/upload/'+data.path.split("/upload/")[1]+'?'+new Date().getTime()+'" />');
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
		$(".teaser_img .image img").each(function() {
			var $this = $(this),
				$divImage = $(this).closest("div.image");
			
			$divImage.css({height:"auto"});
			
			if($this.height() != 0) {
				if($this.height() < 266) {
					$divImage.height(266).find("img").css({marginTop:(266 - $this.height())/2});
				}
				else if($this.height() > maxHeight) {
					var cropWidth = $this.width(), cropHeight = maxHeight*cropWidth/maxWidth;
					setTimeout(function() {crop();}, 1000);
				}
			}
			else {
				$this.load(function() {
					if($this.height() < 266) {
						$divImage.height(266).find("img").css({marginTop:(266 - $this.height())/2});
					}
					else if($this.height() > maxHeight) {
						var cropWidth = $this.width(), cropHeight = maxHeight*cropWidth/maxWidth;
						setTimeout(function() {crop();}, 1000);
					}
				});
			}
		});
		
		function crop() {
			$("#file-uploader").closest("div.teaser_img").find("div.image").addClass("imgCrop").find("img").imgAreaSelect({
				x1: 0, y1: 0, x2: maxWidth, y2: maxHeight,
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
	
	// in your app create uploader as soon as the DOM is ready
	// don't wait for the window to load  
	window.onload = createUploader;