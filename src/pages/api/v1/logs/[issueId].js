import db from "../../../../../db";

export default async function logIssueIdHandler(req, res) {
    const issueId = req.query.issueId;

    if (req.method === "GET") {
        const { rows } = await db.query("SELECT * FROM logs WHERE issue_id = $1", [
            issueId,
        ]);

        res.status(200).json({
            success: true,
            logs: rows,
        });
    }
}
