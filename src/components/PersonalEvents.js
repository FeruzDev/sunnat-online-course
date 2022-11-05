import React from 'react';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_PATH} from "./const";
import {Modal, ModalBody, ModalFooter} from "reactstrap";

const PersonalEvents = (props) => {
    const [modal, setModal] = useState(false)
    const [forFile, setforFile] = useState("")
    const [forFile2, setforFile2] = useState("")
    const [books, setBooks] = useState([])
    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
    const toggle = () => {
        setModal(!modal)
    }
    const pic = (e) => {
        setforFile(e.target.files[0])
    }
    const pic2 = (e) => {
        setforFile2( e.target.files[0])
    }

    const postBook = (data) => {
        let newData = new FormData()
        newData.append("name", document.getElementById('n1').value)
        newData.append( "content", document.getElementById("n2").value)
        newData.append(    "avtor", localStorage.getItem("email"))
        newData.append(            "date" , date  )
        newData.append("src", forFile)
        newData.append("file", forFile2)
        axios.post(API_PATH + "items/events/create", newData)
            .then(res => {
                console.log(res)
                getBooks()
                setModal(false)
            })
    }
    const getBooks = () => {
        axios.get(API_PATH + `items/events?filter[avtor][_eq]=${localStorage.getItem("email")}`)
            .then(res => {
                setBooks(res.data.data)
            })
    }
    useEffect(() => {
        getBooks()

    }, [])
    return (
        <div className="documents">
            <div className="container">
                <div className="container d-flex justify-content-between">
                    <h2 className="mt-5">Tadbirlar</h2>
                    <div className="add-btn mt-5">
                        <button className="" onClick={toggle}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                 className="bi bi-plus-square" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>

                        </button>
                    </div>
                </div>
                {
                    books?.filter(item => item.avtor === localStorage.getItem("email")).map(item =>(
                        <div className="col-md-12 mt-5">
                            <div className="row">
                                <div className="col-md-4">
                                    <img className="w-100" src={item.file}/>
                                </div>
                                <div className="col-md-8">
                                    <h3>{item.name.length > 100 ? item.name.slice(0, 100) + "..." : item.name}</h3>
                                    <span>{item.date}</span>
                                    <p className="text-white" >{item.content.length > 200 ? item.content.slice(0, 200) + "..." : item.content}</p>
                                    <Link to={`/detail-events/${item.id}`}  >Batafsil...</Link>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <Modal isOpen={modal} toggle={toggle} className={props.className}>

                <div className="d-flex justify-content-between w-100 pl-3 pt-2 pr-3 align-items-center">
                    <h4 className="m-0">Tadbirni kiriting</h4>
                    <button onClick={toggle} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <ModalBody>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Tadbir nomini kiriting"
                        required
                        id="n1"
                    />
                    <textarea
                        name="content"
                        placeholder="Tadbir haqida"
                        type="text"
                        className="form-control mt-3"
                        required
                        id="n2"
                    />
                    <input
                        name="src"
                        className="form-control mt-3"
                        placeholder="Tadbirning rasmi"
                        type="file"
                        required
                        onChange={pic}
                        id="n3"
                    />
                    <input
                        name="file"
                        className="form-control mt-3"
                        placeholder="Tadbir faylini kiriting"
                        type="file"
                        required
                        onChange={pic2}
                        id="n4"
                    />
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary" onClick={postBook}>Saqlash</button>

                    <button type="button" className="btn btn-danger" onClick={toggle}>Bekor qilish</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default PersonalEvents;