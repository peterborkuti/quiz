# quiz

## Question Types

* [Matching question](###Matching question)
* [Statement (true/false)](###statement)
* [short-answer](###short-answer)
* [single-answer](###single-answer)
* [multiple-answers](###multiple-answers)

### Matching question

#### example

Match the words with the number of letters in them!
  hello  5
  fire   4
  the    3 
  bricks 6

#### description

There are two lists: questions and answers. User must match for every question an answer. The number of items in answers >= number of items in questions. The items, which order number is greater than the numkber of questions, are false answers.

#### JSON
```
{ matches: ['hello', 'fire', 'the', 'bricks'],
  answers: [5, 4, 3, 6, 0, 10 ]
}
```

#### explanation
0 and 10 are false answers. 

#### optional parameters
shuffle : true|false
description : 'html text'

### statement

#### description

User must decide if the statement is true or false

#### JSON

```
{ statement : 'html text',
  answer : true|false
}
```

### short-answer

#### description

The answer for the question is short, usually one or two words. Customer can use regular expression.

#### JSON

```
{ short: 'html text',
  answers : [ { answer: 'regexp', grade: floating point number between 0 and 1}, ... ]
}
```

### single-answer

User must choose only one from some given answers

#### JSON

```
{ single: 'html text',
  answers: ['text', 'text', ...]
}
```

The first answer is the good one. On the screen, the answers will be randomly ordered.

### multiple-answers

User must choose some, but at least one from many given answers

#### JSON

```
{ multiple: 'html text',
  answers: ['text', 'text', ...],
}
```

optional:
```
  good: number-of-good-answers
  none: true
```

By default (if 'good' not used), all answers treated as good answers.
The first number-of-good-answers answers are the good ones. If it is zero or 'none' is true, there will be a "none of the above" answer on the screen.

