import db from "../../../../db";
const bcrypt = require("bcrypt");

export default async function register(req, res) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Inputs cannot be empty.",
            });
        }

        const lookForUser = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);

        const userExists = lookForUser.rows[0];

        if (userExists) {
            res.status(400).json({
                success: false,
                message: "User with this email already exists.",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await db.query(
            "INSERT INTO users (name, email, password, role, assigned_project, created_on) VALUES ($1, $2, $3, 'user', 0, NOW()) RETURNING id",
            [name, email, hashedPassword]
        );

        if (user) {
            res.status(201).json({
                id: user.rows[0].id,
                name,
                email,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid user data.",
            });
        }
    }
}
