import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

router.post("/", async (req, res) => {
    const db = getDb();
    if (!db)
        return res.status(404).json({msg: "Failed to connect to database"});

    const { password, email } = req.body;
    if (!password)
        return res.status(400).json({msg: "Input field 'password' empty"})
    else if(!email)
        return res.status(400).json({msg: "Input field 'email' empty"})

    const { data, error } = await db
    .from("Users")
    .select("*")
    .eq("email", email)
    if (error)
        return res.status(400).json({msg: error});

    if (data.length == 1 && data[0].password == password) {
        return res.status(200).json({msg:'', package: data[0]});
    }

    return res.status(400).json({msg: "Invalid user"})
})

export function loginRoute() {
    return router;
}
