$(document).ready(function() {
	$(".b-letour-table .rating a").click(function() {
		var $this = $(this), vote_comment;
		if(this.className.search("disabled") == -1) {
			switch(this.className) {
				case "decrease": vote_comment="minus";break;
				case "increase": vote_comment="plus";break;
			}
			if($this.parent().hasClass("not_authorized")) {
				$("#login_popup").popup();
				$.cookie('cossa_ok2_rating', '{"id":"'+$this.closest("div.rating").attr("id")+'", "vote":"'+vote_comment+'"}', { expires: 1/24/60, path: '/', domain: '.cossa.ru'});
			} else {
				$.ajax({
					type:"POST",
					url:"/bitrix/components/cossa/iblock.vote_le-tour/component_rating.php",
					data:"vote="+vote_comment+"&comment_id="+$this.closest("div.rating").attr("id"),
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
});