function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter--) {
        // Pick a random index
        index = (Math.random() * counter) | 0;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function Question(data, _index) {
	this.index = _index;
	if ( typeof data.matches !== 'undefined' ) {
		this.questionType = 'matches';
		this.matches = data.matches;
		this.answers = data.answers;
	} else {
		console.log('unknown question type');
	}

}

function QuestionsViewModel() {
    // Data
    var self = this;

    self.questions = [];
    $.getJSON("../data-01.js", function(allData) {
        self.questions = $.map(allData, function(item, index) { return new Question(item, index) });
		//self.questions(mappedQuestions);
    });

}

$(function() {
ko.applyBindings(new QuestionsViewModel());
});