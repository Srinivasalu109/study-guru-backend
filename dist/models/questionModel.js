"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
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
var Question = mongoose_1.default.model("QuestionSchema", questionSchema);
exports.default = Question;
//# sourceMappingURL=questionModel.js.map