import express from "express";
import {
  addBook,
  addUniversity,
  addChapter,
  addTopic,
  addQuestion,
  addUniversityToBook,
  addBookToUniversity,
  addEvent,
} from "../controllers/addController";

const addRouter = express.Router();

addRouter.post("/addBook", addBook);

addRouter.post("/addUniversity", addUniversity);

addRouter.post("/addChapter", addChapter);

addRouter.post("/addTopic", addTopic);

addRouter.post("/addQuestion", addQuestion);

addRouter.post("/addUniversityToBook", addUniversityToBook);

addRouter.post("/addBookToUniversity", addBookToUniversity);

addRouter.post("/addEvent", addEvent);

export default addRouter;
