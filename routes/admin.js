import express from "express";
import { dashboard } from "../controllers/dashboardController.js";

const admin = express.Router();

admin.get("/", dashboard);

export default admin;
