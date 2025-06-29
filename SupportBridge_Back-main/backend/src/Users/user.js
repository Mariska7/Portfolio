import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

// POST: Insert a new user
router.post("/", async function (req, res) {
    const { name, email, id, role } = req.body;
    console.log(role)
    const db = getDb();

    if (!db) {
        console.error("Error: Database connection not established.");
        return res.status(500).json({ error: "Database connection failed." });
    }

    try {
        const { data, error } = await db
            .from("Users")
            .insert({ name, id, email, role });

        if (error) {
            console.error("Error inserting user:", error);
            return res.status(500).json({ error: "Failed to insert user." });
        }

        console.log("✅ User inserted successfully:", data);
        res.status(200).json(data);
    } catch (err) {
        console.error("Unexpected error inserting user:", err);
        res.status(500).json({ error: "Unexpected server error." });
    }
});

// GET: Retrieve all users
router.get("/", async function (req, res) {
    const db = getDb();

    if (!db) {
        console.error("Error: Database connection not established.");
        return res.status(500).json({ error: "Database connection failed." });
    }

    try {
        const { data, error } = await db.from("Users").select("*");

        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Failed to fetch users." });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Unexpected server error." });
    }
});

export function userRoutes() {
    return router;
}