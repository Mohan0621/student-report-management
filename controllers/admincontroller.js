import db from "../config/db.js";

export const dashboard = async (req, res) => {
    try {

        // Count students
        const [studentsCount] = await db.query(
            "SELECT COUNT(*) AS total_students FROM students"
        );

        // Count subjects
        const [subjectsCount] = await db.query(
            "SELECT COUNT(*) AS total_subjects FROM subjects"
        );

        // Count marks (optional)
        const [marksCount] = await db.query(
            "SELECT COUNT(*) AS total_marks FROM marks"
        );

        // Latest 5 students
        const [latestStudents] = await db.query(`
            SELECT s.id, u.username, s.class, s.roll_no
            FROM students s
            JOIN users u ON s.user_id = u.id
            ORDER BY s.id DESC
            LIMIT 5
        `);

        // Render Dashboard
        res.render("pages/dashboard/admin", {
            title: "Dashboard",
            total_students: studentsCount[0].total_students,
            total_subjects: subjectsCount[0].total_subjects,
            total_marks: marksCount[0].total_marks,
            latest_students: latestStudents
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading dashboard");
    }
};

