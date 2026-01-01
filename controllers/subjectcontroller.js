import db from "../config/db.js";

// LIST SUBJECTS
export const listsubjects = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM subjects");
        res.render("pages/subjects/list", { subjects: rows });
    } catch (err) {
        console.log(err);
        res.send("Error loading subjects");
    }
};

// SHOW ADD PAGE
export const showaddsubjectpage = (req, res) => {
    res.render("pages/subjects/add");
};

// ADD SUBJECT
export const addsubject = async (req, res) => {
    const { subject_name, class_name } = req.body;

    await db.query(
        "INSERT INTO subjects (subject_name, class) VALUES (?, ?)",
        [subject_name, class_name]
    );

    res.redirect("/subjects");
};

// SHOW EDIT PAGE
export const showeditsubjectpage = async (req, res) => {
    const id = req.params.id;

    const [rows] = await db.query("SELECT * FROM subjects WHERE id = ?", [id]);

    if (rows.length === 0) {
        return res.send("Subject not found");
    }

    res.render("pages/subjects/edit", { subject: rows[0] });
};

// EDIT SUBJECT
export const editsubject = async (req, res) => {
    const id = req.params.id;
    const { subject_name, class_name } = req.body;

    await db.query(
        "UPDATE subjects SET subject_name=?, class=? WHERE id=?",
        [subject_name, class_name, id]
    );

    res.redirect("/subjects");
};

// DELETE SUBJECT
export const deletesubject = async (req, res) => {
    const id = req.params.id;

    await db.query("DELETE FROM subjects WHERE id=?", [id]);

    res.redirect("/subjects");
};

