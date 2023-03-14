import db from "../../../../db";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function loginHandler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        const userQuery = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        const user = userQuery.rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                assigned_project: user.assigned_project,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid credentials.",
            });
        }
    }
}

// Generate JWT
const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30m",
    });
