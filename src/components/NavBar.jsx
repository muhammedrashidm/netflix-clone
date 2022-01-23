import React from 'react'
import './navbar.css'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';




export default function NavBar(props) {

    //state var for showing and hiding nav bar by scrolling
    const [show, handleShow] = useState(false);
    const history = useHistory()

    const transistionNavBar = () => {
        //  scrollY > 100 will set the state var if user scroll more than 100
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false)
        }
    }




    //  uses to listen and set state for showNav
    useEffect(() => {
        window.addEventListener("scroll", transistionNavBar);
        return () => window.removeEventListener('scroll', transistionNavBar)
    }, []);
    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <div className="nav_content">

                <img onClick={() => history.push('/')} className="nav_logo" src="/logo.png" alt="" />

                <div class="search-box">
                    <button onClick={() => history.push('/searchresult')} class="btn-search"><i class="fas fa-search"></i></button>
                    <input type="text" class="input-search" placeholder="Type to Search..."></input>
                </div>

                <img onClick={() => history.push('/profile')}
                    className="nav_avatar" src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="" />

            </div>
        </div>
    )
}
