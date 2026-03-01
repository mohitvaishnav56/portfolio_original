"use client"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { useDispatch } from "react-redux"

const MenuBar = ({ menuOpen, setMenuOpen }) => {
    const menuRef = useRef(null)
    const linksRef = useRef([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (menuOpen) {
            gsap.to(menuRef.current, {
                height: "100%",
                opacity: 1,
                duration: 0.8,
                ease: "power4.out"
            })

            gsap.fromTo(
                linksRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    delay: 0.2,
                    duration: 0.8,
                    ease: "power4.out"
                }
            )
        } else {
            gsap.to(menuRef.current, {
                height: "0%",
                opacity: 0,
                duration: 0.6,
                ease: "power4.in"
            })
        }
    }, [menuOpen])

    const scrollToSection = (id) => {
        if (id === "projects") {
            dispatch({ type: 'projects/setFilter', payload: 'All' });
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    const menuItems = [
        { name: "Home", id: "hero" },
        { name: "About", id: "about" },
        { name: "Resume", id: "resume" },
        { name: "Work", id: "projects" },
        { name: "Contact", id: "contact" }
    ];

    return (
        <div
            ref={menuRef}
            className="menu-bar fixed w-full h-0 opacity-0 z-40 bg-[var(--bg-color)] top-0 left-0 overflow-hidden"
        >
            <div className="flex flex-col items-center justify-center h-full gap-8 text-white pb-10">
                {menuItems.map((item, i) => (
                    <span
                        key={i}
                        ref={(el) => (linksRef.current[i] = el)}
                        onClick={() => scrollToSection(item.id)}
                        className="cursor-pointer text-5xl md:text-7xl font-black uppercase tracking-tighter relative group"
                    >
                        <span className="relative z-10 transition-colors duration-300 hover:text-transparent hover:[-webkit-text-stroke:2px_white]">
                            {item.name}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default MenuBar
