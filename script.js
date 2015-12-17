$(function(){
	$('#result').hide();
	$('#test').click(function(){
		$('#result').hide();
		console.log('on');
		text = $('#text').val();
	
		
		emoji = jqemoji(text);
		console.log(emoji);

		if(emoji){
			$('#result').html(emoji);
			$('#result').show();
		}
	
	});
	
});

function jqemoji(str){

	console.log(str);

	if(!str) return false;

	var haut = 0;
	var n = 0;
	CPstring = '';

	for(i=0;i<str.length;i++){
		var code = str.charCodeAt(i);
		var b = str.charCodeAt(i); 

		if(code>1000) {

			if (b < 0 || b > 0xFFFF) {
				CPstring += 'Error ' + dhex(b).toLowerCase() + '!';
			}
			if (haut != 0) {
				if (0xDC00 <= b && b <= 0xDFFF) {
					CPstring += ' imgFront'+ dhex(0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00)).toLowerCase() + 'imgBack ';
					haut = 0;
					continue;
					}
				else {
					CPstring += '!erreur ' + dhex(haut).toLowerCase() + '!';
					haut = 0;
					}
			}

			if (0xD800 <= b && b <= 0xDBFF) {
				haut = b;
			}
			else {
				CPstring += ' imgFront'+ dhex(b).toLowerCase() + 'imgBack ';
			}

		}
		else {
				CPstring = CPstring+String.fromCharCode(code);
		}
			
		
	}

 	CPstring = replaceAll(CPstring , 'imgFront', '<span class="emoji emoji');
	CPstring = replaceAll(CPstring, 'imgBack', '"></span> ');

	return CPstring;
};

function dhex(str) {
 return (str+0).toString(16).toUpperCase();
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
