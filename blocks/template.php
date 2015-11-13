<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
require_once($_SERVER["DOCUMENT_ROOT"]."/classes/factory.class.php");
$Factory = new CFactory;
?>
<div id="articles_list">
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
				<h2><a href="<?echo $arItem["DETAIL_PAGE_URL"]?>"><?echo $arItem["NAME"]?></a></h2>
			<?else:?>
				<h2><?echo $arItem["NAME"]?></h2>
			<?endif;?>
		<?endif;?>
		<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
			<?if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
				<div class="image"><a href="<?=$arItem["DETAIL_PAGE_URL"]?>"><img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" width="<?=$arItem["PREVIEW_PICTURE"]["WIDTH"]?>" height="<?=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" /></a></div>
			<?else:?>
				<div class="image"><img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" width="<?=$arItem["PREVIEW_PICTURE"]["WIDTH"]?>" height="<?=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" /></div>
			<?endif;?>
		<?endif?>
		<?if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
			<div class="text">
				<?if(strlen($section["NAME"])):?><a class="label" href="<?=$section["SECTION_PAGE_URL"]?>"><?=$section["NAME"]?></a><?endif;?>
				<?echo $arItem["PREVIEW_TEXT"];?>
			</div>	
		<?endif;?>
		<div class="info">
			<?if(strlen($arItem["CREATED_BY"]) > 0):?><a href="/profile/?ID=<?=$arItem["CREATED_BY"]?>" class="author"><?if(strlen($User["NAME"]) > 0 && strlen($User["LAST_NAME"]) > 0){echo $User["NAME"]." ".$User["LAST_NAME"];}elseif(strlen($User["NAME"]) > 0){echo $User["NAME"];}elseif(strlen($User["LAST_NAME"]) > 0){
			echo $User["LAST_NAME"];}else{echo $User["LOGIN"];}?></a><?endif;?>
			<?if($arParams["DISPLAY_DATE"]!="N" && $arItem["ACTIVE_FROM"]):?>
				<span class="date"><?echo $Factory->humanDate($arItem["ACTIVE_FROM"]);?><?/*if(intval($arItem["SHOW_COUNTER"]) > 0):?>, <span class="view"><?=$arItem["SHOW_COUNTER"]?> <?=$Factory->plural_form(intval($arItem["SHOW_COUNTER"]),array("просмотр","просмотра","просмотров"))?></span><?endif;*/?></span>
			<?endif?>
			<?if(strlen($arItem["FIELDS"]["TAGS"]) > 0):?><a class="hide_tags" href="#">Показать тэги</a><?endif;?>
			<?if(intval($arItem["PROPERTIES"]["FORUM_MESSAGE_CNT"]["VALUE"]) > 0):?><a class="comments" href="<?=$arItem["DETAIL_PAGE_URL"]?>#00"><span><?=$arItem["PROPERTIES"]["FORUM_MESSAGE_CNT"]["VALUE"]?></span></a><?endif;?>
			<?if(strlen($arItem["PROPERTIES"]["rating"]["VALUE"]) > 0 && $arItem["PROPERTIES"]["rating"]["VALUE"] != 0):?><span class="rating <?=($arItem["PROPERTIES"]["dynamics"]["VALUE"]>=0?"up":"down")?>"><?=$arItem["PROPERTIES"]["rating"]["VALUE"]?></span><?endif;?>
		</div>
		<?
		if(strlen($arItem["FIELDS"]["TAGS"]) > 0):
			$arTags = explode(",",$arItem["FIELDS"]["TAGS"]);
			if(!empty($arTags)):?>
				<div class="tags hidden_tags"><span>Теги:</span>
					<?foreach($arTags as $key => $tag):?>
						<a href="/articles/?arrFilter_ff[TAGS]=<?=$tag?>&set_filter=Фильтр&set_filter=Y"><?=$tag?></a><?if(($key+1) != count($arTags)) echo ",";?>
					<?endforeach;?>
				</div>
			<?endif;?>
		<?endif;?>
	</div>
<?endforeach;?>
</div>