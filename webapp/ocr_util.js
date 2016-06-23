var hocr_parser = require('hocr_parser');
var ocr_data = hocr_parser.parse();
var dictionary = {'salary' : ['Salary','Urloubsentgelt']}

// Very primitive form of finding the associated number : Takes the first right
//number after the word

var findFirstNumberOnTheRightOfTheWord = function(coordinates){
  var numbers = ocr_data.numbers;
  return numbers.filter(function(ocr_number){
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
  return ocr_data.words.filter(function(ocr_word){
    return dictionary[word].find(function(value){
        return value == ocr_word.word;
    })
  });
}
