const QuestionModel = require("../Model/QuestionModel");

// Get all Questions
const GetallQuestions = async (req,res) => {  
try{
const response = await QuestionModel.FindAllQuestions();
res.status(200).json(response);
}catch(err){
    res.status(400).json({error: err.message});
}
}

// Post a Question
const PostAQuestion = async (req,res) => {
    const body = req.body;
    try{
        const response = await QuestionModel.PostAQuestion(body);
        res.status(200).json(response);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Post multiple Questions
const PostMultipleQuestions = async (req,res) => {
    const body = req.body;
    try{
        const response = await QuestionModel.PostMultipleQuestions(body);
        res.status(200).json(response);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Delete a Question
const DeleteAQuestion = async (req,res) => {
    const id = req.params.id;
    try{
const response = await QuestionModel.DeleteAQuestion(id);
res.status(200).json(response);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

// Update a Question
const UpdateAQuestion = async (req,res) => {
    const id = req.params.id;
    const body = req.body;
    try{
const response = await QuestionModel.UpdateAQuestion(id,body);
res.status(200).json(response);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}


module.exports = {GetallQuestions,PostAQuestion,PostMultipleQuestions,DeleteAQuestion,UpdateAQuestion}