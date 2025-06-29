import { Router } from "express";
import { getDb } from "../db.js"; // assumes you have a db connection setup

const router = Router();

router.post("/", async function(req, res) {
  const { ticketID, name, question, assignedTo } = req.body;

  const db = getDb();
  if (!db) {
    console.error("Database connection not established.");
    return res.status(500).json({ error: "Database not connected." });
  }

  try {f
    const { data, error } = await db
      .from("Ticketmaster")
      .insert({
        TicketID: ticketID,
        Name: name,
        Question: question,
        AssignedTo: assignedTo
      });

    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).json({ error });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected server error." });
  }
});

export function TicketmasterRoute() {
  return router;
}