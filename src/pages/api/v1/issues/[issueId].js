export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json({
            status: "Success",
            data: {
                issues: req.query.issueId,
            },
        });
    }

    if (req.method === "PUT") {
        res.status(200).json({
            status: "success",
            data: {
                issues: "Issue 1"
            }
        })
    }

    if (req.method === "DELETE") {
        res.status(204).json({
            status: "Success"
        })
    }
}
