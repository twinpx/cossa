<?php
	
include "../config.php";
include('/home/twinpx/domains/2px.ru/public_html/cossa/bitrix/components/cossa/form.add/resize.php');

$_FILES['file']['type'] = strtolower($_FILES['file']['type']);

if ($_FILES['file']['type'] == 'image/png' 
|| $_FILES['file']['type'] == 'image/jpg' 
|| $_FILES['file']['type'] == 'image/gif' 
|| $_FILES['file']['type'] == 'image/jpeg'
|| $_FILES['file']['type'] == 'image/pjpeg')
{	
	//echo "<pre>"; print_r($_FILES); echo "</pre>";
	$filename = md5(date('YmdHis')).'.jpg';
	copy($_FILES['file']['tmp_name'], IMAGES_ROOT.$filename);
	$image = new SimpleImage();
	//echo IMAGES_ROOT.$filename;
	$image->load(IMAGES_ROOT.$filename);
	$image->resizeToWidth("644");
	$filename_resized = md5(date('YmdHis')).'.jpg';
	//$image->save(IMAGES_ROOT.$filename_resized,IMAGETYPE_JPEG, 75, null, IMAGES_ROOT.$filename);
	$image->save(IMAGES_ROOT.$filename_resized,IMAGETYPE_JPEG, 75, null,"");
	//unlink(IMAGES_ROOT.$filename);
	//echo '/upload/tmp/images/'.$filename_resized;
	echo '/upload/tmp/images/'.$filename_resized;
}
?>




