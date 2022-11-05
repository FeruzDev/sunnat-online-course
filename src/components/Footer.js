import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img src="/img/logo12.png" className="logo" alt=""/>
                    </div>
                    <div className="col-md-3">
                        <h4>Shaxsiy Kutubxona</h4>
                        <ul>
                            <li>
                                <Link to="/personal-videos">
                                    Video
                                </Link>
                            </li>
                            <li>
                                <Link to="/personal-books" >
                                    Kitoblar
                                </Link>
                            </li>
                            <li>
                                <Link to="/personal-articles">
                                    Maqolalar
                                </Link>
                            </li>
                            <li>
                                <Link to="/personal-documents">
                                    Hujjatlar
                                </Link>
                            </li>
                            <li>
                                <Link to="/personal-events">
                                    Tadbirlar
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>Kutubxona</h4>
                        <ul>
                            <li>
                                <Link to="/videos">
                                    Video
                                </Link>
                            </li>
                            <li>
                                <Link to="/books">
                                    Kitoblar
                                </Link>
                            </li>
                            <li>
                                <Link to="/articles">
                                    Maqolalar
                                </Link>
                            </li>
                            <li>
                                <Link to="/documents">
                                    Hujjatlar
                                </Link>
                            </li>
                            <li>
                                <Link to="/events">
                                    Tadbirlar
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>Yangiliklar</h4>
                        <ul>
                            <li>
                                <Link to="/news">
                                    Yangiliklar
                                </Link>
                            </li>
                            <li>
                                <Link to="/personal-news">
                                    Mening yangiliklarim
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;