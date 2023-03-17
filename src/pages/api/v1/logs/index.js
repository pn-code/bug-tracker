import db from "../../../../../db";

export default async function logHandler(req, res) {
    if (req.method === "POST") {
        const {
            modified_by,
            issue_id,
            new_assigned_to,
            new_actual_resolution_date,
            new_status,
        } = req.body;

        await db.query(
            "INSERT INTO logs (modified_date, modified_by, issue_id, new_actual_resolution_date, new_assigned_to, new_status) VALUES(NOW(), $1, $2, $3, $4, $5)",
            [
                modified_by,
                issue_id,
                new_actual_resolution_date,
                new_assigned_to,
                new_status,
            ]
        );

        res.status(200).json({
            success: true,
        });
    }
}
