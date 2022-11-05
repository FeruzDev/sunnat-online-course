import MainLayout from "./components/MainLayout";
import React, {useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import axios from "axios";
import {API_PATH} from "./components/const";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    useEffect(() =>{

        setInterval(() => {
            localStorage.removeItem('Authorization')
            axios.post(  API_PATH + "auth/login", {'email': localStorage.getItem('email'), 'password': localStorage.getItem('password')} )
                .then(res =>{
                    localStorage.setItem("Authorization", res.data.access)
                    // history.push("/employee")
                    // console.log(res)
                    // window.location.reload();
                    // console.log("refresh bo'ldi")
                })
                .catch(err =>{
                    console.log(err)
                })

        }, 10000);

    }, [])
    return (
        <div  className="body">
            <MainLayout />
            <ToastContainer/>

        </div>
    );
}

export default App;

