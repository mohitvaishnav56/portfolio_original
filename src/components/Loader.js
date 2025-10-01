"use client"
import React, { useRef } from 'react'
import Circle from './specific/loader/Circle'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase';

const Loader = ({ setLoading }) => {
    gsap.registerPlugin(CustomEase);
    const container = useRef(null);
    const hideLoader = () => {
        setLoading(false);
    }
    CustomEase.create("powerOut", "M0,0 C0.1,0.7 0.25,1 1,1");
    useGSAP(() => {
        const circles = Array.from(document.querySelectorAll('.circle'));
        const targetCircle = circles[circles.length - 1];
        const updatedCircles = circles.slice(0, circles.length - 1);
        const tl = gsap.timeline();
        circles.forEach((circle, index) => {
            const delay = index * 0.2; // Stagger the start time for each circle
            const scale = 1 + index * 0.2; // Increase scale for each circle
            gsap.set(circle, { scale: scale });
            gsap.to(circle, {
                y: -20,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                duration: 0.6,
                delay: delay
            });
        });
        tl.to(targetCircle, {
            scale: 100, // Scale up massively to cover the viewport
            duration: 1.5,
            ease: 'powerOut',
            onComplete: () => {
                gsap.to(container.current, { autoAlpha: 0 });
                hideLoader();
            }
        }, "+=10");

        tl.to(updatedCircles, {
            opacity: 0,
            duration: 0.5
        }, "<");

    }, [{ scope: container.current }]);
    return (
        <div ref={container} className='h-screen w-full bg-black'>
            <div className='flex gap-3 justify-center items-center h-full w-full'>
                <Circle className={`bg-pink-300`} />
                <Circle className={`bg-purple-400`} />
                <Circle className={`bg-green-300`} />
                <Circle className={`bg-white`} />
            </div>
        </div>
    )
}

export default Loader