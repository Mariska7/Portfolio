import { ChangeEvent, Dispatch, FormEvent, JSX, useState } from "react";

interface userPackage {
    user : string;
    password : string;
    email : string;
}

interface authPackage {
    user : string;
    password : string;
    email : string;
    auth : string;
}

interface signupRes {
    msg : string,
    state : boolean,
}

export default function SignupTest() : JSX.Element {
    const [form, setForm] : [userPackage, Dispatch<userPackage>] = useState({
        user : "",
        password : "",
        email : "",
    })
    const [dt, setDt] : [userPackage, Dispatch<userPackage>] = useState({
        user : "",
        password : "",
        email : "",
    });
    const [verCode, setVerCode] : [string, Dispatch<string>] = useState("");
    const [dtState, setDtState] : [boolean, Dispatch<boolean>] = useState(false);
    const [errMsg, setErrMsg] : [string, Dispatch<string>] = useState("");

    function updateForm(e : ChangeEvent<HTMLInputElement>) {
        const val : string = e.target.value;
        const newForm : userPackage = {
            user : e.target.id != "username" ? form.user : val,
            password : e.target.id != "password" ? form.password : val,
            email : e.target.id != "email" ? form.email : val,
        }
        setForm(newForm);
    }

    function UpdateCode(e : ChangeEvent<HTMLInputElement>) {
        setVerCode(e.target.value);
    }

    async function ProcSignup(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res : Response = await fetch('http://localhost:500/api/signup', {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                user : form.user,
                password : form.password,
                email: form.email,
            })
        });

        const resArr : signupRes = await res.json()
        if (resArr.state) {
            setDt(form);
            setDtState(true);
        } else {
            setDtState(false);
        }
        setErrMsg(resArr.msg);
    }

    async function ProcVerCode(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const authPackage : authPackage = {
            user : dt.user,
            password : dt.password,
            email : dt.email,
            auth : verCode,
        }

        console.log('hi')
        const res : Response = await fetch('http://localhost:500/api/signup/auth', {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(authPackage)
        });
        const resArr : signupRes = await res.json();
        setErrMsg(resArr.msg);
    }

    return (<>
        {!dtState ?
        <form onSubmit={ProcSignup}>
            <input type="text" id="username" placeholder="Username" onChange={updateForm}></input>
            <input type="password" id="password" placeholder="password" onChange={updateForm}></input>
            <input type="email" id="email" placeholder="email" onChange={updateForm}></input>
            <button type="submit">submit</button>
        </form>
        :
        <form onSubmit={ProcVerCode}>
            <input type="number" placeholder="Code" onChange={UpdateCode}></input>
            <button type="submit">submit</button>
        </form>}

        <p>{errMsg}</p>
    </>)
}
