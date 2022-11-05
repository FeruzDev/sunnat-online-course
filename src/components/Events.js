import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "./const";

const Events = () => {
    const [books, setBooks] = useState([])
    const getBooks = () => {
        axios.get(API_PATH + `items/events`)
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
                <h2 className="mt-5">Tadbirlar</h2>
                <div className="row">
                        {
                            books?.map(item =>(
                                <div className="col-md-12 mt-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img className="w-100" src={ item.file }/>
                                        </div>
                                        <div className="col-md-8">
                                            <h3>{item.name?.length > 100 ? item.name?.slice(0, 100) + "..." : item.name}</h3>
                                            <span>{item.date}</span>
                                            <p className="text-white" >{item.content?.length > 200 ? item?.content?.slice(0, 200) + "..." : item.content}</p>
                                            <Link to={`/detail-events/${item.id}`}  >Batafsil...</Link>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                </div>
            </div>
        </div>
    );
};

export default Events;