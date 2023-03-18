import db from "../../../../db";
const jwt = require("jsonwebtoken");

export default async function refreshHandler(req, res) {
    if (req.method === "GET") {
        const cookies = req.cookies;

        if (!cookies?.jwt)
            return res.status(401).json({ message: "Unauthorized" });

        try {
            const refreshToken = cookies.jwt;

            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, decoded) => {
                    if (err)
                        return res.status(403).json({ message: "Forbidden" });

                    const { rows } = await db.query(
                        "SELECT id, name, email, role FROM users WHERE id = $1",
                        [decoded.id]
                    );

                    const accessToken = jwt.sign(
                        { id: rows[0].id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "30m" }
                    );

                    res.status(200).json({
                        id: rows[0].id,
                        name: rows[0].name,
                        email: rows[0].email,
                        role: rows[0].role,
                        accessToken,
                    });
                }
            );
        } catch (error) {
            res.status(405).json(error);
        }
    }
}
