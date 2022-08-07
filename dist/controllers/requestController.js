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
exports.register = exports.markQuestion = exports.solved = exports.getSolution = exports.getQuestions = exports.getBook = exports.getEvents = exports.getBooksByUniversity = exports.getUniversities = exports.getBooks = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const universityModel_1 = __importDefault(require("../models/universityModel"));
// import Topic from "../models/topicModel";
const questionModel_1 = __importDefault(require("../models/questionModel"));
const eventModel_1 = __importDefault(require("../models/eventModel"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject } = req.params;
    console.log("hey");
    try {
        const books = yield bookModel_1.default.find({ subject });
        res.status(201).json(books);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getBooks = getBooks;
const getUniversities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    try {
        const universities = yield universityModel_1.default.find({ universityType: category });
        res.status(201).json(universities);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getUniversities = getUniversities;
const getBooksByUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { universityId, subject } = req.params;
    console.log(universityId);
    try {
        const books = yield universityModel_1.default.findOne({ universityId });
        const filterBooks = books.bookPreferred.filter((book) => book.subject === subject);
        res.status(201).json({ bookPreferred: filterBooks });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getBooksByUniversity = getBooksByUniversity;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branch } = req.params;
    try {
        const events = yield eventModel_1.default.findOne({ branch });
        res.status(201).json({ events });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getEvents = getEvents;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    console.log(bookId);
    try {
        const book = yield bookModel_1.default.findOne({ bookId });
        res.status(201).json({ book });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getBook = getBook;
// const getTopics = async (req, res) => {
//   const { bookId, chapterId } = req.params;
//   try {
//     const chapter = await Chapter.findOne({ bookId, chapterId });
//     res.status(201).json({ topics: chapter.topics });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//     console.log(error);
//   }
// };
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("celled em...");
    const { chapterId, num, problemType, email } = req.params;
    console.log(chapterId);
    try {
        const q = yield questionModel_1.default.find({ chapterId });
        console.log(q);
        if (problemType === "Unsolved") {
            let questions = [];
            for (let i = 0; i < q.length; i++) {
                const fillQue = (_a = q[i].solvedBy) === null || _a === void 0 ? void 0 : _a.filter((unq) => unq.email === email);
                if (!fillQue.length) {
                    questions.push(q[i]);
                }
            }
            return res.status(201).json({ que: questions[num], numofque: q.length });
        }
        if (problemType === "Solved") {
            let questions = [];
            for (let i = 0; i < q.length; i++) {
                const fillQue = (_b = q[i].solvedBy) === null || _b === void 0 ? void 0 : _b.filter((unq) => unq.email === email);
                if (fillQue.length) {
                    questions.push(q[i]);
                }
            }
            return res.status(201).json({ que: questions[num], numofque: q.length });
        }
        if (problemType === "Marked") {
            let questions = [];
            for (let i = 0; i < q.length; i++) {
                const fillQue = q[i].markedBy.filter((unq) => unq.email === email);
                if (fillQue.length) {
                    questions.push(q[i]);
                }
                return res
                    .status(201)
                    .json({ que: fillQue[num], numofque: fillQue.length });
            }
        }
        // res.status(201).json({ que: q[num], numofque: q.length });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getQuestions = getQuestions;
const getSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    console.log("calling...");
    try {
        const question = yield questionModel_1.default.findOne({
            questionId,
        });
        res.status(201).json({ solution: question.solution });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getSolution = getSolution;
const solved = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("solved");
    const { questionId, email } = req.params;
    console.log("questionId", questionId);
    try {
        yield questionModel_1.default.updateOne({ questionId }, {
            $addToSet: {
                solvedBy: {
                    email,
                },
            },
        });
        res.status(201).json({ msg: "marked sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.solved = solved;
const markQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId, email } = req.body;
    try {
        yield questionModel_1.default.updateOne({ questionId }, {
            $addToSet: {
                markedBy: {
                    email,
                },
            },
        });
        res.status(201).json({ msg: "marked sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.markQuestion = markQuestion;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email } = req.body;
    try {
        const reg = yield bookModel_1.default.findOne({ email });
        if (reg)
            return res
                .status(400)
                .json({ message: "already registered with this mail" });
        yield bookModel_1.default.create({
            userName,
            email,
        });
        res.status(201).json({ msg: "registered sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.register = register;
//# sourceMappingURL=requestController.js.map