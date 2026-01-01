import express from "express";
import { login, register, showLoginPage, showRegisterPage } from "./controllers/authController.js";

const auth = express.Router();

auth.get("/login", showLoginPage);
auth.post("/login", login);

auth.get("/register", showRegisterPage);
auth.post("/register", register);

export default auth;
