import validator from "validator";
import nodeMailer from "nodemailer";
import bcrypt from "bcrypt"
import dotEnv from "dotenv"
import { Router } from "express";
import { getDb } from "../db.js";

dotEnv.config();
const router = Router();

const mailTrans = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD,
    },
})

// email authentication
router.post("/auth", async (req, res) => {
    const db = getDb();
    if (!db)
        res.status(404).json({msg: "Database connection failed", state : false});

    const { user, password, email, auth } = req.body;
    if (!user)
        return res.status(400).json({msg: "Username Not found", state : false});
    else if (!password)
        return res.status(400).json({msg: "Password Not found", state : false});
    else if (!email)
        return res.status(400).json({msg: "Email Not found", state : false});
    else if (!auth)
        return res.status(400).json({msg: "Input field 'authentication code' empty", state : false});

    const { data, error } = await db
    .from("AuthCodes")
    .select("*")
    .match({ email: email, code: auth})
    .single();

    if (data == null) {
        return res.status(400).json({msg: "Invalid or expired code", state : false});
    }
    else if(error) {
        return res.status(400).json({msg: error, state : false});
    }

    const currTime = Date.now();

    if (new Date(data.expires_at) > currTime) {
        // delete all the current auth codes
        await db
        .from("AuthCodes")
        .delete()
        .eq("email", email);
    } else {
        await db
        .from("AuthCodes")
        .delete()
        .match({ email: email, code: auth});

        return res.status(400).json({msg: "expired code", state : false});
    }

    const hashPws = await bcrypt.hash(password, 10);
    await db
    .from("Users")
    .insert({
        email : email,
        name : user,
        password : hashPws});

    return res.status(400).json({msg: "Succesfull", state : true});
})

router.post("/", async (req, res) => {
    const db = getDb();
    if (!db)
        res.status(404).json({msg: "Database connection failed", state : false});

    const { user, password, email } = req.body;
    if (!user)
        return res.status(400).json({msg: "Input field 'username' empty", state : false});
    else if (!password)
        return res.status(400).json({msg: "Input field 'password' empty", state : false});
    else if (!email)
        return res.status(400).json({msg: "Input field 'email' empty", state : false});

    if (!validator.isEmail(email))
        return res.status(400).json({msg: "Invalid email", state : false});

    const { data } = await db
    .from("Users")
    .select("*")
    .eq("email", email)
    .single()

    if (data != null) {
        return res.status(400).json({msg: "User is already coupled to this email", state : false});
    }

    const authCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expDate = new Date(Date.now() + 1 * 60 * 1000);

    const mailOpt = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Authentication code SupportBridge",
        text: "Your password reset code is: " + authCode + ". It expires in 10 minutes.",
    }
    mailTrans.sendMail(mailOpt, async (error, info) => {
        if (error) {
            console.log(info);
            return res.status(500).json({msg: "failed to send mail", state : false});
        }

        await db
        .from("AuthCodes")
        .insert({
            expires_at : expDate,
            code: authCode,
            email: email});

        return res.status(200).json({msg: 'Signup Succefull', state : true});
    })
})

export function signupRoute() {
    return router
}
