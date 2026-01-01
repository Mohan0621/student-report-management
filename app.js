import express from 'express';
import Path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import subject from './routes/subject.js'; 
import student from './routes/student.js';
import mark from './routes/mark.js';
import sessions from 'express-session';
app.use(sessions({
    secret:"mohan",
    resave:false,
    saveUninitalized:true,
}));import { requireLogin, requireAdmin, requireStudent } from "./middleware/authMiddleware.js";

app.use("/admin", requireAdmin);     
app.use("/student", requireAdmin); 
app.use("/subject", requireAdmin);   
app.use("/mark", requireAdmin);     
app.use("/report", requireStudent);   

import auth from './routes/auth.js';
app.use("/auth",auth);
dotenv.config();
import db from './config/db.js'
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
(async()=>{
    try {
        const [rows]=await db.query("select 1");
        console.log("Database connected successfully");
    }catch(error){
        console.error("Database connection failed:",error.message);
        console.warn("Server will continue running without database connection");
    }
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, 'views')); 
app.use(express.static(Path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.send("hello this is mohan");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
