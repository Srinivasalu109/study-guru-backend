import mongoose from "mongoose";

const bookPreferredSchema = new mongoose.Schema({
  bookId: { type: String },
  bookName: { type: String },
  about: { type: String },
});

const universitySchema = new mongoose.Schema({
  universityId: { type: String },
  universityName: { type: String, required: true },
  universityType: { type: String, required: true },
  universityImgURL: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String,},
  branch: { type: String, required: true },
  nirf: { type: String},
  bookPreferred: {
    type: [
      {
        bookId: { type: String },
        bookName: { type: String },
        bookImgURL: { type: String },
        author: { type: String },
        branch: { type: String },
        subject: { type: String },
        description: { type: String },
        volume: { type: String },
      },
    ],
  },
});

var University = mongoose.model("UniversitySchema", universitySchema);

export default University;
