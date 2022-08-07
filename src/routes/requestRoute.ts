import {
  getBooks,
  getUniversities,
  getBooksByUniversity,
  getEvents,
  getBook,
  // getTopics,
  getQuestions,
  getSolution,
  solved,
  markQuestion,
  register,
} from "../controllers/requestController";

import express from "express";

const requestRouter = express.Router();

requestRouter.get("/getBooks/:subject", getBooks);

requestRouter.get("/getUniversities/:category", getUniversities);

requestRouter.get(
  "/getBooksByUniversity/:universityId/:subject",
  getBooksByUniversity
);

requestRouter.get("/getEvents/:branch", getEvents);

requestRouter.get("/getBook/:bookId", getBook);

// requestRouter.get("/getTopics", getTopics);

requestRouter.get(
  "/getQuestions/:chapterId/:num/:problemType/:email",
  getQuestions
);

requestRouter.get("/getSolution/:questionId", getSolution);

requestRouter.get("/solved/:questionId/:email", solved);

requestRouter.get("/markQuestion/:questionId/:email", markQuestion);

requestRouter.get("/register", register);
export default requestRouter;

