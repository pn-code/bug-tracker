import db from "../../../../../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const results = await db.query(
                `
      SELECT 
        projects.*, 
        users.name AS user_name
      FROM 
        projects 
      JOIN 
        users ON projects.created_by::bigint = users.id
      WHERE 
        projects.id = $1
      `,
                [req.query.id]
            );
            res.status(200).json({
                success: true,
                results: results.rows.length,
                projects: results.rows[0],
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error,
            });
        }
    }

    if (req.method === "DELETE") {
        try {
            await db.query("DELETE FROM projects WHERE id = $1", [
                req.query.id,
            ]);
            res.status(200).json({
                success: true,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error,
            });
        }
    }

    if (req.method === "PUT") {
        const { updatedProjectName, project, user } = req.body;
        console.log(project.created_by == user.id)
        const checkForPermission =
            project.created_by == user.id || user.role == "admin";

        if (checkForPermission) {
            try {
                await db.query("UPDATE projects SET name = $2 WHERE id = $1", [
                    req.query.id,
                    updatedProjectName,
                ]);

                res.status(200).json({
                    success: true,
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error,
                });
            }
        } else {
            res.status(403).json({
                success: false,
            });
        }
    }
}
