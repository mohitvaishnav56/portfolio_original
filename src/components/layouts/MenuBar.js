"use client"
import React, { useEffect, useRef } from "react"
import NavBar from "./NavBar"
import gsap from "gsap"

const MenuBar = ({ menuOpen, setMenuOpen }) => {
    const menuRef = useRef(null)
    const linksRef = useRef([])

    useEffect(() => {
        if (menuOpen) {
            gsap.to(menuRef.current, {
                height: "100%",
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            })

            gsap.fromTo(
                linksRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    delay: 0.3,
                    duration: 0.8,
                    ease: "power3.out"
                }
            )
        } else {
            gsap.to(menuRef.current, {
                height: "0%",
                opacity: 0,
                duration: 0.6,
                ease: "power3.in"
            })
        }
    }, [menuOpen])

    const menuItems = ["Home", "About", "Projects", "Blogs", "Contact"]

    return (
        <div
            ref={menuRef}
            className="menu-bar absolute w-full h-0 opacity-0 z-50 bg-[#853D39] top-0 left-0 overflow-hidden"
        >
            <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className="flex flex-col items-center justify-center pt-15 gap-10 text-white">
                {menuItems.map((item, i) => (
                    <span
                        key={i}
                        ref={(el) => (linksRef.current[i] = el)}
                        className="cursor-pointer text-4xl md:text-6xl font-bold uppercase tracking-widest relative group"
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#CC8D59]">
                            {item}
                        </span>
                        {/* underline hover animation */}
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#CC8D59] transition-all duration-500 group-hover:w-full"></span>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default MenuBar
