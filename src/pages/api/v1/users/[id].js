import db from "../../../../../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const results = await db.query(
            "select * from users where id = $1",
            [req.query.id]
        );
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
        res.status(200).json({
            status: "success",
            data: {
                user: "User 1",
            },
        });
    }

    if (req.method === "DELETE") {
        res.status(204).json({
            status: "Success",
        });
    }
}
