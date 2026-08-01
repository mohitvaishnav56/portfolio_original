"use client";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import "./globals.css";
import NavBar from "@/components/layouts/NavBar";
import { useState } from "react";
import MenuBar from "@/components/layouts/MenuBar";
import { Provider } from "react-redux";
import store from "@/store";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <html lang="en" className={`${outfit.variable} overflow-x-hidden`}>
      <body
        className={`overflow-x-hidden relative font-[family-name:var(--font-outfit)] ${
          menuOpen ? "overflow-hidden" : ""
        }`}
      >
        <SmoothScrollProvider>
          <Provider store={store}>
            <div className="grain-overlay" aria-hidden="true" />
            <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <MenuBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            {children}
          </Provider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
