"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEvent = exports.addBookToUniversity = exports.addUniversityToBook = exports.addQuestion = exports.addTopic = exports.addChapter = exports.addUniversity = exports.addBook = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const universityModel_1 = __importDefault(require("../models/universityModel"));
const chapterModel_1 = __importDefault(require("../models/chapterModel"));
// import Topic from "../models/topicModel";
const questionModel_1 = __importDefault(require("../models/questionModel"));
const eventModel_1 = __importDefault(require("../models/eventModel"));
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, bookName, bookImgURL, author, subject, branch, volume, description, } = req.body;
    console.log(req.body);
    try {
        const book = yield bookModel_1.default.findOne({ bookId });
        if (book)
            return res.status(400).json({ message: "Book already exists" });
        yield bookModel_1.default.create({
            bookId,
            bookName,
            bookImgURL,
            author,
            branch,
            subject,
            volume,
            description,
        });
        res.status(201).json({ msg: "sucessfully inserted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.addBook = addBook;
const addUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { universityId, universityName, universityType, universityImgURL, state, city, branch, nirf, } = req.body;
    try {
        const university = yield universityModel_1.default.findOne({ universityId });
        if (university)
            return res.status(400).json({ message: "University already exists" });
        yield universityModel_1.default.create({
            universityId,
            universityName,
            universityType,
            universityImgURL,
            state,
            city,
            branch,
            nirf,
        });
        res.status(201).json({ msg: "sucessfully inserted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.addUniversity = addUniversity;
const addChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { bookId, chapterId, chapterName, subject } = req.body;
    try {
        // const book = await Book.findOne({ bookId });
        // if (!book) return res.status(400).json({ message: "Book not exists" });
        // const chapter = await Chapter.findOne({ chapterId });
        // if (chapter)
        //   return res.status(400).json({ message: "Chapter already exists" });
        // console.log(chapter);
        // await Chapter.create({
        //   bookId,
        //   chapterId,
        //   chapterName,
        // });
        const book = yield bookModel_1.default.find({});
        for (let i = 0; i < book.length; i++) {
            for (let j = 0; j < book[i].chapters.length; j++) {
                yield chapterModel_1.default.updateMany({}, {
                    $addToSet: {
                        chapters: {
                            bookId: book[i].bookId,
                            chapterId: book[i].chapters[j].chapterId,
                            subject: book[i].subject,
                            chapterName: book[i].chapters[j].chapterName,
                        },
                    },
                });
            }
        }
        res.status(201).json({ msg: "sucessfully inserted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.addChapter = addChapter;
// const addTopicToChapter = async (req, res) => {
//   const { bookId, chapterId, topicId, topicName, totalNoQuestions } = req.body;
//   try {
//     await Chapter.updateOne(
//       { bookId, chapterId },
//       {
//         $addToSet: {
//           topics: {
//             topicId,
//             topicName,
//           },
//         },
//       }
//     );
//     res.status(201).json({ msg: "sucessfully inserted" });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//     console.log(error);
//   }
// };
const addTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, chapterId, topicId, topicName } = req.body;
    try {
        const book = yield bookModel_1.default.findOne({ bookId });
        if (!book)
            return res.status(400).json({ message: "book not exists" });
        const chapter = yield chapterModel_1.default.findOne({ chapterId });
        if (!chapter)
            return res.status(400).json({ message: "chapter not exists" });
        // const topic = await Topic.findOne({ bookId, chapterId, topicId });
        // if (topic) return res.status(400).json({ message: "Topic already exists" });
        // await Topic.create({
        //   bookId,
        //   chapterId,
        //   topicId,
        //   topicName,
        // });
        yield chapterModel_1.default.updateOne({ bookId, chapterId }, {
            $addToSet: {
                topics: {
                    topicId,
                    topicName,
                },
            },
        });
        res.status(201).json({ msg: "sucessfully inserted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.addTopic = addTopic;
const addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, chapterId, subject, 
    // topicId,
    questionId, question, anwser, option1, option2, option3, option4, solution, } = req.body;
    // const book = await Book.findOne({ bookId });
    // if (!book) return res.status(400).json({ message: "book not exists" });
    // const chapter = await Chapter.findOne({ chapterId });
    // if (!chapter) return res.status(400).json({ message: "chapter not exists" });
    // const topic = await Topic.findOne({ bookId, chapterId, topicId });
    // if (!topic) return res.status(400).json({ message: "Topic not exists" });
    // const quest = await Question.findOne({ questionId });
    // if (quest)
    //   return res.status(400).json({ message: "Question already exists" });
    try {
        console.log("celling  ");
        const quest = yield questionModel_1.default.findOne({ questionId });
        if (quest)
            return res.status(400).json({ message: "Topic already exists" });
        yield questionModel_1.default.create({
            bookId,
            chapterId,
            subject,
            // topicId,
            questionId,
            question,
            anwser,
            solution,
        });
        const options = [option1, option2, option3, option4];
        for (let i = 0; i < options.length; i++) {
            console.log(options[i]);
            yield questionModel_1.default.updateOne({ questionId }, {
                $addToSet: {
                    options: {
                        option: options[i],
                    },
                },
            });
        }
        res.status(201).json({ msg: "sucessfully inserted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.addQuestion = addQuestion;
const addUniversityToBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, universityId, universityName, universityType, universityImgURL, state, city, branch, nirf, } = req.body;
    console.log(bookId, universityId, universityName, universityType, universityImgURL, state, city, branch, nirf);
    try {
        const book = yield bookModel_1.default.findOne({ bookId });
        if (!book)
            return res.status(400).json({ message: "Book not exists" });
        yield bookModel_1.default.updateOne({ bookId }, {
            $addToSet: {
                preparedFor: {
                    universityId,
                    universityName,
                    universityType,
                    universityImgURL,
                    state,
                    city,
                    branch,
                    nirf,
                },
            },
        });
        res.status(201).json({ msg: "sucessfully inserted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.addUniversityToBook = addUniversityToBook;
const addBookToUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { universityId, bookId, bookName, bookImgURL, branch, subject, author, volume, description, } = req.body;
    try {
        const university = yield universityModel_1.default.findOne({ universityId });
        if (!university)
            return res.status(400).json({ message: "University not exists" });
        yield universityModel_1.default.updateOne({ universityId }, {
            $addToSet: {
                bookPreferred: {
                    bookId,
                    bookName,
                    bookImgURL,
                    branch,
                    subject,
                    author,
                    volume,
                    description,
                },
            },
        });
        res.status(201).json({ msg: "sucessfully inserted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.addBookToUniversity = addBookToUniversity;
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, eventName, time, universityName, location, branch } = req.body;
    try {
        const event = yield eventModel_1.default.findOne({ eventId });
        if (event)
            return res.status(400).json({ message: "Event already exists" });
        yield eventModel_1.default.create({
            eventId,
            eventName,
            time,
            universityName,
            location,
            branch,
        });
        res.status(201).json({ msg: "sucessfully inserted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.addEvent = addEvent;
const addSolved = (req, res) => {
};
//# sourceMappingURL=addController.js.map