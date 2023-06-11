import React, {useState, useEffect, FormEventHandler, ChangeEventHandler} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Login.css';
import { useNavigate } from "react-router-dom"
import {useCookies} from "react-cookie";



type User = {
    password: string|undefined
    email: string|undefined
    name: string|undefined
    surname: string|undefined
    organisationName: string|undefined
    mailTemplate: string|undefined
};

type Err = {
    property: string
    error: string
};
function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        email: "",
        name: "",
        surname: "",
        password: "",
        organisationName: "",
        mailTemplate: ""
    });

    const [errors, setErrors] = useState<Err[]>([])

    const [addUni, setAddUni] =useState<boolean>(false);
    const [addNewUniversityName, setAddNewUniversityName] = useState<string>();
    const [addNewMailTemplate, setAddNewMailTemplate] = useState<string>();

    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch('http://localhost:8080/register', requestOptions)
            .then(data => handleResponse(data));
    };

    const handleResponse = (data:any) => {
        navigate("/login", { replace: true })
    }



    const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        })
        deleteError(event.target.name)
    }

    const [cookies, setLoginCookie, removeCookie] = useCookies(["loginCookie"])

    useEffect(() => {
        if (cookies.loginCookie > 5) {
            navigate("/profil/" + cookies.loginCookie)
        }
    }, [])

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

    const handleAddUniBtn = () => {
        setAddUni(!addUni);
    }

    const handleResponseForAddingUni = (data: any) => {
        if(data.status == 200) {
            console.log("200");
        } else {
            setErrors(data);
        }
    }

    const submitAddUni = () => {
        const addNewOrganisationData = {
            ...(addNewUniversityName ? { name: addNewUniversityName } : {}),
            ...(addNewMailTemplate ? { mailTemplate: addNewMailTemplate } : {}),
        };
        setAddUni(!addUni)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addNewOrganisationData)
        };
        fetch('http://localhost:8080/organisation/uni', requestOptions).then(data => handleResponseForAddingUni(data));
        setAddNewMailTemplate("")
        setAddNewUniversityName("")
    }


    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col-5 d-flex align-items-center flex-column register-div"}>
                    <h3 className={"text-center light-bold"}>Join your academic community!</h3>
                    <div onClick={handleAddUniBtn} > + add new university</div>

                    <form onSubmit={handleSubmit} className="form-container">
                        {
                            addUni &&
                            <div>
                                <label>University name</label>
                                <input
                                    name="organisationName"
                                    type="text"
                                    value={addNewUniversityName}
                                    onChange={e => setAddNewUniversityName(e.target.value)}
                                    className={checkError("organisationName") ? "form-control text-center text-danger" : "form-control mb-4 text-center"}

                                />

                                <label>Mail template (eg. @xx.edu.pl) </label>
                                <input
                                    name="mailTemplate"
                                    type="email"
                                    value={addNewMailTemplate}
                                    onChange={e => setAddNewMailTemplate(e.target.value)}
                                    className={checkError("mailTemplate") ? "form-control text-center text-danger" : "form-control mb-4 text-center"}
                                />
                                <button onClick={submitAddUni} className={"btn btn-primary btn-register"}>Send to verify</button>
                            </div>
                        }

                        <label htmlFor="name">Name:</label>
                        <input
                            name="name"
                            type="text"
                            value={user.name}
                            className={checkError("name") ? "form-control text-center text-danger" : "form-control mb-4 text-center"}
                            onChange={handleChange}
                        />
                        {checkError("name") ? <p className={"text-danger err-msg"}>{getError("name")}</p>:""}

                        <label htmlFor="surname">Surname:</label>
                        <input
                            name="surname"
                            type="text"
                            value={user.surname}
                            onChange={handleChange}
                            className={checkError("surname") ? "form-control text-center text-danger" : "form-control mb-4 text-center"}
                        />
                        {checkError("surname") ? <p className={"text-danger err-msg"}>{getError("surname")}</p>:""}


                        <label htmlFor="email">Academic email</label>
                        <input
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            className={checkError("email") ? "form-control text-center text-danger" : "form-control mb-4 text-center"}
                        />
                        {checkError("email") ? <p className={"text-danger err-msg"}>{getError("email")}</p>:""}

                        <label htmlFor="password">Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            className={checkError("password") ? "form-control text-center text-danger" : "form-control mb-4 text-center"}
                        />
                        {checkError("password") ? <p className={"text-danger err-msg"}>{getError("password")}</p>:""}



                        <button type="submit" className={"btn btn-primary btn-register"}>Register</button>
                    </form>
                </div>
                <div className={"col-7 background-register"}></div>
            </div>
        </div>
    );
}

export default Register;
