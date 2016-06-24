var dictionary = require('./dictionary');
var ocr_words,ocr_numbers;
// Very primitive form of finding the associated number : Takes the first right
//number after the word
var set_ocr_data = function(ocr_data){
	ocr_words = ocr_data.words;
	ocr_numbers = ocr_data.numbers;
}

var findFirstNumberOnTheRightOfTheWord = function(coordinates){
  return ocr_numbers.filter(function(ocr_number){
    return (ocr_number.coordinates.y1 == coordinates.y1 ||
    ocr_number.coordinates.y2 == coordinates.y2)
  }).sort(
    function(a,b){
      a.coordinates.x1 < b.coordinates.x1
    })[0];
}

var findAssociatedNumbers = function(word){
  var ocr_word_data = checkForAllSynonyms(word);
  if(ocr_word_data.length == 0) return;
  return findFirstNumberOnTheRightOfTheWord(ocr_word_data[0].coordinates)
}

var checkForAllSynonyms = function(word){
  return ocr_words.filter(function(ocr_word){
    return dictionary.get_synonyms(word).find(function(value){
        return value == ocr_word.word;
    })
  });
}
exports.set_ocr_data = set_ocr_data;
exports.findAssociatedNumbers = findAssociatedNumbers;
