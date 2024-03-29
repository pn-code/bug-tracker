import db from "../../../../../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { rows } = await db.query(`
            SELECT 
            issues.*, 
            users.name AS created_by_name,
            users1.name AS assigned_to_name,
            projects.name AS project_name
          FROM 
            issues 
            JOIN users ON issues.created_by::bigint = users.id
            JOIN users users1 ON issues.assigned_to::bigint = users1.id
            JOIN projects ON issues.related_project::bigint = projects.id
          ORDER BY
            issues.id DESC
            `);
            res.status(200).json({
                status: "Success",
                results: rows.length,
                issues: rows,
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
            } = req.body;

            const { rows } = await db.query(
                "INSERT INTO issues (title, description, related_project, assigned_to, created_on, created_by, status, priority, target_resolution_date) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8) returning *",
                [
                    title,
                    description,
                    relatedProject,
                    assignedTo,
                    createdBy,
                    status,
                    priority,
                    targetResolutionDate,
                ]
            );

            res.status(201).json({
                status: "Success",
                issue: rows[0],
            });
        } catch (error) {
            res.status(500).json({
                status: "Unsuccessful",
                error,
            });
        }
    }
}
