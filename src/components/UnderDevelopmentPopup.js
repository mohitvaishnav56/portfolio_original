import React from 'react';

/**
 * A modal popup (using Tailwind CSS) to indicate the site is under development.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls if the popup is visible.
 * @param {function} props.onClose - Function to call when the popup should close.
 */
function UnderDevelopmentPopup({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  // --- Theme Colors from your Portfolio ---
  // const darkBg = '#2a2f36';     (Dark background)
  // const tealAccent = '#86c4c2';  (Teal from "Mohit Vaishnav")
  // const rustButton = '#b95a45';  (Rusty red from "Get Resume")

  // Prevent closing when clicking inside the popup
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay: Covers the whole screen with a semi-transparent black
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      {/* Popup Modal */}
      <div
        className="w-11/12 max-w-md rounded-lg border border-[#86c4c2] bg-[#2a2f36] p-8 text-center shadow-xl"
        onClick={handlePopupClick}
      >
        {/* Heading: Styled with the teal accent color */}
        <h2 className="mb-4 text-3xl font-bold text-[#86c4c2]">
          Under Development
        </h2>

        {/* --- UPDATED MESSAGE HERE --- */}
        <p className="mb-8 leading-relaxed text-gray-100">
          Thanks for visiting! Some sections of this portfolio are complete,
          while others are still under active development. Please feel free to
          look around!
        </p>

        {/* Button: Styled with the rusty-red accent color */}
        <button
          className="rounded bg-[#b95a45] py-3 px-6 font-bold text-white transition-transform duration-200 ease-in-out hover:scale-105"
          onClick={onClose}
        >
          Got It
        </button>
      </div>
    </div>
  );
}

export default UnderDevelopmentPopup;