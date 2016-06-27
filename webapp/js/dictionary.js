var words = require('./data/words.json');

var get_synonyms = function(word){
	console.log('Trying to get synonymns for ' + word);
	console.log('all words : ' + JSON.stringify(words));
	return words[word];
}

exports.get_synonyms = get_synonyms;
