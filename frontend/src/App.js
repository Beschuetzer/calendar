import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation/Navigation.jsx";
import Login from "./components/Login/Login.jsx";
import Calendar from "./components/Calendar/Calendar.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Register from "./components/Register/Register.jsx";
import LoginToast from "./components/Login/LoginToast";
import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setShouldResetToastTimeout, setShouldShowToast} from "./modules/home";

function App() {
    return (
        <BrowserRouter>
            <LoginToast
                position={"middle-center"}
            />
            <Navigation text={"Assignment 2"}>
                <small>React-Redux</small>
            </Navigation>
            <Container>
                <Routes>
                    <Route path={"/"} element={<Login/>}></Route>
                    <Route path={"logout"} element={<Logout/>}></Route>
                    <Route path={"register"} element={<Register/>}></Route>
                    <Route path={"calendar"} element={<Calendar/>}></Route>
                    <Route path={"*"} element={<Login/>}></Route>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
