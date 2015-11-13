<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>
<?
if(/*$_REQUEST["image_upload"] == "Y"*/$arResult["imageUploadFrame"] == "Y")
{
	$APPLICATION->RestartBuffer();
?>
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title><?=GetMessage("BLOG_P_IMAGE_UPLOAD")?></title>
	<style>
	* {
		color:#666666;
		margin:0;
		padding:0;}
	body {
		margin:0;
		padding:25px;
		height:200px;}
	h1 {
		font-family:"Times New Roman", Times, serif;
		font-size:22pt;
		color:#333333;
		font-weight:normal;}
	#file_load {margin-top:25px;}
	#buttons {margin-top:20px;}
	</style>
	</head>
	
	<body>
		<h1><?=GetMessage("BLOG_P_IMAGE_UPLOAD")?></h1>
		<form action="<?=POST_FORM_ACTION_URI?>" method="post" enctype="multipart/form-data">
			<?=bitrix_sessid_post()?>
			<div id="file_load">
				<?=CFile::InputFile("FILE_ID", 20, 0)?>
			</div>
			<div id="buttons">
				<input type="submit" value="<?=GetMessage("BLOG_P_DO_UPLOAD")?>" name="do_upload">
				<input type="button" value="<?=GetMessage("BLOG_P_CANCEL")?>" onclick="self.close()">
			</div>
		</form>
	</body>
	</html>			
	<?
	if(strlen($_POST["do_upload"])>0)
	{
		?>
		<script>
			<?
			if(!empty($arResult["Image"]))
			{?>
			my_html = '<span class="item"><?=$arResult["ImageModified"]?><br /><input name=IMAGE_ID_title[<?=$arResult["Image"]["ID"]?>] value="<?=htmlspecialchars($arResult["Image"]["TITLE'"])?>" class="text"><br /><label><input type=checkbox name=IMAGE_ID_del[<?=$arResult["Image"]["ID"]?>] /> <?=GetMessage("BLOG_DELETE")?></label></span>';
				
			imgTable = opener.currentEditor.find('.editor_images');
			<?
			if($_GET["htmlEditor"] == "Y")
			{
				?>
				var editorId = '<?=$_GET["editorId"]?>';
				if(editorId)
				{
					var pMainObj = window.opener.GLOBAL_pMainObj[editorId];
					if(pMainObj)
					{
						imageSrc = window.opener.document.getElementById(<?=$arResult["Image"]["ID"]?>).src;
						_str = '<img __bxtagname="blogImage" __bxcontainer="<?=$arResult["Image"]["ID"]?>" src="'+imageSrc+'">';
										
						pMainObj.insertHTML(_str);
						var i = window.opener.arImages.length++;
						window.opener.arImages[i] = '<?=$arResult["Image"]["ID"]?>';
					}
				}
				<?
			}
			else
			{
				?>
				imgTable.html(my_html);
				opener.doInsert('[IMG ID=<?=$arResult["Image"]["ID"]?>]','',false);
				imgTable.find("img").each(function() {this.removeAttribute("onclick")});
				<?
			}
			}
			?>
			self.close();
		</script>
		<?
	}

	die();
}?>
<?
//echo "<pre>Template arParams: "; print_r($arParams); echo "</pre>";
//echo "<pre>Template arResult: "; print_r($arResult["PROPERTY_LIST"]); echo "</pre>";
unset($arResult["PROPERTY_LIST"][0]);
unset($arResult["PROPERTY_LIST"][1]);
unset($arResult["PROPERTY_LIST"][2]);
unset($arResult["PROPERTY_LIST"][3]);
unset($arResult["PROPERTY_LIST"][4]);
unset($arResult["PROPERTY_LIST"][5]);
unset($arResult["PROPERTY_LIST"][6]);
unset($arResult["PROPERTY_LIST"][7]);
unset($arResult["PROPERTY_LIST"][8]);
unset($arResult["PROPERTY_LIST"][9]);
unset($arResult["PROPERTY_LIST"][10]);
unset($arResult["PROPERTY_LIST"][11]);
$arResult["PROPERTY_LIST"][] = "DETAIL_TEXT";
$arResult["PROPERTY_LIST"][] = "TAGS";
//exit();
$jscriptstr = '';
if(!empty($arResult["CITIES"])){
	$i = 0;
	$jscriptstr .= 'cityAutocompleteArray = [';
	foreach ($arResult["CITIES"] as $key =>$city){
		$i++;
		$jscriptstr .= '"'.$city.'"';
		if(count($arResult["CITIES"]) != $i)
			$jscriptstr .= ',';
	}
	$jscriptstr .= '];';
}
if(!empty($arResult["ORGS"])){
	$i = 0;
	$jscriptstr .= 'organizerAutocompleteArray = [';
	foreach ($arResult["ORGS"] as $key =>$org){
		$i++;
		$jscriptstr .= '"'.$org.'"';
		if(count($arResult["ORGS"]) != $i)
			$jscriptstr .= ',';
	}
	$jscriptstr .= '];';
}
if(strlen($jscriptstr) > 0):?>
    <script type="text/javascript">
		<?echo $jscriptstr;?>
	</script>
<?endif;?>
<?if(isset($_REQUEST["preview"])):?>
	<div style="display:none;">
<?endif;?>
<h1>Создание события</h1>
<?if(isset($_REQUEST["preview"])):?>
	</div>
<?endif;?>
<?if(isset($_REQUEST["preview"])):
$today = mktime(date("H"), date("i"), date("s"), date('n'), date('j'), date('Y'));
global $USER;
$arUser = $USER->GetByID($USER->GetId())->Fetch();
require_once($_SERVER["DOCUMENT_ROOT"]."/classes/factory.class.php");
$Factory = new CFactory;
?>
<div id="preview_section">
	<div id="event_item">
		<div class="intro">
			<?if(strlen($_REQUEST["PROPERTY"]["NAME"][0])):?><h1><?=$_REQUEST["PROPERTY"]["NAME"][0]?></h1><?else:?><h1>Без названия</h1><?endif;?>
			<div class="text">
				<?if(strlen($_REQUEST["PROPERTY"]["DETAIL_PICTURE"]["0"]) > 0):?>
					<div class="image"><img alt="" src="<?=$_REQUEST["PROPERTY"]["DETAIL_PICTURE"]["0"]?>" /></div>
				<?endif;?>
				<div class="event_info">
					<div class="date"><span class="num"><?=$_REQUEST["beginning_day"]?></span><?=$arMonths[$_REQUEST["beginning_month"]]?></div>
					<div class="time">начало в<span class="num"><?=$_REQUEST["beginning_hour"]?>:<?=($_REQUEST["beginning_minutes"] > 0 ? $_REQUEST["beginning_minutes"] : "00")?></span></div>
				</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="separator"><span></span></div>
		<div class="info_block">
			<div class="place">
				<h6>Место</h6>
				<div class="name"><?=$_REQUEST["PROPERTY"]["86"]["0"]?></div>
				<div class="address"><?=$_REQUEST["PROPERTY"]["88"]["0"]?><br><?=$_REQUEST["PROPERTY"]["89"]["0"]?></div>
				<div class="web"><a class="external" href="<?=$_REQUEST["PROPERTY"]["90"]["0"]?>"><?=$_REQUEST["PROPERTY"]["90"]["0"]?></a></div>
			</div>
			<div class="company"><h6>Организатор</h6><a href="/search/?q=<?=$_REQUEST["PROPERTY"]["83"]["0"]?>"><?=$_REQUEST["PROPERTY"]["83"]["0"]?></a></div>
			<div class="price"><h6>Стоимость</h6><?=$_REQUEST["PROPERTY"]["85"]["0"]?> руб.</div>
			<div class="clear"></div>
		</div>
		
		<div class="main">
			<?=$_REQUEST["PROPERTY"]["PREVIEW_TEXT"][0]?>
			<div class="description">
				<h5>Описание</h5>
				<?=$_REQUEST["PROPERTY"]["DETAIL_TEXT"][0]?>
			</div>
		</div>
	</div>
</div>
<?endif;?>
<div id="form_section">
<form name="iblock_add" action="<?=POST_FORM_ACTION_URI?>" method="post" enctype="multipart/form-data">
<?=bitrix_sessid_post()?>
<?if(isset($_REQUEST["preview"])):?>
	<div style="display:none;">
<?endif;?>
<div class="form_field">
	<h5>Заголовок<span class="no_text">?</span></h5>
	<div class="note"><div>Заголовок не должен превышать 100 символов. </div></div>
	<input type="text" value="<?=$_REQUEST["PROPERTY"]["NAME"][0]?>" name="PROPERTY[NAME][0]" class="text" />
</div>
<div class="form_field">
	<h5>Привязка к разделам<span class="no_text">?</span></h5>
	<select name="PROPERTY[IBLOCK_SECTION]<?=$type=="multiselect" ? "[]\" size=\"".$arResult["PROPERTY_LIST_FULL"]["IBLOCK_SECTION"]["ROW_COUNT"]."\" multiple=\"multiple" : ""?>">
	<?
		if (intval("IBLOCK_SECTION") > 0) $sKey = "ELEMENT_PROPERTIES";
		else $sKey = "ELEMENT";

		foreach ($arResult["PROPERTY_LIST_FULL"]["IBLOCK_SECTION"]["ENUM"] as $key => $arEnum)
		{
			$checked = false;
			if ($arParams["ID"] > 0 || count($arResult["ERRORS"]) > 0)
			{
				foreach ($arResult[$sKey]["IBLOCK_SECTION"] as $elKey => $arElEnum)
				{
					if ($key == $arElEnum["VALUE"]) {$checked = true; break;}
				}
			}
			else
			{
				if ($arEnum["DEF"] == "Y") $checked = true;
			}
			if(strlen($_REQUEST["PROPERTY"]["IBLOCK_SECTION"]) > 0){
				if($key == $_REQUEST["PROPERTY"]["IBLOCK_SECTION"]){
					$checked = true;
				}
			}
			?>
			<option value="<?=$key?>" <?=$checked ? " selected=\"selected\"" : ""?>><?=substr($arEnum["VALUE"],2,strlen($arEnum["VALUE"])-2)?></option>
			<?
		}
	?>
	</select>
</div>
<div class="form_field teaser_img">
	<h5>Тизер<span class="no_text">?</span></h5>
	<div class="note"><div>Красивые, яркие картинки помогут сделать ваш пост заметным и привлекательным.</div></div>
	<?if(strlen($_REQUEST["PROPERTY"]["DETAIL_PICTURE"]["0"]) > 0):?>
		<div class="image"><img alt="" src="<?=$_REQUEST["PROPERTY"]["DETAIL_PICTURE"]["0"]?>?<?=time()?>" /></div>
	<?else:?>
		<div class="empty image"><div><p>Изображение не должно быть меньше чем 200 x 200 пикселей и не превышать 1 MB</p></div></div>
	<?endif;?>
	<input type="hidden" value="<?=$_REQUEST["PROPERTY"]["DETAIL_PICTURE"]["0"]?>" name="PROPERTY[DETAIL_PICTURE][0]" />
	<div id="file-uploader"></div>
	<div class="clear"></div>
</div>
<?
$arMonths =	array(	"01"=>"январь",
	"02"=>"февраль",
	"03"=>"март",
	"04"=>"апрель",
	"05"=>"май",
	"06"=>"июнь",
	"07"=>"июль",
	"08"=>"август",
	"09"=>"сентябрь",
	"10"=>"октябрь",
	"11"=>"ноябрь",
	"12"=>"декабрь"
);
$year = date('Y');
?>
<div class="form_field date_field">
	<h5>Начало <span class="no_text">?</span></h5>
	<span class="date_field">
		<select class="day" name="beginning_day">
		<?for($i=1;$i<=31;$i++):?>
			<?$checked = false;?>
			<?if(strlen($_REQUEST["beginning_day"]) > 0){
				if($i == $_REQUEST["beginning_day"]){
					$checked = true;
				}?>
				<option value="<?=$i?>"<?=$checked ? " selected=\"selected\"" : ""?>><?=$i?></option>
			<?}else{?>
				<option value="<?=$i?>"<?=($i == date('j') ? " selected='selected'" : "" )?>><?=$i?></option>
			<?}?>
		<?endfor;?>
		</select>
		<select class="month" name="beginning_month">
			<?foreach($arMonths as $key=>$month):?>
				<?$checked = false;?>
				<?if(strlen($_REQUEST["beginning_month"]) > 0){
					if($key == $_REQUEST["beginning_month"]){
						$checked = true;
					}
				?><option value="<?=$key?>"<?=$checked ? " selected=\"selected\"" : ""?>><?=$month?></option><?
				}else{?>
					<option value="<?=$key?>"<?=($key == date('n') ? " selected='selected'" : "" )?>><?=$month?></option>
				<?}
				?>
			<?endforeach;?>
		</select>
		<select class="year" name="beginning_year">
		<?for($year=date('Y');$year <= date('Y')+2;$year++):?>
			<?$checked = false;?>
			<?if(strlen($_REQUEST["beginning_year"]) > 0){
				if($year == $_REQUEST["beginning_year"]){
					$checked = true;
				}?>
				<option value="<?=$year?>"<?=$checked ? " selected=\"selected\"" : ""?>><?=$year?></option>
			<?}else{?>
				<option value="<?=$year?>"<?=($year == date('Y') ? " selected='selected'" : "" )?>><?=$year?></option>
			<?}?>
		<?endfor;?>
		</select>
	</span>
	<span class="time">
		<select class="hour" name="beginning_hour">
		<?for($i=0;$i<=23;$i++):?>
			<?if(strlen($_REQUEST["beginning_hour"]) > 0){?>
				<option value="<?=$i?>"<?=($i == $_REQUEST["beginning_hour"] ? " selected='selected'" : "" )?>><?if($i < 10):?>0<?endif;?><?=$i?></option>
			<?}else{?>
				<?if($i < 10):?>
					<option value="<?=$i?>"<?=($i == 8 ? " selected='selected'" : "" )?>>0<?=$i?></option>
				<?else:?>
					<option value="<?=$i?>"><?=$i?></option>
				<?endif;?>
			<?}?>
		<?endfor;?>
		</select>
		<span class="colon">:</span>
		<select class="minutes" name="beginning_minutes">
		<?$j = 0;?>
		<?while($j <= 45):?>
			<?if(strlen($_REQUEST["beginning_minutes"]) > 0){?>
				<option value="<?=$j?>"<?=($j == $_REQUEST["beginning_minutes"] ? " selected='selected'" : "" )?>><?if($j == 0):?>0<?endif;?><?=$j?></option>
			<?}else{?>
				<?if($j == 0):?>
					<option value="<?=$j?>">00</option>
				<?else:?>
					<option value="<?=$j?>"><?=$j?></option>
				<?endif;?>
			<?}?>
			<?$j+=15;?>
		<?endwhile;?>
		</select>
	</span>
</div>
<div class="form_field date_field">
	<h5>Окончание <span class="no_text">?</span></h5>
	<span class="date_field">
		<select class="day" name="ending_day">
		<?for($i=1;$i<=31;$i++):?>
			<?$checked = false;?>
			<?if(strlen($_REQUEST["ending_day"]) > 0){
				if($i == $_REQUEST["ending_day"]){
					$checked = true;
				}?>
				<option value="<?=$i?>"<?=$checked ? " selected=\"selected\"" : ""?>><?=$i?></option>
			<?}else{?>
				<option value="<?=$i?>"<?=($i == date('j') ? " selected='selected'" : "" )?>><?=$i?></option>
			<?}?>
		<?endfor;?>
		</select>
		<select class="month" name="ending_month">
			<?foreach($arMonths as $key=>$month):?>
				<?$checked = false;?>
				<?if(strlen($_REQUEST["ending_month"]) > 0){
					if($key == $_REQUEST["ending_month"]){
						$checked = true;
					}
				?><option value="<?=$key?>"<?=$checked ? " selected=\"selected\"" : ""?>><?=$month?></option><?
				}else{?>
					<option value="<?=$key?>"<?=($key == date('n') ? " selected='selected'" : "" )?>><?=$month?></option>
				<?}
				?>
			<?endforeach;?>
		</select>
		<select class="year" name="ending_year">
		<?for($year=date('Y');$year <= date('Y')+2;$year++):?>
			<?$checked = false;?>
			<?if(strlen($_REQUEST["ending_year"]) > 0){
				if($year == $_REQUEST["ending_year"]){
					$checked = true;
				}?>
				<option value="<?=$year?>"<?=$checked ? " selected=\"selected\"" : ""?>><?=$year?></option>
			<?}else{?>
				<option value="<?=$year?>"<?=($year == date('Y') ? " selected='selected'" : "" )?>><?=$year?></option>
			<?}?>
		<?endfor;?>
		</select>
	</span>
	<span class="time">
		<select class="hour" name="ending_hour">
		<?for($i=0;$i<=23;$i++):?>
			<?if(strlen($_REQUEST["ending_hour"]) > 0){?>
				<option value="<?=$i?>"<?=($i == $_REQUEST["ending_hour"] ? " selected='selected'" : "" )?>><?if($i < 10):?>0<?endif;?><?=$i?></option>
			<?}else{?>
				<?if($i < 10):?>
					<option value="<?=$i?>">0<?=$i?></option>
				<?else:?>
					<option value="<?=$i?>"<?=($i == 18 ? " selected='selected'" : "" )?>><?=$i?></option>
				<?endif;?>
			<?}?>
		<?endfor;?>
		</select>
		<span class="colon">:</span>
		<select class="minutes" name="ending_minutes">
		<?$j = 0;?>
		<?while($j <= 45):?>
			<?if(strlen($_REQUEST["ending_minutes"]) > 0){?>
				<option value="<?=$j?>"<?=($j == $_REQUEST["ending_minutes"] ? " selected='selected'" : "" )?>><?if($j == 0):?>0<?endif;?><?=$j?></option>
			<?}else{?>
				<?if($j == 0):?>
					<option value="<?=$j?>">00</option>
				<?else:?>
					<option value="<?=$j?>"><?=$j?></option>
				<?endif;?>
			<?}?>
			<?$j+=15;?>
		<?endwhile;?>
		</select>
	</span>
</div>
<div class="form_field">
<h5>Адрес <span class="no_text">?</span></h5>
<input type="text" value="<?=$_REQUEST["PROPERTY"][88][0]?>" class="text" name="PROPERTY[88][0]" />
</div>
<div class="two">
	<div class="form_field">
		<h5>Город <span class="no_text">?</span></h5>
		<input type="text" placeholder="Москва" id="city_autocomplete" value="<?=$_REQUEST["PROPERTY"][82][0]?>" class="text ac_input" name="PROPERTY[82][0]" autocomplete="off" style="" />
	</div>
	<div class="form_field">
		<h5>Место <span class="no_text">?</span></h5>
		<input type="text" value="<?=$_REQUEST["PROPERTY"][86][0]?>" class="text" name="PROPERTY[86][0]" />
	</div>
	<div class="clear"></div>
</div>
<div class="two">
	<div class="form_field">
		<h5>Сайт <span class="no_text">?</span></h5>
		<input type="text" value="<?=$_REQUEST["PROPERTY"][90][0]?>" class="text" name="PROPERTY[90][0]" />
	</div>
	<div class="form_field">
		<h5>Телефон <span class="no_text">?</span></h5>
		<input type="text" value="<?=$_REQUEST["PROPERTY"][89][0]?>" class="text phone" name="PROPERTY[89][0]" />
	</div>
	<div class="clear"></div>
</div>
<div class="form_field">
	<h5>Организатор <span class="no_text">?</span></h5>
	<input type="text" id="organizer_autocomplete" value="<?=$_REQUEST["PROPERTY"][83][0]?>" class="text ac_input" name="PROPERTY[83][0]" autocomplete="off" />
</div>
<div class="form_field price">
	<h5>Стоимость <span class="no_text">?</span></h5>
	<input type="text" value="<?=$_REQUEST["PROPERTY"][85][0]?>" class="text price" name="PROPERTY[85][0]">
	<span class="currency">руб.</span>
	<!--<select name="PROPERTY[166][0]">
	<?foreach ($arResult["PROPERTY_LIST_FULL"][166]["ENUM"] as $key => $arEnum)
	{?>
		<option value="<?=$key?>"><?=$arEnum["VALUE"]?></option>
	<?}?>
	</select>-->
</div>
<?if ($arParams["MAX_FILE_SIZE"] > 0):?><input type="hidden" name="MAX_FILE_SIZE" value="<?=$arParams["MAX_FILE_SIZE"]?>" /><?endif?>
	<?if (is_array($arResult["PROPERTY_LIST"]) && count($arResult["PROPERTY_LIST"] > 0)):?>
		<?foreach ($arResult["PROPERTY_LIST"] as $propertyID):?>
		<?if($propertyID == "DETAIL_TEXT"):?>
			<div class="form_field entry">
				<h5>Описание</h5>
<script src="/js/editor/js/redactor/redactor.js" type="text/javascript"></script>
<link rel="stylesheet" href="/js/editor/js/redactor/css/redactor.css" />
<script type="text/javascript">
$(function(){
	$("#editor_textarea_1").redactor({
		toolbar:"cossa",
		remove_classes:true/*,
		autosave: '/save.php',
		interval: 120*/
	});
});
</script>
					<textarea name="PROPERTY[DETAIL_TEXT][0]" cols="15" rows="15" id="editor_textarea_1"><?=(strlen($arResult["PostToShow"]["DETAIL_TEXT"]) > 0 ? $arResult["PostToShow"]["DETAIL_TEXT"] : $_REQUEST["PROPERTY"][$propertyID][0])?></textarea>
				</div>
		<?else:?>
		<div class="form_field<?if($propertyID == "DETAIL_PICTURE"):?> teaser_img<?elseif($propertyID == "PREVIEW_TEXT"):?> intro<?elseif($propertyID == "DETAIL_TEXT"):?> entry<?endif;?>">
		<?if (intval($propertyID) > 0):?><h5><?=$arResult["PROPERTY_LIST_FULL"][$propertyID]["NAME"]?><?if($propertyID != "TAGS"):?><span class="no_text">?</span><?endif;?></h5><?else:?><h5><?=!empty($arParams["CUSTOM_TITLE_".$propertyID]) ? $arParams["CUSTOM_TITLE_".$propertyID] : GetMessage("IBLOCK_FIELD_".$propertyID)?><?if($propertyID != "TAGS"):?><span class="no_text">?</span><?endif;?></h5><?endif?>
		<?if($propertyID == "TAGS"):?><div class="note"><div>Теги заполняются так: маркетинг, Гарри Поттер, менеджер и т.д.</div></div><?endif;?>
		<?
			if (intval($propertyID) > 0)
			{
				if (
					$arResult["PROPERTY_LIST_FULL"][$propertyID]["PROPERTY_TYPE"] == "T"
					&&
					$arResult["PROPERTY_LIST_FULL"][$propertyID]["ROW_COUNT"] == "1"
				)
					$arResult["PROPERTY_LIST_FULL"][$propertyID]["PROPERTY_TYPE"] = "S";
				elseif (
					(
						$arResult["PROPERTY_LIST_FULL"][$propertyID]["PROPERTY_TYPE"] == "S"
						||
						$arResult["PROPERTY_LIST_FULL"][$propertyID]["PROPERTY_TYPE"] == "N"
					)
					&&
					$arResult["PROPERTY_LIST_FULL"][$propertyID]["ROW_COUNT"] > "1"
				)
					$arResult["PROPERTY_LIST_FULL"][$propertyID]["PROPERTY_TYPE"] = "T";
			}
			elseif (($propertyID == "TAGS") && CModule::IncludeModule('search'))
				$arResult["PROPERTY_LIST_FULL"][$propertyID]["PROPERTY_TYPE"] = "TAGS";

			if ($arResult["PROPERTY_LIST_FULL"][$propertyID]["MULTIPLE"] == "Y")
			{
				$inputNum = ($arParams["ID"] > 0 || count($arResult["ERRORS"]) > 0) ? count($arResult["ELEMENT_PROPERTIES"][$propertyID]) : 0;
				$inputNum += $arResult["PROPERTY_LIST_FULL"][$propertyID]["MULTIPLE_CNT"];
			}
			else
			{
				$inputNum = 1;
			}

			if($arResult["PROPERTY_LIST_FULL"][$propertyID]["GetPublicEditHTML"])
				$INPUT_TYPE = "USER_TYPE";
			else
				$INPUT_TYPE = $arResult["PROPERTY_LIST_FULL"][$propertyID]["PROPERTY_TYPE"];

			switch ($INPUT_TYPE):
				case "USER_TYPE":
					for ($i = 0; $i<$inputNum; $i++)
					{
						if ($arParams["ID"] > 0 || count($arResult["ERRORS"]) > 0)
						{
							$value = intval($propertyID) > 0 ? $arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["~VALUE"] : $arResult["ELEMENT"][$propertyID];
							$description = intval($propertyID) > 0 ? $arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["DESCRIPTION"] : "";
						}
						elseif ($i == 0)
						{
							$value = intval($propertyID) <= 0 ? "" : $arResult["PROPERTY_LIST_FULL"][$propertyID]["DEFAULT_VALUE"];
							$description = "";
						}
						else
						{
							$value = "";
							$description = "";
						}
						echo call_user_func_array($arResult["PROPERTY_LIST_FULL"][$propertyID]["GetPublicEditHTML"],
							array(
								$arResult["PROPERTY_LIST_FULL"][$propertyID],
								array(
									"VALUE" => $value,
									"DESCRIPTION" => $description,
								),
								array(
									"VALUE" => "PROPERTY[".$propertyID."][".$i."][VALUE]",
									"DESCRIPTION" => "PROPERTY[".$propertyID."][".$i."][DESCRIPTION]",
									"FORM_NAME"=>"iblock_add",
								),
							));
					?><?
					}
				break;
				case "TAGS":
					$APPLICATION->IncludeComponent(
						"cossa:search.tags.input",
						"",
						array(
							"VALUE" =>(strlen($arResult["ELEMENT"][$propertyID]) > 0 ? $arResult["ELEMENT"][$propertyID] : $_REQUEST["PROPERTY"][$propertyID][0]),
							"NAME" => "PROPERTY[".$propertyID."][0]",
							"TEXT" => 'size="'.$arResult["PROPERTY_LIST_FULL"][$propertyID]["COL_COUNT"].'"',
						), null, array("HIDE_ICONS"=>"Y")
					);
					break;
				case "HTML":
					$LHE = new CLightHTMLEditor;
					$LHE->Show(array(
						'id' => preg_replace("/[^a-z0-9]/i", '', "PROPERTY[".$propertyID."][0]"),
						'width' => '100%',
						'height' => '200px',
						'inputName' => "PROPERTY[".$propertyID."][0]",
						'content' => $arResult["ELEMENT"][$propertyID],
						'bUseFileDialogs' => false,
						'bFloatingToolbar' => false,
						'bArisingToolbar' => false,
						'toolbarConfig' => array(
							'Bold', 'Italic', 'Underline', 'RemoveFormat',
							'CreateLink', 'DeleteLink', 'Image', 'Video',
							'BackColor', 'ForeColor',
							'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyFull',
							'InsertOrderedList', 'InsertUnorderedList', 'Outdent', 'Indent',
							'StyleList', 'HeaderList',
							'FontList', 'FontSizeList',
						),
					));
					break;
				case "T":
					for ($i = 0; $i<$inputNum; $i++)
					{

						if ($arParams["ID"] > 0 || count($arResult["ERRORS"]) > 0)
						{
							$value = intval($propertyID) > 0 ? $arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE"] : $arResult["ELEMENT"][$propertyID];
						}
						elseif ($i == 0)
						{
							$value = intval($propertyID) > 0 ? "" : $arResult["PROPERTY_LIST_FULL"][$propertyID]["DEFAULT_VALUE"];
						}
						else
						{
							$value = "";
						}
					?>
					<textarea cols="<?=$arResult["PROPERTY_LIST_FULL"][$propertyID]["COL_COUNT"]?>" rows="<?=$arResult["PROPERTY_LIST_FULL"][$propertyID]["ROW_COUNT"]?>" name="PROPERTY[<?=$propertyID?>][<?=$i?>]"><?=$value?></textarea>
					<?
					}
				break;

				case "S":
				case "N":
					for ($i = 0; $i<$inputNum; $i++)
					{
						if ($arParams["ID"] > 0 || count($arResult["ERRORS"]) > 0)
						{
							$value = intval($propertyID) > 0 ? $arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE"] : $arResult["ELEMENT"][$propertyID];
						}
						elseif ($i == 0)
						{
							$value = intval($propertyID) <= 0 ? "" : $arResult["PROPERTY_LIST_FULL"][$propertyID]["DEFAULT_VALUE"];

						}
						else
						{
							$value = "";
						}
					?>
					<?if($propertyID == "NAME"):?><div class="note"><div>Заголовок не должен превышать 100 символов. </div></div><?endif;?>
					<input class="text" type="text" name="PROPERTY[<?=$propertyID?>][<?=$i?>]" value="<?=$value?>" /><?
					if($arResult["PROPERTY_LIST_FULL"][$propertyID]["USER_TYPE"] == "DateTime"):?><?
						$APPLICATION->IncludeComponent(
							'bitrix:main.calendar',
							'',
							array(
								'FORM_NAME' => 'iblock_add',
								'INPUT_NAME' => "PROPERTY[".$propertyID."][".$i."]",
								'INPUT_VALUE' => $value,
							),
							null,
							array('HIDE_ICONS' => 'Y')
						);
						?><small><?=GetMessage("IBLOCK_FORM_DATE_FORMAT")?><?=FORMAT_DATETIME?></small>
					<?
					endif
					?><?
					}
				break;

				case "F":
					for ($i = 0; $i<$inputNum; $i++)
					{
						$value = intval($propertyID) > 0 ? $arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE"] : $arResult["ELEMENT"][$propertyID];
						?>
						<div class="empty"><div><p>Изображение не должно быть меньше чем 200 x 200 пикселей и не превышать 1 MB</p></div></div>
						<input type="hidden" name="PROPERTY[<?=$propertyID?>][<?=$arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE_ID"] ? $arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE_ID"] : $i?>]" value="<?=$value?>" />
						<div class="file"><input type="file" size="<?=$arResult["PROPERTY_LIST_FULL"][$propertyID]["COL_COUNT"]?>"  name="PROPERTY_FILE_<?=$propertyID?>_<?=$arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE_ID"] ? $arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE_ID"] : $i?>" /></div>
						<?

						if (!empty($value) && is_array($arResult["ELEMENT_FILES"][$value]))
						{
							?>
							<input type="checkbox" name="DELETE_FILE[<?=$propertyID?>][<?=$arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE_ID"] ? $arResult["ELEMENT_PROPERTIES"][$propertyID][$i]["VALUE_ID"] : $i?>]" id="file_delete_<?=$propertyID?>_<?=$i?>" value="Y" /><label for="file_delete_<?=$propertyID?>_<?=$i?>"><?=GetMessage("IBLOCK_FORM_FILE_DELETE")?></label>
							<?

							if ($arResult["ELEMENT_FILES"][$value]["IS_IMAGE"])
							{
								?>
							<img src="<?=$arResult["ELEMENT_FILES"][$value]["SRC"]?>" height="<?=$arResult["ELEMENT_FILES"][$value]["HEIGHT"]?>" width="<?=$arResult["ELEMENT_FILES"][$value]["WIDTH"]?>" border="0" /><br />
								<?
							}
							else
							{
								?>
		<?=GetMessage("IBLOCK_FORM_FILE_NAME")?>: <?=$arResult["ELEMENT_FILES"][$value]["ORIGINAL_NAME"]?><br />
		<?=GetMessage("IBLOCK_FORM_FILE_SIZE")?>: <?=$arResult["ELEMENT_FILES"][$value]["FILE_SIZE"]?> b<br />
		[<a href="<?=$arResult["ELEMENT_FILES"][$value]["SRC"]?>"><?=GetMessage("IBLOCK_FORM_FILE_DOWNLOAD")?></a>]<br />
								<?
							}
						}?><?
					}

				break;
				case "L":

					if ($arResult["PROPERTY_LIST_FULL"][$propertyID]["LIST_TYPE"] == "C")
						$type = $arResult["PROPERTY_LIST_FULL"][$propertyID]["MULTIPLE"] == "Y" ? "checkbox" : "radio";
					else
						$type = $arResult["PROPERTY_LIST_FULL"][$propertyID]["MULTIPLE"] == "Y" ? "multiselect" : "dropdown";

					switch ($type):
						case "checkbox":
						case "radio":

							//echo "<pre>"; print_r($arResult["PROPERTY_LIST_FULL"][$propertyID]); echo "</pre>";

							foreach ($arResult["PROPERTY_LIST_FULL"][$propertyID]["ENUM"] as $key => $arEnum)
							{
								$checked = false;
								if ($arParams["ID"] > 0 || count($arResult["ERRORS"]) > 0)
								{
									if (is_array($arResult["ELEMENT_PROPERTIES"][$propertyID]))
									{
										foreach ($arResult["ELEMENT_PROPERTIES"][$propertyID] as $arElEnum)
										{
											if ($arElEnum["VALUE"] == $key) {$checked = true; break;}
										}
									}
								}
								else
								{
									if ($arEnum["DEF"] == "Y") $checked = true;
								}

								?>
								<input type="<?=$type?>" name="PROPERTY[<?=$propertyID?>]<?=$type == "checkbox" ? "[".$key."]" : ""?>" value="<?=$key?>" id="property_<?=$key?>"<?=$checked ? " checked=\"checked\"" : ""?> /><label for="property_<?=$key?>"><?=$arEnum["VALUE"]?></label>
								<?
							}
						break;

						case "dropdown":
						case "multiselect":
						?>
						<select name="PROPERTY[<?=$propertyID?>]<?=$type=="multiselect" ? "[]\" size=\"".$arResult["PROPERTY_LIST_FULL"][$propertyID]["ROW_COUNT"]."\" multiple=\"multiple" : ""?>">
						<?
							if (intval($propertyID) > 0) $sKey = "ELEMENT_PROPERTIES";
							else $sKey = "ELEMENT";

							foreach ($arResult["PROPERTY_LIST_FULL"][$propertyID]["ENUM"] as $key => $arEnum)
							{
								$checked = false;
								if ($arParams["ID"] > 0 || count($arResult["ERRORS"]) > 0)
								{
									foreach ($arResult[$sKey][$propertyID] as $elKey => $arElEnum)
									{
										if ($key == $arElEnum["VALUE"]) {$checked = true; break;}
									}
								}
								else
								{
									if ($arEnum["DEF"] == "Y") $checked = true;
								}
								?>
								<option value="<?=$key?>" <?=$checked ? " selected=\"selected\"" : ""?>><?=$arEnum["VALUE"]?></option>
								<?
							}
						?>
							</select>
						<?
						break;
					endswitch;
				break;
			endswitch;?>
			</div>
		<?endif?>
		<?endforeach;?>
	<?endif?>
	<?if(isset($_REQUEST["preview"])):?>
		</div>
	<?endif;?>
	<div class="buttons">
		<?if(strlen($arResult["MESSAGE"]) > 0):?>
			<div class="note"><div><?=$arResult["MESSAGE"]?></div></div>
		<?endif;?>
		<div class="submit"><input class="submit" type="submit" name="iblock_submit" value="<?//=GetMessage("IBLOCK_FORM_SUBMIT")?>" /></div>
		<div class="<?=(isset($_REQUEST["preview"]) ? 'edit' : 'preview')?>"><input class="submit" type="submit" name="<?=(isset($_REQUEST["preview"]) ? 'edit' : 'preview')?>" value="<?//=(isset($_REQUEST["preview"]) ? 'Редактирование' : 'Просмотр')?>" /></div>
		<div class="clear"></div>
	</div>
	<?if(isset($_REQUEST["preview"])):?>
		<div style="display:none;">
	<?endif;?>
	<?if (strlen($arParams["LIST_URL"]) > 0 && $arParams["ID"] > 0):?><input type="submit" name="iblock_apply" value="<?=GetMessage("IBLOCK_FORM_APPLY")?>" /><?endif?>
	<?/*<input type="reset" value="<?=GetMessage("IBLOCK_FORM_RESET")?>" />*/?>
	<?if (strlen($arParams["LIST_URL"]) > 0):?><a href="<?=$arParams["LIST_URL"]?>"><?=GetMessage("IBLOCK_FORM_BACK")?></a><?endif?>
	<?if(isset($_REQUEST["preview"])):?>
		</div>
	<?endif;?>
</form>
<script src="/js/fileuploader.js" type="text/javascript"></script>
<script src="/js/jquery.imgareaselect-0.9.8/js/jquery.imgareaselect.pack.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="/js/jquery.imgareaselect-0.9.8/css/imgareaselect-default.css" />
<script type="text/javascript">var teaserMaxWidth = 305, teaserMaxHeight = 187;</script>
<script src="/js/teaser.js" type="text/javascript"></script>
</div>
<?if (count($arResult["ERRORS"])):?>
	<?=ShowError(implode("<br />", $arResult["ERRORS"]))?>
<?endif?>
<?
$arResult["PROPERTY_LIST"][] = "NAME";
$arResult["PROPERTY_LIST"][] = "DETAIL_PICTURE";
$arResult["PROPERTY_LIST"][] = "85";
$arResult["PROPERTY_LIST"][] = "166";
$arResult["PROPERTY_LIST"][] = "86";
$arResult["PROPERTY_LIST"][] = "87";
$arResult["PROPERTY_LIST"][] = "88";
$arResult["PROPERTY_LIST"][] = "89";
$arResult["PROPERTY_LIST"][] = "90";
?>