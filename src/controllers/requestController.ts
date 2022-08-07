import Book from "../models/bookModel";
import University from "../models/universityModel";
import Chapter from "../models/chapterModel";
// import Topic from "../models/topicModel";
import Question from "../models/questionModel";
import Event from "../models/eventModel";

const getBooks = async (req, res) => {
  const { subject } = req.params;
  console.log("hey");
  try {
    const books = await Book.find({ subject });
    res.status(201).json(books);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getUniversities = async (req, res) => {
  const { category } = req.params;

  try {
    const universities = await University.find({ universityType: category });
    res.status(201).json(universities);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getBooksByUniversity = async (req, res) => {
  const { universityId, subject } = req.params;
  console.log(universityId);
  try {
    const books = await University.findOne({ universityId });
    const filterBooks = books.bookPreferred.filter(
      (book) => book.subject === subject
    );
    res.status(201).json({ bookPreferred: filterBooks });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getEvents = async (req, res) => {
  const { branch } = req.params;
  try {
    const events = await Event.findOne({ branch });
    res.status(201).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getBook = async (req, res) => {
  const { bookId } = req.params;
  console.log(bookId);
  try {
    const book = await Book.findOne({ bookId });
    res.status(201).json({ book });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

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

const getQuestions = async (req, res) => {
  console.log("celled em...");
  const { chapterId, num, problemType, email } = req.params;
  console.log("email", email);

  try {
    const q = await Question.find({ chapterId });
    // console.log(q);
    if (problemType === "Unsolved") {
      let questions = [];

      for (let i = 0; i < q.length; i++) {
        const fillQue = q[i].solvedBy?.filter((unq) => {
          console.log(unq.email, email);
          return unq.email === email;
        });
        console.log("fillQue", fillQue);
        if (fillQue.length === 0) {
          questions.push(q[i]);
        }
        console.log(questions);
      }
      return res
        .status(201)
        .json({ que: questions[num], numofque: questions.length });
    }
    if (problemType === "Solved") {
      let questions = [];
      for (let i = 0; i < q.length; i++) {
        const fillQue = q[i].solvedBy?.filter((unq) => unq.email === email);
        if (fillQue.length) {
          questions.push(q[i]);
        }
      }
      return res
        .status(201)
        .json({ que: questions[num], numofque: questions.length });
    }
    if (problemType === "Marked") {
      let questions = [];

      for (let i = 0; i < q.length; i++) {
        const fillQue = q[i].markedBy.filter((unq) => unq.email === email);
        if (fillQue.length) {
          questions.push(q[i]);
        }
      }
      return res
        .status(201)
        .json({ que: questions[num], numofque: questions.length });
    }
    // res.status(201).json({ que: q[num], numofque: q.length });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getSolution = async (req, res) => {
  const { questionId } = req.params;
  console.log("calling...");
  try {
    const question = await Question.findOne({
      questionId,
    });
    res.status(201).json({ solution: question.solution });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const solved = async (req, res) => {
  console.log("solved");
  const { questionId, email } = req.params;
  console.log("questionId", questionId);
  try {
    await Question.updateOne(
      { questionId },
      {
        $addToSet: {
          solvedBy: {
            email,
          },
        },
      }
    );
    res.status(201).json({ msg: "marked sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const markQuestion = async (req, res) => {
  console.log("marking");
  const { questionId, email } = req.body;
  console.log(questionId, email);
  console.log(questionId);
  try {
    await Question.updateOne(
      { questionId },
      {
        $addToSet: {
          markedBy: {
            email,
          },
        },
      }
    );
    res.status(201).json({ msg: "marked sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const register = async (req, res) => {
  const { userName, email } = req.body;

  try {
    const reg = await Book.findOne({ email });
    if (reg)
      return res
        .status(400)
        .json({ message: "already registered with this mail" });
    await Book.create({
      userName,
      email,
    });
    res.status(201).json({ msg: "registered sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export {
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
};
