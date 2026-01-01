import db from "../config/db.js";
import bcrypt from "bcryptjs";
export const showLoginPage = (req, res) => {
    return res.render("pages/login");
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
        return res.send("Invalid username or password");
    }

    const user = rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
        return res.send("Invalid username or password");
    }
    req.session.user={
        id:user.id,
        email:user.email,
        role:user.role
    }
    if (user.role === "admin") {
        return res.redirect("/admin");
    } else {
        return res.redirect("/user");
    }
};

export const showRegisterPage = (req, res) => {
    return res.render("pages/register");
}
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.send("All fields are required");
    }

    const hashed = bcrypt.hashSync(password, 10);

    await db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashed, role || "student"]
    );

    res.send("Registration successful");
};
