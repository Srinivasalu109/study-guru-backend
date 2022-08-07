"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const topicsSchema = new mongoose_1.default.Schema();
const chapterSchema = new mongoose_1.default.Schema({
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
var Chapter = mongoose_1.default.model("ChapterSchema", chapterSchema);
exports.default = Chapter;
//# sourceMappingURL=chapterModel.js.map