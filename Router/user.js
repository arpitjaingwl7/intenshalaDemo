import express from "express";
import { homePage, login, signup  , internshipApply,  verifyToken } from "../Controller/user.js";

let userRouter = express.Router();

userRouter.get("/allInternship", homePage).post("/login", login).post("/signup", signup)
.post('/apply/:id',verifyToken, internshipApply);

export default userRouter;



