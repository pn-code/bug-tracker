import db from "../../../../../db";

export default async function logIssueIdHandler(req, res) {
    const issueId = req.query.issueId;

    if (req.method === "GET") {
        const { rows } = await db.query(
            `SELECT 
            logs.*, 
            users.name AS modified_by_name,
            users1.name AS new_assigned_to_name
          FROM 
            issues 
            JOIN users ON issues.created_by::bigint = users.id
            JOIN users users1 ON issues.assigned_to::bigint = users1.id
            JOIN logs ON issues.id = logs.issue_id
          WHERE 
            issues.id = $1`,
            [issueId]
        );

        res.status(200).json({
            success: true,
            logs: rows,
        });
    }
}
