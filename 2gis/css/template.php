<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?><script src="/bitrix/js/main/cphttprequest.js"></script>
<script type="text/javascript">
if (typeof oObject != "object")
	window.oObject = {};
document.CheckThis = function(oObj)
{
	try
	{
		if (TcLoadTI)
		{
			if (typeof window.oObject[oObj.id] != 'object')
				window.oObject[oObj.id] = new JsTc(oObj, '<?=$arParams["ADDITIONAL_VALUES"]?>');
			return;
		}
		else
		{
			setTimeout(CheckThis(oObj), 10);
		}
	}
	catch(e)
	{
		setTimeout(CheckThis(oObj), 10);
	}
}
</script>
<?
if ($arParams["SILENT"] == "Y")
	return;
?>
<div class="form_field__tabs">
<?foreach($arResult["TagGroups"] as $key => $Group){?>
	<span class="form_field__tabs__item<?=($key == 0 ? " form_field__tabs__active" : "")?>" data-tab-name="tags-group-<?=$key+1?>"><span class="form_field__tabs__link"><?=$Group?></span><?if(($key+1) != count($arResult["TagGroups"])):?>,<?endif;?></span>
<?}?>
</div>
<div class="form_field__tabs__fields">
<?$i = 0;?>
<?foreach($arResult["GroupedTags"] as $Tags){
	$i++;?>
	<input <?
	?>name="PROPERTY[TAGS][]" <?
	?>id="<?=$arResult["ID"]?>" <?
	?>value="<?=$Tags?>" <?
	?>type="text" <?
	?>autocomplete="off" <?
	?>onfocus="CheckThis(this);" <?
	?> class="text form_field__tabs__input<?=($i == 1 ? " form_field__tabs__input_active" : "")?>" data-counter="255" maxlength="255" data-tab-field="tags-group-<?=$i?>" /><?
}?>
</div>
<div class="form_field__counter">0</div>
<?
/*if ($arParams["TMPL_IFRAME"] != "N"):
?><IFRAME style="width:0px; height:0px; border: 0px;" src="javascript:''" name="<?=$arResult["ID"]?>_div_frame" id="<?=$arResult["ID"]?>_div_frame"></IFRAME><?
endif;*/
?>
