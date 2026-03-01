"use client";

import { ReactLenis } from '@studio-freight/react-lenis';

export const SmoothScrollProvider = ({ children }) => {
    return (
        <ReactLenis root options={{ smoothTouch: true, lerp: 0.1, duration: 1.5 }}>
            {children}
        </ReactLenis>
    );
};
