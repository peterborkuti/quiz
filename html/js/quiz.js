var qvm = {};
$(function() {
"use strict";

	ko.bindingHandlers.radioName = {
		init: function(element, valueAccessor) {
			var value = ko.unwrap(valueAccessor()); // Get the current value of the current property we're bound to
			$(element).attr('name', value);         // jQuery will set the name of the radio button
		}
	};

			function shuffleArray(array) {
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

    function MatchesQuestion(data) {
                var self = this;
				self.questionType = 'matches';
				self.matches = [];
				self.answers = data.answers;
                $(data.matches).each(function(i,v) {
                    self.matches.push(
                        {
                            match: v,
                            selected: data.answers[i]
                        }
                    )
                });
    }

    function MultipleQuestion(data) {
        var self = this;
				self.questionType = 'multiple';
				self.multiple = data.multiple;
				self.answers = data.answers;
				self.checked = new Array(data.answers.length);
				self.good = data.good;

    }

    function SingleQuestion(data) {
        var self = this, r = Math.random();
				self.questionType = 'single';
				self.single = data.single;
				self.answers = data.answers;
				self.checked = new Array(data.answers.length);
				self.radioName = 'radio_';
    }

    function ShortQuestion(data) {
        var self = this;
				self.questionType = 'short';
				self.short = data.short;
				self.answers = data.answers;
				self.answer = '';
    }

	function Question(data, _index) {
            var self = this, question = {};
			self.index = _index;
            self.description = data.description || '';
            self.portaldev = data.portaldev || '';
            self.portaladvdev = data.portaladvdev || '';
            self.explanation = data.explanation || '';
            self.hint = data.hint || '';
			if ( typeof data.matches !== 'undefined' ) {
                question = new MatchesQuestion(data);
			}
			else if ( typeof data.multiple !== 'undefined' ) {
                question = new MultipleQuestion(data);
			}
			else if ( typeof data.single !== 'undefined' ) {
                question = new SingleQuestion(data);
			}
			else if ( typeof data.short !== 'undefined' ) {
                question = new ShortQuestion(data);
			}
			else {
				console.log('unknown question type');
			}
            for (var prop in question) {
                if (question.hasOwnProperty(prop)) {
                    self[prop] = question[prop];
                }
            }
	}

	function QuestionsViewModel() {
		// Data
		var self = this;

		self.questions = ko.observableArray([]);

		$.get( "data/data.json", function(allData) {
			var data = $.parseJSON(allData);

			var mappedQuestions = $.map(data,
				function(item, index) {
				     return new Question(item, index);
				});

			console.log("data received from server");

			self.questions(mappedQuestions);
		});

        self.templateName = function(question, context) {
            return "tpl_"+question.questionType;
        }
	}

    qvm = new QuestionsViewModel();
	ko.applyBindings(qvm);

	console.log("KO ran");
});