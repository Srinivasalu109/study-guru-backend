import mongoose from "mongoose";

const topicsSchema = new mongoose.Schema();

const chapterSchema = new mongoose.Schema({
  bookId: { type: String },
  chapterId: { type: String },
  subject: { type: String },
  chapterName: { type: String, required: true },
  // topics: {
  //   type: [
  //     {
  //       topicId: { type: String },
  //       topicName: { type: String },
  //     },
  //   ],
  // },
});

var Chapter = mongoose.model("ChapterSchema", chapterSchema);

export default Chapter;
