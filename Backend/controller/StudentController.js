const StudentModel = require('../Model/StudentModel');
const GetAllStudents = async (req, res) => {
    try{
        const result = await StudentModel.FindAllStudents();
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

const GetStudentByEmail = async (req,res) => {
    const email = req.params.email;
    try{
        const result = await StudentModel.FindStudentByEmail(email);
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

const PostAStudent = async (req,res) => {
        const body = req.body;
    try{
        const result = await StudentModel.PostStudent(body);
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

const DeleteAQuestion = async (req,res) => {
    const id = req.params.id
try{
    const result = await  StudentModel.DeleteAStudent(id);
    res.status(200).json(result);
} catch(err){
    res.status(400).json({error: err.message});
}
}


const DeleteQuestionByEmail = async (req,res) => {
    const email = req.params.email;
try{
    const result = await  StudentModel.DeleteStudentByEmail(email);
    res.status(200).json(result);
} catch(err){
    res.status(400).json({error: err.message});
}
}


const SubmitTest = async (req,res) => {
    const body = req.body;
try{
    const result = await StudentModel.SubmitTest(body);
    res.status(200).json(result);
} catch(err){
    res.status(400).json({error: err.message});
}
}

module.exports = {GetAllStudents, DeleteQuestionByEmail, GetStudentByEmail, PostAStudent, SubmitTest,DeleteAQuestion}