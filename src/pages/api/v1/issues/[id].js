import db from "../../../../../db";

export default async function handler(req, res) {
    const issueId = req.query.id;

    if (req.method === "GET") {
        const results = await db.query("select * from issues where id = $1", [
            issueId,
        ]);
        try {
            res.status(200).json({
                status: "Success",
                results: results.rows.length,
                data: {
                    issues: results.rows[0],
                },
            });
        } catch (error) {
            res.status(500).json({
                status: "Unsuccessful",
                error,
            });
        }
    }

    if (req.method === "PUT") {
        try {
            const {
                title,
                description,
                relatedProject,
                createdBy,
                assignedTo,
                status,
                priority,
                targetResolutionDate,
                actualResolutionDate,
            } = req.body;

            const results = await db.query(
                "UPDATE issues SET title = $2, description = $3, related_project = $4, assigned_to = $6, created_by = $5, status = $7, priority = $8, target_resolution_date = $9, actual_resolution_date = $10 WHERE id = $1",
                [issueId, title, description, relatedProject, createdBy, assignedTo, status, priority, targetResolutionDate, actualResolutionDate]
            );
            
            res.status(200).json({
                status: "Success",
                data: {
                    issues: results.rows[0],
                },
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
