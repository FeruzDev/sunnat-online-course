import React from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "./const";
import {useState} from "react";
import {toast} from "react-toastify";
// import {toast} from "react-toastify";

const RegistrationMain = () => {
    const [forFile2, setforFile2] = useState("-")

    let history = useHistory()
    const pic2 = (e) => {
        let data = new FormData()
        data.append("image", e.target.files[0])
        axios.post(API_PATH + "files", data)
            .then(res =>{
                setforFile2(res.data.data.id)
            })
    }
    const addUser = () => {
        axios.post(API_PATH + "auth/registration",{
            first_name: document.getElementById("id11").value,
            last_name: document.getElementById("id21").value,
            title: document.getElementById("id31").value,
            description: document.getElementById("id41").value,
            email: document.getElementById("id51").value,
            password: document.getElementById("id61").value,
            language: document.getElementById("id71").value,
            location: document.getElementById("id81").value,
            avatar: forFile2,
        })
            .then(res =>{
                toast.success("Muvaffaqiyatli ro'yhatdan o'tdingiz")
                history.push("/login")
            })
    }

    return (
        <div className="account">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 pt-5 text-center pr-3 pl-3">
                        <img src="./img/acc.png" className="mt-3" alt="..."/>
                        <h5 className="mt-4 mb-4 text-white">Rasmni kiriting</h5>
                        <input type="file"
                               required onChange={pic2} className="form-control"/>
                    </div>
                    <div className="col-md-9 pl-4">
                        <h2 className="mt-5">Ro'yhatdan o'tish</h2>
                        <div className="d-flex mt-3">
                            <div className="w-100">
                                <label className="text-white">Ismi</label>
                                <input type="text" id="id11" className="form-control"/>
                            </div>
                            <div className="w-100 ml-3">
                                <label className="text-white">Familyasi</label>
                                <input type="text" id="id21" className="form-control"/>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="mt-3 w-100">
                                <label className="text-white">Otasining ismi</label>
                                <input type="text" id="id31" className="form-control "/>
                            </div>

                            <div className="mt-3 w-100 ml-3">
                                <label className="text-white">Tug'ilgan kuni</label>
                                <input type="date" id="id41" className="form-control "/>
                            </div>
                        </div>
                        <div className="w-100 d-flex">
                            <div className="mt-3 w-100">
                                <label className="text-white">Email</label>
                                <input type="email" id="id51" className="form-control"/>
                            </div>
                            <div className="mt-3 w-100 ml-3">
                                <label className="text-white">Parol</label>
                                <input type="password" id="id61" className="form-control"/>
                            </div>


                        </div>
                        <div className="w-100 d-flex">
                            <div className="w-100 mt-3 ">
                                <label className="text-white">Telifon raqami</label>
                                <input type="text" id="id71" className="form-control"/>
                            </div>
                            <div className="w-100 mt-3 ml-3">

                                <label className="text-white">Yashash joyi</label>
                                <input type="text" id="id81" className="form-control"/>
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-end">

                            <div >
                                <button onClick={addUser} className="btn btn-primary ">Saqlash</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RegistrationMain;