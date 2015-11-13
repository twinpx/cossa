<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
CModule::IncludeModule("iblock");
/**
 * Handle file uploads via XMLHttpRequest
 */
class qqUploadedFileXhr {
    /**
     * Save the file to the specified path
     * @return boolean TRUE on success
     */
    function save($path) {    
        $input = fopen("php://input", "r");
        $temp = tmpfile();
        $realSize = stream_copy_to_stream($input, $temp);
        fclose($input);
        
        if ($realSize != $this->getSize()){            
            return false;
        }
        
        $target = fopen($path, "w");
		
        fseek($temp, 0, SEEK_SET);
        stream_copy_to_stream($temp, $target);
        fclose($target);
        
        return true;
    }
    function getName() {
        return $_GET['qqfile'];
    }
    function getSize() {
        if (isset($_SERVER["CONTENT_LENGTH"])){
            return (int)$_SERVER["CONTENT_LENGTH"];            
        } else {
            throw new Exception('Getting content length is not supported.');
        }      
    }   
}

/**
 * Handle file uploads via regular form post (uses the $_FILES array)
 */
class qqUploadedFileForm {  
    /**
     * Save the file to the specified path
     * @return boolean TRUE on success
     */
    function save($path) {
        if(!move_uploaded_file($_FILES['qqfile']['tmp_name'], $path)){
            return false;
        }
        return true;
    }
    function getName() {
        return $_FILES['qqfile']['name'];
    }
    function getSize() {
        return $_FILES['qqfile']['size'];
    }
}

class qqFileUploader {
    private $allowedExtensions = array();
    private $sizeLimit = 10485760;
    private $file;

    function __construct(array $allowedExtensions = array(), $sizeLimit = 10485760){        
        $allowedExtensions = array_map("strtolower", $allowedExtensions);
            
        $this->allowedExtensions = $allowedExtensions;        
        $this->sizeLimit = $sizeLimit;
        
        $this->checkServerSettings();       

        if (isset($_GET['qqfile'])) {
            $this->file = new qqUploadedFileXhr();
        } elseif (isset($_FILES['qqfile'])) {
            $this->file = new qqUploadedFileForm();
        } else {
            $this->file = false; 
        }
		if($this->file != false)
			$this->resize();
    }
    
    private function checkServerSettings(){        
        $postSize = $this->toBytes(ini_get('post_max_size'));
        $uploadSize = $this->toBytes(ini_get('upload_max_filesize'));        
        
        if ($postSize < $this->sizeLimit || $uploadSize < $this->sizeLimit){
            $size = max(1, $this->sizeLimit / 1024 / 1024) . 'M';             
            die("{'error':'increase post_max_size and upload_max_filesize to $size'}");    
        }        
    }
    
    private function toBytes($str){
        $val = trim($str);
        $last = strtolower($str[strlen($str)-1]);
        switch($last) {
            case 'g': $val *= 1024;
            case 'm': $val *= 1024;
            case 'k': $val *= 1024;        
        }
        return $val;
    }
	/*private function getWidth() {
		return imagesx($this->file);
    }
    private function getHeight() {
		return imagesy($this->file);
    }*/
	
	function resize($width,$height,$uploadDirectory) {
		$new_image = imagecreatetruecolor($width, $height);
		list($width_orig, $height_orig) = $this->file->getSize();
		imagecopyresampled($new_image, $this->file, 0, 0, 0, 0, $width, $height, $width_orig/*$this->getWidth()*/, $height_orig/*$this->getHeight()*/);
		$pathinfo = pathinfo($this->file->getName());
        $filename = $pathinfo['filename'];
		$ext = $pathinfo['extension'];
		if ($this->file->save($uploadDirectory . $filename . '.' . $ext)){
            return array('path'=>$uploadDirectory . $filename . '.' . $ext);
        } else {
            return array('error'=> 'Could not save uploaded file.' .
                'The upload was cancelled, or server error encountered');
        }
		//$this->file = $new_image;
	}
	
    
    /**
     * Returns array('success'=>true) or array('error'=>'error message')
     */
    function handleUpload($uploadDirectory, $replaceOldFile = FALSE){
        if (!is_writable($uploadDirectory)){
            return array('error' => "Server error. Upload directory isn't writable.".$uploadDirectory);
        }
        
        if (!$this->file){
            return array('error' => 'No files were uploaded.');
        }
        
        $size = $this->file->getSize();
        
        if ($size == 0) {
            return array('error' => 'File is empty');
        }
        
        if ($size > $this->sizeLimit) {
            return array('error' => 'File is too large');
        }
        
        $pathinfo = pathinfo($this->file->getName());
        $filename = $pathinfo['filename'];
        //$filename = md5(uniqid());
        $ext = $pathinfo['extension'];

        if($this->allowedExtensions && !in_array(strtolower($ext), $this->allowedExtensions)){
            $these = implode(', ', $this->allowedExtensions);
            return array('error' => 'File has an invalid extension, it should be one of '. $these . '.');
        }
        
        if(!$replaceOldFile){
            /// don't overwrite previous files that were uploaded
            while (file_exists($uploadDirectory . $filename . '.' . $ext)) {
                $filename .= rand(10, 99);
            }
        }
        
        if ($this->file->save($uploadDirectory . $filename . '.' . $ext)){
            return array('path'=>$uploadDirectory . $filename,
						 'ext'=>$ext);
        } else {
            return array('error'=> 'Could not save uploaded file.' .
                'The upload was cancelled, or server error encountered');
        }
        
    }    
}
//echo "REQUEST<pre>"; print_r($_REQUEST); echo "</pre>";
//echo "FILES<pre>"; print_r($_FILES); echo "</pre>";
echo htmlspecialchars(json_encode($_REQUEST), ENT_NOQUOTES);
/*
if(strlen($_REQUEST["remove_prev_image"]) > 0){
	$oldfilename = "/home/twinpx/domains/2px.ru/public_html/cossa".$_REQUEST["remove_prev_image"];
	if(file_exists($oldfilename)){
		unlink($oldfilename);
	}
}
// list of valid extensions, ex. array("jpeg", "xml", "bmp")
$allowedExtensions = array();
// max file size in bytes
$sizeLimit = 10 * 1024 * 1024;

$uploader = new qqFileUploader($allowedExtensions, $sizeLimit);
$result = $uploader->handleUpload('/home/twinpx/domains/2px.ru/public_html/cossa/upload/tmp/',true);
if(strlen($result['error']) <= 0){
	include('resize.php');
	$image = new SimpleImage();
	$image->load($result["path"].".".$result["ext"]);
	$time = time();
	$path = array('path' => $result["path"].rand($time, $time+999999)."_".$time.".".$result["ext"]);
	$ok = false;
	if($_REQUEST["maxWidth"] > 0 && $_REQUEST["maxHeight"] > 0){
		$image->resize($_REQUEST["maxWidth"],$_REQUEST["maxHeight"]);
		$ok = true;
	}elseif($_REQUEST["maxWidth"] > 0 && $_REQUEST["maxHeight"] <= 0){
		$image->resizeToWidth($_REQUEST["maxWidth"]);
		$ok = true;
	}elseif($_REQUEST["maxWidth"] <= 0 && $_REQUEST["maxHeight"] > 0){
		$image->resizeToHeight($_REQUEST["maxHeight"]);
		$ok = true;
	}else{
		$ok = false;
	}
	if($ok){
		$image->save($path["path"],IMAGETYPE_JPEG, 75, null, $result["path"].".".$result["ext"]);
		unlink(str_replace("/home/twinpx/domains/2px.ru/public_html/cossa/upload/tmp/","",$result["path"].".".$result["ext"]));
		echo htmlspecialchars(json_encode($path), ENT_NOQUOTES);
	}else{
		echo htmlspecialchars(json_encode(array('error'=> 'Could not resize uploaded file.' .
					'The resize was cancelled, or server error encountered')), ENT_NOQUOTES);
	}
}else{
	echo htmlspecialchars(json_encode($result), ENT_NOQUOTES);
}*/
//$uploader->resize(644,390,'/home/twinpx/domains/2px.ru/public_html/cossa/upload/tmp/');
// to pass data through iframe you will need to encode all html tags
//echo htmlspecialchars(json_encode($result), ENT_NOQUOTES);
//echo "/home/twinpx/domains/2px.ru/public_html/cossa/upload/tmp/picture2.jpg";
?>
