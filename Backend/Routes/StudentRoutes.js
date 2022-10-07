 const StudentRoutes = require("express").Router();
const {GetAQuestionByPathAndName,GetAllStudents,DeleteQuestionByEmail,DeleteAQuestion,SubmitTest,GetStudentByEmail,PostAStudent} = require("../controller/StudentController")

StudentRoutes.get('/all',GetAllStudents)
StudentRoutes.get('/email/:email',GetStudentByEmail);
StudentRoutes.delete('/email/:email',DeleteQuestionByEmail);
StudentRoutes.post('/addstudentquestion', PostAStudent);
StudentRoutes.post('/submitquestion', SubmitTest);
StudentRoutes.delete('/deleteQuestion/:id', DeleteAQuestion);
StudentRoutes.get('/:path/name/:name',GetAQuestionByPathAndName)
module.exports = StudentRoutes;