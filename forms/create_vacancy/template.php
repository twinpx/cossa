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
			my_html = '<table class="delete_img"><tr><td><input type=checkbox name=IMAGE_ID_del[<?=$arResult["Image"]["ID"]?>] id=img_del_<?=$arResult["Image"]["ID"]?>></td><td><label for=img_del_<?=$arResult["Image"]["ID"]?>><?=GetMessage("BLOG_DELETE")?></label></td></tr></table>' + '<?=$arResult["ImageModified"]?>' +
				'<br /><input name=IMAGE_ID_title[<?=$arResult["Image"]["ID"]?>] value="<?=htmlspecialchars($arResult["Image"]["TITLE'"])?>" class="text">';
				
			if (!opener.document.getElementById('img_TABLE'))
			{
				main_table = opener.document.getElementById("main_table");
				tr_text = opener.document.getElementById("tr_TEXT");
				
				var oTR = main_table.insertRow(tr_text.rowIndex + 1);

				var oCell = opener.document.createElement("TH");
				//oCell.vAlign = "top";
				//oCell.align = "right";
				oCell.innerText = '<?=GetMessage("BLOG_P_IMAGES")?>';
				oCell.innerHTML = '<?=GetMessage("BLOG_P_IMAGES")?>';
				oTR.appendChild(oCell);

				oTD = oTR.insertCell(-1);
				oTD.innerHTML = '<table class="blog-blog-edit-table" id="img_TABLE"></table>';
			}

			imgTable = opener.document.getElementById('img_TABLE');

			if (imgTable.rows.length > 0)
			{
				oRow = imgTable.rows[imgTable.rows.length - 1];
				if (oRow.cells.length >= 4)
					oRow = imgTable.insertRow(-1);
			}
			else
				oRow = imgTable.insertRow(-1);
			
	//				oRow.vAlign = 'top';

			oCell = oRow.insertCell(-1);
	//				oCell.vAlign = 'top';
			oCell.innerHTML = my_html;
			
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
				opener.doInsert('[IMG ID=<?=$arResult["Image"]["ID"]?>]','',false);
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
unset($arResult["PROPERTY_LIST"][0]);
unset($arResult["PROPERTY_LIST"][1]);
unset($arResult["PROPERTY_LIST"][2]);
unset($arResult["PROPERTY_LIST"][3]);
unset($arResult["PROPERTY_LIST"][4]);
unset($arResult["PROPERTY_LIST"][5]);
unset($arResult["PROPERTY_LIST"][6]);
$arResult["PROPERTY_LIST"][] = "TAGS";
//exit();
$jscriptstr = '';
if(!empty($arResult["CITIES"])){
	$jscriptstr .= 'cityAutocompleteArray = [';
	$i = 0;
	foreach ($arResult["CITIES"] as $city){
		$i++;
		$jscriptstr .= '"'.$city.'"';
		if(count($arResult["CITIES"]) != $i)
			$jscriptstr .= ',';
	}
	$jscriptstr .= '];';
}
if(!empty($arResult["COMPANIES"])){
	$i = 0;
	$jscriptstr .= 'organizerAutocompleteArray = [';
	foreach ($arResult["COMPANIES"] as $org){
		$i++;
		$jscriptstr .= '"'.$org.'"';
		if(count($arResult["COMPANIES"]) != $i)
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
<h1>Создание вакансии</h1>
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
	<div id="vacancies_item">
		<div class="intro">
			<?if(strlen($_REQUEST["PROPERTY"]["NAME"][0])):?><h1><?=$_REQUEST["PROPERTY"]["NAME"][0]?></h1><?else:?><h1>Без названия</h1><?endif;?>
		</div>
		<div class="separator"><span></span></div>
		<div class="info_block">
			<div class="company"><h6>Компания</h6><a class="external" target="_blank" href="http://"><?=$_REQUEST["PROPERTY"]["113"]["0"]?></a></div>
			<div class="place"><h6>Город</h6><?=$_REQUEST["PROPERTY"]["115"]["0"]?> </div>
			<div class="salary"><h6>Уровень зарплаты</h6>от <?=$_REQUEST["PROPERTY"]["117"]["0"]?> руб. до <?=$_REQUEST["PROPERTY"]["169"]["0"]?> руб.</div>
			<div class="schedule"><h6>Работа</h6><?=$arResult["PROPERTY_LIST_FULL"][116]["ENUM"][$_REQUEST["PROPERTY"]["116"]["0"]]["VALUE"]?></div>
			<div class="clear"></div>
		</div>
		
		<div class="main">
			<div class="text">
				<?=$_REQUEST["PROPERTY"]["PREVIEW_TEXT"][0]?>
				
				<h5>Обязанности:</h5>
				<?=$_REQUEST["PROPERTY"]["118"]["0"]?>
				
				<h5>Требования :</h5>
				<?=$_REQUEST["PROPERTY"]["119"]["0"]?>
				
				<h5>Условия:</h5>
				<?=$_REQUEST["PROPERTY"]["120"]["0"]?>
			</div>
		</div>
	</div>
</div>
<?endif;?>
<div id="form_section">
<form name="iblock_add" action="<?=POST_FORM_ACTION_URI?>" method="post" enctype="multipart/form-data">
<?if(isset($_REQUEST["preview"])):?>
	<div style="display:none;">
<?endif;?>
<?=bitrix_sessid_post()?>
<div class="form_field">
	<h5>Заголовок<span class="no_text">?</span></h5>
	<div class="note"><div>Заголовок не должен превышать 100 символов. </div></div>
	<input type="text" value="<?=$_REQUEST["PROPERTY"]["NAME"][0]?>" name="PROPERTY[NAME][0]" class="text" />
</div>
<?if(!empty($arResult["COMPANIES"])):?>
<div class="two">
	<div class="form_field">
		<h5>Компания</h5>
		<input type="text" id="organizer_autocomplete" value="<?=$_REQUEST["PROPERTY"]["113"][0]?>" class="text ac_input" name="PROPERTY[113][0]" autocomplete="off" />
	</div>
	<?if(!empty($arResult["COMPANIES"])):?>
		<div class="form_field">
			<h5>Город <span class="no_text">?</span></h5>
			<input type="text" placeholder="Москва" id="city_autocomplete" value="<?=$_REQUEST["PROPERTY"]["115"][0]?>" class="text ac_input" name="PROPERTY[115][0]" autocomplete="off" style="" />
		</div>
	<?endif;?>
	<div class="clear"></div>
</div>
<?endif;?>
<?if(!empty($arResult["DIRECTIONS"])):?>
	<div class="form_field">
		<h5>Направление <span class="no_text">?</span></h5>
		<select name="PROPERTY[114]">
		<?foreach($arResult["DIRECTIONS"] as $key => $direction):
			$checked = false;
			if(strlen($_REQUEST["PROPERTY"]["114"]) > 0){
				if($key == $_REQUEST["PROPERTY"]["114"]){
					$checked = true;
				}
			}
		?>
			<option value="<?=$key?>"<?=$checked ? " selected=\"selected\"" : ""?>><?=$direction?></option>
		<?endforeach;?>
		</select>
	</div>
<?endif;?>
<div class="form_field wage">
	<h5>Уровень зарплаты <span class="no_text">?</span></h5>
	<input type="text" placeholder="от" value="<?=$_REQUEST["PROPERTY"]["117"][0]?>" class="text price" name="PROPERTY[117][0]" />
	<span class="mdash">&mdash;</span>
	<input type="text" placeholder="до" value="<?=$_REQUEST["PROPERTY"]["169"][0]?>" class="text price" name="PROPERTY[169][0]" />
	<span class="currency">руб.</span>
	<!--<select name="PROPERTY[137][0]">
	<?foreach ($arResult["PROPERTY_LIST_FULL"][137]["ENUM"] as $key => $arEnum)
	{?>
		<option value="<?=$key?>"><?=$arEnum["VALUE"]?></option>
	<?}?>
	</select>-->
</div>
<div class="form_field">
	<h5>Удаленность<span class="no_text">?</span></h5>
	<select name="PROPERTY[116]">
	<?foreach ($arResult["PROPERTY_LIST_FULL"][116]["ENUM"] as $key => $arEnum)
	{
		$checked = false;
		if(strlen($_REQUEST["PROPERTY"]["116"]) > 0){
			if($key == $_REQUEST["PROPERTY"]["116"]){
				$checked = true;
			}
		}?>
		<option value="<?=$key?>"<?=$checked ? " selected=\"selected\"" : ""?>><?=$arEnum["VALUE"]?></option>
	<?}?>
	</select>
</div>
<?//$arResult["ELEMENT"][$propertyID],?>
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
	$("#editor_textarea_2").redactor({
		toolbar:"cossa",
		remove_classes:true/*,
		autosave: '/save.php',
		interval: 120*/
	});
	$("#editor_textarea_3").redactor({
		toolbar:"cossa",
		remove_classes:true/*,
		autosave: '/save.php',
		interval: 120*/
	});
});
</script>
<div class="form_field entry">
	<h5>Обязанности</h5>
	<textarea tabindex="2" name="PROPERTY[118][0]" cols="15" rows="15" class="MESSAGE" onKeyPress="check_ctrl_enter(arguments[0])" id="editor_textarea_1"><?=(strlen($arResult["PostToShow"]["DETAIL_TEXT"]) > 0 ? $arResult["PostToShow"]["DETAIL_TEXT"] : $_REQUEST["PROPERTY"]["118"][0])?></textarea>
</div>
<div class="form_field entry">
	<h5>Требования</h5>
	<textarea tabindex="2" name="PROPERTY[119][0]" cols="15" rows="15" class="MESSAGE" onKeyPress="check_ctrl_enter(arguments[0])" id="editor_textarea_2"><?=(strlen($arResult["PostToShow"]["DETAIL_TEXT"]) > 0 ? $arResult["PostToShow"]["DETAIL_TEXT"] : $_REQUEST["PROPERTY"]["119"][0])?></textarea>
</div>
<div class="form_field entry">
	<h5>Условия</h5>
	<textarea tabindex="2" name="PROPERTY[120][0]" cols="15" rows="15" class="MESSAGE" onKeyPress="check_ctrl_enter(arguments[0])" id="editor_textarea_3"><?=(strlen($arResult["PostToShow"]["DETAIL_TEXT"]) > 0 ? $arResult["PostToShow"]["DETAIL_TEXT"] : $_REQUEST["PROPERTY"]["120"][0])?></textarea>
</div>
<?if ($arParams["MAX_FILE_SIZE"] > 0):?><input type="hidden" name="MAX_FILE_SIZE" value="<?=$arParams["MAX_FILE_SIZE"]?>" /><?endif?>
	<?if (is_array($arResult["PROPERTY_LIST"]) && count($arResult["PROPERTY_LIST"] > 0)):?>
		<?foreach ($arResult["PROPERTY_LIST"] as $propertyID):?>
		<div class="form_field<?if($propertyID == "DETAIL_PICTURE"):?> teaser_img<?elseif($propertyID == "PREVIEW_TEXT"):?> intro<?elseif($propertyID == "DETAIL_TEXT"):?> entry<?endif;?>">
		<?if (intval($propertyID) > 0):?><h5><?=$arResult["PROPERTY_LIST_FULL"][$propertyID]["NAME"]?><span class="no_text">?</span></h5><?else:?><h5><?=!empty($arParams["CUSTOM_TITLE_".$propertyID]) ? $arParams["CUSTOM_TITLE_".$propertyID] : GetMessage("IBLOCK_FIELD_".$propertyID)?><span class="no_text">?</span></h5><?endif?>
		<?if($propertyID == "TAGS"):?><div class="note"><div>Теги заполняются так: маркетинг, Гарри Поттер, менеджер и т.д.</div></div><?endif;?>
		<?if($propertyID == "DETAIL_PICTURE"):?><div class="note"><div>Красивые, яркие картинки помогут сделать ваш пост заметным и привлекательным.</div></div><?endif;?>
		<?if($propertyID == "PREVIEW_TEXT"):?><div class="note"><div>Описание не должно превышать 200 символов. Кратким и содержательным описанием, вы сможете привлечь больше читателей.</div></div><?endif;?>
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
							"VALUE" => (strlen($arResult["ELEMENT"][$propertyID]) > 0 ? $arResult["ELEMENT"][$propertyID] : $_REQUEST["PROPERTY"][$propertyID][0]),
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
		<?endforeach;?>
	<?endif?>
	<?if(isset($_REQUEST["preview"])):?>
		</div>
	<?endif;?>
	<div class="buttons">
		<?if(strlen($arResult["MESSAGE"]) > 0):?>
			<div class="note"><div><?=$arResult["MESSAGE"]?></div></div>
		<?endif;?>
		<div class="submit"><input class="submit" type="submit" name="iblock_submit" value="<?=GetMessage("IBLOCK_FORM_SUBMIT")?>" /></div>
		<div class="<?=(isset($_REQUEST["preview"]) ? 'edit' : 'preview')?>"><input class="submit" type="submit" name="<?=(isset($_REQUEST["preview"]) ? 'edit' : 'preview')?>" value="<?=(isset($_REQUEST["preview"]) ? 'Редактирование' : 'Просмотр')?>" /></div>
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
</div>
<?$arResult["PROPERTY_LIST"][] = "PREVIEW_TEXT";?>
<?if (count($arResult["ERRORS"])):?>
	<?=ShowError(implode("<br />", $arResult["ERRORS"]))?>
<?endif?>