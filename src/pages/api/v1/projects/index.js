import db from "../../../../../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const results = await db.query(
            "select * from projects where id = $1",
            [req.query.id]
        );
        try {
            res.status(200).json({
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
}
