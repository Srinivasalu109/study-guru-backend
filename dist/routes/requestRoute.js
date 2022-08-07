"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestController_1 = require("../controllers/requestController");
const express_1 = __importDefault(require("express"));
const requestRouter = express_1.default.Router();
requestRouter.get("/getBooks/:subject", requestController_1.getBooks);
requestRouter.get("/getUniversities/:category", requestController_1.getUniversities);
requestRouter.get("/getBooksByUniversity/:universityId/:subject", requestController_1.getBooksByUniversity);
requestRouter.get("/getEvents/:branch", requestController_1.getEvents);
requestRouter.get("/getBook/:bookId", requestController_1.getBook);
// requestRouter.get("/getTopics", getTopics);
requestRouter.get("/getQuestions/:chapterId/:num/:problemType", requestController_1.getQuestions);
requestRouter.get("/getSolution/:questionId", requestController_1.getSolution);
requestRouter.get("/solved/:questionId/:email", requestController_1.solved);
requestRouter.get("/markQuestion/:questionId/:email", requestController_1.markQuestion);
requestRouter.get("/register", requestController_1.register);
exports.default = requestRouter;
//# sourceMappingURL=requestRoute.js.map