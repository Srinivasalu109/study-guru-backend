import mongoose from "mongoose";

const preparedForSchema = new mongoose.Schema({
  universityId: { type: String },
  universityName: { type: String },
});

const bookSchemas = new mongoose.Schema({
  bookId: { type: String },
  bookName: { type: String, required: true },
  bookImgURL: { type: String, required: true },
  author: { type: String, required: true },
  branch: { type: String, required: true },
  subject: { type: String, required: true },
  volume: { type: String },
  description: { type: String },
  chapters: {
    type: [
      {
        chapterId: { type: String },
        chapterName: { type: String },
      },
    ],
  },
  preparedFor: {
    type: [
      {
        universityId: { type: String },
        universityName: { type: String },
        universityType: { type: String },
        universityImgURL: { type: String },
        state: { type: String },
        city: { type: String },
        nirf: { type: String },
        branch: { type: String },
      },
    ],
  },
});

var Book = mongoose.model("BookSchemas", bookSchemas);

export default Book;
