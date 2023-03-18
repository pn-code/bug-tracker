import db from "../../../../../db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { rows } = await db.query("SELECT * FROM projects");

      res.status(201).json({
        status: "Success",
        results: rows.length,
        projects: rows,
      });
    } catch (error) {
      res.status(500).json({
        status: "Unsuccessful",
        error,
      });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, createdBy } = req.body;

      const { rows } = await db.query(
        "INSERT INTO projects (name, created_on, created_by) VALUES ($1, NOW(), $2) RETURNING *",
        [name, createdBy]
      );

      res.status(201).json({
        success: true,
        user: rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        error,
      });
    }
  }
}
