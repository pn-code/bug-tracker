import db from "../../../../../db";

export default async function logIssueIdHandler(req, res) {
  const issueId = Number(req.query.issueId);

  if (req.method === "GET") {
    const { rows } = await db.query(
      `SELECT
      logs.*,
      users_assigned.name AS new_assigned_to_name,
      users_modified.name AS modified_by_name
    FROM
      logs
      LEFT JOIN users AS users_assigned ON logs.new_assigned_to::bigint = users_assigned.id
      LEFT JOIN users AS users_modified ON logs.modified_by::bigint = users_modified.id
    WHERE
      logs.issue_id = $1`,
      [issueId]
    );

    res.status(200).json({
      success: true,
      logs: rows,
    });
  }
}
