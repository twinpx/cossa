var RTOOLBAR = {
	html: 	{name: 'html', title: RLANG.html, func: 'toggle'},
	format: 
	{
		name: 'format', title: RLANG.format, func: 'show',
		dropdown: 
		{
			bold: 		  {exec: 'bold', name: 'bold', title: RLANG.bold, style: 'font-weight: bold;'},
			italic: 	  {exec: 'italic', name: 'italic', title: RLANG.italic, style: 'font-style: italic;'},
			underline: 	  {exec: 'underline', name: 'underline', title: RLANG.underline, style: 'text-decoration: underline !important;'}
		}						
	},
	lists: 	
	{
		name: 'lists', title: RLANG.lists, func: 'show',
		dropdown: 
		{
			ul: 	 {exec: 'insertunorderedlist', name: 'insertunorderedlist', title: RLANG.unorderedlist}
		}			
	},
	link: 
	{
		name: 'link', title: RLANG.link, func: 'show',
		dropdown: 
		{
			link: 	{name: 'link', title: RLANG.link_insert, func: 'showLink', hover:''},
			unlink: {exec: 'unlink', name: 'unlink', title: RLANG.unlink}
		}			
	},
	video: { name: 'video', title: RLANG.video, func: 'showVideo' },
	image: 	{name: 'image', title: RLANG.image, func: 'showImage'},
	image_gallery: 	{name: 'image_gallery', title: RLANG.image_gallery, func: 'showImageGallery'},
	format2: 
	{
		name: 'format', title: RLANG.format, func: 'show',
		dropdown: 
		{
			removeformat: {exec: 'removeformat', name: 'removeformat', title: RLANG.removeformat, text:RLANG.removeformat}
		}						
	}
}