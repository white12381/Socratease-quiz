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

// Get a Question By Id
const GetAQuestionById = async (req,res) => {
    const id = req.params.id;
    try{
        const response = await QuestionModel.FindAQuestionById(id);
        res.status(200).json(response);
        }catch(err){
            res.status(400).json({error: err.message});
        }
}

// Get Questions by Name
const GetAQuestionByName = async (req,res) => {
    const name = decodeURI(req.params.name).toString();
    const path = req.params.path.toString();

const index = req.query.index || 0;
    try{
        const response = await QuestionModel.FindAQuestionByName(path,name,index);
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
        console.log(err.message)
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

// Send Email
const SendEmail = async (req,res) => {
    const body = req.body;
    console.log(body);
try{
    const result = await QuestionModel.SendEmail(body);
    res.status(200).json(result);
} catch(err){
    res.status(400).json({error: err.message});
}
}

// Finish creating Question
const FinishCreatingQuestion = async (req,res) => {
    const body = req.body;
    console.log(body);
try{
    const result = await QuestionModel.FinishCreatingQuestion(body);
    res.status(200).json(result);
} catch(err){
    res.status(400).json({error: err.message});
    console.log("Finish Creating Question Error " + err)
}
}

module.exports = {SendEmail,FinishCreatingQuestion, GetAQuestionByName,GetAQuestionById,GetallQuestions,PostAQuestion,PostMultipleQuestions,DeleteAQuestion,UpdateAQuestion}