<?php
	
include "../config.php";
include($_SERVER["DOCUMENT_ROOT"].'/bitrix/components/cossa/form.add/resize.php');

//echo "<pre>"; print_r($_FILES); echo "</pre>";
if(is_array($_FILES['file']['name'])){
	$str_file = "";
	foreach($_FILES['file']['name'] as $key => $name){
		if(strlen($name) > 0){
			$filetype = $_FILES['file']['type'][$key];
			if ($filetype == 'image/png' 
			|| $filetype == 'image/jpg' 
			|| $filetype == 'image/gif' 
			|| $filetype == 'image/jpeg'
			|| $filetype == 'image/pjpeg')
			{	
				$filename = $name;
				copy($_FILES['file']['tmp_name'][$key], IMAGES_ROOT.$filename);
				$image = new SimpleImage();
				//echo IMAGES_ROOT.$filename;
				$image->load(IMAGES_ROOT.$filename);
				$width = $image->getWidth();
				if($width > 644){
					$image->resizeToWidth("644");
				}
				$time = time();
				$filename_resized = md5(rand($time,$time + 9999)).'.jpg';
				$image->save(IMAGES_ROOT.$filename_resized,IMAGETYPE_JPEG, 75, null, "");
				$str_file .= '/upload/tmp/images/'.$filename_resized;
				if(($key+1) != count($_FILES['file']['name'])){
					$str_file .= '|';
				}
			}
		}
	}
	echo $str_file;
}else{
	$_FILES['file']['type'] = strtolower($_FILES['file']['type']);

	if ($_FILES['file']['type'] == 'image/png' 
	|| $_FILES['file']['type'] == 'image/jpg' 
	|| $_FILES['file']['type'] == 'image/gif' 
	|| $_FILES['file']['type'] == 'image/jpeg'
	|| $_FILES['file']['type'] == 'image/pjpeg')
	{	
		$filename = md5(date('YmdHis')).'.jpg';
		copy($_FILES['file']['tmp_name'], IMAGES_ROOT.$filename);
		$image = new SimpleImage();
		//echo IMAGES_ROOT.$filename;
		$image->load(IMAGES_ROOT.$filename);
		$width = $image->getWidth();
		if($width > 644){
			$image->resizeToWidth("644");
		}
		$filename_resized = md5(date('YmdHis')).'.jpg';
		//$image->save(IMAGES_ROOT.$filename_resized,IMAGETYPE_JPEG, 75, null, IMAGES_ROOT.$filename);
		$image->save(IMAGES_ROOT.$filename_resized,IMAGETYPE_JPEG, 75, null,"");
		//unlink(IMAGES_ROOT.$filename);
		//echo '/upload/tmp/images/'.$filename_resized;
		echo '/upload/tmp/images/'.$filename_resized;
	}
}
?>