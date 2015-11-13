			<?//include_once($_SERVER["DOCUMENT_ROOT"]."/banner.php");?>
			</div>
			<?
			$curdir = $APPLICATION->GetCurDir();
			/*global $USER;
			if($USER->GetID() == 3){
				echo "<pre>"; print_r($GLOBALS); echo "</pre>";
			}*/
			if(isset($GLOBALS["pager_".str_replace("/","",$curdir)])){
				echo $GLOBALS["pager_".str_replace("/","",$curdir)];
			}
			/*if(strpos("/articles/",$curdir) !== false){
				echo $GLOBALS["pager_".str_replace("/","",$curdir)];
			}elseif(strpos("/news/",$curdir) !== false){
				echo $GLOBALS["pager_news"];
			}elseif(strpos("/events/",$curdir) !== false){
				echo $GLOBALS["pager_events"];
			}elseif(strpos("/vacancies/",$curdir) !== false){
				echo $GLOBALS["pager_vacancies"];
			}elseif(strpos("/ratings/",$curdir) !== false){
				echo $GLOBALS["pager_ratings"];
			}elseif(strpos("/education/",$curdir) !== false){
				echo $GLOBALS["pager_education"];
			}elseif(strpos("/vocabulary/",$curdir) !== false){
				echo $GLOBALS["pager_vocabulary"];
			}*/
			//$GLOBALS['pager']?>
            <?$APPLICATION->IncludeFile('footer_text.html');?>
		<!--</div>
	</div>
	<div id="copyright">Cossa &copy; 2011 <span class="middot">&middot;</span> <a href="mailto:42@cossa.ru">42@cossa.ru</a></div>-->
</div>
<?$APPLICATION->IncludeComponent("cossa:system.auth.form", "cossa.auth_new", array(
	"REGISTER_URL" => "/registration/",
	"FORGOT_PASSWORD_URL" => "/auth/",
	"PROFILE_URL" => "/profile/",
	"SHOW_ERRORS" => "N"
	),
	false
);?>
<!--<div id="top_search_width"></div>-->
<?
global $USER;
if(strlen($_COOKIE["cossa_comment"]) > 0 && (!isset($_COOKIE["cossa_comment_time"]) || $_COOKIE["cossa_comment_time"] == false) && $USER->IsAuthorized()){
	$cossa_comment = json_decode($_COOKIE["cossa_comment"]);
	CModule::IncludeModule("iblock");
	$intRecipe = $cossa_comment->{'articleId'};
	$element = CIBlockElement::GetByID($intRecipe)->Fetch();
	$javastr = "";
	if($element["IBLOCK_ID"] == 2){
		if(intval($element["IBLOCK_SECTION_ID"]) > 0){
			$javastr = "\$publishComment = '/articles/".$element["IBLOCK_SECTION_ID"]."/".$element["ID"]."/?addcomment=y';";
		}else{
			$javastr = "\$publishComment = '/articles/0/".$element["ID"]."/?addcomment=y';";
		}
	}elseif($element["IBLOCK_ID"] == 3){
		if(intval($element["IBLOCK_SECTION_ID"]) > 0){
			$javastr = "\$publishComment = '/news/".$element["IBLOCK_SECTION_ID"]."/".$element["ID"]."/?addcomment=y';";
		}else{
			$javastr = "\$publishComment = '/news/0/".$element["ID"]."/?addcomment=y';";
		}
	}
	if(strlen($javastr) > 0){
		?>
		<script type="text/javascript">
		 <?=$javastr?>
		</script>
	<?}
}elseif(strlen($_COOKIE["cossa_comment"]) > 0 && ($_COOKIE["cossa_comment_time"] == true) && $USER->IsAuthorized()){
	$cossa_comment = json_decode($_COOKIE["cossa_comment"]);
	CModule::IncludeModule("iblock");
	$intRecipe = $cossa_comment->{'articleId'};
	$element = CIBlockElement::GetByID($intRecipe)->Fetch();
	$javastr = "";
	if($element["IBLOCK_ID"] == 2){
		if(intval($element["IBLOCK_SECTION_ID"]) > 0){
			LocalRedirect("/articles/".$element["IBLOCK_SECTION_ID"]."/".$element["ID"]."/?addcomment=y");
		}else{
			LocalRedirect("/articles/0/".$element["ID"]."/?addcomment=y");
		}
	}elseif($element["IBLOCK_ID"] == 3){
		if(intval($element["IBLOCK_SECTION_ID"]) > 0){
			LocalRedirect("/news/".$element["IBLOCK_SECTION_ID"]."/".$element["ID"]."/?addcomment=y");
		}else{
			LocalRedirect("/news/0/".$element["ID"]."/?addcomment=y");
		}
	}
}
if(intval($_COOKIE["cossa_email"]) > 0 && $USER->IsAuthorized() && ($_COOKIE["cossa_email"] == $USER->GetID())){?>
	<script type="text/javascript">
	$(document).ready(function() {
		$("#email_popup").popup().find(":text").focus();
	});
	</script>
	<?$APPLICATION->IncludeFile('/php/write_email.php');
}
?>
<!-- Yandex.Metrika -->
<div style="display:none;"><script type="text/javascript">
(function(w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter575397 = new Ya.Metrika(575397);
             yaCounter575397.clickmap(true);
             yaCounter575397.trackLinks(true);
        
        } catch(e) {}
    });
})(window, 'yandex_metrika_callbacks');
</script></div>
<script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript" defer="defer"></script>
<noscript><div style="position:absolute"><img src="//mc.yandex.ru/watch/575397" alt="" /></div></noscript>
<!-- /Yandex.Metrika -->
<!--Openstat-->
<span id="openstat2189004"></span>
<script type="text/javascript">
var openstat = { counter: 2189004, next: openstat, track_links: "all" };
(function(d, t, p) {
var j = d.createElement(t); j.async = true; j.type = "text/javascript";
j.src = ("https:" == p ? "https:" : "http:") + "//openstat.net/cnt.js";
var s = d.getElementsByTagName(t)[0]; s.parentNode.insertBefore(j, s);
})(document, "script", document.location.protocol);
</script>
<!--/Openstat-->
<script type="text/javascript" charset="UTF-8" src="http://surfingbird.ru/share/share.min.js"></script>
</body>
</html>