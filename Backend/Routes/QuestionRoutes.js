const questionRoutes = require("express").Router();
const {GetallQuestions,PostAQuestion,PostMultipleQuestions,DeleteAQuestion,UpdateAQuestion} = require("../controller/QuestionController");

// Get all questions
questionRoutes.get('/questions',GetallQuestions);

// Post a question
questionRoutes.post('/question',PostAQuestion);

// Post Multiple Questions
questionRoutes.post('/questions',PostMultipleQuestions);

// Delete A Question
questionRoutes.delete('/question/:id',DeleteAQuestion);

// Update A Question
questionRoutes.patch('/question/:id',UpdateAQuestion);

module.exports = questionRoutes;