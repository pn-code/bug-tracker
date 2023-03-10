import db from "../../../../../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const results = await db.query("select * from issues");
            res.status(200).json({
                status: "Success",
                results: results.rows.length,
                data: {
                    issues: results.rows,
                },
            });
        } catch (error) {
            res.status(500).json({
                status: "Unsuccessful",
                error,
            });
        }
    }

    if (req.method === "POST") {
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
                "INSERT INTO issues (title, description, related_project, assigned_to, created_on, created_by, status, priority, target_resolution_date, actual_resolution_date) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9) returning *",
                [
                    title,
                    description,
                    relatedProject,
                    assignedTo,
                    createdBy,
                    status,
                    priority,
                    targetResolutionDate,
                    actualResolutionDate
                ]
            );

            res.status(201).json({
                status: "Success",
                data: {
                    issue: results.rows[0],
                },
            });
        } catch (error) {
            res.status(500).json({
                status: "Unsuccessful",
                error,
            });
        }
    }
}
