import React, {useState, useEffect, FormEventHandler, ChangeEventHandler} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Login.css';
import {Link} from "react-router-dom";
import {Err} from "../../types/Err";
import {User} from "../../types/User";
import eventbus from "../eventbus/eventbus"
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });
    const [cookies, setLoginCookie, removeCookie] = useCookies(["loginCookie"])
    const [errors, setErrors] = useState<Err[]>([])
    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch('http://localhost:8080/login', requestOptions)
            .then(data => data.json())
            .then(data => handleResponse(data));
    };


    const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        })
    }

    useEffect(() => {
        if (cookies.loginCookie > 5) {
            navigate("/profil/" + cookies.loginCookie)
        }
    }, [])


    const handleResponse = (data:any) => {
        if(data!=-1) {
            setLoginCookie("loginCookie", data, {path : '/'})
            navigate("/profil/" + data)
        }
    }

    const checkError = (property:String) => {
        for(let i = 0; i < errors.length; i++) {
            if(errors[i].property == property) {
                return true;
            }
        }
        return false;
    }

    const getError = (property:String) => {
        for(let i = 0; i < errors.length; i++) {
            if(errors[i].property == property) {
                return errors[i].error;
            }
        }
    }

    const deleteError = (property:String) => {
        for(let i = 0; i < errors.length; i++) {
            if(errors[i].property == property) {
                errors.splice(i, 1)
            }
        }
    }



    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col-5 d-flex align-items-center flex-column login-div"}>
                    <h3 className={"text-center light-bold"}>Join your academic community!</h3>
                    <form onSubmit={handleSubmit} className="form-container">
                        <label htmlFor="email">Academic email</label>
                        <input
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            className={checkError("login") ? "form-control text-center text-danger" : "form-control mb-4 text-center"}
                        />
                        {checkError("firstName") ? <p className={"text-danger err-msg"}>{getError("login")}</p>:""}

                        <label htmlFor="password">Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            className={checkError("password") ? "form-control text-center text-danger" : "form-control mb-4 text-center"}
                        />
                        {checkError("password") ? <p className={"text-danger err-msg"}>{getError("firstName")}</p>:""}



                        <button type="submit" className={"btn btn-primary btn-register"}>Login</button>
                        <p className="noaccounttext mt-4">Don't have an account? <Link to="/register">Sign up</Link></p>
                    </form>
                </div>
                <div className={"col-7 background-login"}></div>
            </div>
        </div>
    );
}


export default Login;
