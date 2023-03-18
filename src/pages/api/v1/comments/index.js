import db from "../../../../../db";

export default async function commentsHandler(req, res) {
    const { user_id, issue_id, content } = req.body;

    if (req.method === "POST") {
        await db.query(
            "INSERT INTO comments (user_id, issue_id, content, created_on) VALUES ($1, $2, $3, NOW())",
            [user_id, issue_id, content]
        );

        res.status(200).json({
            success: true,
        });
    }
}
