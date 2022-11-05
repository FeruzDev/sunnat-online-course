

import React from 'react';
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {API_PATH} from "./const";

const Login = () => {
    // "email": "admin@example.com",
    //     "password": "password"
    let history = useHistory()
    const login = () => {
        let data = new FormData()
        data.append("email", document.getElementById('acEmail').value)
        data.append("password", document.getElementById('acPassword').value)
        console.log(data)
        axios.post(API_PATH + "auth/login",  {
            "email":document.getElementById('acEmail').value ,
                "password": document.getElementById('acPassword').value,
                "token": document.getElementById('acPassword').value
        }
        )
            .then(res =>{
                localStorage.setItem("Authorization", res.data.access)
                localStorage.setItem("email", document.getElementById('acEmail').value)
                localStorage.setItem("password", document.getElementById('acPassword').value)
                history.push("/books")
                window.location.reload(true);
            })
    }
    return (
        <div className="login ">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src="/img/illus.png" alt=""/>
                    </div>
                    <div className="col-md-6">
                        <div className="loginCard">
                            <h3>Platformaga kiring bilan ko'proq ma'lumotlardan foydalaning.</h3>
                            <p className="text-white">Xush kelibsiz bu platforamda  o'zingizni maqola va kitoblaringizni kiritishingiz mumkun.</p>
                            <input
                                name="email"
                                placeholder="Username"
                                id="acEmail"
                                type="text"
                                required
                                className="form-control"
                            />
                            <input
                                name="password"
                                placeholder="Password"
                                type="password"
                                id="acPassword"
                                required
                                className="form-control mt-2"
                            />
                            <div className="d-flex justify-content-between">

                                <Link type='submit'  to="/registration" className='btn btn-success mt-4      pl-4 pr-4'>  Ro'yhatdan o'tish</Link>
                                <button type='submit' onClick={login}  className='btn btn-primary mt-4    pl-4 pr-4'>  Kirish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;