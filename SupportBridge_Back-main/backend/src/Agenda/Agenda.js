// Agenda/Agenda.js
import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

// GET all appointments (No changes needed here for this issue)
router.get("/", async function(req, res) {
    const db = getDb();
    if (!db) {
        console.error("Database connection not established.");
        return res.status(500).json({ error: "Database not connected." });
    }

    try {
        const { data, error } = await db
            .from("agenda")
            .select("*");

        if (error) {
            console.error("Error fetching data:", error);
            return res.status(500).json({ error });
        }

        return res.status(200).json(data);
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "Unexpected server error." });
    }
});

// POST a new appointment
router.post("/", async function(req, res) {
    const {
        appointment_date,
        start_hour,     // <--- CHANGE THIS from startHour to start_hour
        duration_hours, // <--- CHANGE THIS from durationHours to duration_hours
        title
    } = req.body; // req.body will contain start_hour and duration_hours from frontend

    const db = getDb();
    if (!db) {
        console.error("Database connection not established.");
        return res.status(500).json({ error: "Database not connected." });
    }

    try {
        const { data, error } = await db
            .from("agenda")
            .insert({
                appointment_date: appointment_date,
                start_hour: start_hour,       // <--- Now correctly mapped from the destructured variable
                duration_hours: duration_hours, // <--- Now correctly mapped from the destructured variable
                title
            })
            .select();

        if (error) {
            console.error("Error inserting data:", error);
            return res.status(500).json({ error });
        }

        return res.status(201).json(data[0]);
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "Unexpected server error." });
    }
});

// NEW: PUT/Update an existing appointment
router.put("/:id", async function(req, res) {
    const { id } = req.params;
    const {
        appointment_date,
        start_hour,     // <--- CHANGE THIS from startHour to start_hour
        duration_hours, // <--- CHANGE THIS from durationHours to duration_hours
        title
    } = req.body; // req.body will contain start_hour and duration_hours from frontend

    const db = getDb();
    if (!db) {
        console.error("Database connection not established.");
        return res.status(500).json({ error: "Database not connected." });
    }

    try {
        const { data, error } = await db
            .from("agenda")
            .update({
                appointment_date: appointment_date,
                start_hour: start_hour,
                duration_hours: duration_hours,
                title
            })
            .match({ id })
            .select();

        if (error) {
            console.error("Error updating data:", error);
            return res.status(500).json({ error });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Appointment not found." });
        }

        return res.status(200).json(data[0]);
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "Unexpected server error." });
    }
});

// DELETE an appointment (No changes needed here for this issue)
router.delete("/:id", async function(req, res) {
    const { id } = req.params;

    const db = getDb();
    if (!db) {
        console.error("Database connection not established.");
        return res.status(500).json({ error: "Database not connected." });
    }

    try {
        const { error } = await db
            .from("agenda")
            .delete()
            .match({ id });

        if (error) {
            console.error("Error deleting data:", error);
            return res.status(500).json({ error });
        }

        return res.status(204).send();
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "Unexpected server error." });
    }
});

export function AgendaRoute() {
    return router;
}