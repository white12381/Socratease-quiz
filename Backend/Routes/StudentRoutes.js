 const StudentRoutes = require("express").Router();
const {GetLastQuestionByPathAndName,PostTime,GetAQuestionByPathAndName,GetAllStudents,DeleteQuestionByEmail,DeleteAQuestion,SubmitTest,GetStudentByEmail,PostAStudent} = require("../controller/StudentController")

StudentRoutes.get('/all',GetAllStudents)
StudentRoutes.get('/email/:email',GetStudentByEmail);
StudentRoutes.delete('/email/:email',DeleteQuestionByEmail);
StudentRoutes.post('/addstudentquestion', PostAStudent);
StudentRoutes.post('/submitquestion', SubmitTest);
StudentRoutes.delete('/deleteQuestion/:id', DeleteAQuestion);
StudentRoutes.get('/:path/name/:name',GetAQuestionByPathAndName)
StudentRoutes.get('/last/:path/name/:name',GetLastQuestionByPathAndName)
StudentRoutes.patch('/time',PostTime);
module.exports = StudentRoutes;