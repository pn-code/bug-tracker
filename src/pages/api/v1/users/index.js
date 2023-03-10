import db from "../../../../../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const results = await db.query("select * from users");
            res.status(200).json({
                status: "Success",
                results: results.rows.length,
                data: {
                    users: results.rows,
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