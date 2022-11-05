import React, {useEffect, useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Modal, ModalBody, ModalFooter
} from 'reactstrap';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "./const";


const NavbarMain = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [auth, setAuth] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const toggle2 = () => {
        setIsOpen2(!isOpen2)
    }
    let history= useHistory()
    const toggle3 = () => {
        setIsOpen2(!isOpen2)
        localStorage.removeItem("email")
        history.push('/login')
        setAuth(false)
        // window.location.reload(true)
    }
    useEffect(() =>{
        axios.get(API_PATH + "auth/users")
            .then(res =>{
                console.log(res.data.data)
                res.data.data.map(item => {

                    if (item.email === localStorage.getItem("email")   )
                    {
                        setAuth(true)
                    }
                })
            })
    }, [ ])
    return (
        <div  className="navbarMain ">
            <div className="container">
                <Navbar  light expand="md">
                    <NavbarBrand href="/"  ><span className="text-white"><img src="/img/logo12.png" className="logo" alt=""/></span></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                {
                                    auth
                                        ?
                                        <DropdownToggle nav caret>
                                            <img src="/img/study.png" className="nav-img" alt=""/>
                                            <span className="text-white">
                                            Shaxsiy Kutubxona</span>
                                        </DropdownToggle>
                                        :
                                        ""
                                }
                                <DropdownMenu  >
                                    <DropdownItem>
                                        <Link to="/personal-videos">
                                            <img src="/img/video-camera.png" className="nav-img" alt=""/>
                                            Video
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/personal-books" >
                                            <img src="/img/book-stack.png" className="nav-img" alt=""/>
                                            Kitoblar
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/personal-articles">
                                            <img src="/img/document.png" className="nav-img" alt=""/>
                                            Maqolalar
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/personal-documents">
                                            <img src="/img/folder.png" className="nav-img" alt=""/>
                                            Hujjatlar
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/personal-events">
                                            <img src="/img/planner.png" className="nav-img" alt=""/>
                                            Tadbirlar
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/personal-courses">
                                            <img src="/img/lr.png" className="nav-img" alt=""/>
                                            Video qo'llanmalar
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <img src="/img/book.png" className="nav-img" alt=""/>

                                    <span className="text-white">Kutubxona</span>
                                </DropdownToggle>
                                <DropdownMenu  >
                                    <DropdownItem>
                                        <Link to="/videos">
                                            <img src="/img/video-camera.png" className="nav-img" alt=""/>
                                            Video
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/books">
                                            <img src="/img/book-stack.png" className="nav-img" alt=""/>
                                            Kitoblar
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/articles">
                                            <img src="/img/document.png" className="nav-img" alt=""/>
                                            Maqolalar
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/documents">
                                            <img src="/img/folder.png" className="nav-img" alt=""/>
                                            Hujjatlar
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/events">
                                            <img src="/img/planner.png" className="nav-img" alt=""/>
                                            Tadbirlar
                                        </Link>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <Link to="/courses">
                                            <img src="/img/lr.png" className="nav-img" alt=""/>
                                            Video qo'llanmalar
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <img src="/img/megaphone.png" className="nav-img" alt=""/>
                                    <span className="text-white">Yangiliklar</span>
                                </DropdownToggle>
                                <DropdownMenu  >
                                    <DropdownItem>
                                        <Link to="/news">
                                            <img src="/img/reading.png" className="nav-img" alt=""/>
                                            Yangiliklar
                                        </Link>
                                    </DropdownItem>
                                    {
                                        auth
                                            ?
                                            <DropdownItem>
                                                <Link to="/personal-news">
                                                    <img src="/img/newspaper.png" className="nav-img" alt=""/>
                                                    Mening yangiliklarim
                                                </Link>
                                            </DropdownItem>
                                            :
                                            ""
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <div className="mt-2 ml-2">
                                    <img src="/img/gr.png" className="nav-img" alt=""/>
                                    <Link className="text-white" to="/groups" >Guruhlar</Link>
                                </div>
                            </NavItem>
                            {
                                auth
                                    ?
                                    <NavItem>
                                        <div className="text-white  mt-2" >
                                            <Link to="/profile" className="profile-btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    </NavItem>
                                    :
                                    ""

                            }

                            {
                                auth
                                    ?
                                   <button onClick={toggle2} className="logout">
                                       <img src="/img/logout.png" alt=""/>
                                   </button>
                                    :
                                    <Link to="/login" className="login">
                                        <img src="/img/login.png" alt=""/>

                                    </Link>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

            <Modal isOpen={isOpen2} toggle={toggle2}>
                <ModalBody>
                    <h3 className="text-center mt-2 mb-2">
                        Rostdan ham chiqmoqchimisiz
                    </h3>
                </ModalBody>
                <ModalFooter>

                    <button type="submit" className="btn btn-primary" onClick={toggle2}>Yo'q</button>
                    <button type="button" className="btn btn-danger" onClick={toggle3}>Ha</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default NavbarMain;