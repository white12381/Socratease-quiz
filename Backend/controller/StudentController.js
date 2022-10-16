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

const PostTime = async (req,res) => {
    const body = req.body;
try{
    const result = await StudentModel.PostTime(body);
    res.status(200).json(result);
} catch(err){
    res.status(400).json({error: err.message});
    console.log(err.message);
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


// Get Questions by Name
const GetAQuestionByPathAndName = async (req,res) => {
    const path = decodeURI(req.params.path).toString();
    const name = req.params.name.toString();

const index = req.query.index || 0;
    try{
        const response = await StudentModel.GetAQuestionByPathAndName(path,name,index);
        res.status(200).json(response);
        }catch(err){
            res.status(400).json({error: err.message});
        }
}

// Get Questions by Name
const GetLastQuestionByPathAndName = async (req,res) => {
    const path = decodeURI(req.params.path).toString();
    const name = req.params.name.toString();
 
    try{
        const response = await StudentModel.GetLastQuestionByPathAndName(path,name);
        res.status(200).json(response);
        }catch(err){
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
    console.log(err.message);
}
}



module.exports = {GetLastQuestionByPathAndName,PostTime,GetAQuestionByPathAndName,GetAllStudents, DeleteQuestionByEmail, GetStudentByEmail, PostAStudent, SubmitTest,DeleteAQuestion}