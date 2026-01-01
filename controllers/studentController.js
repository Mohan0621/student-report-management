import db from "../config/db.js";
export const liststudents = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM students");
    res.render("pages/students/list", { students: rows });
};
export const showaddstudentspage = (req, res) => {
    res.render("pages/students/add");
};
export const addstudent = async (req, res) => {
    const { user_id, class: studentClass, roll_no, parent_contact } = req.body;

    await db.query(
        "INSERT INTO students (user_id, class, roll_no, parent_contact) VALUES (?, ?, ?, ?)",
        [user_id, studentClass, roll_no, parent_contact]
    );

    res.redirect("/students");
};

export const showeditstudentspage = async (req, res) => {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

    if (rows.length === 0) {
        return res.send("Student not found");
    }

    res.render("pages/students/edit", { student: rows[0] });
};
export const editstudents = async (req, res) => {
    const id = req.params.id;
    const { user_id, class: studentClass, roll_no, parent_contact } = req.body;

    await db.query(
        "UPDATE students SET user_id=?, class=?, roll_no=?, parent_contact=? WHERE id=?",
        [user_id, studentClass, roll_no, parent_contact, id]
    );

    res.redirect("/students");
};
export const deletestudent = async (req, res) => {
    const id = req.params.id;

    await db.query("DELETE FROM students WHERE id = ?", [id]);

    res.redirect("/students");
};
export const viewsinglestudent = async (req, res) => {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [
        id,
    ]);
}