import { createClient } from '@supabase/supabase-js';

// converted it into a class cuz we practically only need to make the connection once
// no need to spam it on page refresh and stuff :p

class db {
    static dbConn;
    static Connected = false;
}

export const getDb = () => {
    return db.dbConn;
}

export const connToDb = async() => {
    if (db.Connected) {
        console.log("Database already connected, please call GetDb To retrieve database")
        return getDb();
    }
    db.Connected = true;

    try {
        if (process.env.DB_KEY == undefined)
            throw new Error("DB_KEY undefined. Env not found");

        const sbClient = createClient(process.env.DB_URL, process.env.DB_KEY);
        db.dbConn = sbClient;

        console.log("Connected to database successfully!");
    } catch (err) {
        throw new Error(err);
    }
}
