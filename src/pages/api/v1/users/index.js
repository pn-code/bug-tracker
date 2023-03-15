import db from "../../../../../db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const results = await db.query("select * from users");
      res.status(201).json({
        status: "Success",
        results: results.rows.length,
        users: results.rows,
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
      const { fullName, email, role } = req.body;

      const results = await db.query(
        "INSERT INTO users (full_name, email, role, assigned_project, created_on) VALUES ($1, $2, $3, 0, NOW()) returning *",
        [fullName, email, role]
      );

      res.status(201).json({
        status: "Success",
        data: {
          user: results.rows[0],
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
