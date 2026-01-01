import express from "express";
import { getstudentreport } from "../controllers/reportController.js";

const report = express.Router();

report.get("/:student_id", getstudentreport);

export default report;
