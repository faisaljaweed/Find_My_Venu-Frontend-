import { useEffect, useState } from "react";
import Header from "./Header";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = (event: MouseEvent) => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && !sidebar.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Attach and detach event listener
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 bg-gray-700 text-white rounded fixed top-4 left-4 z-50"
        onClick={(e) => {
          e.stopPropagation(); // Stop event from bubbling to window
          setIsOpen(!isOpen);
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar fixed md:static bg-gray-900 text-white w-64 h-screen p-5 transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <Header />
        {/* <ul>
          <li className="p-2 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
            Home
          </li>
          <li className="p-2 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
            About
          </li>
          <li className="p-2 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
            Contact
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
