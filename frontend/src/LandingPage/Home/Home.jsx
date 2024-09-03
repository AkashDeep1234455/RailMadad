import { Outlet } from "react-router-dom";
import "./Home.css"

import Footer from "../Footer/Footer.jsx"
import Navbar from "../Navbar/Navbar.jsx"
import Form from "../Form/Form.jsx"

export default function Home(){

    return(
        <>
            <div className="mainContainer">
                <Navbar/>
                <Form/>
                <Footer/>
            </div>

        </>
    )
}