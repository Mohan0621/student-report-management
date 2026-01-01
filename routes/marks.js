import express from "express";
import {
    markslist,
    showaddmarkspage,
    addmarks,
    showeditmarkspage,
    editmarks,
    deletemarks
} from "../controllers/markController.js";

const mark = express.Router();

mark.get("/", markslist);
mark.get("/add", showaddmarkspage);
mark.post("/add", addmarks);
mark.get("/edit/:id", showeditmarkspage);
mark.post("/edit/:id", editmarks);
mark.get("/delete/:id", deletemarks);

export default mark;
