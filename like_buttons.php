<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
global $APPLICATION;
$PAGE_URL = $APPLICATION->GetCurDir();?>
<div id="vk_like_1" class="vk_like"></div>
<script type="text/javascript">
VK.Widgets.Like("vk_like_1", {type: "mini",pageUrl:"<?="http://".$_SERVER["SERVER_NAME"].$PAGE_URL?>"});
_ga.trackVkontakte();
</script>

<a href="http://twitter.com/share" class="twitter-share-button" data-url="<?='http://'.$_SERVER["SERVER_NAME"].$PAGE_URL?>" data-count="horizontal" data-lang="ru" id="twitter_button1">Твитнуть</a>
<script type="text/javascript">
	var h1Text = $.trim($("h1").text());
	$("#twitter_button1").attr({"data-text": h1Text});
</script>
<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>

<!--<a href="http://twitter.com/share" class="twitter-share-button" data-text="#cossa" data-count="horizontal" data-via="cossa_ru" data-lang="ru">Твитнуть</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>-->

<a target="_blank" class="surfinbird__like_button" data-surf-config="{'layout': 'common', 'width': '120', 'height': '20', 'url': '<?="http://".$_SERVER["SERVER_NAME"].$PAGE_URL?>'}" href="http://surfingbird.ru/share">Серф</a>

<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#appId=110739982359341&amp;xfbml=1"></script><fb:like href="<?="http://".$_SERVER["SERVER_NAME"].$PAGE_URL?>" send="false" layout="button_count" width="150" show_faces="false" action="like" font=""></fb:like>
<div class="clear"></div>
