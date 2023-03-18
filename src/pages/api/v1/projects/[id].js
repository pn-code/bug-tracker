import db from "../../../../../db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const results = await db.query("select * from projects where id = $1", [
        req.query.id,
      ]);
      res.status(200).json({
        success: true,
        results: results.rows.length,
        projects: results.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      await db.query("DELETE FROM projects WHERE id = $1", [req.query.id]);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
