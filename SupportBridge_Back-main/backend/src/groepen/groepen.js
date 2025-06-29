import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

// POST: Insert a new ticket
router.post("/", async function(req, res) {
    const { name, GroepNr, } = req.body;
    const db = getDb();

    if (!db) {
        console.error("Error: Database connection not established.");
        return res.status(500).json({ error: "Database connection failed." });
    }

    try {
        const { data, error } = await db
            .from("Groep")
            .insert({ Name: name, Groepen: GroepNr,});

        if (error) {
            console.error("Error inserting data:", error);
            return res.status(500).json({ error: "Failed to insert data." });
        }

        console.log("✅ Data successfully inserted into the database:", data);
        res.status(200).json(data);
    } catch (err) {
        console.error("Unexpected error while inserting data:", err);
        res.status(500).json({ error: "Unexpected server error." });
    }
});

// GET: Retrieve all tickets
router.get("/", async function (req, res) {
    const db = getDb();

    if (!db) {
        console.error("Error: Database connection not established.");
        return res.status(500).json({ error: "Database connection failed." });
    }

    try {
        const { data, error } = await db.from("Groep").select("*");

        if (error) {
            console.error("Error fetching data:", error);
            return res.status(500).json({ error: "Failed to fetch Groep." });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Unexpected server error." });
    }
});

export function GroepRoute() {
    return router;
}