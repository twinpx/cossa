<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
require_once($_SERVER["DOCUMENT_ROOT"]."/classes/factory.class.php");
$Factory = new CFactory;
if(CUser::IsAuthorized()){
	$isAuth = true;
}
?>
<div class="articles_list">
<?foreach($arResult["ITEMS"] as $arItem):
	if(intval($arItem["IBLOCK_SECTION_ID"]) > 0){
		$res = CIBlockSection::GetByID($arItem["IBLOCK_SECTION_ID"]);
		$section = $res->GetNext();
	}else{
		$arItem["DETAIL_PAGE_URL"] = "/articles/0/".$arItem["ID"]."/";
	}
	if(intval($arItem["CREATED_BY"]) > 0)
		$User = CUser::GetByID($arItem["CREATED_BY"])->Fetch();?>
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
	?>
	<div class="item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
		<?if($arParams["DISPLAY_NAME"]!="N" && $arItem["NAME"]):?>
			<?if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
				<h2>
					<span class="h">
						<a href="<?echo $arItem["DETAIL_PAGE_URL"]?>"><?echo $arItem["NAME"]?></a>
					</span>
					<?if(@$isAuth){
						if(in_array($arItem["ID"], $_SESSION["FAV_ARTICLES"])):?>
							<a title="Удалить из закладок" class="fav remove_fav" href="<?=$APPLICATION->GetCurPageParam("unsubscribe=".$arItem["ID"], array("unsubscribe", "subscribe"));?>"></a>
						<?else:?>
							<a title="Добавить в закладки" class="fav add_fav" href="<?=$APPLICATION->GetCurPageParam("subscribe=".$arItem["ID"], array("unsubscribe", "subscribe"));?>"></a>
						<?endif;
					}?>
				</h2>
			<?else:?>
				<h2>
					<span class="h"><?echo $arItem["NAME"]?></span>
					<?if(@$isAuth){
						if(in_array($arItem["ID"], $_SESSION["FAV_ARTICLES"])):?>
							<a title="Удалить из закладок" class="fav remove_fav" href="<?=$APPLICATION->GetCurPageParam("unsubscribe=".$arItem["ID"], array("unsubscribe", "subscribe"));?>"></a>
						<?else:?>
							<a title="Добавить в закладки" class="fav add_fav" href="<?=$APPLICATION->GetCurPageParam("subscribe=".$arItem["ID"], array("unsubscribe", "subscribe"));?>"></a>
						<?endif;
					}?>
				</h2>
			<?endif;?>
		<?endif;?>
		<div class="like_buttons">
			<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
			<div class="line-block">
				<div class="button-item">
					<fb:like href="http://<?=$_SERVER["SERVER_NAME"]?><?=$arItem["DETAIL_PAGE_URL"]?>" send="false" layout="button_count" width="100" show_faces="false" font="arial"></fb:like>
				</div>
				<div class="button-item">
					<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://<?=$_SERVER["SERVER_NAME"]?><?=$arItem["DETAIL_PAGE_URL"]?>" data-text="Развитие русскоязычных Facebook-сообществ в 2011 году">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
				</div>
				<div class="button-item">
					<div id="vk_like_<?=$arItem["ID"]?>_line"></div>
					<script type="text/javascript">
					VK.Widgets.Like("vk_like_<?=$arItem["ID"]?>_line", {
						type: "mini",
						height: 20,
						pageTitle: "<?=$arItem["NAME"]?>",
						pageUrl: "http://<?=$_SERVER["SERVER_NAME"]?><?=$arItem["DETAIL_PAGE_URL"]?>",
						pageImage: "http://<?=$_SERVER["SERVER_NAME"]?><?=$arItem["DETAIL_PICTURE"]["SRC"]?>"
					});
					</script>
				</div>
				<div class="button-item">
					<g:plusone size="medium" href="http://cossa.2px.ru/markup/articles/item/" width="100"></g:plusone>
				</div>
				<div class="clear"></div>
			</div>
			<div class="side-block">
				<div class="button-item">
					<fb:like href="http://<?=$_SERVER["SERVER_NAME"]?><?=$arItem["DETAIL_PAGE_URL"]?>" send="false" layout="box_count" width="100" show_faces="false" font="arial"></fb:like>
				</div>
				<div class="button-item">
					<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://<?=$_SERVER["SERVER_NAME"]?><?=$arItem["DETAIL_PAGE_URL"]?>" data-text="Развитие русскоязычных Facebook-сообществ в 2011 году" data-count="vertical">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
				</div>
				<div class="button-item">
					<div id="vk_like_<?=$arItem["ID"]?>_block"></div>
					<script type="text/javascript">
					VK.Widgets.Like("vk_like_<?=$arItem["ID"]?>_block", {
						type: "vertical",
						height: 20,
						pageTitle: "<?=$arItem["NAME"]?>",
						pageUrl: "http://<?=$_SERVER["SERVER_NAME"]?><?=$arItem["DETAIL_PAGE_URL"]?>",
						pageImage: "http://<?=$_SERVER["SERVER_NAME"]?><?=$arItem["DETAIL_PICTURE"]["SRC"]?>"
					});
					</script>
				</div>
				<div class="button-item">
					<g:plusone size="tall" href="http://cossa.2px.ru/markup/articles/item/" width="100"></g:plusone>
				</div>
			</div>
		</div>
		<?/*if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
			<?if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
				<div class="image"><a href="<?=$arItem["DETAIL_PAGE_URL"]?>"><img class="img_align" src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" width="<?=$arItem["PREVIEW_PICTURE"]["WIDTH"]?>" height="<?=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" /></a></div>
			<?else:?>
				<div class="image"><img class="img_align" src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" width="<?=$arItem["PREVIEW_PICTURE"]["WIDTH"]?>" height="<?=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" /></div>
			<?endif;?>
		<?endif*/?>
		<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["DETAIL_PICTURE"])):?>
			<?if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
				<div class="image"><a href="<?=$arItem["DETAIL_PAGE_URL"]?>"><img class="img_align" src="<?=$arItem["DETAIL_PICTURE"]["SRC"]?>" width="<?=$arItem["DETAIL_PICTURE"]["WIDTH"]?>" height="<?=$arItem["DETAIL_PICTURE"]["HEIGHT"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" /></a></div>
			<?else:?>
				<div class="image"><img class="img_align" src="<?=$arItem["DETAIL_PICTURE"]["SRC"]?>" width="<?=$arItem["DETAIL_PICTURE"]["WIDTH"]?>" height="<?=$arItem["DETAIL_PICTURE"]["HEIGHT"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" /></div>
			<?endif;?>
		<?endif?>
		<?if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
			<div class="text">
				<div class="intro">
					<?if(strlen($section["NAME"])):?><a class="label" href="<?=$section["SECTION_PAGE_URL"]?>"><?=$section["NAME"]?></a><?endif;?>
					<?echo $arItem["PREVIEW_TEXT"];?>
				</div>
				<div class="info_bar">
					<?if(strlen($arItem["CREATED_BY"]) > 0):?>
						<span class="author"><a href="/profile/?ID=<?=$arItem["CREATED_BY"]?>"><?if(strlen($User["NAME"]) > 0 && strlen($User["LAST_NAME"]) > 0){
						echo $User["NAME"]." ".$User["LAST_NAME"];}elseif(strlen($User["NAME"]) > 0){echo $User["NAME"];}elseif(strlen($User["LAST_NAME"]) > 0){echo $User["LAST_NAME"];}else{echo $User["LOGIN"];}?></a><?if(strlen($User["PERSONAL_PROFESSION"]) > 0 || strlen($arItem["ACTIVE_FROM"]) > 0):?>,<?endif;?></span>
					<?if(strlen($User["PERSONAL_PROFESSION"]) > 0):?><span class="occupation"><?=$User["PERSONAL_PROFESSION"]?></span><?endif;?><?if(strlen($User["WORK_COMPANY"]) > 0):?> в <a class="company" href="/search/?q=<?=$User["WORK_COMPANY"]?>"><?=$User["WORK_COMPANY"]?></a><?endif;?><?endif;?>
					<?if($arParams["DISPLAY_DATE"]!="N" && $arItem["ACTIVE_FROM"]):?><br/><span class="date"><?echo $Factory->humanDate($arItem["ACTIVE_FROM"]);?></span><?endif?>
					<?if(intval($arItem["PROPERTIES"]["FORUM_MESSAGE_CNT"]["VALUE"]) > 0):?><a class="comments" href="<?=$arItem["DETAIL_PAGE_URL"]?>#00"><span><?=$arItem["PROPERTIES"]["FORUM_MESSAGE_CNT"]["VALUE"]?></span></a><?endif;?>
					<?if(strlen($arItem["PROPERTIES"]["rating"]["VALUE"]) > 0 && $arItem["PROPERTIES"]["rating"]["VALUE"] != 0):?><span class="rating <?=($arItem["PROPERTIES"]["dynamics"]["VALUE"]>=0?"up":"down")?>"><?=$arItem["PROPERTIES"]["rating"]["VALUE"]?></span><?endif;?>
				</div>
			</div>
		<?endif;?>
		<div class="clear"></div>
	</div>
<?endforeach;?>
</div>