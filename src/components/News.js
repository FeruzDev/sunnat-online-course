import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import {API_PATH} from "./const";

const News = (props) => {
    const [books, setBooks] = useState([])

    const getBooks = () => {
        axios.get(API_PATH + `items/news`)
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
                    <h2 className="mt-5">Yangiliklar</h2>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            books?.map(item =>(
                                <div className="col-md-12 ">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img  src={item.file}/>
                                        </div>
                                        <div className="col-md-8">
                                            <h3>{item.name?.length > 100 ? item.name?.slice(0, 100) + "..." : item.name}</h3>
                                            <span>{item.date}</span>
                                            <p className="text-white" >{item.content?.length > 200 ? item?.content?.slice(0, 200) + "..." : item.content}</p>
                                            <Link to={`/detail-news-global/${item.id}`}  >Batafsil...</Link>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default News;