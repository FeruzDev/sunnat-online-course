import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "./const";

const Documents = () => {
    const [books, setBooks] = useState([])
    const getBooks = () => {
        axios.get(API_PATH + `items/documents`)
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
                <h2 className="mt-5">Hujjatlar</h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            books?.map(item =>(
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={item.file}/>
                                        </div>
                                        <div className="col-md-8">
                                            <h3>{item.name}</h3>
                                            <span>{item.date}</span>
                                            <p className="text-white" >{item.content.length > 200 ? item.content.slice(0, 200) + "..." : item.content}</p>
                                            <Link to={`/detail-documents/${item.id}`}  >Batafsil...</Link>

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

export default Documents;