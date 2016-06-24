var dictionary = require('./dictionary');
var ocr_words,ocr_numbers;
// Very primitive form of finding the associated number : Takes the first right
//number after the word
var set_ocr_data = function(ocr_data){
	ocr_words = ocr_data.words;
	ocr_numbers = ocr_data.numbers;
}

var inAscendingOrderByXCoordinate = function(first_number,second_number){
  return first_number.coordinates.x1 >= second_number.coordinates.x1
}

var isCoordinateSame = function(coordinate, word1, word2){
	return word1.coordinates[coordinate] == word2.coordinates[coordinate];
}
var areBothOnSameLine = function(word1, word2){
	return (isCoordinateSame('y1', word1, word2) ||
			isCoordinateSame('y2', word1, word2))
}

var findNumbersInTheSameLine = function(word){
	return ocr_numbers.filter(function(ocr_number){
      return areBothOnSameLine(word,ocr_number);
  })
}
var findFirstNumberOnTheRightOfTheWord = function(word){
  return findNumbersInTheSameLine(word).sort(inAscendingOrderByXCoordinate)[0];
}

var findAssociatedNumbers = function(word){
  var ocr_word_data = checkForAllSynonyms(word);
  if(ocr_word_data.length == 0) return;
  return findFirstNumberOnTheRightOfTheWord(ocr_word_data[0])
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
