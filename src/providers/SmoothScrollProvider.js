"use client";

import { ReactLenis } from 'lenis/react';

export const SmoothScrollProvider = ({ children }) => {
    return (
        <ReactLenis root options={{ smoothTouch: true, lerp: 0.1, duration: 1.5 }}>
            {children}
        </ReactLenis>
    );
};
