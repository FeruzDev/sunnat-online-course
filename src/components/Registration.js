import React from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "./const";
import {useState} from "react";
// import {toast} from "react-toastify";

const Registration = () => {
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
        axios.post(API_PATH + "users",{
            first_name: document.getElementById("id1").value,
            last_name: document.getElementById("id2").value,
            title: document.getElementById("id3").value,
            description: document.getElementById("id4").value,
            email: document.getElementById("id5").value,
            password: document.getElementById("id6").value,
            language: document.getElementById("id7").value,
            location: document.getElementById("id8").value,
            avatar: forFile2,
        })
            .then(res =>{
                alert("Muvaffaqiyatli ro'yhatdan o'tdingiz")
                history.push("/")
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
                               required
                               onChange={pic2} className="form-control"/>
                    </div>
                    <div className="col-md-9 pl-4">
                        <h2 className="mt-5">Ro'yhatdan o'tish</h2>
                        <div className="d-flex mt-3">
                            <div className="w-100">
                                <label className="text-white">Ismi</label>
                                <input type="text" id="id1" className="form-control"/>
                            </div>
                            <div className="w-100 ml-3">
                                <label className="text-white">Familyasi</label>
                                <input type="text" id="id2" className="form-control"/>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="mt-3 w-100">
                                <label className="text-white">Otasining ismi</label>
                                <input type="text" id="id3" className="form-control "/>
                            </div>

                            <div className="mt-3 w-100 ml-3">
                                <label className="text-white">Tug'ilgan kuni</label>
                                <input type="date" id="id4" className="form-control "/>
                            </div>
                        </div>
                        <div className="w-100 d-flex">
                            <div className="mt-3 w-100">
                                <label className="text-white">Email</label>
                                <input type="text" id="id5" className="form-control"/>
                            </div>
                            <div className="mt-3 w-100 ml-3">
                                <label className="text-white">Parol</label>
                                <input type="password" id="id6" className="form-control"/>
                            </div>


                        </div>
                   <div className="w-100 d-flex">
                       <div className="w-100 mt-3 ">
                           <label className="text-white">Telifon raqami</label>
                           <input type="text" id="id7" className="form-control"/>
                       </div>
                       <div className="w-100 mt-3 ml-3">

                           <label className="text-white">Yashash joyi</label>
                           <input type="text" id="id8" className="form-control"/>
                       </div>
                   </div>
                        <div className="mt-4 d-flex justify-content-end">

                            <div className="  ml-3">
                                <button onClick={addUser} className="btn btn-primary ">Saqlash</button>
                            </div>
                            <div className=" ml-3">
                                <button className="btn btn-secondary">
                                    Bekor qilish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Registration;