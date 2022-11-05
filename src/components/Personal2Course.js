import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH} from "./const";
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import {useHistory} from "react-router-dom";

const Personal2Course = (props) => {
    const [item, setItem] = useState({})
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [forFile, setforFile] = useState(item?.src)
    const [forFile2, setforFile2] = useState(item?.file)

    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
    let history = useHistory();
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
        newData.append("name", document.getElementById('n6').value)
        newData.append(  "avtor", localStorage.getItem("email"))
        newData.append(  "date" , date  )
        newData.append("file", forFile)
        axios.patch(API_PATH + "items/course/" + props.match.params.id + "/update", {
            "name": document.getElementById('n6').value,
            // "content": document.getElementById("n7").value,
            "src" : forFile,
            // "file": forFile2,
            "date" : item.date
        })
            .then(res => {
                console.log(res)
                setModal(false)
                axios.get(API_PATH + "items/course/" + props.match.params.id)
                    .then(res=>{
                        setItem(res.data.data)
                    })
            })
    }
    const deleteFc = () => {
        axios.delete(API_PATH + "items/course/" + props.match.params.id + "/delete")
            .then(res=>{
                history.push("/personal-course")
            })
    }
    useEffect(()=>{
        console.log(props.match.params.id)
        axios.get(API_PATH + "items/course/" + props.match.params.id )
            .then(res=>{
                setItem(res.data.data)
            })
    } , [])
    return (
        <div className="detail min-vh-100 pb-5">
            <div className="container pt-5 min-vh-100">
                <div className="row">
                    <div className="col-md-4">
                        <video controls   className="w-100" src={item?.src}/>


                    </div>
                    <div className="col-md-8">
                        <h2>{item?.name}</h2>
                        {/*<p  className="text-white">{item.content}</p>*/}
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} className={props.className}>

                <div className="d-flex justify-content-between w-100 pl-3 pt-2 pr-3 align-items-center">
                    <h4 className="m-0">Videoni kiriting</h4>
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
                        placeholder={item?.name}
                        required
                        id="n6"
                    />
                    <input
                        name="src"
                        className="form-control mt-3"
                        placeholder="Videoning rasmi"
                        type="file"
                        required
                        onChange={pic}
                        id="n8"
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

export default Personal2Course;