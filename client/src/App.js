import './App.css';
import React from 'react'
import ReactDOM from 'react-dom'
import Home from "./pages/home";
import CreateEvent from "./pages/Organization/CreateEvent";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import RegistrateOrganization from "./pages/Organization/RegistrateOrganization";
import RegistrateVolontier from "./pages/Volontiers/RegistrateVolontier";
import LoginVolontier from "./pages/Volontiers/LoginVolontier";
import LoginOrganization from "./pages/Organization/LoginOrganization";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import RegistrateAdmin from "./pages/Admin/RegistrateAdmin";
import GetOrganizationEvents from "./pages/Organization/GetOrganizationEvents";
import GetById from "./pages/Organization/GetById";
import SubscribeUnsubscribe from "./pages/Volontiers/Subscribe&Unsubscribe";

function App() {
    return (
        <div className="App">
        <Router>
            <Link to="/"> Home </Link>
            <br/>
            <Link to="/organization/createEvent"> Create a Event </Link>
            <br/>
            <Link to="/registrateAdmin"> Register admin </Link>
            <br/>
            <Link to="/registrateVolontier"> Register volontier </Link>
            <br/>
            <Link to="/registrateOrganization"> Register organization</Link>
            <br/>
            <Link to="/loginAdmin"> Login admin </Link>
            <br/>
            <Link to="/loginVolontier"> Login volontier </Link>
            <br/>
            <Link to="/loginOrganization"> Login organization </Link>
            <br/>
            <Link to="/getEvents"> GetOrganizationEvents </Link>


            <Routes>
                <Route path="/"  element={<Home/>} />
                <Route path="/organization/createEvent"  element={<CreateEvent/>} />
                <Route path="/registrateAdmin" element={<RegistrateAdmin/>}/>
                <Route path="/registrateVolontier" element={<RegistrateVolontier/>}/>
                <Route path="/registrateOrganization" element={<RegistrateOrganization/>}/>
                <Route path="/loginAdmin" element={<LoginAdmin/>}/>
                <Route path="/loginVolontier" element={<LoginVolontier/>}/>
                <Route path="/loginOrganization" element={<LoginOrganization/>}/>
                <Route path="/getEvents" element={<GetOrganizationEvents/>}/>
                <Route path="/getEvents/:id" element={<GetById/>}/>
                <Route path="/event/:id" element={<SubscribeUnsubscribe/>}/>
            </Routes>
        </Router>
    </div>
    );
}

export default App;
