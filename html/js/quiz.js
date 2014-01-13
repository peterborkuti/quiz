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

    function StatementsQuestion(data) {
        var self = this;
				self.questionType = 'statements';
				self.statements = data.statements;
				self.answers = data.answers;
                $(data.answers).each(function(i,v) {
                    self.answers.push(
                        {
                            answer: v,
                            selected: ko.observable(false)
                        }
                    )
                });
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
	}

	function getQuestions(questions) {
		// Data

		$.get( "data/data.json", function(allData) {
			var data = $.parseJSON(allData);

			$(data).each(function(index, item) {
				     questions.push( new Question(item, index) );
			});
		});
	}

    function ViewModel() {
        var self = this;
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
             questionId = questionId || qvm.questionId();
             qvm.questionId(questionId);
            console.log("view"); },
        routeStat = function() { console.log("stat"); },
        routeSettings = function() { console.log("settings"); };
        
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

