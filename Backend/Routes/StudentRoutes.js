 const StudentRoutes = require("express").Router();
const {GetQuestionsByPathAndStatus,GetLastQuestionByPathAndName,PostTime,GetAQuestionByPathAndName,GetAllStudents,DeleteQuestionByEmail,DeleteAQuestion,SubmitTest,GetStudentByEmail,PostAStudent} = require("../controller/StudentController")

StudentRoutes.get('/all',GetAllStudents)
StudentRoutes.get('/email/:email',GetStudentByEmail);
StudentRoutes.delete('/email/:email',DeleteQuestionByEmail);
StudentRoutes.post('/addstudentquestion', PostAStudent);
StudentRoutes.post('/submitquestion', SubmitTest);
StudentRoutes.delete('/deleteQuestion/:id', DeleteAQuestion);
StudentRoutes.get('/:path/name/:name/:questionpath',GetAQuestionByPathAndName)
StudentRoutes.get('/last/:path/name/:name/:questionpath',GetLastQuestionByPathAndName)
StudentRoutes.patch('/time',PostTime);
StudentRoutes.get('/report/:path',GetQuestionsByPathAndStatus);
module.exports = StudentRoutes;