import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

router.get("/", async function(req, res) {
    const db = getDb();
    const {data, err} = await db.from('TestTable').select();

    res.json(data).status(200);
})

export function TempRoute() {
    return router
};
