import express from "express";
import { signin, signup } from "../controllers/userController";

const userRouter = express.Router();

userRouter.use("/signup", signup);

userRouter.use("/signin", signin);

export default userRouter;
