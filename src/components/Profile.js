import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "./const";
import {toast} from "react-toastify";

const Profile = () => {
    const [data, setData] = useState({})
    const [forFile2, setforFile2] = useState(null)



    const pic2 = (e) => {
                setforFile2(e.target.files[0])
    }

    const addUser = () => {

        let data = new FormData()
        data.append("first_name",document.getElementById("id111").value)
        data.append("last_name",document.getElementById("id211").value)
        data.append("title",document.getElementById("id311").value)
        data.append("description",document.getElementById("id411").value)
        data.append("email", document.getElementById("id511").value)
        data.append("language",document.getElementById("id711").value)
        data.append("location",document.getElementById("id811").value)
        data.append("avatar", forFile2)
        axios.put(API_PATH + "auth/profile/update", data,
            { headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`}}
            )
            .then(res =>{
                toast.info("Ma'lumotlar o'zgartirildi")
                getProfile()
            })
    }

    const getProfile = () => {
        axios.get(API_PATH + "auth/me",{ headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`
            }})
            .then( res =>{
                    setData(res.data?.data?.user)
                    document.getElementById("id111").value = res.data.data.user.first_name
                    document.getElementById("id211").value =  res.data.data.user.last_name
                    document.getElementById("id311").value =  res.data.data.user.title
                    document.getElementById("id411").value =  res.data.data.user.description
                    document.getElementById("id511").value =  res.data.data.user.email
                    // document.getElementById("id611").value =  res.data.password
                    document.getElementById("id711").value =  res.data.data.user.language
                    document.getElementById("id811").value =  res.data.data.user.location
                }
            )
    }
    useEffect(() =>{
        getProfile()
    }, [])

    return ( 
        <div className="account">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 pt-5 text-center pr-3 pl-3">
                        {
                            data?.avatar
                                ?
                                <img className="avatar" src={data.avatar}/>
                                :
                                <img src="./img/acc.png"  className="mt-3" alt="..."/>

                        }
                        <h5 className="mt-4 mb-4 text-white">Rasmni o'zgartirish</h5>
                        <input type="file"
                               required onChange={pic2} className="form-control"/>
                    </div>
                    <div className="col-md-9 pl-4">
                        <h2 className="mt-5">Profile ma'lumotlari</h2>
                        <div className="d-flex mt-3">
                            <div className="w-100">
                                <label className="text-white">Ismi</label>
                                <input type="text" id="id111" className="form-control"/>
                            </div>
                            <div className="w-100 ml-3">
                                <label className="text-white">Familyasi</label>
                                <input type="text" id="id211" className="form-control"/>
                            </div>
                        </div>
                       <div className="d-flex">
                           <div className="mt-3 w-100">
                               <label className="text-white">Otasining ismi</label>
                               <input type="text" id="id311" className="form-control "/>
                           </div>

                           <div className="mt-3 w-100 ml-3">
                               <label className="text-white">Tug'ilgan kuni</label>
                               <input type="date" id="id411" className="form-control "/>
                           </div>
                       </div>
                        <div className="w-100 d-flex">
                            <div className="mt-3 w-100">
                                <label className="text-white">Email</label>
                                <input type="text" id="id511" className="form-control"/>
                            </div>
                            {/*<div className="mt-3 w-100 ml-3">*/}
                            {/*    <label>Parol</label>*/}
                            {/*    <input type="text" id="id611" className="form-control"/>*/}
                            {/*</div>*/}


                        </div>
                        <div className="mt-3 d-flex">
                            <div className="w-100 mt-3 ">
                                <label className="text-white">Telifon raqami</label>
                                <input type="text" id="id711" className="form-control"/>
                            </div>
                            <div className="w-100 mt-3 ml-3 ">
                                <label className="text-white">Yashash joyi</label>
                                <input type="text" id="id811" className="form-control"/>
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            <div className="btn btn-danger">
                                O'chirish
                            </div>
                            <div onClick={addUser} className="btn btn-primary ml-3">
                                Saqlash
                            </div>
                            <div className="btn btn-secondary ml-3">
                                Bekor qilish
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;