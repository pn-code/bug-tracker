export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json({
            status: "Success",
            data: {
                issues: req.query.issueId,
            },
        });
    }
}
