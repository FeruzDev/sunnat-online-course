import React from 'react';
import NavbarMain from "./Navbar";
import Login from "./Login";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Books from "./Books";
import PersonalBooks from "./PersonalBooks";
import Videos from "./Videos";
import PersonalVideos from "./PersonalVideos";
import Articles from "./Articles";
import PersonalArticles from "./PersonalArticles";
import Documents from "./Documents";
import PersonalDocuments from "./PersonalDocuments";
import Events from "./Events";
import PersonalEvents from "./PersonalEvents";
import Plans from "./Plans";
import PersonalPlans from "./PersonalPlans";
import news from "./News";
import PersonalNews from "./PersonalNews";
import News from "./News";
import Groups from "./Groups.js";
import MyGroups from "./MyGroups";
import Profile from "./Profile";
import Detail from "./Detail";
import DetailVideo from "./DetailVideo";
import DetailArticles from "./DetailArticles";
import DetailDocuments from "./DetailDocuments";
import DetailEvents from "./DetailEvents";
import GroupDetail from "./GroupDetail";
import Registration from "./Registration";
import DetailNews from "./DetailNews";
import Footer from "./Footer";
import RegistrationMain from "./RegistrationMain";
import DetailNewsGlobal from "./DetailNewsGlobal";
import DetailBooks from "./DetailBooks";
import Courses from "./Courses";
import PersonalCourses from "./PersonalCourses";
import DetailCourses from "./DetailCourses";
import Personal2Course from "./Personal2Course";
import MainPage from "./MainPage";

const MainLayout = () => {
    return (
        <div className="mainLayout">
            <BrowserRouter>
                {
                    window.location.pathname === "/login" || window.location.pathname === "/registration" ? "" : <NavbarMain/>
                }
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/registration" component={RegistrationMain}/>
                    <Route exact path="/books" component={Books}/>
                    <Route exact path="/personal-books" component={PersonalBooks}/>
                    <Route exact path="/videos" component={Videos}/>
                    <Route exact path="/courses" component={Courses}/>
                    <Route exact path="/personal-videos" component={PersonalVideos}/>
                    <Route exact path="/personal-courses" component={PersonalCourses}/>
                    <Route exact path="/articles" component={Articles}/>
                    <Route exact path="/personal-articles" component={PersonalArticles}/>
                    <Route exact path="/documents" component={Documents}/>
                    <Route exact path="/personal-documents" component={PersonalDocuments}/>
                    <Route exact path="/events" component={Events}/>
                    <Route exact path="/personal-events" component={PersonalEvents}/>
                    <Route exact path="/plans" component={Plans}/>
                    <Route exact path="/personal-plans" component={PersonalPlans}/>
                    <Route exact path="/news" component={News}/>
                    <Route exact path="/personal-news" component={PersonalNews}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/detail/:id" component={DetailBooks}/>
                    <Route exact path="/detail-global/:id" component={Detail}/>
                    <Route exact path="/detail-video/:id" component={DetailVideo}/>
                    <Route exact path="/detail-course/:id" component={DetailCourses}/>
                    <Route exact path="/detail-course-global/:id" component={Personal2Course}/>
                    <Route exact path="/detail-video-global/:id" component={DetailVideo}/>
                    <Route exact path="/detail-articles/:id" component={DetailArticles}/>
                    <Route exact path="/detail-documents/:id" component={DetailDocuments}/>
                    <Route exact path="/detail-news/:id" component={DetailNews}/>
                    <Route exact path="/detail-news-global/:id" component={DetailNewsGlobal}/>
                    <Route exact path="/detail-events/:id" component={DetailEvents}/>
                    <Route exact path="/detail-group/:id" component={GroupDetail}/>
                    <Route exact path="/groups" component={Groups}/>
                    <Route exact path="/groups/my-groups" component={MyGroups}/>

                </Switch>
                {
                    window.location.pathname === "/login" || window.location.pathname === "/registration" ? "" : <Footer/>
                }

            </BrowserRouter>

        </div>
    );
};

export default MainLayout;