import db from "../../../../../db";

export default async function commentsIssueIdHandler(req, res) {
    if (req.method === "GET") {
        const { issueId } = req.query;

        const { rows } = await db.query(
            `SELECT 
            comments.*, 
            users.name AS user_name
          FROM 
            comments 
            JOIN users ON comments.user_id::bigint = users.id
          WHERE 
            comments.issue_id = $1;`,
            [issueId]
        );

        res.status(200).json({
            success: true,
            comments: rows,
        });
    }
}
