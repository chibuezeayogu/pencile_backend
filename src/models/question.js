import { Schema, model } from 'mongoose';

const Question = model('Question', new Schema (
  {
    _id: { 
      type: Number,
      require: [true, 'Question is required'] 
    },
    annotations: [
      {
        type: String,
        index: true,
        lowercase: true,
        default: []
      }
    ]
  }))

export default Question;
