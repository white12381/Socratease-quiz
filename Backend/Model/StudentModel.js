const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    Student: {
        FullName:{
         type: String },
        Email:{
            type: String },
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
            type:  Number },
        Percentage:{
       type:  Number }
    },
    Status: {
        type: Boolean
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
        const FindStudent = await this.findOne({Student: body.Student,Question: body.Question}); 

        const Submit = await this.findOne({Status: true, Student: body.Student});
        if(Submit){
            throw Error("You no longer have access to this Test");
        }

       else if( FindStudent ){
            const QuestionSelectedAnswer = await this.findOneAndUpdate({Student: body.Student,Question: body.Question}, {QuestionSelectedAnswer: body.QuestionSelectedAnswer, QuestionTime: body.QuestionTime});  
            
           return QuestionSelectedAnswer;
        }

        else if(!FindStudent){
            console.log("not found Question and Student")
            return await this.create(body);
        }
    }


    // Find Question By name
StudentSchema.statics.GetAQuestionByPathAndName = async function(path,name,index){ 
    const Questions = await this.find({'Question.QuestionPath': path, 'Student.QuestionName': name}).limit(1).skip(index);
    const QuestionLength = await this.find({'Question.QuestionPath': path, 'Student.QuestionName': name}).count();
    
    const email = path + '@gmail.com';
    const Submit = await this.findOne({Status: true, 'Student.Email': email});
        if(Submit){
            throw Error("You no longer have access to this Test");
        }
    
    if(Questions.length < 1){
        throw Error("Question Name does not Exist");
    }
    return {Questions,QuestionLength}
    }
 

    // Post time
    StudentSchema.statics.PostTime = async function(body){
        const FindStudent = await this.findOne({Student: body.Student}); 

        const Submit = await this.findOne({Status: true, Student: body.Student});
        if(Submit){
            throw Error("You no longer have access to this Test");
        } 
          if(FindStudent){
        const time = await this.updateMany({QuestionTime: body.QuestionTime}); 
           console.log("updated time")
           return time;
          }
 
        
    }

    





    // Submit Test
    StudentSchema.statics.SubmitTest = async function(body){
        const FindStudent = await this.find(body.Student);
        var TotalPoint =  body.Student.TotalPoint;
        var ScoredPoint = 0.0;
        var Percentage = 0.0;

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

        const Submit = await this.findOne({Status: true, Student: body.Student});
        if(Submit){
            throw Error("You no longer have access to this Test");
        }
        if(FindStudent.length <= 0){
            throw Error("UnSaved Test");
        }

        await this.create(body);

            for(let i = 0; i < FindStudent.length; i++ ){
                if(compareArrays(FindStudent[i].Question.QuestionAnswers,FindStudent[i].QuestionSelectedAnswer) ){
                    ScoredPoint += FindStudent[i].Question.QuestionPoint;
                }
            }
            if(ScoredPoint === 0){
                Percentage = 0;
            }
            else{
            Percentage = (ScoredPoint / TotalPoint) * 100;
            }
            await this.deleteMany(body.Student);
            return await this.create({'Student': body.Student, Mark: {ScoredPoint: ScoredPoint, Percentage: Percentage},Status: true})
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