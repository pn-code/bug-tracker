import db from "../../../../db";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

export default async function loginHandler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        const { rows } = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        const user = rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                { id: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" }
            );

            const refreshToken = jwt.sign(
                { id: user.id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            res.setHeader(
                "Set-Cookie",
                serialize("jwt", refreshToken, {
                    path: "/",
                    httpOnly: true,
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                })
            );

            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: accessToken,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid credentials.",
            });
        }
    }
}
