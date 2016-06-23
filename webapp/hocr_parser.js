var toJson = function(word) {
	var result = word.title.split(';');
	var coordinates = findCoordinates(result[0].trim().split('bbox ')[1]);
	var confidence = result[1].trim().split('x_wconf ')[1]

	return {'word':word.innerText,'coordinates':coordinates, 'confidence': confidence}
}

var processWords = function(ocr_words){
 var words = [];
 var numbers= [];
 for(var i =0; i< ocr_words.length; i++){
	if(ocr_words[i].hasAttribute('dir')){
		words.push(toJson(ocr_words[i]));
	}else{
		numbers.push(toJson(ocr_words[i]));
	}
	}
return {'numbers':numbers, 'words':words};
}

var findCoordinates = function(coordinates){
  var coordinate = coordinates.split(' ');
  return {
  'x1':parseInt(coordinate[0]),
  'y1':parseInt(coordinate[1]),
  'x2':parseInt(coordinate[2]),
  'y2':parseInt(coordinate[3])}
  }

  var parse = function(){
  	var ocr_words = document.getElementsByClassName('ocrx_word');
  	return processWords(ocr_words);
  }

	modules.exports.parse = parse;
