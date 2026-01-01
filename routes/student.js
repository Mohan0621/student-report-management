import express from "express";
import { 
    liststudents, 
    showaddstudentspage, 
    addstudent, 
    showeditstudentspage, 
    editstudents, 
    deletestudent,
    viewsinglestudent 
} from "../controllers/studentController.js";

const student = express.Router();

student.get("/", liststudents);
student.get("/add", showaddstudentspage);
student.post("/add", addstudent);
student.get("/edit/:id", showeditstudentspage);
student.put("/edit/:id", editstudents);
student.delete("/delete/:id", deletestudent);
student.get("/viewsinglestudent", viewsinglestudent)
export default student;
