"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const preparedForSchema = new mongoose_1.default.Schema({
    universityId: { type: String },
    universityName: { type: String },
});
const bookSchemas = new mongoose_1.default.Schema({
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
var Book = mongoose_1.default.model("BookSchemas", bookSchemas);
exports.default = Book;
//# sourceMappingURL=bookModel.js.map