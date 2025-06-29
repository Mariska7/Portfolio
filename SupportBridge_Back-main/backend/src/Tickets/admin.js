import readline from "readline";
import { connToDb, getDb } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

// Ensure DB connection
connToDb();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



