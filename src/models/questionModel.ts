import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  bookId: { type: String },
  chapterId: { type: String },
  subject: { type: String },
  // topicId: { type: String },
  questionId: { type: String },
  question: { type: String, required: true },
  anwser: { type: String, required: true },
  solution: { type: String, required: true },
  options: {
    type: [
      {
        option: { type: String },
      },
    ],
  },
  solvedBy: {
    type: [{ email: { type: String } }],
  },
  markedBy: {
    type: [{ email: { type: String } }],
  },
});

var Question = mongoose.model("QuestionSchema", questionSchema);

export default Question;
