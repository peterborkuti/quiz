# quiz

## Question Types

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
{ questions: ['hello', 'fire', 'the', 'bricks'],
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
{ question: 'html text',
  answers : [ { answer: 'regexp', grade: floating point number between 0 and 1}, ... ]
}
```

