import React from 'react';
import {Link} from "react-router-dom";
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_PATH} from "./const";

const MyGroups = (props) => {
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [forFile, setforFile] = useState("")
    const [forFile2, setforFile2] = useState("")
    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
    const [books, setBooks] = useState([])

    const toggle = () => {
        setModal(!modal)
    }
    const toggle2 = () => {
        setModal2(!modal2)
    }


    const pic = (e) => {
        setforFile(e.target.files[0])
    }
    const pic2 = (e) => {
        setforFile2( e.target.files[0])
    }

    const postBook = (data) => {
        let newData = new FormData()
        newData.append("name", document.getElementById('g1').value)
        // newData.append( "content", document.getElementById("n2").value)
        newData.append(  "avtor", localStorage.getItem("email"))
        newData.append(  "date" , date  )
        // newData.append("src", forFile)
        newData.append("file", forFile)
        axios.post(API_PATH + "items/group/create",   newData    )
            .then(res => {
                console.log(res)
                getGroups()
                setModal(false)
            })
    }
    const getGroups = () => {
        axios.get(API_PATH + `items/group?filter[avtor][_eq]=${localStorage.getItem("email")}`)
            .then(res =>{
                setBooks(res.data.data)
            })
    }
    const postBook23 = (data) => {
        axios.post(API_PATH + "items/group", {
            "name": document.getElementById('g1').value,
            "src": forFile,
            "date" : date,
            "avtor": localStorage.getItem("email"),
        })
            .then(res => {
                getGroups()
                setModal(false)
            })
    }
    const postBook2 = (data) => {
        axios.post(API_PATH + "items/group", {
            "name": document.getElementById('g1').value,
            "src": forFile,
            "date" : date,
            "avtor": localStorage.getItem("email"),
        })
            .then(res => {
                getGroups()
                setModal(false)
            })
    }
    useEffect(() => {
        getGroups()
    }, [])
    return (
        <div className="groups">
            <div className="container">
                <h2 className="mt-5">Guruxlar</h2>
                <div className="tabs">
                    <div>
                        <Link to="/groups">Guruhlar</Link>
                        <Link >Mening guruhlarim</Link>
                    </div>
                    <div>
                        <button  onClick={toggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                 className="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            <span>Guruh tuzish</span>
                        </button>
                    </div>
                </div>
                <div className="row">
                    {
                        books?.map(item => (
                            <div className="col-md-3">
                                <div className="group-cards d-block">
                                    <Link to={`/detail-group/${item.id}`} className="img">
                                        {/*<img src="./img/avatar.jpg" alt="..."/>*/}
                                        <img src={item.file}/>
                                    </Link>
                                    <Link to={`/detail-group/${item.id}`} className="text-center"><h3>{item.name}</h3></Link>
                                    <p className="text-center">A'zolar</p>
                                    <button>Sozlash</button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} className={props.className}>
                <div className="d-flex justify-content-between w-100 pl-3 pt-2 pr-3 align-items-center">
                    <h4 className="m-0">Guruh tuzish</h4>
                    <button onClick={toggle} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <ModalBody>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        required
                        id="g1"
                    />
                    <input
                        name="src"
                        className="form-control mt-3"
                        type="file"
                        required
                        onChange={pic}
                    />
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary" onClick={postBook}>Saqlash</button>
                    <button type="button" className="btn btn-danger" onClick={toggle}>Bekor qilish</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modal2} toggle={toggle} className={props.className}>
                <div className="d-flex justify-content-between w-100 pl-3 pt-2 pr-3 align-items-center">
                    <h4 className="m-0">Guruh tuzish</h4>
                    <button onClick={toggle2} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <ModalBody>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        required
                        id="g2"
                    />
                    <input
                        name="src"
                        className="form-control mt-3"
                        type="file"
                        required
                        onChange={pic2}
                    />
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary" onClick={postBook2}>Saqlash</button>
                    <button type="button" className="btn btn-danger" onClick={toggle2}>Bekor qilish</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default MyGroups;