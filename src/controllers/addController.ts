import Book from "../models/bookModel";
import University from "../models/universityModel";
import Chapter from "../models/chapterModel";
// import Topic from "../models/topicModel";
import Question from "../models/questionModel";
import Event from "../models/eventModel";

const addBook = async (req, res) => {
  const {
    bookId,
    bookName,
    bookImgURL,
    author,
    subject,
    branch,
    volume,
    description,
  } = req.body;
  console.log(req.body);
  try {
    const book = await Book.findOne({ bookId });
    if (book) return res.status(400).json({ message: "Book already exists" });
    await Book.create({
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
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const addUniversity = async (req, res) => {
  const {
    universityId,
    universityName,
    universityType,
    universityImgURL,
    state,
    city,
    branch,
    nirf,
  } = req.body;

  try {
    const university = await University.findOne({ universityId });
    if (university)
      return res.status(400).json({ message: "University already exists" });
    await University.create({
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
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const addChapter = async (req, res) => {
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

    const book = await Book.find({});

    for (let i = 0; i < book.length; i++) {
      for (let j = 0; j < book[i].chapters.length; j++) {
        await Chapter.updateMany(
          {},
          {
            $addToSet: {
              chapters: {
                bookId: book[i].bookId,
                chapterId: book[i].chapters[j].chapterId,
                subject: book[i].subject,
                chapterName: book[i].chapters[j].chapterName,
              },
            },
          }
        );
      }
    }

    res.status(201).json({ msg: "sucessfully inserted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

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

const addTopic = async (req, res) => {
  const { bookId, chapterId, topicId, topicName } = req.body;
  try {
    const book = await Book.findOne({ bookId });
    if (!book) return res.status(400).json({ message: "book not exists" });

    const chapter = await Chapter.findOne({ chapterId });
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

    await Chapter.updateOne(
      { bookId, chapterId },
      {
        $addToSet: {
          topics: {
            topicId,
            topicName,
          },
        },
      }
    );
    res.status(201).json({ msg: "sucessfully inserted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const addQuestion = async (req, res) => {
  const {
    bookId,
    chapterId,
    subject,
    // topicId,
    questionId,
    question,
    anwser,
    option1,
    option2,
    option3,
    option4,
    solution,
  } = req.body;

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
    const quest = await Question.findOne({ questionId });
    if (quest) return res.status(400).json({ message: "Topic already exists" });
    await Question.create({
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
      await Question.updateOne(
        { questionId },
        {
          $addToSet: {
            options: {
              option: options[i],
            },
          },
        }
      );
    }
    res.status(201).json({ msg: "sucessfully inserted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const addUniversityToBook = async (req, res) => {
  const {
    bookId,
    universityId,
    universityName,
    universityType,
    universityImgURL,
    state,
    city,
    branch,
    nirf,
  } = req.body;
  console.log(
    bookId,
    universityId,
    universityName,
    universityType,
    universityImgURL,
    state,
    city,
    branch,
    nirf
  );

  try {
    const book = await Book.findOne({ bookId });

    if (!book) return res.status(400).json({ message: "Book not exists" });

    await Book.updateOne(
      { bookId },
      {
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
      }
    );
    res.status(201).json({ msg: "sucessfully inserted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const addBookToUniversity = async (req, res) => {
  const {
    universityId,
    bookId,
    bookName,
    bookImgURL,
    branch,
    subject,
    author,
    volume,
    description,
  } = req.body;
  try {
    const university = await University.findOne({ universityId });
    if (!university)
      return res.status(400).json({ message: "University not exists" });
    await University.updateOne(
      { universityId },
      {
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
      }
    );
    res.status(201).json({ msg: "sucessfully inserted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const addEvent = async (req, res) => {
  const { eventId, eventName, time, universityName, location, branch } =
    req.body;
  try {
    const event = await Event.findOne({ eventId });
    if (event) return res.status(400).json({ message: "Event already exists" });
    await Event.create({
      eventId,
      eventName,
      time,
      universityName,
      location,
      branch,
    });
    res.status(201).json({ msg: "sucessfully inserted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const addSolved = (req, res) => {
};

export {
  addBook,
  addUniversity,
  addChapter,
  addTopic,
  addQuestion,
  addUniversityToBook,
  addBookToUniversity,
  addEvent,
};
