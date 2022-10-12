const questionRoutes = require("express").Router();
const {SendEmail,GetAQuestionByName,GetAQuestionById,GetallQuestions,PostAQuestion,PostMultipleQuestions,DeleteAQuestion,UpdateAQuestion} = require("../controller/QuestionController");

// Get all questions
questionRoutes.get('/questions',GetallQuestions);

// Get Question by Id
questionRoutes.get('/question/:id',GetAQuestionById);

// Get Question By Name
questionRoutes.get('/question/:path/name/:name',GetAQuestionByName)

// Post a question
questionRoutes.post('/question',PostAQuestion);

// Post Multiple Questions
questionRoutes.post('/questions',PostMultipleQuestions);

// Delete A Question
questionRoutes.delete('/question/:id',DeleteAQuestion);

// Update A Question
questionRoutes.patch('/question/:id',UpdateAQuestion);

// Send Email to Admin User
questionRoutes.post('/sendEmail', SendEmail);

module.exports = questionRoutes;