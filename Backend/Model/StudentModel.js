const ejs = require("ejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const nodemailer = require("nodemailer");

const StudentSchema = new Schema({
    Student: {
        FullName:{
         type: String },
        Email:{
            type: String },
            QuestionName: {
                type:String, 
            },
            QuestionPath: {
                type:String, 
            },
            TotalPoint: {
                type: Number },
                            questionLength: {
                type: Number }
    },
    Question: {
        QuestionType: {
            type: String, 
        },
        QuestionName: {
            type: String, 
        },
        QuestionPoint: {
            type: Number, 
        },
        QuestionBody: {
            type:String, 
        },
        QuestionPath: {
            type:String, 
        },
        QuestionAnswerOptions: {
            type: Array,
            validate:{
                validator : function(array) {
                    return array.length <= 4;
                  }
            }
    
        }, 
        QuestionAnswers: {
            type: Array, 
            validate:{
                validator : function(array) {
                    return array.length < 4;
                  }
            }
        }
    },
    QuestionSelectedAnswer: {
        type: Array, 
        validate:{
            validator : function(array) {
                return array.length < 4;
              }
        }
    },
    QuestionTime: {
        type: Number
    },
    Mark: {
        ScoredPoint:{
            type:  Number,
            default: 0
        },
        Percentage:{
       type:  Number,
        default: 0
    }
    },
    Status: {
        type: Boolean
    },
    ResultSent:{
        type: String,
        default: "No"
    }
 },{timestamps: true});


// Find all Students
StudentSchema.statics.FindAllStudents = async function(){
    const Student = await this.find({});
    if(Student.length <= 0){
        throw Error("No Student Available ");
    }
    return Student;
    }

    // Find Student by Email
    StudentSchema.statics.FindStudentByEmail = async function(email){
        const Email = await this.find({'Student.Email': email });
        if(Email.length <= 0){
            throw Error("Invalid Email");
        }
        return Email;
    }

    // Delete Student by Email
    StudentSchema.statics.DeleteStudentByEmail = async function(email){
        const Email = await this.find({'Student.Email': email });
        if(Email.length <= 0){
            throw Error("Invalid Email");
        }
        return await this.deleteMany({'Student.Email': email });
    }

    // Post Student Question and StudentDetails
    StudentSchema.statics.PostStudent = async function(body){
        const filter = {
            'Student.QuestionName': body.Student.QuestionName,
            'Student.FullName': body.Student.FullName,
            'Student.TotalPoint': body.Student.TotalPoint,
            'Student.questionLength': body.Student.questionLength,
            'Question.QuestionType': body.Question.QuestionType,
            'Question.QuestionName': body.Question.QuestionName,
            'Question.QuestionPoint': body.Question.QuestionPoint,
            'Question.QuestionBody': body.Question.QuestionBody,
            'Question.QuestionPath': body.Question.QuestionPath,
            'Student.QuestionPath': body.Student.QuestionPath

        }
        const FindStudent = await this.findOne(filter); 
        const Submit = await this.findOne({Status: true, Student: body.Student});
        if(Submit){
            throw Error("You no longer have access to this Test");
        } 

        if( FindStudent ){
            const QuestionSelectedAnswer = await this.findOneAndUpdate(filter,{QuestionSelectedAnswer: body.QuestionSelectedAnswer, QuestionTime: body.QuestionTime});     
           return QuestionSelectedAnswer;
        }

            console.log("not found Question and Student")
            return await this.create(body);
    }


    // Find Question By name                                     
StudentSchema.statics.GetAQuestionByPathAndName = async function(questionpath,name,email,index){ 
    const Questions = await this.find({'Question.QuestionPath': questionpath, 'Question.QuestionName': name, 'Student.Email': email,'Student.QuestionName': name, 'Student.QuestionPath': questionpath}).limit(1).skip(index);
    const QuestionLength = await this.find({'Question.QuestionPath': questionpath, 'Question.QuestionName': name, 'Student.Email': email,'Student.QuestionName': name, 'Student.QuestionPath': questionpath}).count();
    console.log("StudentEmail " + email); 
    const Submit = await this.find({Status: true, 'Student.Email': email,'Student.QuestionName': name, 'Student.QuestionPath': questionpath }); 
        if(Submit.length > 0){
            throw Error("You no longer have access to this Test"); 
        }
    
    if(Questions.length < 1){
        throw Error("Question Name does not Exist");
    }
    return {Questions,QuestionLength}
    }


     // Find Question By email and Status
StudentSchema.statics.GetQuestionsByPathAndStatus = async function(path){ 
    const email = path + '@gmail.com';
    const Questions = await this.find({'Student.QuestionPath': path, Status: true}).sort({createdAt: 'desc'})
    const QuestionName  = await this.find({'Student.QuestionPath': path, Status: true}).sort({createdAt: 'desc'}).distinct('Student.QuestionName');
                     
            console.log("Question by email and Status");
    if(Questions.length < 1){
        throw Error("Question Name does not Exist");
    }
    return {Questions, QuestionName};
    }


    // Find last Question                                                                        
    StudentSchema.statics.GetLastQuestionByPathAndName = async function(email,name,questionpath){
        const QuestionLength = await this.find({'Question.QuestionPath': questionpath, 'Question.QuestionName': name, 'Student.Email': email,'Student.QuestionName': name, 'Student.QuestionPath': questionpath}).count();        
    const Questions = await this.find({'Question.QuestionPath': questionpath, 'Question.QuestionName': name, 'Student.Email': email,'Student.QuestionName': name, 'Student.QuestionPath': questionpath}).limit(1).skip(QuestionLength - 1); 
    const Submit = await this.find({Status: true, 'Student.Email': email,'Student.QuestionName': name, 'Student.QuestionPath': questionpath }); 
        
            console.log(" Questionpath " + questionpath + " QuestionName " + name + " Student email " + email );
    if(Submit.length > 0){
            console.log("Error no last question");
            throw Error("You no longer have access to this Test");
        }
 
    
    if(Questions.length < 1){
        throw Error("Question Name does not Exist");
    }
    return {Questions,QuestionLength}
    }

 

    // Post time
    StudentSchema.statics.PostTime = async function(body){



        const filter = {
            'Student.QuestionName': body.Student.QuestionName,
            'Student.FullName': body.Student.FullName,
            'Student.TotalPoint': body.Student.TotalPoint,
            'Student.questionLength': body.Student.questionLength,
            'Student.QuestionPath': body.Student.QuestionPath,
             Status: true
                }

        const filterupdates = {
            'Student.QuestionName': body.Student.QuestionName,
            'Student.FullName': body.Student.FullName,
            'Student.TotalPoint': body.Student.TotalPoint,
            'Student.questionLength': body.Student.questionLength,
            'Student.QuestionPath': body.Student.QuestionPath
        }

        const FindStudent = await this.findOne(filterupdates); 

        const Submit = await this.find(filter);
        if(Submit.length > 0){
            console.log("submit",Submit);
            console.log("Body", body.Student);
            throw Error("You no longer have access to this Test");
        } 
          if(FindStudent){
        const time = await this.updateMany(filterupdates,{QuestionTime: body.QuestionTime}); 
           console.log("updated time")
           return time;
          }
 
        
    }

    





    // Submit Test
    StudentSchema.statics.SubmitTest = async function(body){ 

        const filtersubmit = {
            'Student.QuestionName': body.Student.QuestionName,
            'Student.FullName': body.Student.FullName,
            'Student.TotalPoint': body.Student.TotalPoint,
            'Student.questionLength': body.Student.questionLength,
            'Student.QuestionPath': body.Student.QuestionPath,
             Status: true
                }

        const filter = {
            'Student.QuestionName': body.Student.QuestionName,
            'Student.FullName': body.Student.FullName,
            'Student.TotalPoint': body.Student.TotalPoint,
            'Student.questionLength': body.Student.questionLength,
            'Student.QuestionPath': body.Student.QuestionPath
                }

        const FindStudent = await this.find(filter);
        var TotalPoint =  body.Student.TotalPoint;
     

        const compareArrays = (arr1, arr2) => {
            if(arr1.length !== arr2.length){
                return false
            }
            for(let i = 0; i < arr1.length; i++){
                if(arr1[i] !== arr2[i]){
                    return false;
                }
            }
            return true
        }
        console.log("body.student ", body.Student);
        const Submit = await this.findOne(filtersubmit);
        if(Submit){
            throw Error("You no longer have access to this Test");
        }
        if(FindStudent.length <= 0){
            throw Error("UnSaved Test");
        }

        let ScoredPoint = 0; 
        var Percentage = 0.0;
            for(let i = 0; i < FindStudent.length; i++ ){
                if(compareArrays(FindStudent[i].Question.QuestionAnswers,FindStudent[i].QuestionSelectedAnswer) ){
                    if((FindStudent[i].Question.QuestionPoint !== undefined)){
                    ScoredPoint += FindStudent[i].Question.QuestionPoint; 
                    }
                } 
            }  
                
            Percentage = Math.floor((ScoredPoint / TotalPoint) * 100);

            if(Number.isNaN(ScoredPoint) ){
                ScoredPoint = 0;
                Percentage = 0; 
            }
            if(Number.isNaN(Percentage) ){
                Percentage = 0;
                ScoredPoint = 0;
            }
            await this.deleteMany(filter); 
            
              const result = await this.create({'Student': body.Student, Mark: {ScoredPoint: ScoredPoint, Percentage: Percentage},Status: true});
            
            let response = '';
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'olasunkanmiusman1111@gmail.com',
                  pass: process.env.PASS 
                }
              });
            
            
              ejs.renderFile(__dirname +  "/../view/report.ejs", {Url: body.Path}, async (err,data) => {
                if(err){
                    console.log(err);  
                    response += "Error with sending Email" 
                }
                else{
                    const mailOptions = {
                        from: 'AutoProctor@Socratease.com',
                        to: `${body.Student.QuestionPath}@gmail.com`,
                        subject: '[AutoProctor] Test Report',
                        html:   data
                      };
                    
                      transporter.sendMail(mailOptions, async (error, info) => {
                        if (error) {
                          console.log("error" + error);  
                          response += "Error with sending Email"
                        } else {
                          console.log('Email sent: ' + info.response);
                          response += "No Error with sending Email"
                        }
                      });
                }
              })


            return result;
    }

    // Delete a Student
 StudentSchema.statics.DeleteAStudent = async function(id){
    const response = await this.findById(id);
    if(!response){
        throw Error("Invalid Id");
    }
    const deletes = await this.deleteOne({_id: id});
    return deletes;
    }

const StudentModel = mongoose.model("StudentModel", StudentSchema);
module.exports = StudentModel;