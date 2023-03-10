import db from "../../../../../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const results = await db.query(
                "select * from projects where id = $1",
                [req.query.id]
            );
            res.status(200).json({
                status: "Success",
                results: results.rows.length,
                data: {
                    projects: results.rows[0],
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
        res.status(200).json({
            status: "Success",
            data: {
                project: "project 1",
            },
        });
    }

    if (req.method === "DELETE") {
        res.status(204).json({
            status: "Success",
        });
    }
}
