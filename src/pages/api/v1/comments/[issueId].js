import db from "../../../../../db";

export default async function commentsIssueIdHandler(req, res) {
    if (req.method === "GET") {
        const { issueId } = req.query;

        const { rows } = await db.query(
            "SELECT * FROM comments WHERE issue_id = $1",
            [issueId]
        );

        res.status(200).json({
            success: true,
            comments: rows,
        });
    }
}
