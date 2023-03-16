import db from "../../../../db";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

export default async function refreshHandler(req, res) {
    if (req.method === "GET") {
        const cookies = req.cookies;

        if (!cookies?.jwt)
            return res.status(401).json({ message: "Unauthorized" });

        const refreshToken = cookies.jwt;

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ message: "Forbidden" });

                const { rows } = await db.query(
                    "SELECT id, name, email, role, assigned_project FROM users WHERE id = $1",
                    [decoded.id]
                );

                const accessToken = jwt.sign(
                    { id: rows[0].id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "30m" }
                );

                res.json({
                    id: rows[0].id,
                    name: rows[0].name,
                    email: rows[0].email,
                    role: rows[0].role,
                    assigned_project: rows[0].assigned_project,
                    accessToken,
                });
            }
        );
    }
}
