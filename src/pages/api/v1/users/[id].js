import db from "../../../../../db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { rows } = await db.query(
      "SELECT name, email, role FROM users WHERE id = $1",
      [req.query.id]
    );

    try {
      res.status(200).json({
        success: true,
        results: rows.length,
        issues: rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }

  if (req.method === "PUT") {
    const { rows } = await db.query(
      "UPDATE users SET role = $2 WHERE id = $1 RETURNING id, name, email, role",
      [req.query.id, req.body.role]
    );

    res.status(200).json({
      success: true,
      user: rows[0]
    });
  }
}
