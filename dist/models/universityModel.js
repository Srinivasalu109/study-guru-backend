"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookPreferredSchema = new mongoose_1.default.Schema({
    bookId: { type: String },
    bookName: { type: String },
    about: { type: String },
});
const universitySchema = new mongoose_1.default.Schema({
    universityId: { type: String },
    universityName: { type: String, required: true },
    universityType: { type: String, required: true },
    universityImgURL: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, },
    branch: { type: String, required: true },
    nirf: { type: String },
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
var University = mongoose_1.default.model("UniversitySchema", universitySchema);
exports.default = University;
//# sourceMappingURL=universityModel.js.map