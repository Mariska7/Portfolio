import express from "express";
import cors from "cors";
import dotEnv from 'dotenv';
import { connToDb } from "./db.js";

// routes
import { TempRoute } from "./Temp/Temp.js";
import { loginRoute } from "./Login/Login.js";
import { signupRoute } from "./Login/Signup.js";
import { TicketRoute } from "./Tickets/ticket.js";
import { TicketmasterRoute } from "./Tickets/ticketmaster.js";  
import { GroepRoute } from "./groepen/groepen.js";
import { AgendaRoute } from "./Agenda/Agenda.js";
import {userRoutes } from './Users/user.js';


dotEnv.config();
const port = process.env.PORT_NUM || 3000; // fallback if PORT_NUM is undefined

const app = express();
app.use(cors());
app.use(express.json());

connToDb();

function InitServer() {
    // Root route
    app.get("/", (req, res) => {
        res.send("Welcome to the API. Try /api/ticket or other endpoints.");
    });

    // API routese
    app.use("/api/Temp", TempRoute());
    app.use("/api/login", loginRoute());
    app.use("/api/signup", signupRoute());
    app.use("/api/ticket", TicketRoute());
    app.use("/api/ticketmaster", TicketmasterRoute());
    app.use("/api/Groep", GroepRoute ());
    app.use("/api/Agenda", AgendaRoute ());
    app.use('/api/users', userRoutes());

    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
}

InitServer();