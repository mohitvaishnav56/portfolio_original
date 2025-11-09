import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#CD9061]">
            Mohit Vaishnav
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            Crafting Digital Experiences.
          </p>
        </div>

        {/* Contact */}
        <div className="md:text-right">
          <h2 className="text-2xl font-semibold text-white">Contact Me</h2>
          <div className="flex md:justify-end gap-5 mt-4 text-3xl text-gray-300">
            <Link href="#" className="hover:text-[#CD9061] transition">
              <FaGithub />
            </Link>
            <Link href="#" className="hover:text-[#CD9061] transition">
              <FaLinkedin />
            </Link>
            <Link href="#" className="hover:text-[#CD9061] transition">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 py-5 border-t border-gray-400">
        © {year} Mohit Vaishnav. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
