import db from "../../../../../db";

export default async function handler(req, res) {
    const issueId = req.query.id;

    if (req.method === "GET") {
        const { rows } = await db.query(
        `SELECT issues.*, 
        users.name AS created_by_name, 
        users1.name AS assigned_to_name 
        FROM issues 
        JOIN users ON issues.created_by::bigint = users.id 
        LEFT JOIN users users1 ON issues.assigned_to::bigint = users1.id 
        WHERE issues.id = $1
        `,
            [issueId]
        );
        try {
            res.status(200).json({
                success: true,
                results: rows.length,
                issue: rows[0],
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error,
            });
        }
    }

    if (req.method === "PUT") {
        try {
            const { assignedTo, status, actualResolutionDate } = req.body;

            const { rows } = await db.query(
                "UPDATE issues SET assigned_to = $1, status = $2, actual_resolution_date = $3 WHERE id = $4",
                [assignedTo, status, actualResolutionDate, issueId]
            );

            res.status(200).json({
                status: "Success",
                issues: rows[0],
            });
        } catch (error) {
            res.status(500).json({
                status: "Unsuccessful",
                error,
            });
        }
    }

    if (req.method === "DELETE") {
        try {
            await db.query("DELETE FROM issues WHERE id = $1", [issueId]);
            res.status(204).json({
                status: "Success",
            });
        } catch (error) {
            res.status(500).json({
                status: "Unsuccessful",
                error,
            });
        }
    }
}
