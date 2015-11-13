<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>


<div id="content" class="page">
	<div class="b-letour-table">
		<h2>Таблица участников «Le Tour de OK»</h2>
		<table>
			<colgroup>
				<col class="b-letour-table__num-col" />
				<col class="b-letour-table__logo-col" />
				<col class="b-letour-table__name-col" />
				<col class="b-letour-table__person-col" />
				<col class="b-letour-table__badges-col" />
			</colgroup>
			<tbody>
				<?$i=1;?>
<?foreach($arResult["ITEMS"] as $arItem):?>
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
	?>
	<tr class="news-item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
		<td class="b-letour-table__num-td"><?=$i?></td>
		<td class="b-letour-table__logo-td">
			<a href="<?=$arItem["DISPLAY_PROPERTIES"]["REFERENCE"]["VALUE"]?>" target="_blank">
				<img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" width="97" height="75" alt="" />
			</a>
		</td>
		<td class="b-letour-table__name-td">
			<div class="b-letour-table__name"><?=$arItem["NAME"]?></div>
			<a href="<?=$arItem["DISPLAY_PROPERTIES"]["REFERENCE"]["VALUE"]?>" target="_blank"><?=$arItem["DISPLAY_PROPERTIES"]["REFERENCE"]["VALUE"]?></a>
		</td>
		
		<td class="b-letour-table__person-td">
			<div class="b-letour-table__person">
				<?=$arItem["PREVIEW_TEXT"];?>
			</div>
			<?$APPLICATION->IncludeComponent(
				"cossa:iblock.vote_le-tour",
				"ratings",
				Array(
					"IBLOCK_TYPE" => "ok",
					"IBLOCK_ID" => '55',
					"ELEMENT_ID" => "",
					"MAX_VOTE" => "",
					"VOTE_NAMES" => "",
					"SECTION_URL" => "articles",
					"CACHE_TYPE" => "",
					"CACHE_TIME" => "",
				),
				false
			);?>

		</td>

		<td class="b-letour-table__badges-td">
			<?=$arItem["DETAIL_TEXT"];?>
		</td>
	</tr>
	<?$i++;?>
<?endforeach;?>
			</tbody>
		</table>
	</div>
</div>