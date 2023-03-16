const { serialize } = require("cookie");

export default async function logoutHandler(req, res) {
    if (req.method === "GET") {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(204);

        res.setHeader(
            "Set-Cookie",
            serialize("jwt", "", {
                maxAge: -1,
                path: "/",
            })
        );

        res.status(200).json({ message: "User logged out!" });
    }
}
