import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "./const";
import {toast} from "react-toastify";
const Groups = () => {
    const [books, setBooks] = useState([])
    const [data, setData] = useState({})
    const [group2, setGroup2] = useState([])
    const [group, setGroup] = useState({})
    const [auth, setAuth] = useState(false)

    useEffect(()=>{
        axios.get(API_PATH + "auth/me",{ headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`
    }})
            .then( res =>
                setData(res.data?.data?.user)
            )
        axios.get(API_PATH + "items/group_user",{ headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`}})
            .then( res =>
                setGroup2(res.data.data)
            )
        axios.get(API_PATH + "items/group")
            .then(res =>{
                setBooks(res.data.data)
                axios.get(API_PATH + "items/group_sms/?filter[group_id][_eq]=10")
                    .then(res =>{
                         // console.log(res.data.data)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))



        axios.get(API_PATH + "auth/users")
            .then(res =>{
                console.log(res.data.data)
                res.data.data.map(item => {

                    if (item.email === localStorage.getItem("email")   )
                    {
                        setAuth(true)
                    }
                })
            })

    }, [])

    const enterGroup = (id) => {
        let newData = new FormData()
        newData.append("group_id", id)
        newData.append("user_id", data?.id)
        axios.post(API_PATH + "items/group_user/create" , newData, { headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`}})
            .then(res =>{
                // console.log(res.data.data)
                toast.success('siz guruhga azo boldinggiz')
                axios.get(API_PATH + "items/group_user",{ headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`
                    }})
                    .then( res =>
                        setGroup2(res.data.data)
                    )
            })
    }
    return (
        <div className="groups">
            <div className="container">
                <h2 className="mt-5">Guruhlar</h2>
                <div className="tabs">
                    <div>
                        <Link to="groups">Guruhlar</Link>
                        {
                            auth
                            ?
                                <Link to="groups/my-groups">Mening guruhlarim</Link>
                                :
                                ""
                        }
                    </div>
                    <div>
                        {/*<button>*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"*/}
                        {/*         className="bi bi-plus" viewBox="0 0 16 16">*/}
                        {/*        <path*/}
                        {/*            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>*/}
                        {/*    </svg>*/}
                        {/*    <span>Guruh tuzish</span>*/}
                        {/*</button>*/}
                    </div>
                </div>
                <div className="row">
                    {
                        books?.map(item => (
                            <div className="col-md-3">
                                <div className="group-cards d-block">
                                    <Link to={`/detail-group/${item.id}`} className="img">
                                        {/*<img src="./img/avatar.jpg" alt="..."/>*/}
                                        <img src={item?.file}/>
                                    </Link>
                                    <Link to={`/detail-group/${item.id}`} className="text-center"><h3>{item.name}</h3></Link>
                                    <p className="text-center">A'zolar</p>
                                    <button disabled={group2?.filter(item2 => item2.group_id == item?.id && item2?.user_id == data?.id).length > 0} className="enterGroupBtn" onClick={() => enterGroup(item.id)}>Qo'shilish</button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>
    );
};

export default Groups;