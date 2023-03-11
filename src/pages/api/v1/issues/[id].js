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
        res.status(200).json({
            status: "success",
            data: {
                issues: "Issue 1",
            },
        });
    }

    if (req.method === "DELETE") {
        try {
            await db.query(
                `DELETE FROM issues WHERE id = ${issueId}`
            );
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
