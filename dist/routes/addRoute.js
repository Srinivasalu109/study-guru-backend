"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addController_1 = require("../controllers/addController");
const addRouter = express_1.default.Router();
addRouter.post("/addBook", addController_1.addBook);
addRouter.post("/addUniversity", addController_1.addUniversity);
addRouter.post("/addChapter", addController_1.addChapter);
addRouter.post("/addTopic", addController_1.addTopic);
addRouter.post("/addQuestion", addController_1.addQuestion);
addRouter.post("/addUniversityToBook", addController_1.addUniversityToBook);
addRouter.post("/addBookToUniversity", addController_1.addBookToUniversity);
addRouter.post("/addEvent", addController_1.addEvent);
exports.default = addRouter;
//# sourceMappingURL=addRoute.js.map