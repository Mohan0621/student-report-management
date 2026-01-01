import db from "../config/db.js";

export const getstudentreport = async (req, res) => {
    const studentId = req.params.student_id;

    try {
        // 1️⃣ Fetch student info
        const [studentRows] = await db.query(
            `SELECT s.id, s.roll_no, s.class, u.username, u.email 
             FROM students s
             JOIN users u ON s.user_id = u.id
             WHERE s.id = ?`,
            [studentId]
        );

        if (studentRows.length === 0) {
            return res.send("Student not found");
        }

        const student = studentRows[0];

        // 2️⃣ Fetch marks with subject name
        const [marksRows] = await db.query(
            `SELECT m.*, sub.subject_name 
             FROM marks m
             JOIN subjects sub ON m.subject_id = sub.id
             WHERE m.student_id = ?`,
            [studentId]
        );

        // 3️⃣ Calculate totals
        let totalObtained = 0;
        let totalMax = 0;

        marksRows.forEach((m) => {
            totalObtained += m.marks_obtained;
            totalMax += m.total_marks;
        });

        const percentage = totalMax > 0 ? (totalObtained / totalMax * 100).toFixed(2) : 0;

        let grade;
        if (percentage >= 90) grade = 'A';
        else if (percentage >= 75) grade = 'B';
        else if (percentage >= 60) grade = 'C';
        else if (percentage >= 45) grade = 'D';
        else grade = 'F';

        // 4️⃣ Render report page
        res.render("pages/report/report", {
            student,
            marks: marksRows,
            totalObtained,
            totalMax,
            percentage,
            grade
        });

    } catch (err) {
        console.log(err);
        res.send("Error fetching report");
    }
};
