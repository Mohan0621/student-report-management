import db from "../config/db.js";

// LIST MARKS
export const markslist = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM marks");
    res.render("pages/marks/list", { marks: rows });
};

// SHOW ADD PAGE
export const showaddmarkspage = async (req, res) => {
    // Also fetch students & subjects for dropdowns
    const [students] = await db.query("SELECT * FROM students");
    const [subjects] = await db.query("SELECT * FROM subjects");

    res.render("pages/marks/add", { students, subjects });
};

// ADD MARK
export const addmarks = async (req, res) => {
    const { student_id, subject_id, marks_obtained, total_marks, test_name } = req.body;

    await db.query(
        "INSERT INTO marks (student_id, subject_id, marks_obtained, total_marks, test_name) VALUES (?, ?, ?, ?, ?)",
        [student_id, subject_id, marks_obtained, total_marks, test_name]
    );

    res.redirect("/marks");
};

// SHOW EDIT PAGE
export const showeditmarkspage = async (req, res) => {
    const id = req.params.id;

    const [markRows] = await db.query("SELECT * FROM marks WHERE id=?", [id]);
    const [students] = await db.query("SELECT * FROM students");
    const [subjects] = await db.query("SELECT * FROM subjects");

    if (markRows.length === 0) {
        return res.send("Mark not found");
    }

    res.render("pages/marks/edit", {
        mark: markRows[0],
        students,
        subjects
    });
};

// UPDATE MARKS
export const editmarks = async (req, res) => {
    const id = req.params.id;
    const { student_id, subject_id, marks_obtained, total_marks, test_name } = req.body;

    await db.query(
        "UPDATE marks SET student_id=?, subject_id=?, marks_obtained=?, total_marks=?, test_name=? WHERE id=?",
        [student_id, subject_id, marks_obtained, total_marks, test_name, id]
    );

    res.redirect("/marks");
};

// DELETE MARK
export const deletemarks = async (req, res) => {
    const id = req.params.id;
    await db.query("DELETE FROM marks WHERE id=?", [id]);
    res.redirect("/marks");
};
