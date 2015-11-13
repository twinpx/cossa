<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" xmlns:fb="http://ogp.me/ns/fb#">
<head>
<?$APPLICATION->ShowHead();?>
<title><?$APPLICATION->ShowTitle()?></title>
<!--[if lte IE 7]>
<link href="/css/ie6.css" rel="stylesheet" type="text/css">
<![endif]-->
<script type="text/javascript" src="http://userapi.com/js/api/openapi.js?34"></script>
<script type="text/javascript">VK.init({apiId: 2472453, onlyWidgets: true});</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js" type="text/javascript"></script>
<script src="/js/jscript.js?<?=mktime(0, 0, 0, date("n"), date("j"), date("Y"))?>" type="text/javascript"></script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2910684-10']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>
<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=238031246215307";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<?=$APPLICATION->ShowPanel();?>
<?global $USER;
$curdir = $APPLICATION->GetCurDir();?>
<?if($USER->IsAuthorized()):
if(isset($_REQUEST["subscribe"])){
	$APPLICATION->IncludeFile(SITE_TEMPLATE_PATH."/subscribe.php", Array(
		"subscribe" => $_REQUEST["subscribe"],
	));
}elseif(isset($_REQUEST["unsubscribe"])){
	$APPLICATION->IncludeFile(SITE_TEMPLATE_PATH."/subscribe.php", Array(
		"unsubscribe" => $_REQUEST["unsubscribe"],
	));
}elseif(isset($_REQUEST["delete_all"])){
	$APPLICATION->IncludeFile(SITE_TEMPLATE_PATH."/subscribe.php", Array(
		"delete_all" => $_REQUEST["delete_all"],
	));
}else{
	$APPLICATION->IncludeFile(SITE_TEMPLATE_PATH."/subscribe.php", Array());
}
?>
	<div id="user_menu">
		<div class="page">
			<div class="items">
				<div class="activity">
					<a class="button" href="#"><span>Создать</span></a>
					<?$APPLICATION->IncludeComponent("bitrix:menu", "create.menu", Array(
						"ROOT_MENU_TYPE" => "create",	// Тип меню для первого уровня
						"MAX_LEVEL" => "1",	// Уровень вложенности меню
						"CHILD_MENU_TYPE" => "create",	// Тип меню для остальных уровней
						"USE_EXT" => "N",	// Подключать файлы с именами вида .тип_меню.menu_ext.php
						"DELAY" => "N",	// Откладывать выполнение шаблона меню
						"ALLOW_MULTI_SELECT" => "N",	// Разрешить несколько активных пунктов одновременно
						"MENU_CACHE_TYPE" => "N",	// Тип кеширования
						"MENU_CACHE_TIME" => "3600",	// Время кеширования (сек.)
						"MENU_CACHE_USE_GROUPS" => "Y",	// Учитывать права доступа
						"MENU_CACHE_GET_VARS" => "",	// Значимые переменные запроса
						),
						false
					);?>
				</div>
				<div class="profile">
					<a class="button" href="#"><span><?global $USER;if(strlen($USER->GetFullName()) > 0){echo $USER->GetFullName();}else{echo $USER->GetLogin();}?></span><span class="pointer"></span></a>
					<?$APPLICATION->IncludeComponent("cossa:menu", "user.menu", array(
						"ROOT_MENU_TYPE" => "user",
						"MENU_CACHE_TYPE" => "A",
						"MENU_CACHE_TIME" => "3600",
						"MENU_CACHE_USE_GROUPS" => "Y",
						"MENU_CACHE_GET_VARS" => array(
						),
						"MAX_LEVEL" => "1",
						"CHILD_MENU_TYPE" => "user",
						"USE_EXT" => "N",
						"DELAY" => "N",
						"ALLOW_MULTI_SELECT" => "N"
						),
						false
					);?>
				</div>
				<div class="messages">
					<a class="icon" href="#" title="Сообщения"></a>
					<?if (CUser::IsAuthorized()){
						$userID = CUser::GetID();
						$filter = array("ID"=>$userID);
						$dbUser = CUser::GetList(($by="personal_country"), ($order="desc"), $filter, array("SELECT"=>array("UF_*"))); // выбираем пользователей
						$favCommentsArray = array();
						if($arUser = $dbUser->GetNext())
						{
							if (strlen($arUser["UF_USER_FAV_COMMENTS"]) > 0)
							{
								$favCommentsArray = explode(";", $arUser["UF_USER_FAV_COMMENTS"]);
								foreach($favCommentsArray as $key => $comment){
									if(intval($comment) <= 0)
										unset($favCommentsArray[$key]);
								}
							}
						}
						if (CModule::IncludeModule("iblock") && count($favCommentsArray) > 0)
						{
							$arFilter = array(
							   "IBLOCK_ID" => 32,
							   "!PREVIEW_TEXT" => "#DELETED#",
							   "!PROPERTY_element" => false,
							);
							if(!empty($favCommentsArray)){
								$arFilter["PROPERTY_element"] = $favCommentsArray;
							}
							//echo "<pre>"; print_r($arFilter); echo "</pre>";
							$arFavouriteComments = array();
							$res = CIBlockElement::GetList(array("DATE_CREATE"=>"DESC"), $arFilter, false, array("nTopCount"=>3), array("ID", "CREATED_BY", "IBLOCK_SECTION_ID", "NAME", "PREVIEW_TEXT", "PROPERTY_element"));
							while($ar_fields = $res->GetNext()){
								if(intval($ar_fields["CREATED_BY"]) > 0){
									$User = CUser::GetByID($ar_fields["CREATED_BY"])->Fetch();
									if(strlen($User["NAME"]) > 0 && strlen($User["LAST_NAME"]) > 0){
										$ar_fields["CREATED_BY"] = $User["NAME"]." ".$User["LAST_NAME"];
									}elseif(strlen($User["NAME"]) > 0){
										$ar_fields["CREATED_BY"] = $User["NAME"];
									}elseif(strlen($User["LAST_NAME"]) > 0){
										$ar_fields["CREATED_BY"] = $User["LAST_NAME"];
									}else{
										$ar_fields["CREATED_BY"] = $User["LOGIN"];
									}
									if(intval($User["PERSONAL_PHOTO"]) > 0){
										$arGroups = $USER->GetUserGroupArray();
										$Groups = array_intersect(array(1,11,12),$arGroups);
										$arFile = CFile::GetFileArray($User["PERSONAL_PHOTO"]);
										if(!empty($Groups)){
											$ar_fields["IMAGE"] = '<span class="user expert">';
										}else{
											$ar_fields["IMAGE"] = '<span class="user">';
										}
										$ar_fields["IMAGE"] .= '<img width="25" height="25" alt="" src="'.$arFile["SRC"].'"></span>';
									}else{
										$arGroups = $USER->GetUserGroupArray();
										$Groups = array_intersect(array(1,11,12),$arGroups);
										$arFile = CFile::GetFileArray($User["PERSONAL_PHOTO"]);
										if(!empty($Groups)){
											$ar_fields["IMAGE"] = '<span class="user expert">';
										}else{
											$ar_fields["IMAGE"] = '<span class="user">';
										}
										$ar_fields["IMAGE"] .= '<img width="25" height="25" alt="" src="/images/male.jpg"></span>';
									}									
								}
								if(intval($ar_fields["PROPERTY_ELEMENT_VALUE"]) > 0){
									$parent = CIBlockElement::GetByID($ar_fields["PROPERTY_ELEMENT_VALUE"])->Fetch();
									$ar_fields["DETAIL_PAGE_URL"] = "/articles/".$parent["IBLOCK_SECTION_ID"]."/".$parent["ID"]."/#".$ar_fields["ID"];
								}
								$arFavouriteComments[] = $ar_fields;
							}
						}
						if(!empty($arFavouriteComments)):?>
								<div class="menu">
									<ul>
										<?
										foreach($arFavouriteComments as $key=>$favComment)
										{
											?><?if(strlen($favComment["DETAIL_PAGE_URL"])):?>
												<li>
													<a class="link" href="<?=$favComment["DETAIL_PAGE_URL"]?>">
														<?=$favComment["IMAGE"]?>
														<span class="text">
															<b><?=$favComment["CREATED_BY"]?></b>
															<span class="message">
																<?=mb_substr(strip_tags($favComment["PREVIEW_TEXT"]), 0, 70, 'UTF-8')."...";?>
															</span>
														</span>
													</a>
												</li>
											<?endif;?><?
										}
										?>
										<li class="all">
											<a href="/profile/favourite_comments/">
												<b>Все комментарии</b>
											</a>
										</li>		
									</ul>
								</div>
							<?else:?>
								<div class="menu">
									<ul>									
										<li class="all">
											<span>
												<b>Вы не следите за комментариями</b>
											</span>
										</li>
									</ul>
								</div>
							<?endif;
					}?>
				</div>
				<div class="favs">
                    <a class="icon" href="/profile/favourite_articles/">
                    	<?=(count($_SESSION["SESS_AUTH"]["FAV_ARTICLES"]) > 0 ? '<span class="num">'.count($_SESSION["SESS_AUTH"]["FAV_ARTICLES"]).'</span>':'');?>
                    </a>
				</div>
				<div class="clear"></div>
			</div>
			<div class="clear">
			</div>
		</div>
	</div>
<?else:?>
	<div id="login_menu">
		<div class="page">
			<div class="item"><a id="login_link" href="#">Вход</a></div>
			<div class="item"><a href="/registration/?backurl=<?=$APPLICATION->GetCurPage()?>">Зарегистрироваться</a></div>
		</div>
	</div>
<?endif?>
<?$arTeaserNotAllow = array(
	"/articles/add/",
	"/articles/edit/",
	"/news/add/",
	"/news/edit/",
	"/events/add/",
	"/events/edit/",
	"/vacancies/add/",
	"/vacancies/edit/",
	"/education/add/",
	"/education/edit/",
	"/vocabulary/add/",
	"/vocabulary/edit/"
);?>
<div id="head"><div class="page">
<?if(!in_array($curdir,$arTeaserNotAllow)):?>
	<?$APPLICATION->IncludeComponent("cossa:reklam.teaser.list", ".default", array(
	"IBLOCK_TYPE" => "news",
	"IBLOCK_ID" => "2",
	"NEWS_COUNT" => "20",
	"INTERVAL" => "10000",
	"SORT_BY1" => "ACTIVE_FROM",
	"SORT_ORDER1" => "DESC",
	"SORT_BY2" => "SORT",
	"SORT_ORDER2" => "ASC",
	"FILTER_NAME" => "",
	"FIELD_CODE" => array(
		0 => "",
		1 => "",
	),
	"PROPERTY_CODE" => array(
		0 => "",
		1 => "",
	),
	"CHECK_DATES" => "Y",
	"DETAIL_URL" => "",
	"AJAX_MODE" => "N",
	"AJAX_OPTION_JUMP" => "N",
	"AJAX_OPTION_STYLE" => "Y",
	"AJAX_OPTION_HISTORY" => "N",
	"CACHE_TYPE" => "A",
	"CACHE_TIME" => "36000000",
	"CACHE_FILTER" => "N",
	"CACHE_GROUPS" => "Y",
	"PREVIEW_TRUNCATE_LEN" => "",
	"ACTIVE_DATE_FORMAT" => "d.m.Y",
	"SET_TITLE" => "Y",
	"SET_STATUS_404" => "N",
	"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
	"ADD_SECTIONS_CHAIN" => "Y",
	"HIDE_LINK_WHEN_NO_DETAIL" => "N",
	"PARENT_SECTION" => "",
	"PARENT_SECTION_CODE" => "",
	"DISPLAY_TOP_PAGER" => "N",
	"DISPLAY_BOTTOM_PAGER" => "Y",
	"PAGER_TITLE" => "Новости",
	"PAGER_SHOW_ALWAYS" => "Y",
	"PAGER_TEMPLATE" => "",
	"PAGER_DESC_NUMBERING" => "N",
	"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
	"PAGER_SHOW_ALL" => "Y",
	"DISPLAY_DATE" => "Y",
	"DISPLAY_NAME" => "Y",
	"DISPLAY_PICTURE" => "Y",
	"DISPLAY_PREVIEW_TEXT" => "Y",
	"AJAX_OPTION_ADDITIONAL" => ""
	),
	false
);?>
<?endif;?>
	<?$APPLICATION->IncludeComponent("cossa:advise.list", ".default", array(
	"IBLOCK_TYPE" => "news",
	"IBLOCK_ID" => $_REQUEST["ID"],
	"NEWS_COUNT" => "20",
	"INTERVAL" => "5000",
	"SORT_BY1" => "ACTIVE_FROM",
	"SORT_ORDER1" => "DESC",
	"SORT_BY2" => "SORT",
	"SORT_ORDER2" => "ASC",
	"FILTER_NAME" => "",
	"FIELD_CODE" => array(
		0 => "",
		1 => "",
	),
	"PROPERTY_CODE" => array(
		0 => "",
		1 => "",
	),
	"CHECK_DATES" => "Y",
	"DETAIL_URL" => "",
	"AJAX_MODE" => "N",
	"AJAX_OPTION_JUMP" => "N",
	"AJAX_OPTION_STYLE" => "Y",
	"AJAX_OPTION_HISTORY" => "N",
	"CACHE_TYPE" => "N",
	"CACHE_TIME" => "36000000",
	"CACHE_FILTER" => "N",
	"CACHE_GROUPS" => "Y",
	"PREVIEW_TRUNCATE_LEN" => "",
	"ACTIVE_DATE_FORMAT" => "d.m.Y",
	"SET_TITLE" => "Y",
	"SET_STATUS_404" => "N",
	"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
	"ADD_SECTIONS_CHAIN" => "Y",
	"HIDE_LINK_WHEN_NO_DETAIL" => "N",
	"PARENT_SECTION" => "",
	"PARENT_SECTION_CODE" => "",
	"DISPLAY_TOP_PAGER" => "N",
	"DISPLAY_BOTTOM_PAGER" => "Y",
	"PAGER_TITLE" => "Новости",
	"PAGER_SHOW_ALWAYS" => "Y",
	"PAGER_TEMPLATE" => "",
	"PAGER_DESC_NUMBERING" => "N",
	"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
	"PAGER_SHOW_ALL" => "Y",
	"DISPLAY_DATE" => "Y",
	"DISPLAY_NAME" => "Y",
	"DISPLAY_PICTURE" => "Y",
	"DISPLAY_PREVIEW_TEXT" => "Y",
	"AJAX_OPTION_ADDITIONAL" => ""
	),
	false
);?>
	<div id="top_banner">
		<?$APPLICATION->IncludeComponent("bitrix:advertising.banner", "top.banner", array(
			"TYPE" => "TOP",
			"NOINDEX" => "N",
			"CACHE_TYPE" => "N",
			"CACHE_TIME" => "3600"
			),
			false
		);
		$APPLICATION->ShowBanner();
		?>
	</div>	
</div></div>