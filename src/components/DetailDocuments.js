import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH} from "./const";
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import {useHistory} from "react-router-dom";

const DetailDocuments = (props) => {
    const [item, setItem] = useState({})
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [forFile, setforFile] = useState(item.src)
    const [forFile2, setforFile2] = useState(item.file)
    let history = useHistory();
    const toggle = () => {
        setModal(!modal)
    }
    const toggle2 = () => {
        setModal2(!modal2)

    }
    const pic = (e) => {
        let data = new FormData()
        data.append("image", e.target.files[0])
        axios.post(API_PATH + "files", data)
            .then(res =>{
                setforFile(res.data.data.id)
            })
    }
    const pic2 = (e) => {
        let data = new FormData()
        data.append("image", e.target.files[0])
        axios.post(API_PATH + "files", data)
            .then(res =>{
                setforFile2(res.data.data.id)
            })
    }
    const postBook = (data) => {
        axios.patch(API_PATH + "items/documents/" + props.match.params.id, {
            "name": document.getElementById('n6').value,
            "content": document.getElementById("n7").value,
            "src" : forFile,
            "file": forFile2,
            "date" : item.date
        })
            .then(res => {
                console.log(res)
                setModal(false)
                axios.get(API_PATH + "items/documents/" + props.match.params.id)
                    .then(res=>{
                        setItem(res.data.data)
                    })
            })
    }
    const deleteFc = () => {
        axios.delete(API_PATH + "items/documents/" + props.match.params.id)
            .then(res=>{
                history.push("/personal-documents")
            })
    }
    useEffect(()=>{
        console.log(props.match.params.id)
        axios.get(API_PATH + "items/documents/" + props.match.params.id)
            .then(res=>{
                setItem(res.data.data)

            })


    } , [])
    return (
        <div className="detail min-vh-100 pb-5">
            <div className="container pt-5">
                <div className="row">
                    <div className="col-md-4">
                        <img className="w-100" src={item.file}/>
                            {
                                window.location.pathname.slice(0, 17) === "/detail-documents"
                                    ?
                                    ""
                                    :
                                    <div className="w-100 d-flex justify-content-end mt-3">
                                        <button className="btn btn-secondary mr-3" onClick={toggle}>O'zgartirish</button>
                                        <button className="btn btn-danger" onClick={toggle2}>O'chirish</button>
                                    </div>
                            }
                    </div>
                    <div className="col-md-8">
                        <h2>{item.name} </h2>
                        <p className="text-white">{item.content}</p>
                    </div>
                </div>
            </div>



            <Modal isOpen={modal} toggle={toggle} className={props.className}>

                <div className="d-flex justify-content-between w-100 pl-3 pt-2 pr-3 align-items-center">
                    <h4 className="m-0">Hujjatni kiriting</h4>
                    <button onClick={toggle} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <ModalBody>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        // value={item.name}
                        placeholder="Hujjat nomi"
                        required
                        id="n6"
                    />
                    <textarea
                        name="content"
                        // placeholder="Hujjat haqida"
                        placeholder="Hujjat haqida"
                        type="text"
                        className="form-control mt-3"
                        required
                        id="n7"
                    />
                    <input
                        name="src"
                        className="form-control mt-3"
                        placeholder="Hujjatning rasmi"
                        type="file"
                        required
                        onChange={pic}
                        id="n8"
                    />
                    <input
                        name="file"
                        className="form-control mt-3"
                        placeholder="Hujjat faylini kiriting"
                        type="file"
                        required
                        onChange={pic2}
                        id="n9"
                    />
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary" onClick={postBook}>Saqlash</button>
                    <button type="button" className="btn btn-danger" onClick={toggle}>Bekor qilish</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modal2} toggle={toggle2} className={props.className}>

                <ModalBody>
                    <h2>Rostdan ham o'chirishni istaysizmi</h2>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-danger" onClick={deleteFc}>O'chirish</button>
                    <button type="button" className="btn btn-secondary" onClick={toggle2}>Bekor qilish</button>
                </ModalFooter>
            </Modal>


        </div>
    );
};

export default DetailDocuments;