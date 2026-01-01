import express from "express";
import {
    listsubjects,
    showaddsubjectpage,
    addsubject,
    showeditsubjectpage,
    editsubject,
    deletesubject
} from "./controllers/subjectController.js";

const subject = express.Router();

subject.get("/", listsubjects);
subject.get("/add", showaddsubjectpage);
subject.post("/add", addsubject);
subject.get("/edit/:id", showeditsubjectpage);
subject.post("/edit/:id", editsubject);
subject.get("/delete/:id", deletesubject);

export default subject;
