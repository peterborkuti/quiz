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

    function createAnswerArray(answers, defaultAnswer) {
               var retVal = [];
               $(answers).each(function(i,v) {
                    retVal.push(
                        {
                            answer: v,
                            userInput: ko.observable(defaultAnswer)
                        }
                    )
                });
                return retVal;
    }

    function MatchesQuestion(data) {
                var self = this;
				self.questionType = 'matches';
                self.whatToDo = data.whatToDo || 'Selects only the good answers. There could be 0 or not enough or more than enough good answers!';
				self.answers = data.answers;
                self.matches = createAnswerArray(data.matches, data.answers[0]);
                self.good = data.good || self.answers.length;
    }

    function MultipleQuestion(data) {
        var self = this;
				self.questionType = 'multiple';
                self.whatToDo = data.whatToDo || 'Selects only the good answers with putting a checkmark into the boxes! There could be zero or more good answers.';
				self.multiple = data.multiple;
                self.answers = createAnswerArray(data.answers, false);
    }

    function SingleQuestion(data) {
        var self = this, r = (''+Math.random()+'').substr(2);
		self.questionType = 'single';
        self.whatToDo = data.whatToDo || 'Select only the good answer! There could be zero or one good answer.';
        self.single = data.single;
        self.answers = [];
        $(data.answers).each(function(i,v) {
                    self.answers.push(
                        {
                            answer: v,
                            value: ""+i
                        }
                    )
                });
        self.userInput = ko.observable("");
		self.radioName = 'radio_'+r;
    }

    function ShortQuestion(data) {
        var self = this;
		self.questionType = 'short';
        self.whatToDo = data.whatToDo || 'Write a short answer into the input field!';
		self.short = data.short;
		self.answers = data.answers;
		self.userInput = ko.observable('');
    }

    function StatementsQuestion(data) {
        var self = this;
		self.questionType = 'statements';
        self.whatToDo = data.whatToDo || 'Put a checkmark to the true statements!';
		self.statements = createAnswerArray(data.statements, false);
    }


	function Question(data, _index) {
            console.log("Reading question:" + _index);
            var self = this, question = {};
            self.whatToDo = data.whatToDo || '';
			self.index = _index;
            self.description = data.description || '';
            self.portaldev = data.portaldev || '';
            self.portaladvdev = data.portaladvdev || '';
            self.explanation = data.explanation || '';
            self.hint = data.hint || '';
            self.good = data.good || 0;
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
			else if ( typeof data.statements !== 'undefined' ) {
                question = new StatementsQuestion(data);
			}
			else {
				console.log('unknown question type');
			}
            for (var prop in question) {
                if (question.hasOwnProperty(prop)) {
                    self[prop] = question[prop];
                }
            }
            self.templateName = 'tpl_'+self.questionType;
            self.good = self.good || 1;
            self.hint = self.hint || 'Number of good answers:' + self.good;
            console.log(self);
	}

	function getQuestions(questions) {

		// Data

		$.get( "data/data.json", function(data) {
			$(data).each(function(index, item) {
				     questions.push( new Question(item, index) );
			});
		});


	}

    function ViewModel() {
        var self = this;
        self.settings = {};
        self.settings.showWhatToDo = ko.observable(true);
        self.settings.shuffleWhenLoading = ko.observable(true);
        self.settings.showHints = ko.observable(true);
        self.settings.debug = ko.observable(true);
        self.questions = ko.observableArray([]);
        getQuestions(self.questions);
        self.state = ko.observable('view'); // all, view, stat, settings
        self.questionId = ko.observable(0);
        self.question = ko.computed(function() {
            return self.questions()[self.questionId()];
        });
    }

    var qvm = new ViewModel();
	ko.applyBindings(qvm);

    var routeAll = function () {
             qvm.state('all');
             console.log("all"); },
        routeView = function (questionId) {
             qvm.state('view');
             questionId = "" + (questionId || qvm.questionId());
             qvm.questionId( parseInt(questionId, 10) );
            console.log("view"); },
        routeStat = function() { console.log("stat"); },
        routeSettings = function() { console.log("settings"); qvm.state('settings')};
        
      var routes = {
        '/all': routeAll,
        '/view/:questionId': routeView,
        '/view': routeView,
        '/stat': routeStat,
        '/set' : routeSettings
      };

      var router = Router(routes);
      router.init();

});

