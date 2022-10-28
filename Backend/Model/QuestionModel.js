const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
var ObjectId = require('mongoose').Types.ObjectId;
const QuestionSchema = new Schema({
    Path: {
        type: String,
        required: true
    },
    QuestionType: {
        type: String,
        required: true
    },
    QuestionTime: {
        type: Number
        },
    QuestionName: {
        type: String,
        required: true
    },
    QuestionPoint: {
        type: Number,
        required: true
    },
    QuestionBody: {
        type:String,
        required: true,
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
        required: true,
        validate:{
            validator : function(array) {
                return array.length < 4;
              }
        }
    }
}, {timestamps: true});


// Find all Questions
QuestionSchema.statics.FindAllQuestions = async function(){
const Questions = await this.find({});
if(Questions.length <= 0){
    throw Error("No Question Available ");
}
console.log(Questions);
return Questions;
}

// Find Question By Id
QuestionSchema.statics.FindAQuestionById = async function(_id){
if(!ObjectId.isValid(_id)){
    throw Error("Invalid Id")
}
const Question = await this.findById(_id);
if(!Question){
    throw Error("Id does not Exist");
}
return Question;
}

// Find Question By name
QuestionSchema.statics.FindAQuestionByName = async function(path,name,index){
let TotalPoint = 0;
const Questions = await this.find({QuestionName: name, Path: path}).limit(1).skip(index);
const QuestionLength = await this.find({QuestionName: name}).count()
const Question = await this.find({QuestionName: name});
for(let i = 0; i < Question.length; i++){
    TotalPoint += Question[i].QuestionPoint;
}
if(Questions.length < 1){
    throw Error("Question Name does not Exist");
}
return {Questions,QuestionLength,TotalPoint}
}

 

// Post  AQuestion
QuestionSchema.statics.PostAQuestion = async function(body){


            // Validate Question Type
       if(body.QuestionType === undefined){
        throw Error("Question Type Cannot be Empty")
    }

        if(!body.QuestionName){
            throw Error("Question Name is required");
        }

        if(!body.QuestionPoint){
            throw Error("Question Point is required");
        }
    
        // Validate Question Body
        if(!body.QuestionBody){
            throw Error("Question Body is required")
        } 
                 
       
       // Validate Question Answer Options
       if(body.QuestionAnswers === undefined){
        throw Error("Question Answer is required");
       }
        
       if(body.QuestionAnswers.length < 1){
        throw Error("Question Answer is Required");
       }
       
       

// Save Question to database
const response = await this.create(body);

    if(!response){
        throw Error("All feilds are required");
    }
    return response;
}

// Post Multiple Questions
QuestionSchema.statics.PostMultipleQuestions = async function(body){
    const response = "Successfully Uploaded";

    // Check  For any Error before saving to database
    for(let i = 0; i < body.length; i++) {

        // Validate Question Body
        if(!body[i].QuestionBody){
            throw Error("Question body cannot be empty")
        }

        if(!body[i].QuestionName){
            throw Error("Question Name is required");
        }

        if(!body[i].QuestionPoint){
            throw Error("Question Point is required");
        }

        const User = await this.findOne({Path:body[i].Path, QuestionName:body[i].QuestionName,QuestionBody:body[i].QuestionBody});
        if(User){
            throw Error("Question already exist in database");
        } 

      // Validate Question Type
      if(body[i].QuestionType === undefined){
        throw Error("Question Type Cannot be Empty")
    }


        // Validate Question Body
        if(!body[i].QuestionBody){
            throw Error("Question Body is required")
        }
        const QuestionBody = await this.findOne({QuestionBody:body[i].QuestionBody});
        if(QuestionBody){
            throw Error("Question already exist in database");
        }        
       
       // Validate Question Answer Options
       if(body[i].QuestionAnswers === undefined){
        throw Error("Question Answer is required");
       }
       if(body[i].QuestionAnswers.length < 1){
        throw Error("Question Answer is Required");
       }
}

// Save the Questions to database
for(let j = 0; j < body.length; j++){
    const question = await this.create(body[j]);
    if(!question){
        throw Error("All feilds are required");
    }
}
    return response;
}

// Delete a question
QuestionSchema.statics.DeleteAQuestion = async function(id){
const response = await this.findById(id);
if(!response){
    throw Error("Invalid Id");
}
const deletes = await this.deleteOne({_id: id});
return deletes;
}

// Update a question
QuestionSchema.statics.UpdateAQuestion = async function(_id,body){
    const response = await this.findById(_id);
 
               
            
           if(body.QuestionAnswers.length > body.QuestionAnswerOptions.length){
               throw Error("Question Answer should not be more than or equal to Question Answer Options");
           }
           if(body.QuestionAnswers.length < 1){
            throw Error("Question Answer is Required");
           }
    if(!response){
        throw Error("Invalid Id");
    }
    const updates = await this.findByIdAndUpdate(_id,body);
    return updates;
}

// Send Email
QuestionSchema.statics.SendEmail = async function(body){
     const Path = body.Path;  
     const QuestionName = body.QuestionName; 
     const Url = `${Path}/${QuestionName}`
        var EmailSent = true
    const questionpath = QuestionName.split('/')[0];
    const questionname  = QuestionName.split('/')[1];
    const filter = {
        QuestionName: questionname,
        Path: questionpath
    } 
     
    let response = '';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'olasunkanmiusman1111@gmail.com',
      pass: process.env.PASS 
    }
  });


  ejs.renderFile(__dirname +  "/../view/index.ejs", {Url: Url}, async (err,data) => {
    if(err){
        console.log(err);
        await this.deleteMany(filter); 
        response += "Error with sending Email" 
    }
    else{
        const mailOptions = {
            from: 'AutoProctor@Socratease.com',
            to: body.email,
            subject: '[AutoProctor] Test Created',
            html:   data
          };
        
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.log("error" + error);
              await this.deleteMany(filter); 
              response += "Error with sending Email"
            } else {
              console.log('Email sent: ' + info.response);
              response += "No Error with sending Email"
            }
          });
    }
  })
  console.log(response)
  return response;
}

const QuestionModel = mongoose.model("Socratease Quiz",QuestionSchema);
module.exports = QuestionModel;