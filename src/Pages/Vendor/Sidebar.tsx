import { useState } from "react";
import Header from "./Header";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 bg-gray-700 text-white rounded fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static bg-gray-900 text-white w-64 h-screen p-5 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <Header />
      </div>
    </div>
  );
};

export default Sidebar;
