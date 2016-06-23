var words = require('./data/words.json');

var get_synonyms = function(word){
	return words[word];
}

exports.get_synonyms = get_synonyms;
