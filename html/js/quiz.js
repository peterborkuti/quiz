$(function() {
console.log("DOM is ready");

	function Question(data, _index) {
			this.index = _index;
			if ( typeof data.matches !== 'undefined' ) {
				this.questionType = 'matches';
				this.matches = data.matches;
				this.answers = data.answers;
			}
			else if ( typeof data.multiple !== 'undefined' ) {
				this.questionType = 'multiple';
				this.multiple = data.multiple;
				this.answers = data.answers;
				this.checked = new Array(data.answers.length);
				this.good = data.good;
			}
			else {
				console.log('unknown question type');
			}

			this.getShuffledAnswers = function() {
				var array = this.answers;
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

	}

	function QuestionsViewModel() {
		// Data
		var self = this;

		self.questions = ko.observableArray([]);
		$.get( "data/data.json", function(allData) {
			var data = $.parseJSON(allData);
			console.log("data received from server");
			var mappedQuestions = $.map(data, function(item, index) { return new Question(item, index) });
			self.questions(mappedQuestions);
		  console.log( "success" );
		})
		  .done(function() {
			alert( "second success" );
		  })
		  .fail(function() {
			alert( "error" );
		  })
		  .always(function() {
			alert( "finished" );
		  });
	}

	ko.applyBindings(new QuestionsViewModel());

	console.log("KO ran");
});