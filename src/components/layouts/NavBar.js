"use client"
import React from 'react'
import { FaEquals } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
const NavBar = ({menuOpen, setMenuOpen}) => {
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".nav-bar h1", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
        tl.fromTo(".nav-bar span", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "<");
    }, []);
    return (
        <div className="nav-bar w-full flex items-center justify-between p-4 text-white">
            <h1 className="text-3xl cursor-pointer">MV</h1>
            <span onClick={() => {setMenuOpen(!menuOpen)}} className="text-3xl cursor-pointer">
                {menuOpen ? <RxCross1 /> : <FaEquals />}
            </span>
        </div>
    )
}

export default NavBar