import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import addRouter from "./routes/addRoute";
import requestRouter from "./routes/requestRoute";

const app = express();
const PORT = 4000;
const CONNECTION_URL =
  "mongodb+srv://alla:mongosri123@cluster0.of0yk.mongodb.net/?retryWrites=true&w=majority"; 
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.use("/auth", userRouter);
app.use("/add", addRouter);
app.use("/request", requestRouter);

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
