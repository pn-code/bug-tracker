import db from "../../../../../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const results = await db.query(
            "select * from projects",
        );
        try {
            res.status(201).json({
                status: "Success",
                results: results.rows.length,
                data: {
                    projects: results.rows,
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
            const { name, createdBy } = req.body;

            const results = await db.query(
                "INSERT INTO projects (name, created_on, created_by) VALUES ($1, NOW(), $2) returning *",
                [name, createdBy]
            );

            res.status(201).json({
                status: "Success",
                data: {
                    user: results.rows[0],
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
