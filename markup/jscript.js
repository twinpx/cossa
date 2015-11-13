var $publishComment;
$(document).ready(function() {
	$(document)
		.keydown(function(e) {
			NavigateThrough(e);
		})
		.click(function() {
			$("div.filter div.select").find("div.input").removeClass("focus").end().find("ul").hide();
			$("#user_menu div.menu").parent().removeClass("active").find("a.button").removeClass("active").end().find("a.icon").removeClass("active");
			$("#sent, #mail_block, #message").hide();
			$(".visit_button .hint").removeClass("visible");
			$("#top_menu_more").removeClass("open");
		});
	$("a.delete").click(function() {
		if(!confirm("Удалить?")) {return false;}
	});
	
	$("#top_gallery").top_teaser({pointers:false, auto:topTeaserInterval});
	
	function windowEvents() {
		var $topNavigation = $("#top_navigation"),
			$topNavigationSpacer = $("#top_navigation_spacer"),
			scrolled = window.pageYOffset || document.documentElement.scrollTop;
			
		if(document.getElementById("login_menu")) {
			var menuType = "login_menu";
		}
		else if(document.getElementById("user_menu")) {
			menuType = "user_menu";
		}
		var menuHeight = $("#" + menuType + "").outerHeight() + $("#" + menuType + "").offset().top - scrolled;
		
		$(window)
		.scroll(function() {
			scrolled = window.pageYOffset || document.documentElement.scrollTop,
			topNavigationY = $topNavigation.offset().top;
				
			if(scrolled >= topNavigationY - menuHeight) {
				$topNavigation.addClass("fixed");
				$("#top_navigation_fixed").css({top:menuHeight + "px"});
				$topNavigationSpacer.height($("#top_navigation_fixed").outerHeight() + "px");
			}
			else {
				$topNavigation.removeClass("fixed");
				$topNavigationSpacer.height("0px");
			}
		})
		.resize(function() {
			if($(window).width() <= 1100) {
				$("body").addClass("min-screen");
			}
			else {
				$("body").removeClass("min-screen");
			}
		});
		$(window).scroll().resize();
	}
	windowEvents();
	
	if(!window.topHintsInterval) {
		var topHintsInt = 10000;
	}
	else {
		topHintsInt = topHintsInterval;
	}
	$("#context_hints").context_hints({auto:topHintsInt}).click(function(e) {
		window.location = $(this).find("li.active a:eq(0)").attr("href");
		e.stopPropagation();
		e.preventDefault();
	});
	
	$("#articles_list div.item, div.articles_list div.item").hover(
		function() {
			$(this).addClass("item_hover");
		},
		function() {
			$(this).removeClass("item_hover");
		}
	);
	
	$("#top_menu_more")
		.click(function(e) {return false;})
		.find("a.visible")
			.mouseenter(function() {$("#top_menu_more").addClass("open");})
			.click(function(e) {e.preventDefault();}).end()
		.find("ul")
			.mouseleave(function() {$("#top_menu_more").removeClass("open");})
			.find("a").click(function(e) {e.stopPropagation();});
		
	
	$("#subscription_form tr").click(function(e) {
		var $items = [];
		if(e.target.tagName == "INPUT") {
			var on = true, off = false;
		}
		else {
			on = false;
			off = true;
		}
		
		if(this.parentNode.tagName == "THEAD") {
			var $checkbox = $(this).closest("table").find(":checkbox");
		}
		else {
			$checkbox = $(this).find(":checkbox");
			var $itemsHead = $(this);
			
			if(!$(this).hasClass("item")) {
				while($itemsHead.next("tr.item").is("tr")) {
					$itemsHead = $itemsHead.next();
					$items.push($itemsHead);
				}
			}
			else {
				while($itemsHead.prev("tr").hasClass("item")) {
					$itemsHead = $itemsHead.prev();
				}
				$itemsHead = $itemsHead.prev();
			}
		}
		
		if($(this).find(":checkbox").prop("checked")) {
			$checkbox.prop("checked", on);
			if(!on && this.parentNode.tagName == "TBODY") {
				$(this).closest("table").find("thead :checkbox").prop("checked", on);
			}
			
			for(var i = 0; i < $items.length; i++) {
				$items[i].find(":checkbox").prop("checked", on);
			}
			
			if($itemsHead && !$itemsHead.hasClass("item") && !on) {
				$itemsHead.find(":checkbox").prop("checked", on);
			}
		}
		else {
			$checkbox.prop("checked", off);
			if(!off && this.parentNode.tagName == "TBODY") {
				$(this).closest("table").find("thead :checkbox").prop("checked", off);
			}
			
			for(var i = 0; i < $items.length; i++) {
				$items[i].find(":checkbox").prop("checked", off);
			}
			
			if($itemsHead && !$itemsHead.hasClass("item") && !off) {
				$itemsHead.find(":checkbox").prop("checked", off);
			}
		}
	});
	
	$("#subscribe_block .close a").click(function() {
		$("#subscribe_block").remove();
		$.cookie($(this).closest("#subscribe_block").find(":hidden[name=ID]").val() + "_subscribe", "don't show subscribe block", { expires: 1, path: '/', domain: 'cossa.ru'});
		return false;
	});
	
	$(".more_panel .heading").click(function() {
		$(this).hide().parent().find("div.items_block").show().end().siblings("div.items_wrapper").hide();
		$("#activities .image a").each(function() {
			var $this = $(this),
				$img = $this.find("img"),
				img = new Image();
				
			img.src = $img.attr("src");
			var hei = Math.floor(img.height*$img.attr("width")/img.width);
			if(hei>0) {
				$img.css({marginTop:($this.height()/2-hei/2)+"px"});
			}
		});
		//$.scrollTo("span", 500);
	});
	/*$("#rating_list #top_100 .heading").unbind("click").click(function() {
		$(this).hide().parent().find("div.items").show().end().siblings("div.items_wrapper").hide();
		//$.scrollTo("span", 500);
	});*/
	var activitiesNum = 10;
	$("#more_activities .heading").unbind("click").parent().click(function() {
		var idPortion = [], activity_type = "activity";
		for(var i=0; i<activitiesNum; i++) {
			if(allActivities[0]) {idPortion[i] = allActivities.shift();}
		}
		if($("#activities").hasClass("drafts")) {
			activity_type = "draft";
		}
		$("#more_activities").addClass("more_panel_preloader");
		setTimeout(function() {
			$.ajax({
				url:"/php/get_more_activities.php",
				dataType:"json",
				data:"id="+idPortion+"&activity_type="+activity_type,
				beforeSend:function() {
					
				},
				success: function(data){
					$("#more_activities").removeClass("more_panel_preloader");
					var $div = $('<div class="block" style="display:none;"></div>'), html = '';
					for(var i=0; i<data.activities.length; i++) {
						var src = rating = label = comments = text = icons = h4 = "", href = "<span>", hrefEnd = "</span>";
						if(data.activities[i].href) {
							href = '<a href="'+ data.activities[i].href +'">';
							hrefEnd = '</a>';
						}
						if(activity_type == "draft") {
							icons = '<div class="icons"><a class="delete" title="Удалить" href="';
							if(window.location.search) {
								icons += window.location.search + "&";
							}
							else {
								icons += "?";
							}
							icons += data.activities[i]["delete"] + '"></a><a class="edit" title="Редактировать" href="' + data.activities[i].edit + '"></a></div>';
						}
						switch(data.activities[i].type.blockClass) {
							case "article":
								if(!data.activities[i].src) {
									data.activities[i].type.blockClass += " no_image";
								}
								else {
									src = '<div class="image">' + href + '<img width="158" alt="'+ data.activities[i].title +'" src="'+ data.activities[i].src +'" />' + hrefEnd + '</div>';
								}
								if(data.activities[i].rating.length == undefined) {
									rating = '<span class="rating '+ data.activities[i].rating.type +'">'+ data.activities[i].rating.num +'</span>';
								}
								if(data.activities[i].label.length == undefined) {
									label = '<a class="label" href="'+ data.activities[i].label.href +'">'+ data.activities[i].label.name +'</a>';
								}
								if(data.activities[i].comments.length == undefined) {
									comments = '<a href="' + data.activities[i].comments.href +'" class="comments" title="Комментарии">' + data.activities[i].comments.num + '</a>';
								}
								html += '<div class="item '+ data.activities[i].type.blockClass +'">\
											<div class="type">\
												<div class="title">'+ data.activities[i].type.title +'</div>\
												<div class="date">'+ data.activities[i].type.date +'</div>' +
												icons +
											'</div>\
											<div class="action">' + src +
												'<div class="text">\
													<h4>'+ href + data.activities[i].title + hrefEnd + '</h4>' + label +
													'<div class="info_bar">\
														<a href="'+ data.activities[i].author.href +'" class="author">'+ data.activities[i].author.name +'</a>\
														<span class="date">'+ data.activities[i].date +'</span>' + comments + rating +
													'</div>\
												</div>\
											</div>\
											<div class="clear separator"></div>\
										</div>';
								break;
							case "education":
								if(!data.activities[i].src) {
									data.activities[i].type.blockClass += " no_image";
								}
								else {
									src = '<div class="image">' + href + '<img width="158" alt="'+ data.activities[i].title +'" src="'+ data.activities[i].src +'" />' + hrefEnd + '</div>';
								}
								if(data.activities[i].label.length == undefined) {
									label = '<a class="label" href="'+ data.activities[i].label.href +'">'+ data.activities[i].label.name +'</a>';
								}
								html += '<div class="item '+ data.activities[i].type.blockClass +'">\
											<div class="type">\
												<div class="title">'+ data.activities[i].type.title +'</div>\
												<div class="date">'+ data.activities[i].type.date +'</div>' +
												icons +
											'</div>\
											<div class="action">' + src +
												'<div class="text">\
													<h4>'+ href + data.activities[i].title + hrefEnd + '</h4>' + label +
												'</div>\
											</div>\
											<div class="clear separator"></div>\
										</div>';
								break;
							case "comment":
								if(data.activities[i].label.length == undefined) {
									label = '<a class="label" href="'+ data.activities[i].label.href +'">'+ data.activities[i].label.name +'</a>';
								}
								if(data.activities[i].text) {
									text = '<p>'+ data.activities[i].text +'</p>';
								}
								if(data.activities[i].title) {
									h4 = '<h4>' + href + data.activities[i].title + hrefEnd + '</h4>';
								}
								html += '<div class="item '+ data.activities[i].type.blockClass +'">\
											<div class="type">\
												<div class="title">'+ data.activities[i].type.title +'</div>\
												<div class="date">'+ data.activities[i].type.date +'</div>' +
												icons +
											'</div>\
											<div class="action">\
												<div class="text">' +
													h4 +
													label +
													text +
												'</div>\
											</div>\
											<div class="clear separator"></div>\
										</div>';
								break;
							case "vocabulary":
								if(data.activities[i].text) {
									text = '<p>'+ data.activities[i].text +'</p>';
								}
								html += '<div class="item '+ data.activities[i].type.blockClass +'">\
											<div class="type">\
												<div class="title">'+ data.activities[i].type.title +'</div>\
												<div class="date">'+ data.activities[i].type.date +'</div>' +
												icons +
											'</div>\
											<div class="action">\
												<h4>' + href + data.activities[i].title + hrefEnd + '</h4>' +
												text +
											'</div>\
											<div class="clear separator"></div>\
										</div>';
								break;
							case "event":
								if(!data.activities[i].src) {
									data.activities[i].type.blockClass += " no_image";
								}
								else {
									src = '<div class="image">' + href + '<img width="158" alt="'+ data.activities[i].title +'" src="'+ data.activities[i].src +'" />' + hrefEnd + '</div>';
								}
								html += '<div class="item '+ data.activities[i].type.blockClass +'">\
											<div class="type">\
												<div class="title">'+ data.activities[i].type.title +'</div>\
												<div class="date">'+ data.activities[i].type.date +'</div>' +
												icons +
											'</div>\
											<div class="action">' + src +
												'<div class="text">\
													<h4>' + href + data.activities[i].title + hrefEnd + '</h4>\
												</div>\
											</div>\
											<div class="clear separator"></div>\
										</div>';
								break;
							case "vacancy":
								if(data.activities[i].text) {
									text = data.activities[i].text;
								}
								html += '<div class="item '+ data.activities[i].type.blockClass +'">\
											<div class="type">\
												<div class="title">'+ data.activities[i].type.title +'</div>\
												<div class="date">'+ data.activities[i].type.date +'</div>' +
												icons +
											'</div>\
											<div class="action">\
												<h4>' + href + data.activities[i].title + hrefEnd + '</h4>' +
												text +
											'</div>\
											<div class="clear separator"></div>\
										</div>';
								break;
						}
					}
					$div.html(html);
					$("#activities .items_wrapper").append($div).end().find("div.block:last div.image a, div.block:last div.image span").each(function() {
						var $this = $(this),
							$img = $this.children("img"),
							img = new Image();
							
						img.src = $img.attr("src");
						var hei = Math.floor(img.height*$img.attr("width")/img.width);
						if(hei>0) {
							$img.css({marginTop:(parseInt($this.css("height"))/2-hei/2)+"px"});
						}
						else {
							$img.load(function() {
								var hei = Math.floor(img.height*$img.attr("width")/img.width);
								if(hei>0) {$img.css({marginTop:(parseInt($this.css("height"))/2-hei/2)+"px"});}
							});
						}
					}).end()
					.find("div.block:last").css({opacity:0}).show().animate({opacity:1}, 500);
					$.scrollTo($("#activities div.block:last div.item:first"), 10);
					if(allActivities.length == 0) {$("#more_activities").hide();}
					else {$("#more_activities").show();}
				}
			}, 500);
		}, 1000);
		
		return false;
	});
	
	if($publishComment != undefined) {
		$publishComment = $('<div id="popup_message"><a href="#" title="Закрыть" class="close">Закрыть</a><div class="pad"><h6>У Вас есть неопубликованный комментарий</h6><div class="buttons"><a href="#" class="delete" title="Удалить"></a><a href="'+$publishComment+'" class="publish" title="Опубликовать"></a></div></div></div>');
		$("body").append($publishComment);
		
		var topPx="20px", leftPx="50%", marginLeft=-$publishComment.outerWidth()/2, outerHeight=$publishComment.outerHeight(), winHeight=$(window).height();
		
		if (winHeight > outerHeight) {topPx = winHeight/2 + $(window).scrollTop() - outerHeight/2 - 20 + "px";}
		else {topPx = $(window).scrollTop() + 20 + "px";}
		
		$publishComment.css({marginLeft:marginLeft, left:leftPx, top:topPx});
		
		$publishComment
			.find("a.close").click(function() {
				$publishComment.remove();
				return false;
			}).end()
			.find("a.delete").unbind("click").click(function() {
				$.cookie('cossa_comment', null);
				$.cookie('cossa_comment_time', null);
				$publishComment.remove();
				return false;
			});
	}
	$("#activities.drafts").delegate("div.item", "hover", function() {
		$(this).toggleClass("hover");
	});
	$("#activities a.delete").unbind("click");
	$("#activities").delegate("a.delete", "click", function() {
		var $popupMessage = $('<div id="popup_message"><a href="#" title="Закрыть" class="close">Закрыть</a><div class="pad"><h6>Удалить черновик?</h6><div class="buttons"><a href="#" class="cancel" title="Отменить"></a><a href="'+this.getAttribute("href")+'" class="delete" title="Удалить"></a></div></div></div>');
		$("body").append($popupMessage);
		
		var topPx="20px", leftPx="50%", marginLeft=-$popupMessage.outerWidth()/2, outerHeight=$popupMessage.outerHeight(), winHeight=$(window).height();
		
		if (winHeight > outerHeight) {topPx = winHeight/2 + $(window).scrollTop() - outerHeight/2 - 20 + "px";}
		else {topPx = $(window).scrollTop() + 20 + "px";}
		
		$popupMessage.css({marginLeft:marginLeft, left:leftPx, top:topPx});
		
		$popupMessage.find("a.cancel, a.close").click(function() {
			$popupMessage.remove();
			return false;
		});
		return false;
	});
	$("div.author_multiple").multiple_input({inputName:"author"});
	$("div.source_multiple").multiple_input({defaultValue:"http://", inputName:"source"});
	$("#change_captcha").click(function() {
		$.ajax({
			url:"/php/captcha.php",
			dataType:"text",
			success:function(data) {
				var $img = $("#change_captcha").closest("div.form_field").find("img");
				$img.attr({src:$img.attr('src').replace(/sid=[0-9a-z]*$/, "sid="+data)}).siblings("input[name='captcha_sid']").val(data);
			}
		});
		return false;
	});
	$("#preview_section a").attr({target:"_blank"});
	$("#form_section .intro textarea").keyup(function() {
		if($(this).val().toString().length >500) {
			var text = $(this).val().toString().slice(0,500);
			$(this).val(text);
		}
	});
	$("#upload_crop_form button").click(function() {
		$.ajax({
		  url: "/js/jquery_upload_cropv1.2/upload_crop_cossa.php",
		  success: function(data){
			//alert(data);
		  }
		});
	});
	$("#comment_form textarea").resizeTextarea();
	$(".error_message").each(function() {
		$(this).find("div.pointer div").css({top:$(this).outerHeight()/2-12 + "px"})
	});
	$(".visit_button .hint").click(function(e) {
		e.stopPropagation();
	});
	$(".visit_button .num").click(function() {
		$(this).parent().children("div.hint").toggleClass("visible");
		return false;
	});
	//$("select").selectMac_dj();
	//$("div.lecturer_fields").lecturers();
	$("form").validateForm();
	$("#form_section.change input.submit").click(function() {
		var $form = $(this).closest("form"), flag;
		$form.find("input.text").each(function() {
			var $this = $(this);
			if ($this.val() == "" && !$this.is(":password")) {
				$this.parent().addClass("attention");
				flag=1;
			}
			else if ($this.attr("name").toLowerCase().search("mail") != -1) {
				var mail = $this.val();
				var mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
				if(!mail.match(mailRegex)){
					$this.parent().addClass("attention");
					flag=1;
				}
				else {$this.parent().removeClass("attention");}
			}
			else {$this.parent().removeClass("attention");}
			
			var $confirmPasswordField, $passwordField;
			$form.find(":password").each(function() {
				var $password = $(this);
				if ($password.attr("name").toLowerCase().search("confirm") != -1) {$confirmPasswordField = $password;}
				else {$passwordField = $password;}
			});
			if($passwordField.val() == "") {
				$passwordField.parent().addClass("attention");
				flag=1;
				$confirmPasswordField.parent().removeClass("attention");
			}
			else if($confirmPasswordField.val() == "") {
				$confirmPasswordField.parent().addClass("attention");
				flag=1;
			}
			else if($passwordField.val()!=$confirmPasswordField.val()) {
				$passwordField.parent().addClass("attention");
				$confirmPasswordField.parent().addClass("attention");
				flag=1;
			}
		});
		if(flag == 1){return false;}
		else {$form.submit();}
	});
		
	$("a.hide_tags").click(function() {
		var $tags = $(this).parent().siblings("div.tags");
		$tags.toggleClass("hidden_tags");
		if($tags.is(":visible")) {$(this).text("Скрыть тэги")}
		else {$(this).text("Показать тэги")}
		return false;
	});
	
	if($("#form_section.edit_profile label.still_work :checkbox").is(":checked")){$("#end_work_date").hide().find("input[type='hidden']").val("");}
	$("#form_section.edit_profile label.still_work").click(function(){
		if($(this).find(":checkbox").is(":checked")) {$("#end_work_date").show().find("input.ending_month").val($("#end_work_date select.month").val()).end().find("input.ending_year").val($("#end_work_date select.year").val());}
		else {$("#end_work_date").hide().find("input[type='hidden']").val("");}
	});
	$("#form_section.edit_profile label.still_work input").click(function(e) {
		if($(this).is(":checked")) {$("#end_work_date").hide().find("input[type='hidden']").val("");}
		else {$("#end_work_date").show().find("input.ending_month").val($("#end_work_date select.month").val()).end().find("input.ending_year").val($("#end_work_date select.year").val());}
		e.stopPropagation();
	});
	
	$("#city_autocomplete").autocompleteArray(cityAutocompleteArray,{delay:10,minChars:1,matchSubset:1,autoFill:true,maxItemsToShow:-1})
		.keypress(function(e) {
			if(e.which == 13) {$(this).blur(); e.preventDefault();}
		});
	$("#organizer_autocomplete").autocompleteArray(organizerAutocompleteArray,{delay:10,minChars:1,matchSubset:1,autoFill:true,maxItemsToShow:-1});
	
	$("div.date_field").change_days();
	$("#comment_form")
		.delegate("input[type='submit']", "click", function() {
			if($("#comment_form textarea").val() == "Написать комментарий..." || $("#comment_form textarea").val() == "") {
				$("#comment_form textarea").focus();
				return false;
			}
			else {
				if($("#comment_form").hasClass("not_authorized")) {
					$("#login_popup").popup();
					$.cookie('cossa_comment', '{"articleId":"'+$("#reply_form :hidden[name='recipe']").val()+'", "text":"'+$("#comment_form textarea").val()+'"}', { expires: 1, path: '/', domain: 'cossa.ru'});
					$.cookie('cossa_comment_time', "true", { expires: 1/24/60, path: '/', domain: 'cossa.ru'});
					return false;
				}
				else {$("#comment_form form").sibmit();}
			}
		})
		.delegate("textarea", "keyup", function(e) {//e.ctrlKey ??
			/*if (e.ctrlKey && e.which == 13) {
				if($("#comment_form textarea").val() == "Написать комментарий..." || $("#comment_form textarea").val() == "") {return false;}
				else {alert(); $("#comment_form form").sibmit();}
			}*/
		});
	$("div.course_block div.rating a, #rating_item div.rating a").click(function() {
		var $this = $(this), vote;
		if(this.className.search("disabled") == -1) {
			switch(this.className) {
				case "down": vote="minus";break;
				case "up": vote="plus";break;
			}
			if($this.parent().hasClass("not_authorized")) {
				$("#login_popup").popup();
				$.cookie('cossa_rating', '{"id":"'+$this.attr("rel")+'", "vote":"'+vote+'"}', { expires: 1/24/60, path: '/', domain: '.cossa.ru'});
			}
			else {
				$.ajax({
					type:"POST",
					url:"/bitrix/components/cossa/iblock.vote/component_rating.php",
					data:"vote="+vote+"&vote_id="+$this.attr("rel"),
					dataType:"json",
					success:function(data) {
						$this.addClass($this.attr("class")+"_disabled").siblings("a").removeClass("up_disabled").removeClass("down_disabled").parent().find("span.sum span.num").text(data[0].sign+""+data[0].value);
					}
				});
			}
		}
		return false;
	});
	$("#comments_block span.rating a").click(function() {
		var $this = $(this), vote_comment;
		if(this.className.search("disabled") == -1) {
			switch(this.className) {
				case "decrease": vote_comment="minus";break;
				case "increase": vote_comment="plus";break;
			}
			if($this.parent().hasClass("not_authorized")) {
				$("#login_popup").popup();
				$.cookie('cossa_comment_rating', '{"id":"'+$this.attr("rel")+'", "vote":"'+vote_comment+'"}', { expires: 1/24/60, path: '/', domain: '.cossa.ru'});
			}
			else {
				$.ajax({
					type:"POST",
					url:"/bitrix/components/cossa/comment/comment_rating.php",
					data:"vote_comment="+vote_comment+"&comment_id="+$this.closest("div.comment").attr("id"),
					dataType:"json",
					success:function(data) {
						$this.addClass($this.attr("class")+"_disabled").siblings("a").removeClass("increase_disabled").removeClass("decrease_disabled").parent().find("span.value").text(data[0].sign+""+data[0].value);
						if(data[0].sign == "-" && data[0].value >= 10) {$this.closest("div.comment").addClass("minus");}
						else {$this.closest("div.comment").removeClass("minus");}
					}
				});
			}
		}
		return false;
	});
	$("#sent").click(function(e) {e.stopPropagation();}).find(".close").find("a").click(function(e) {
		$("#sent").hide();
		return false;
	});
	$("#mail_block").click(function(e) {e.stopPropagation();}).find(".close").find("a").click(function(e) {
		$("#mail_block").hide();
		return false;
	});
	$("#message").click(function(e) {e.stopPropagation();}).find(".close").find("a").click(function(e) {
		$("#message").hide();
		return false;
	});
	$("#subscribe input.text").keyup(function(e) {
		if(e.keyCode == 13) {
			if(!/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i.match($(this).val())){
				$(this).parent().addClass("attention");
				return false;
			}
			else {
				$(this).parent().removeClass("attention");
				form.submit();
			}
		}
	});
	$(".photo_block").photo_block();
	$("table.table")
		.find("thead").find("th:first").before('<th class="empty"></th>').end().find("th:last").after('<th class="empty"></th>').end().end()
		.find("tbody")
			.find("tr:first").find("td").addClass("first").end().end()
			.find("tr:last").find("td").addClass("last").end().end()
			.find("tr").each(function() {
				$(this).find("td:first").before('<td class="empty"></td>').end().find("td:last").after('<td class="empty"></td>')
			});
	$("input[type='submit']")
		.hover(function() {$(this).addClass("submit_hover");}, function() {$(this).removeClass("submit_hover");})
		.mousedown(function() {$(this).addClass("submit_active");})
		.mouseup(function() {$(this).removeClass("submit_active");});
	$("#comment_form div.subscribe a.follow").click(function() {
		var $this = $(this),
			active = "";
		if($this.hasClass("active")) {active="enabled";}
		else {active="disabled";}
		$.ajax({
			type: "POST",
			url:"/bitrix/components/cossa/comment/subscribe.php",
			data:"active="+active+"&id="+$this.attr("rel"),
			success:function(data) {
				if(data=="1"){
					$this.toggleClass("active");
					if($this.hasClass("active")) {$this.text("Отписаться от комментариев");}
					else {$this.text("Подписатьcя на комментарии");}
				}
			}
		});
		return false;
	});
	if($("#form_section div.company :checkbox").is(":checked")){$("#form_section div.company div.hidden").show().siblings("select").find("option:first").attr({selected:"selected"});}
	$("#form_section div.company label.checkbox").click(function(){
		var $hidden = $(this).parent().find("div.hidden");
		$hidden.slideToggle("middle", function() {
			if($hidden.is(":hidden")) {$hidden.find("input.text").val("");}
			else {$(this).siblings("select").find("option:first").attr({selected:"selected"})}
		});
	});
	$("#form_section div.company label.checkbox input").click(function(e) {
		e.stopPropagation();
	});
	$("img.img_align").each(function() {
		var $img = $(this),
			$parent = $img.parent(),
			img = new Image();
			
		img.src = $img.attr("src");
		var hei = Math.floor(img.height*$img.attr("width")/img.width);
		if(hei>0) {
			$img.css({marginTop:($parent.height()/2-hei/2)+"px"});
		}
		$img.load(function() {
			$img.css({marginTop:($parent.height()/2-$img.height()/2)+"px"});
		});
	});
	$("div.filter input.text").keyup(function() {
		var $this = $(this);
		if($this.val() != "") {
			$this.siblings("div.reset").show();
		}
		else {
			$this.siblings("div.reset").hide();
		}
	});
	$("div.filter div.reset a").click(function() {
		$(this).parent().hide().closest("div.form_field").find("input.text").val("").focus();
		return false;
	});
	//$("#logo").addClass("logo"+Math.floor(Math.random()*7));
	/*$("form").keydown(function(e) {
		var t = e.target || e.srcElement;
		if ((e.ctrlKey && e.keyCode == 13) || e.keyCode == 10) {
			checkForm(this);
			return false;
		}
		else if(e.keyCode == 13 && t.tagName != "TEXTAREA") {
			checkForm(this);
			return false;
		}
	}).click(function(e) {
		var t = e.target || e.srcElement;
		if(t.tagName == "BUTTON" || (t.tagName == "INPUT" && t.getAttribute("type") == "submit")) {
			checkForm(this, t.getAttribute("name"));
			return false;
		}
	});*/
	$("input[placeholder], textarea[placeholder]").placeholder();	
	$("div.filter")
		.delegate("form", "submit", function() {$(this).find("div.buttons").find("input").click();});
	$("div.filter div.select div.input")
		.hover(function() {$(this).addClass("hover");}, function() {$(this).removeClass("hover");})
		.click(function(e) {
			var $ul = $(this).closest("div.select").find("ul");
			if($ul.is(":visible")) {
				$("div.filter div.select ul:visible").hide();
			}
			else {
				$("div.filter div.select ul:visible").hide();
				$(this).closest("div.select").find("ul").show();
			}
			$(this).addClass("focus");
			e.stopPropagation();
		});
	$("input.text, textarea, select")
		.hover(function() {$(this).addClass("hover");}, function() {$(this).removeClass("hover");})
		.focus(function() {$(this).addClass("focus");})
		.blur(function() {$(this).removeClass("focus");});
	$("#top_search :text")
	.focus(function() {
		$(this).closest("div.form_field").addClass("focus");
	})
	.blur(function() {
		$(this).closest("div.form_field").removeClass("focus");
	});
	$("#comments_block")
		.delegate("a.link", "click", function() {
			var linkWin = window.open('','linkWin','width=400, height=100,toolbar=0,scrollbars=yes,status=0,directories=0,location=0,menubar=0,resizable=0');
			var loc = String(window.location);
			linkWin.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>Ссылка на комментарий</title></head><body><div>'+loc.slice(0, loc.indexOf("#"))+"#" + $(this).closest("div.comment").find("a[name!='']").attr("name")+'</div></body></html>');
			linkWin.focus();
			return false;
		})
		.delegate("a.reply", "click", function() {
			var $a = $(this);
			$("#comments_block a.reply").show();
			$a.hide();
			var rId = /([0-9]+)/.exec($(this).parents("div.block:last").attr("class"));
			var recipe = /([0-9]+)/.exec($(this).parents("div.block:last").attr("class"));
			$("#reply_form").hide().insertAfter($(this).closest("div.comment")).slideDown("middle")
				.find(":hidden[name='cId']").val($(this).parents("div.block:last").children("div.comment").attr("id")).end()
				.find(":hidden[name='rId']").val(rId ? rId[0] : "").end()
				.find(":hidden[name='pId']").val($(this).parents("div.comment:last").attr("id")).end()
				//.find(":hidden[name='recipe']").val(recipe ? recipe[0] : "").end()
				.find("textarea").focus();
			$("#reply_form").delegate("div.close_icon a", "click", function() {
				$("#reply_form").slideUp("middle");
				$a.show();
				return false;
			}).delegate("input.submit", "click", function() {
				var commentText = $("#reply_form textarea");
				if($(commentText).val() != "" || $(commentText).text() != "" || $(commentText).html() != "") {
					if($("#reply_form").hasClass("not_authorized")) {
						$("#login_popup").popup();
						$.cookie('cossa_comment', '{"articleId":"'+$("#reply_form :hidden[name='recipe']").val()+'", "commentId":"'+$("#reply_form :hidden[name='cId']").val()+'", "text":"'+$("#reply_form textarea").val()+'"}', { expires: 1, path: '/', domain: 'cossa.ru'});
						$.cookie('cossa_comment_time', "true", { expires: 1/24/60, path: '/', domain: 'cossa.ru'});
						return false;
					}
					else {$("#reply_form form").submit();}
				}
				else {
					$(this).closest("div.form_field").addClass("attention");
					$("#reply_form textarea").focus();
					return false;
				}
			}).delegate("textarea", "keyup", function(e) {
				if (e.ctrlKey && e.keyCode == 13) {
					if($(this).val() != "" || $(this).text() != "" || $(this).html() != "") {
						$("#reply_form form").submit();
					}
					else {
						$(this).closest("div.form_field").addClass("attention");
						return false;
					}
				}
			}).delegate("textarea", "keydown", function(e) {
				if (e.ctrlKey && e.keyCode == 13) {
					if($(this).val() != "" || $(this).text() != "" || $(this).html() != "") {
						$("#reply_form form").submit();
					}
					else {
						$(this).closest("div.form_field").addClass("attention");
						return false;
					}
				}
			});
			return false;
		})
		.delegate("a.edit", "click", function() {
			$("#comments_block").find("div.comment").removeClass("edit_form").end().find("a.reply").show();
			$(this).closest("div.comment").addClass("edit_form");
			$("#reply_form:visible").slideUp("middle");
			return false;
		})
		.delegate("a.close_icon", "click", function() {
			$(this).closest("div.comment").removeClass("edit_form");
			return false;
		});
	$("#comments_block div.comment").hover(function() {$(this).find("span.comment_menu a").show();
	},function() {$(this).find("span.comment_menu a[class!=reply]").hide();
	});
	$("#rating_item .gallery").pns_gallery({beltHeight:246, beltWidth:370, vertAlign:true});
	$("#user_menu a.button, #user_menu a.icon").click(function(e) {
		var $this = $(this);
		$("#user_menu a.button, #user_menu a.icon").each(function() {
			if($(this).parent().attr("class") != $this.parent().attr("class")) {
				$(this).removeClass("active").parent().removeClass("active");
			}
		});
		if ($this.parent().find(".menu").is("div")) {
			$this.toggleClass("active").parent().toggleClass("active");
			$this.parent().find(".menu").toggleClass("shown");
			
			if($this.parent().hasClass("profile")) {
				var parentW = $this.parent().outerWidth(),
					menuW = $this.parent().children("div.menu").outerWidth();
					
				if(parentW > menuW) {
					$this.parent().children("div.menu").width(parentW + 1);
				}
				
			}
			
			e.stopPropagation();
			return false;
		}
		/*
		if(!$this.parent().hasClass("favs")) {
			e.stopPropagation();
			return false;
		}
		else if(!$this.parent().hasClass("messages")) {
			e.stopPropagation();
			return false;
		}
		else if($("#user_menu div.messages div.menu").is("div")) {
			$("#user_menu div.messages div.menu").toggleClass("shown");
			e.stopPropagation();
			return false;
		}*/
	});
	$("#user_menu div.menu").click(function(e) {e.stopPropagation();});
	$("#login_link, a.login_link").click(function() {
		$("#login_popup").popup();
		return false;
	});
	$("#login_popup div.close a").click(function() {
		$("#login_popup").popup();
		return false;
	});
	$("#email_popup div.close a").click(function() {
		$.cookie('cossa_email', null, {path:'/', domain: 'cossa.ru'});
		$("#email_popup").popup();
		return false;
	});
});

//Навигация
function NavigateThrough(event) {
	if (!document.getElementById) return;
	if (window.event) event = window.event;
	if (event.ctrlKey) {
		var link = null;
		var href = null;
		switch (event.keyCode ? event.keyCode : event.which ? event.which : null) {
			case 0x25: link = document.getElementById ('PrevLink'); break;
			case 0x27: link = document.getElementById ('NextLink'); break;
			case 0x24: href = '/'; break;
		}
		if (link && link.href) document.location = link.href;
		if (href) document.location = href;
	}
}

function stopEvent(e) {
	if(!e) e = window.event;
	if(e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;
}

//carousel
(function($){
	var defaults = {
		itemClass:"item",//class of each carousel item
		scrollNum:4,//num of items for one iteration
		scrollTime:1000,//time of one iteration
		pointers:true,
		pager:true
	};
	$.fn.fc_carousel = function(params) {
		var options = $.extend({}, defaults, params);
		$(this).each(function() {
			var $this = $(this);
			//html
			var $items = $this.find("."+options.itemClass).addClass("fc_item");
			$items.itemWidth = $items.outerWidth() + cssValue($items.css("marginLeft")) + cssValue($items.css("marginRight"));
			$this.addClass("fc_carousel").empty().append($('<div class="fc_carousel_block"></div>').append($('<div class="fc_belt"></div>').append($items).append('<div class="fc_clear"></div>')));
			var beltWidth = 0;
			$items.each(function() {beltWidth += $(this).outerWidth() + cssValue($(this).css("marginLeft")) + cssValue($(this).css("marginRight"))});
			var $carouselBlock = $this.find(".fc_carousel_block");
			$carouselBlock.itemsNum = Math.floor($carouselBlock.width()/$items.itemWidth);
			
			var $belt = $this.find("div.fc_belt").width(beltWidth);
			$belt.leftPosition = 0;
			$belt.start = -cssValue($this.find("."+options.itemClass+":first").css("marginLeft"));//the ultimate left point to scroll to
			$belt.finish = -(beltWidth-$carouselBlock.width()-cssValue($this.find("."+options.itemClass+":last").css("marginRight")));//the ultimate right point to scroll to
			
			//buttons
			if(beltWidth>$carouselBlock.width()) {
				if(options.pointers === true) {//add pointers
					var $pointers = $('<div class="fc_pointers"><a href="#" class="fc_backward"><span>Назад</span></a><a href="#" class="fc_forward"><span>Вперёд</span></a></div>');
					$this.prepend($pointers);
					$pointers.find("a").click(function() {methods.nav(this); return false;});
				}
				
				if(options.pager === true) {//add pager
					var $pager = $('<div class="fc_pager"></div>');
					for(var i=1; i<=Math.ceil($items.size()/$carouselBlock.itemsNum); i++) {
						$pager.append('<a href="#">'+i+'</a>')
					}
					$this.append($pager);
					$pager.find("a:eq(0)").addClass("active").end().find("a").click(function() {methods.pagerNav(this); return false;});
				}
			}
			
			var methods = {
				nav:function(anc) {
					var $anc = $(anc), dinstance=options.scrollNum*$items.itemWidth;
					if($anc.hasClass("fc_forward")) {dinstance = -dinstance;}
					$belt.leftPosition = $belt.leftPosition+dinstance;
					
					if($belt.leftPosition>$belt.start) {$belt.leftPosition=$belt.start;}
					else if($belt.leftPosition<$belt.finish) {$belt.leftPosition = $belt.finish;}
					
					$belt.animate({marginLeft:$belt.leftPosition}, options.scrollTime);
					
					if($anc.hasClass("fc_forward")) {
						$pager.find("a.active").removeClass("active").next("a").addClass("active");}
					else $pager.find("a.active").removeClass("active").prev("a").addClass("active");{}
					
					return false;
				},
				pagerNav:function(anc) {
					$pager.find("a").removeClass("active");
					var $anc = $(anc).addClass("active");
					$belt.leftPosition = -$items.itemWidth*$carouselBlock.itemsNum*$pager.find("a").index($anc);
					if($belt.leftPosition>$belt.start) {$belt.leftPosition=$belt.start;}
					else if($belt.leftPosition<$belt.finish) {$belt.leftPosition = $belt.finish;}
					
					$belt.animate({marginLeft:$belt.leftPosition}, options.scrollTime);
				}
			};
			function cssValue(value) {return parseInt(/^-*[0-9]*/.exec(value), 10);}
		});
		return this;
	};
})(jQuery);

//teaser
(function($){
	var defaults = {
		itemClass:"item",//class of each carousel item
		pointers:true,
		pager:true,
		auto:1000,
		skip:true
	};
	$.fn.top_teaser = function(params) {
		var options = $.extend({}, defaults, params);
		$(this).each(function() {
			var $this = $(this).addClass("fc_carousel"),
				$blocks = $this.find("div.items_block");
			//html
			$blocks.hide().end().find("div.items_block:eq(0)").show();
			
			//buttons
			if(options.pointers === true) {//add pointers
				var $pointers = $('<div class="fc_pointers"><a href="#" class="fc_backward"><span>Назад</span></a><a href="#" class="fc_forward"><span>Вперёд</span></a></div>');
				$this.prepend($pointers);
				$pointers.find("a").click(function() {methods.nav(this); return false;});
			}
			
			if(options.pager === true) {//add pager
				var $pager = $('<div class="fc_pager"></div>');
				for(var i=1; i<=$blocks.size(); i++) {
					$pager.append('<a href="#">'+i+'</a>');
				}
				$this.prepend($pager);
				$pager.find("a:eq(0)").addClass("active").end().find("a").click(function() {
					this.style.backgroundImage = "url(/images/timer.gif?" + Math.random() + ")";
					methods.pagerNav(this);
					return false;
				});
			}
			
			var methods = {
				pagerNav:function(anc) {
					var $anc = $(anc);
					if($anc.hasClass("active") && options.skip == true) {
						interval();
						return;
					}
					$pager.find("a").removeClass("active");
					$(anc).addClass("active");
					$pager.parents("div.fc_carousel").find("div.items_block").hide().end().find("div.items_block:eq(" + $pager.find("a").index($anc) + ")").show();
					imgAlign($this.find("div.items_block:visible"));
					
					if(options.auto) {
						clearInterval(teaserInterval);
						teaserInterval = setInterval(function() {interval();}, options.auto);
					}
				}
			};
			function cssValue(value) {return parseInt(/^-*[0-9]*/.exec(value), 10);}
			
			function interval() {
				$nextAnchor = $pager.find("a.active");
				if($nextAnchor.next("a").is("a")) {
					$nextAnchor = $nextAnchor.next("a");
				}
				else {
					$nextAnchor = $pager.find("a:eq(0)");
				}
				$nextAnchor.click();
			}
			
			function imgAlign($block) {
				$block.find("img.img_align").each(function() {
					var $img = $(this),
						$parent = $img.parent(),
						img = new Image();
						
					img.src = $img.attr("src");
					var hei = Math.floor(img.height*$img.attr("width")/img.width);
					if(hei>0) {
						$img.css({marginTop:($parent.height()/2-hei/2)+"px"});
					}
					$img.load(function() {
						$img.css({marginTop:($parent.height()/2-$img.height()/2)+"px"});
					});
				});
			}
			
			function Timer(elem) {
				var self = this,
					$elem = $(elem);
				
				init();
				
				function init() {
					var timerInterval = setInterval(function() {interval();}, options.auto);
				}
				
				function changeBg() {
					parseInt($this.css("backgroundPosition"));
				}
			}
			
			//var timer = new Timer();
			
			if(options.auto) {//auto click
				var $nextAnchor, teaserInterval = setInterval(function() {interval();}, options.auto);
			}
			
		});
		return this;
	};
})(jQuery);

(function($){
	var defaults = {
		beltHeight:0,
		beltWidth:0,
		vertAlign:false
	};
	$.fn.pns_gallery = function(params) {
		var options = $.extend({}, defaults, params);
		$(this).each(function() {
			var $this = $(this).addClass("pns_gallery"),
			$images = $this.find("img"),
			$firstImg = $this.find("img:eq(0)"),
			$belt = $('<div class="belt"></div>'),
			methods = {
				list:function(anc) {
					$thisA = $(anc);
					$belt.find("img:visible").fadeOut("fast", function() {
						var $img = $($images[$a.index($thisA)]);
						$img.fadeIn().css({marginTop:-1*($img.height()-$belt.height())/2+"px"});
					});
					$a.each(function(){$(this).removeClass("active")});
					$thisA.addClass("active");
				}
			};
			if($images.size()>1) {
				$this.prepend($belt.append($images));
				$images.maxHeight = $($images[0]).outerHeight();
				$this.append('<div class="switch"></div>');
				var $switch = $this.find(".switch");
				for (var i=0; i<$images.size(); i++) {
					$images.maxHeight = Math.max($images.maxHeight, $($images[i]).outerHeight());
					$switch.append('<a href="#">'+(i+1)+'</a>');
					if(i>0) {$images[i].style.display = "none";}
				}
				if(options.beltHeight!=0) {$belt.height(options.beltHeight);}
				else {$belt.height($images.maxHeight);}
				$a = $switch.find("a").click(function() {
					if(!$(this).hasClass("active")) {methods.list(this);}
					return false;
				});
				$($a[0]).addClass("active");
				var img = new Image();
				img.src = $firstImg.attr("src");
				$firstImg.css({marginTop:$belt.height()/2-Math.floor(img.height*$firstImg.attr("width")/img.width)/2+"px"});
				$firstImg.load(function() {
					$firstImg.css({marginTop:($belt.height()/2-$firstImg.height()/2)+"px"});
				});
				$images.click(function() {
					var $activeA = $switch.find("a.active").removeClass("active");
					if($activeA.next("a").is("a")) {var $nexA = $activeA.next("a")}
					else {var $nexA = $switch.find("a:eq(0)")}
					$nexA.click();
				});
			}
		});
		return this;
	};
})(jQuery);

(function($) {
	var defaults = {
		opaco:true,
		valign:"center",
		align:"center",
		after:function(thisElem){}
		//closeElem:"a.close"
		//close:function(thisElem){} overwrites default function
	};
	
	$.fn.popup = function(params) {
		var options = $.extend({}, defaults, params);
		$(this).each(function() {
			var $this=$(this);
			if(!$this.is(":visible")) {
				var topPx="20px", leftPx="50%", marginLeft=0, outerHeight=$this.outerHeight(), winHeight=$(window).height();
				switch(options.valign) {
					case "top": topPx = $(window).scrollTop() + 20 + "px"; break;
					case "center":
						if (winHeight > outerHeight) {topPx = winHeight/2 + $(window).scrollTop() - outerHeight/2 - 20 + "px";}
						else {topPx = $(window).scrollTop() + 20 + "px";}
						break;
					case "bottom": topPx = $(window).scrollTop()+winHeight-outerHeight-20 + "px";break;
				}
				switch(options.align) {
					case "left": leftPx = "0px"; break;
					case "center":
						leftPx = "50%";
						marginLeft = -$this.outerWidth()/2+"px";
						break;
					case "right": leftPx = $(document).width()-$this.outerWidth()+"px";break;
				}
				if(options.opaco === true) {
					$this.before('<div id="opaco"></div>');
					$("#opaco").css({width:"100%", height:$(document).height()+"px"}).show();
					var closeElem = $("#opaco");
					if(options.closeElem){closeElem=$("#opaco, "+options.closeElem+"");}
					
					var closeFunc = function() {$this.popup(options);};
					if(options.close){closeFunc=function(){options.close(this);};}
					closeElem.click(function(e) {
						if($this.attr("id") == "email_popup") {
							$.cookie('cossa_email', null, {path:'/', domain: 'cossa.ru'});
						}
						closeFunc();
						e.preventDefault();
					});
				}
				$this.show().css({marginLeft:marginLeft, left:leftPx}).animate({top:topPx}, 500, function() {
					if(options.after) {options.after(this);}
				});
			}
			else {
				$this.hide();
				$("#opaco").remove();
				if(options.closeElem){
					$(""+options.closeElem+"").unbind("click");}
			}
			options.after($this);
		});
		return this;
	};
})(jQuery);

/*dj.selectMac - nice appearance of select element in each of broadly known browsers from IE6 to FF*/

(function($){
	var defaults = {
		selectClass:"selectMac_dj"
	};
	$.fn.selectMac_dj = function(params) {
		var options = $.extend({}, defaults, params);
		
		this.each(function() {
			var $this = $(this);
			//html
			var li="";
			for(var i=0; i<$this.find("option").size(); i++) {li+='<span class="li" rel="'+$this.find("option:eq("+i+")").val()+'">'+$this.find("option:eq("+i+")").text()+'</span>';}
			var $select=$('<span class="'+options.selectClass+'"><input type="hidden" name="'+$this.attr("name")+'" value="'+$this.find("option:selected").val()+'"><span class="select"><span><span class="ul">'+li+'</span></span></span><a href="#" class="frame_bg icon"><span class="left"><span class="right"><span class="bg"><span>'+$this.find("option:selected").text()+'</span></span></span></span></a></span>'),
			
			$selectDiv = $select.find("span.select > span"),
			$bg = $select.find("span.bg"),
			$ul = $select.find("span.ul"),
			$li = $select.find("span.li"),
			selectWidth = $this.outerWidth(),
			
			methods={
				numValue:function(value) {
					var string = new String(value);
					return parseInt(string.slice(0, string.length-2));
				},
				click:function(e) {
					$("."+options.selectClass).each(function() {
						if (this != $select[0]) {$(this).children("span.scroll").hide().end().find("span.body").slideUp("fast").end().children("span.pointer").children("span").removeClass("up");}
					});
					if($li.size() > options.visibleLi) {
						$body.css({height:"303px"});//!
						if($scroll.is(":hidden")) {
							$slider.css({top:"-3px"});//!
							$ul.css({marginTop:"0"});
							$body.slideDown("fast", function() {$scroll.show();});
						}
						else {
							$scroll.hide();
							$body.slideUp("fast");
						}
					}
					else {$body.slideToggle("fast");
					}
					$pointer.toggleClass("up");
					e.stopPropagation();
				}
			};
			$this.before($select).remove();
			$bg.css({width:$bg.outerWidth()-($select.find("a.icon").outerWidth()-selectWidth)});
			$selectDiv.css({width:$bg.outerWidth()});
			
			$li
			.hover(function() {$(this).addClass("hover");}, function() {$(this).removeClass("hover");})
			.click(function() {
				$select.find("span.bg").children("span").text($(this).text());
				$select.children("input").val($(this).attr("rel"));
			});
			//$select.click(methods.click);
			
			$select.find("a.icon").click(function(e) {
				$("span."+options.selectClass+" span.select span").slideUp("middle");
				$(this).siblings("span.select").children("span").stop().slideToggle("middle");
				e.stopPropagation();
				return false;
			});
			//$("span.date_select a.icon, span.date_select span.select, span.other_select a.icon, span.other_select span.select").click(function(e) {stopEvent(e);});
		});
		
		$(document).bind("click", function() {$("span."+options.selectClass+" span.select span").slideUp("middle");});
		
		return this;
	};
})(jQuery);

/*$("#search").placeholder(
	{
		text:"Я ищу",
		color:"#333333"
	}
	$("input[placeholder!='']").placeholder();
	$("input[placeholder!='']").placeholder({color:"#333333"});
);*/
(function($) {
	var defaults = {
		text:"",
		color:"#aaaaaa"
	};
	$.fn.placeholder = function(params) {
		var options = $.extend({}, defaults, params);
		$(this).each(function() {
			var $this = $(this),
				defColor = this.style.color,
				defText = options.text||$this.attr("placeholder"),
				methods = {
					focusMethod:function(obj) {
						obj.style.color = defColor;
						$(obj).removeClass("placeholder");
					},
					blurMethod:function(obj) {
						obj.style.color = options.color;
						$(obj).addClass("placeholder");
					}
				};
			if(this.tagName != "TEXTAREA") {
				if($this.val() == "" || $this.val() == defText) {
					$this.val(defText).css({color:options.color}).addClass("placeholder");
				}
				$this.focus(function() {
					if (this.value == defText) {
						methods.focusMethod(this);
						this.value = "";
						$("div.filter div.select div.input").removeClass("focus");
					}
				}).blur(function() {
					if (this.value == "") {
						methods.blurMethod(this);
						this.value = defText;
					}
				});
			}
			else {
				if($this.val() == "" || $this.val() == defText) {
					$this.val(defText).css({color:options.color}).addClass("placeholder");
				}
				$this.focus(function() {
					if ($this.val() == defText) {
						methods.focusMethod(this);
						$this.val("");
						$("div.filter div.select div.input").removeClass("focus");
					}
				}).blur(function() {
					if ($this.val() == "") {
						methods.blurMethod(this);
						$this.val(defText)
					}
				});
			}
		});
		return this;
	};
})(jQuery);

(function($) {
	var defaults = {};
	$.fn.lecturers = function(params) {
		var options = $.extend({}, params, defaults);
		$(this).each(function() {
			var $this = $(this);
		});
	};
})(jQuery);

(function($) {
	var defaults = {
		forget:false
	};
	$.fn.validateForm = function(params) {
		var options = $.extend({}, params, defaults);
		$(this).each(function() {
			var $this = $(this),
				submitFlag = 0,
				firstElement = null,
				$confirm = "",
				$password = "",
			
				methods = {
					setAttention:function($elem) {
						if($elem.hasClass("source")) {
							$elem.closest("div.item").addClass("attention");
						}
						else {
							$elem.closest("div.form_field").addClass("attention");
						}
						if(submitFlag == 0) {firstElement = $elem;}
						submitFlag = 1;
					},
					removeAttention:function($elem) {
						if($elem.hasClass("source")) {
							$elem.closest("div.item").removeClass("attention");
						}
						else {
							$elem.closest("div.form_field").removeClass("attention");
						}
					},
					check:function() {
						submitFlag = 0;
						firstElement = null;
						if($this.closest("#form_section").hasClass("remind")) {
							var $firstElem = $this.find("input.text:eq(1)");
							if ($this.find("input.text:eq(0)").val() != "") {return true;}
							else if($firstElem.val() != "") {
								var mail = $firstElem.val();
								var mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
								if(!mail.match(mailRegex)){
									$firstElem.parent().addClass("attention");
									return false;
								}
								else {return true;
								}
							}
							else {
								$this.find("input.text").each(function() {
									$(this).parent().addClass("attention");
								});
								return false;
							}
						}
						else {
							methods.checkInput();
							methods.checkPassword();
							methods.checkTextarea();
							methods.checkSelect();
							methods.checkTeaser();
							/*if(tName) {
								$("#form_button_name").attr({name:tName});
							}*/
							if (submitFlag == 0) {return true;}
							else {
								var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
								if((firstElement.offset().top - scrollTop) < 0) {
									$.scrollTo(firstElement.parent(), 10);
									if(firstElement!=null) {firstElement.focus();}
								}
								return false;
							}
						}
					},
					checkTeaser:function() {
						$this.find("div.teaser_img").each(function() {
							var $input = $(this).find("div.image");
							if($input.hasClass("empty")) {methods.setAttention($input);}
							else {methods.removeAttention($input);}
						});
					},
					checkInput:function() {
						$this.find("input.text[type!=password]").each(function() {
							var $input = $(this),
								$val = $input.val(),
								mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i,
								sourceRegex = /^((https?:\/\/)?(www\.)?([-a-z0-9]+\.)+[a-z]{2,})$/i,
								phoneRegex = /^([0-9-()\++\s]{5,})$/i,
								priceRegex = /^([0-9\s\.,]+)$/i,
								$noText = $input.closest("div.form_field").find("span.no_text");
							
							if ($val == "" && $noText.is("span")) {methods.setAttention($input);}
							else if ($input.attr("name").toLowerCase().search("mail") != -1 && $noText.is("span")) {
								if(!$val.match(mailRegex)){methods.setAttention($input);}
								else {methods.removeAttention($input);}
							}
							else if ($input.hasClass("phone") && $noText.is("span")) {
								if(!$val.match(phoneRegex)){methods.setAttention($input);}
								else {methods.removeAttention($input);}
							}
							else if ($input.hasClass("price") && $noText.is("span")) {
								if(!$val.match(priceRegex)){methods.setAttention($input);}
								else {methods.removeAttention($input);}
							}
							else {methods.removeAttention($input);}
							
							if (~$input.attr("name").indexOf("source") && $val != "" && $val != "http://" && $val != "https://") {
								if(!$val.match(sourceRegex)){methods.setAttention($input);}
								else {methods.removeAttention($input);}
							}
						});
					},
					checkPassword:function() {
						$this.find(":password").each(function() {
							var $pass;
							if ($pass.attr("name").toLowerCase().search("confirm") != -1) {$confirm = $(this);}
							else {$password = $(this);}
						});
						if($confirm!="") {
							if($this.parent().attr("id") == "new_password" && ($password.val() == "" || $password.val() != $confirm.val())) {
								methods.removeAttention($password);
								methods.setAttention($confirm);
							}
							else {
								if ($password.val() == "") {
									methods.removeAttention($password);
									methods.removeAttention($confirm);
								}
								else if (($password.val() != "" && $confirm.val() == "") || ($password.val() != "" && $confirm.val() != "" && $password.val() != $confirm.val())) {
									methods.removeAttention($password);
									methods.setAttention($confirm);
								}
							}
						}
						else if($password != "" && $password.val() == "") {methods.setAttention($password);}
					},
					checkTextarea:function() {
						$this.find("textarea").each(function() {
							var $textarea = $(this),
								$val = $textarea.val(),
								$noText = $textarea.closest("div.form_field").find("span.no_text");
							
							if (($val == "") && $noText.is("span")) {methods.setAttention($textarea);}
							else {methods.removeAttention($textarea);}
						});
					},
					checkSelect:function() {
						$this.find("select").each(function() {
							var $select = $(this),
								$val = $select.val(),
								$noText = $select.closest("div.form_field").find("span.no_text");
							
							if (($val == "") && $noText.is("span")) {methods.setAttention($select);}
							else {methods.removeAttention($select);}
						});
					},
					submitForm:function(e) {
						if($("#file-uploader .apply").is("div")) {
							$("#file-uploader .apply").click();
						}
						if($this.closest("div.body").parent().attr("id") == "email_popup") {
							var email = $this.find(":text").val();
							$.ajax({
								url:"/php/ajax_write_email.php",
								data:"email=" + email,
								success:function(errorMsg) {
									if(errorMsg) {
										$this.find("div.form_field").addClass("attention").find("h5").html(errorMsg + '<span class="no_text">?</span>');
									}
									else {
										$("#opaco").click();
									}
								}
							});
							e.preventDefault();
							return false;
						}
						return true;
					}
				};
			
			$this.find(":submit").click(function(e) {
				if(!methods.check()) {
					e.preventDefault();
					return false;
				}
				else {
					methods.submitForm(e);
				}
			}).end().find("input.text").each(function() {
				if(this.className.toLowerCase().search("ac_input")==-1) {
					$(this).keyup(function(e) {
						if(e.which == 13) {
							$this.find(":submit").click();
							//methods.submitForm(e);
						}
					});
				}
			}).end().find("select").each(function() {
				$(this).keypress(function(e) {
					if(e.which == 13) {
						$this.find(":submit").click();
						//methods.submitForm(e);
					}
				});
			}).end().find("textarea").keyup(function(e) {
				if(e.ctrlKey && e.keyCode == 13) {
					$this.find(":submit").click();
					//methods.submitForm(e);
				}
			});
		});
	};
})(jQuery);

/*All pictures have fixed size now, 580x340*/
(function($) {
	var defaults = {};
	$.fn.photo_block = function(params) {
		var options = $.extend({}, params, defaults);
		$(this).each(function() {
			var $img = $(this).find("img"),
				authors = $(this).find("span.authors").text();
				
				$img.num = $img.size();
				$img.wid = 580*$img.num;
				$img.each(function() {
					var $thisImg = $(this);
					this.removeAttribute("height");
					$thisImg.attr({width:"580"});
					var margin=$thisImg.height()/2-340/2;
					//$img.wid += $thisImg.width();
					if(margin!=-170) {
						$thisImg.css({marginTop:-1*margin+"px"});
					}
				});
			
			//html
			var $belt = $('<div class="belt"></div>').append($img),
				$images = $('<div class="image"></div>').append($belt),
				$switch = $('<div class="switch"><a href="#" class="backward default" title="Назад">Назад</a><a href="#" class="forward" title="Вперед">Вперед</a><div class="num"><span></span></div></div>'),
				$this = $('<div class="photo_block"></div>').append($images).append($switch).append('<div class="authors">'+authors+'</div>'),
				$num = $switch.find("div.num").find("span");
			
			$(this).after($this).remove();
			$belt.width($img.wid);
			$belt.mLeft = 0;
			$img.current = 0;
			
			$num.text((parseInt($img.index($($img[$img.current])), 10)+1)+"/"+$img.num);
			
			$switch.find("a").click(function() {
				methods.nav(this);
				return false;
			});
			
			$img.click(function() {
				$switch.find("a.forward").click();
			});
			
			var methods = {
				nav:function(anc) {
					var $anc = $(anc);
					$switch.find("a").removeClass("default");
					if($anc.hasClass("forward")) {
						$img.current += 1;
						$img.current = $img.current%$img.num;
						/*if($img.current>=$img.num) {
							$img.current -= 1;
							$current.animate({marginLeft:-$current.width()+"px"}, function() {
								$current.css({marginLeft:0});
								$belt.css({marginLeft:methods.val($belt.css("marginLeft"))-$current.width()+"px"});
							});
						}
						else if($img.current==$img.num-1) {$anc.addClass("default");}*/
					}
					else {
						$img.current -= 1;
						$img.current = ($img.current+$img.num)%$img.num;
						/*if($img.current<0) {
							$img.current += 1;
							$anc.addClass("default");
							$current.animate({marginRight:-$current.width()+"px"}, function() {
								$current.css({marginRight:0});
								$belt.css({marginLeft:methods.val($belt.css("marginLeft"))+$current.width()+"px"});
							});
						}
						else if($img.current==0) {$anc.addClass("default");}*/
					}
					$img.each(function() {$(this).hide()});
					$($img[$img.current]).show();
					$num.text((parseInt($img.index($($img[$img.current])), 10)+1)+"/"+$img.num);
				},
				val:function(cssValue) {return parseInt(/^-*[0-9]*/.exec(cssValue), 10);}
			};
		});
		return this;
	};
})(jQuery);

(function($) {
	$.ctrl = function(key, callback, args) {
		var isCtrl = false;
		$(document).keydown(function(e) {
			if(!args) args=[]; // IE barks when args is null
	
			if(e.ctrlKey) isCtrl = true;
			if(e.keyCode == key.charCodeAt(0) && isCtrl) {
				callback.apply(this, args);
				return false;
			}
		}).keyup(function(e) {
			if(e.ctrlKey) isCtrl = false;
		});
	};
})(jQuery);

(function($) {
	var defaults = {};
	$.fn.change_days = function(params) {
		var options = $.extend({}, params, defaults);
		$(this).each(function() {
			var $this = $(this),
				$daySelect = $this.find("select.day"),
				$monthSelect = $this.find("select.month"),
				$yearSelect = $this.find("select.year"),
				methods = {
					days:function(month, year) {
						month--;
						if (month==1) return (((year%4)==0) && ((year%100)!=0))||((year%400)==0)?29:28;//Если февраль, то расчитываем високосные годы
   						else return methods.daysArray[month];
					},
					daysArray:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
					fillSelect:function(e) {
						var html,
							num = methods.days(parseInt($monthSelect.val(),10), parseInt($yearSelect.val(),10)),
							day = methods.selectedDay;
						if(num<day) {day=num;}
						for(var i = 1; i <= num; i++) {
							var selected = "";
							if(i == day) {selected = ' selected="selected"'}
							html += '<option value="'+i+'"'+selected+'>'+i+'</option>'
						}
						$daySelect.empty().append(html);
					},
					getSelectedDay:function() {
						methods.selectedDay = $daySelect.val();
					},
					getDateTime:function($obj) {
						var $daySelect = $obj.find("select.day"),
							$monthSelect = $obj.find("select.month"),
							$yearSelect = $obj.find("select.year");
						
						return new Date($yearSelect.val(), +$monthSelect.val()-1, $daySelect.val(), 0, 0, 0, 0).getTime();
					},
					compareDates:function() {
						var $firstDate = $this.closest("form").find("div.date_field:eq(0)");
						var $lastDate = $this.closest("form").find("div.date_field:eq(1)");
						
						if((methods.getDateTime($lastDate) - methods.getDateTime($firstDate)) < 0) {
							
						}
					}
				};
			$monthSelect.change(methods.fillSelect);
			$yearSelect.change(methods.fillSelect);
			methods.getSelectedDay();
			$daySelect.change(function() {methods.getSelectedDay();});
			methods.getDateTime($this);
		});
		return this;
	};
})(jQuery);

var cityAutocompleteArray, organizerAutocompleteArray;
(function($) {
	$.autocomplete = function(input, options) {
	// Create a link to self
	var me = this;

	// Create jQuery object for input element
	var $input = $(input).attr("autocomplete", "off");

	// Apply inputClass if necessary
	if (options.inputClass) $input.addClass(options.inputClass);

	// Create results
	var results = document.createElement("div");
	// Create jQuery object for results
	var $results = $(results);
	$results.hide().addClass(options.resultsClass).css("position", "absolute");
	if( options.width > 0 ) $results.css("width", options.width);

	// Add to body element
	$("body").append(results);

	input.autocompleter = me;

	var timeout = null;
	var prev = "";
	var active = -1;
	var cache = {};
	var keyb = false;
	var hasFocus = false;
	var lastKeyPressCode = null;

	// flush cache
	function flushCache(){
		cache = {};
		cache.data = {};
		cache.length = 0;
	};

	// flush cache
	flushCache();

	// if there is a data array supplied
	if( options.data != null ){
		var sFirstChar = "", stMatchSets = {}, row = [];

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( typeof options.url != "string" ) options.cacheLength = 1;

		// loop through the array and create a lookup structure
		for( var i=0; i < options.data.length; i++ ){
			// if row is a string, make an array otherwise just reference the array
			row = ((typeof options.data[i] == "string") ? [options.data[i]] : options.data[i]);

			// if the length is zero, don't add to list
			if( row[0].length > 0 ){
				// get the first character
				sFirstChar = row[0].substring(0, 1).toLowerCase();
				// if no lookup array for this character exists, look it up now
				if( !stMatchSets[sFirstChar] ) stMatchSets[sFirstChar] = [];
				// if the match is a string
				stMatchSets[sFirstChar].push(row);
			}
		}

		// add the data items to the cache
		for( var k in stMatchSets ){
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			addToCache(k, stMatchSets[k]);
		}
	}

	$input
	.keydown(function(e) {
		// track last key pressed
		lastKeyPressCode = e.keyCode;
		switch(e.keyCode) {
			case 38: // up
				e.preventDefault();
				moveSelect(-1);
				break;
			case 40: // down
				e.preventDefault();
				moveSelect(1);
				break;
			case 9:  // tab
			case 13: // return
				if( selectCurrent() ){
					// make sure to blur off the current field
					$input.get(0).blur();
					e.preventDefault();
				}
				break;
			default:
				active = -1;
				if (timeout) clearTimeout(timeout);
				timeout = setTimeout(function(){onChange();}, options.delay);
				break;
		}
	})
	.focus(function(){
		// track whether the field has focus, we shouldn't process any results if the field no longer has focus
		hasFocus = true;
	})
	.blur(function() {
		// track whether the field has focus
		hasFocus = false;
		hideResults();
	});

	hideResultsNow();

	function onChange() {
		// ignore if the following keys are pressed: [del] [shift] [capslock]
		if( lastKeyPressCode == 46 || (lastKeyPressCode > 8 && lastKeyPressCode < 32) ) return $results.hide();
		var v = $input.val();
		if (v == prev) return;
		prev = v;
		if (v.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			requestData(v);
		} else {
			$input.removeClass(options.loadingClass);
			$results.hide();
		}
	};

 	function moveSelect(step) {

		var lis = $("li", results);
		if (!lis) return;

		active += step;

		if (active < 0) {
			active = 0;
		} else if (active >= lis.size()) {
			active = lis.size() - 1;
		}

		lis.removeClass("ac_over");

		$(lis[active]).addClass("ac_over");

		// Weird behaviour in IE
		// if (lis[active] && lis[active].scrollIntoView) {
		// 	lis[active].scrollIntoView(false);
		// }

	};

	function selectCurrent() {
		var li = $("li.ac_over", results)[0];
		if (!li) {
			var $li = $("li", results);
			if (options.selectOnly) {
				if ($li.length == 1) li = $li[0];

			} else if (options.selectFirst) {
				li = $li[0];
			}
		}
		if (li) {
			selectItem(li);
			return true;
		} else {
			return false;
		}
	};

	function selectItem(li) {
		if (!li) {
			li = document.createElement("li");
			li.extra = [];
			li.selectValue = "";
		}
		var v = $.trim(li.selectValue ? li.selectValue : li.innerHTML);
		input.lastSelected = v;
		prev = v;
		$results.html("");
		$input.val(v);
		hideResultsNow();
		if (options.onItemSelect) setTimeout(function() { options.onItemSelect(li) }, 1);
	};

	// selects a portion of the input string
	function createSelection(start, end){
		// get a reference to the input element
		var field = $input.get(0);
		if( field.createTextRange ){
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart("character", start);
			selRange.moveEnd("character", end);
			selRange.select();
		} else if( field.setSelectionRange ){
			field.setSelectionRange(start, end);
		} else {
			if( field.selectionStart ){
				field.selectionStart = start;
				field.selectionEnd = end;
			}
		}
		field.focus();
	};

	// fills in the input box w/the first match (assumed to be the best match)
	function autoFill(sValue){
		// if the last user key pressed was backspace, don't autofill
		if( lastKeyPressCode != 8 ){
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(prev.length));
			// select the portion of the value not typed by the user (so the next character will erase)
			createSelection(prev.length, sValue.length);
		}
	};

	function showResults() {
		// get the position of the input field right now (in case the DOM is shifted)
		var pos = findPos(input);
		// either use the specified width, or autocalculate based on form element
		var iWidth = (options.width > 0) ? options.width : $input.width();
		// reposition
		$results.css({
			width: parseInt(iWidth) + "px",
			top: (pos.y + input.offsetHeight) + "px",
			left: pos.x + "px"
		})//.show();
	};

	function hideResults() {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		if (timeout) clearTimeout(timeout);
		$input.removeClass(options.loadingClass);
		if ($results.is(":visible")) {
			$results.hide();
		}
		if (options.mustMatch) {
			var v = $input.val();
			if (v != input.lastSelected) {
				selectItem(null);
			}
		}
	};

	function receiveData(q, data) {
		if (data) {
			$input.removeClass(options.loadingClass);
			results.innerHTML = "";

			// if the field no longer has focus or if there are no matches, do not display the drop down
			if( !hasFocus || data.length == 0 ) return hideResultsNow();

			if ($.browser.msie) {
				// we put a styled iframe behind the calendar so HTML SELECT elements don't show through
				$results.append(document.createElement('iframe'));
			}
			results.appendChild(dataToDom(data));
			// autofill in the complete box w/the first match as long as the user hasn't entered in more data
			if( options.autoFill && ($input.val().toLowerCase() == q.toLowerCase()) ) autoFill(data[0][0]);
			showResults();
		} else {
			hideResultsNow();
		}
	};

	function parseData(data) {
		if (!data) return null;
		var parsed = [];
		var rows = data.split(options.lineSeparator);
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				parsed[parsed.length] = row.split(options.cellSeparator);
			}
		}
		return parsed;
	};

	function dataToDom(data) {
		var ul = document.createElement("ul");
		var num = data.length;

		// limited results to a max number
		if( (options.maxItemsToShow > 0) && (options.maxItemsToShow < num) ) num = options.maxItemsToShow;

		for (var i=0; i < num; i++) {
			var row = data[i];
			if (!row) continue;
			var li = document.createElement("li");
			if (options.formatItem) {
				li.innerHTML = options.formatItem(row, i, num);
				li.selectValue = row[0];
			} else {
				li.innerHTML = row[0];
				li.selectValue = row[0];
			}
			var extra = null;
			if (row.length > 1) {
				extra = [];
				for (var j=1; j < row.length; j++) {
					extra[extra.length] = row[j];
				}
			}
			li.extra = extra;
			ul.appendChild(li);
			$(li).hover(
				function() { $("li", ul).removeClass("ac_over"); $(this).addClass("ac_over"); active = $("li", ul).indexOf($(this).get(0)); },
				function() { $(this).removeClass("ac_over"); }
			).click(function(e) { e.preventDefault(); e.stopPropagation(); selectItem(this) });
		}
		return ul;
	};

	function requestData(q) {
		if (!options.matchCase) q = q.toLowerCase();
		var data = options.cacheLength ? loadFromCache(q) : null;
		// recieve the cached data
		if (data) {
			receiveData(q, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			$.get(makeUrl(q), function(data) {
				data = parseData(data);
				addToCache(q, data);
				receiveData(q, data);
			});
		// if there's been no data found, remove the loading class
		} else {
			$input.removeClass(options.loadingClass);
		}
	};

	function makeUrl(q) {
		var url = options.url + "?q=" + encodeURI(q);
		for (var i in options.extraParams) {
			url += "&" + i + "=" + encodeURI(options.extraParams[i]);
		}
		return url;
	};

	function loadFromCache(q) {
		if (!q) return null;
		if (cache.data[q]) return cache.data[q];
		if (options.matchSubset) {
			for (var i = q.length - 1; i >= options.minChars; i--) {
				var qs = q.substr(0, i);
				var c = cache.data[qs];
				if (c) {
					var csub = [];
					for (var j = 0; j < c.length; j++) {
						var x = c[j];
						var x0 = x[0];
						if (matchSubset(x0, q)) {
							csub[csub.length] = x;
						}
					}
					return csub;
				}
			}
		}
		return null;
	};

	function matchSubset(s, sub) {
		if (!options.matchCase) s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};

	this.flushCache = function() {
		flushCache();
	};

	this.setExtraParams = function(p) {
		options.extraParams = p;
	};

	this.findValue = function(){
		var q = $input.val();

		if (!options.matchCase) q = q.toLowerCase();
		var data = options.cacheLength ? loadFromCache(q) : null;
		if (data) {
			findValueCallback(q, data);
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			$.get(makeUrl(q), function(data) {
				data = parseData(data)
				addToCache(q, data);
				findValueCallback(q, data);
			});
		} else {
			// no matches
			findValueCallback(q, null);
		}
	}

	function findValueCallback(q, data){
		if (data) $input.removeClass(options.loadingClass);

		var num = (data) ? data.length : 0;
		var li = null;

		for (var i=0; i < num; i++) {
			var row = data[i];

			if( row[0].toLowerCase() == q.toLowerCase() ){
				li = document.createElement("li");
				if (options.formatItem) {
					li.innerHTML = options.formatItem(row, i, num);
					li.selectValue = row[0];
				} else {
					li.innerHTML = row[0];
					li.selectValue = row[0];
				}
				var extra = null;
				if( row.length > 1 ){
					extra = [];
					for (var j=1; j < row.length; j++) {
						extra[extra.length] = row[j];
					}
				}
				li.extra = extra;
			}
		}

		if( options.onFindValue ) setTimeout(function() { options.onFindValue(li) }, 1);
	}

	function addToCache(q, data) {
		if (!data || !q || !options.cacheLength) return;
		if (!cache.length || cache.length > options.cacheLength) {
			flushCache();
			cache.length++;
		} else if (!cache[q]) {
			cache.length++;
		}
		cache.data[q] = data;
	};

	function findPos(obj) {
		var curleft = obj.offsetLeft || 0;
		var curtop = obj.offsetTop || 0;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
		return {x:curleft,y:curtop};
	}
}

jQuery.fn.autocomplete = function(url, options, data) {
	// Make sure options exists
	options = options || {};
	// Set url as option
	options.url = url;
	// set some bulk local data
	options.data = ((typeof data == "object") && (data.constructor == Array)) ? data : null;

	// Set default values for required options
	options.inputClass = options.inputClass || "ac_input";
	options.resultsClass = options.resultsClass || "ac_results";
	options.lineSeparator = options.lineSeparator || "\n";
	options.cellSeparator = options.cellSeparator || "|";
	options.minChars = options.minChars || 1;
	options.delay = options.delay || 400;
	options.matchCase = options.matchCase || 0;
	options.matchSubset = options.matchSubset || 1;
	options.matchContains = options.matchContains || 0;
	options.cacheLength = options.cacheLength || 1;
	options.mustMatch = options.mustMatch || 0;
	options.extraParams = options.extraParams || {};
	options.loadingClass = options.loadingClass || "ac_loading";
	options.selectFirst = options.selectFirst || false;
	options.selectOnly = options.selectOnly || false;
	options.maxItemsToShow = options.maxItemsToShow || -1;
	options.autoFill = options.autoFill || false;
	options.width = parseInt(options.width, 10) || 0;

	this.each(function() {
		var input = this;
		new jQuery.autocomplete(input, options);
	});

	// Don't break the chain
	return this;
}

jQuery.fn.autocompleteArray = function(data, options) {
	return this.autocomplete(null, options, data);
}

jQuery.fn.indexOf = function(e){
	for( var i=0; i<this.length; i++ ){
		if( this[i] == e ) return i;
	}
	return -1;
};
})(jQuery);

(function($) {
	var defaults = {
		minHeight:60,
		maxHeight:500
	};
	$.fn.resizeTextarea = function(params) {
		var options = $.extend({}, params, defaults);
		$(this).each(function() {
			var $this = $(this),
				methods = {
					setHeight:function() {
						$this.height(options.minHeight);
						if ($this.height() != $this[0].scrollHeight) {
							if ($this[0].scrollHeight > options.maxHeight) {$this.height(options.maxHeight);}
							else {$this.height($this[0].scrollHeight);}
						}
					}
				};
			methods.setHeight();
			$this.attr({rows:options.minHeight});
			
			$this.keyup(function(){methods.setHeight();});
		});
	};
})(jQuery);

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

//multiple text input
(function($) {
	var defaults = {
		defaultValue:"",
		plusElem:{html:'<a href="#" class="plus" title="Добавить"></a>', selector:"a.plus"},
		minusElem:{html:'<a href="#" class="minus" title="Удалить"></a>', selector:"a.minus"},
		inputName:"author"
	};
	$.fn.multiple_input = function(params) {
		var options = $.extend({}, defaults, params);
		$(this).each(function() {
			var $this = $(this),
				methods = {
					structure_changed:function() {
						$this
							.find("a.plus").remove().end()
							.find(":text:last").parent().append(options.plusElem.html).end().end()
							.find(":text").each(function() {
								if($(this).val()==options.defaultValue&&emptyFlag==false)
								{$(this).focus(); emptyFlag=true;}
							});
						emptyFlag=false;
						if($this.find("div.item").size()==1) {
							$this.find(options.minusElem.selector).remove();
						}
						else {
							$this.find("div.item").each(function() {
								if($(this).find(options.minusElem.selector).size()==0) {
									$(this).find(":text").after(options.minusElem.html);
								}
							});
						}
					},
					add_item:function() {
						$this.append('<div class="item"><input type="text" name="'+options.inputName+'[]" class="text" value="'+options.defaultValue+'" />'+options.minusElem.html+'</div>');
					}
				},
				emptyFlag=false,
				$input;
			//html
			if($this.find("div.item").size()>1) {
				$this.find(":text").each(function() {
					$(this).after(options.minusElem.html);
				})
			}
			$this.find(":text:last").parent().append(options.plusElem.html);
			//events
			$this
				.delegate(options.plusElem.selector, "click", function() {
					methods.add_item();
					methods.structure_changed();
					return false;
				})
				.delegate(options.minusElem.selector, "click", function() {
					$(this).parent().remove();
					methods.structure_changed();
					return false;
				});
		});
		return this;
	};
})(jQuery);

//multiple text input
(function($) {
	var defaults = {
		auto:3000
	};
	$.fn.context_hints = function(params) {
		var options = $.extend({}, defaults, params);
		$(this).each(function() {
			var $this = $(this),
				$navA = $this.find("div.nav a"),
				$backward = $this.find("div.nav a.backward"),
				$forward = $this.find("div.nav a.forward"),
				$li = $this.find("li"),
				$active = $this.find("li.active"),
				$next = $active.next("li"),
				$prev = $active.prev("li");
			
			$forward.click(function(e) {
				$active.removeClass("active")
				if(!$next.is("li")) {
					$next = $($li[0]);
				}
				$active = $next.addClass("active");
				getNext();
				getPrev();
				
				if(options.auto) {
					clearInterval(hintsInterval);
					hintsInterval = setInterval(function() {interval();}, options.auto);
				}
				e.stopPropagation();
				e.preventDefault();
			});
			
			$backward.click(function(e) {
				$active.removeClass("active")
				if(!$prev.is("li")) {
					$prev = $($li[$li.size() - 1]);
				}
				$active = $prev.addClass("active");
				getNext();
				getPrev();
				
				if(options.auto) {
					clearInterval(hintsInterval);
					hintsInterval = setInterval(function() {interval();}, options.auto);
				}
				e.stopPropagation();
				e.preventDefault();
			});
				
			function interval() {
				$forward.click();
			}
			
			function getNext() {
				$next = $active.next("li");
			}
			
			function getPrev() {
				$prev = $active.prev("li");
			}
			
			if(options.auto) {//auto click
				var hintsInterval = setInterval(function() {interval();}, options.auto);
			}
		});
		return this;
	};
})(jQuery);

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};