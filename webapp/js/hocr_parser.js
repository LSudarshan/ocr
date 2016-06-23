cheerio = require('cheerio');
fs = require('fs');

var toJson = function(wordHtml) {
	var result = wordHtml.attribs.title.split(';');
	var coordinates = findCoordinates(result[0].trim().split('bbox ')[1]);
	var confidence = result[1].trim().split('x_wconf ')[1]

	return {'word':wordHtml.children[0].data,'coordinates':coordinates, 'confidence': confidence}
}

var processWords = function(ocr_words){
 var words = [];
 var numbers= [];
 for(var i =0; i< ocr_words.length; i++){
	if(ocr_words[i].attribs['dir']){
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

  var parse = function(text){
  	$ = cheerio.load(text);
  	var ocr_words = $('.ocrx_word').get();
  	return processWords(ocr_words);
  }

module.exports.parse = parse;


