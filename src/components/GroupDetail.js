import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {API_PATH} from "./const";

const GroupDetail = (props) => {
    const [books, setBooks] = useState([])
    const [currentGroup, setCurrentGroup] = useState()
    const [sms2, setSms2] = useState([])
    const [chat, chats] = useState([])
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    const [name2, setName2] = useState("")
    const [data, setData] = useState([])
    const [group2, setGroup2] = useState([])
    const [group, setGroup] = useState({})
    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth() + 1} - ${current.getFullYear()}`;
    const getMessage = () => {
        axios.get(API_PATH + "items/sms")
            .then(res =>{
                setSms2(res.data.data)
            })
    }
    const getCurrentGroup = () => {
        axios.get(API_PATH + "items/group/?filter[id][_eq]=" + props.match.params.id)
            .then(res =>{
                setCurrentGroup(res.data.data)
            })
    }
    const getAccount = () => {
        axios.get(API_PATH + "auth/me", { headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`}})
            .then(res =>{
                setUser(res.data.data?.user?.id)
                setName(res.data.data?.user?.first_name)
                setName2(res.data.data?.user?.last_name)
            })
    }
    const sendMessage = () => {
        let mes =  document.getElementById("message").value

        let data = new FormData()
        data.append("user", user)
        data.append("fio", name )
        data.append("text", mes)
        data.append("user", user)
        data.append("group",  props.match.params.id)
        axios.post(API_PATH + "items/sms/create", data,  { headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`}})
            .then(res =>{
                document.body.scrollTop = 0;
                getMessage()
                document.getElementById("message").value = ""
            })
    }
    useEffect(()=>{
        getAccount()
        getMessage()
        getCurrentGroup()
        axios.get(API_PATH + "auth/users")
            .then(res =>{
                setData(res.data.data)
            })
        axios.get(API_PATH + "items/group")
            .then(res =>{
                setGroup(res.data.data)
            })
        // axios.get(API_PATH + "items/group_user?filter[group_id][_eq]=" + props.match.params.id,{ headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`}})
        //     .then( res =>
        //         setGroup2(res.data.data)
        //     )
        axios.get(API_PATH + "items/group_user",{ headers: {"Authorization":`Bearer ${localStorage.getItem('Authorization')}`}})
            .then( res =>
                setGroup2(res.data.data)
            )
    }, [])
    return (
        <div className="smsbox">
              <div className="container h-100 sssmmm position-relative">
               <div className="d-flex">
                   <div className="row w-100">
                       <div className="col-md-9 ">
                           <div className="mes-box">
                               {
                                   // sms2?.map(item =>(
                                   sms2?.filter(item => item.group[0] == props.match.params.id ).map(item =>(
                                       <div className={item.fio === name ? "message-box-send" : "message-box-rec"}>
                                           <div className="avatar-img d-flex">
                                               <div className="img ">
                                                   <img src="/img/acc.png" alt=""/>
                                               </div>
                                               <p className="text-white" >
                                                   <span>{item.fio ? item.fio : "User name"}</span>
                                                   {item.text}
                                               </p>
                                               <h6>{item.date}</h6>
                                           </div>
                                       </div>
                                   ))
                               }
                           </div>
                           <div className="input-group mb-3 message-input">
                               <input type="text" className="form-control" id="message" placeholder="Matnni kiriting"  aria-describedby="basic-addon2" />
                               <div className="input-group-append">
                                   <button className="btn  btn-primary" type="button" onClick={sendMessage}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-send" viewBox="0 0 16 16">
                                           <path
                                               d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                                       </svg>
                                       <span className="ml-2">Yuborish</span>
                                   </button>
                               </div>

                           </div>
                       </div>
                       <div className="col-md-3 w-100 group-users">
                           <h2 className="mb-4">Guruh a'zolari</h2>
                           {
                               data?.map(item => {
                                   return group2?.map(item2 =>    (
                                       item.id == item2.user_id && props.match.params.id == item2.group_id
                                           ?
                                           <div className="row align-items-center">
                                               {
                                                   item.avatar
                                                   ?
                                                       <img src={item.avatar}/>
:
                                                       <img src="/img/acc.png" alt="" />
                                               }
                                               <h4>{item.first_name + " " + item.last_name}</h4>
                                           </div>
                                           :
                                           ""
                                   ))
                               })
                           }

                       </div>
                   </div>
               </div>
            </div>
        </div>
    );
};

export default GroupDetail;