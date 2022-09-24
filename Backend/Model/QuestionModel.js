const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const QuestionSchema = new Schema({
    QuestionType: {
        type: String,
        required: true
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
},{timestamps: true});


// Find all Questions
QuestionSchema.statics.FindAllQuestions = async function(){
const Questions = await this.find({});
if(Questions.length <= 0){
    throw Error("No Question Available ");
}
console.log(Questions);
return Questions;
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
        const QuestionBody = await this.findOne({QuestionBody:body.QuestionBody});
        const QuestionName = await this.findOne({QuestionName:body.QuestionName});
        if(QuestionBody && QuestionName){
            throw Error("Question already exist in database");
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

 const Question = await this.findOne({QuestionBody:body[i].QuestionBody});
 if(Question){
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

const QuestionModel = mongoose.model("Socratease Quiz",QuestionSchema);
module.exports = QuestionModel;