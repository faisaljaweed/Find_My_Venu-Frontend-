// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-6">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         <div className="text-left">
//           <h2 className="text-2xl font-bold">FindMyVenue</h2>
//         </div>
//         <div className="text-right">
//           <p className="text-sm">
//             &copy; {new Date().getFullYear()} FindMyVenue. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-36 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white font-serif mb-4">
              Lux Estates
            </h3>
            <p className="mb-4 text-gray-400 text-sm">
              We specialize in luxury real estate, offering exceptional
              properties to discerning clients worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white font-semibold mb-4">Properties</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Luxury Villas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Penthouses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Beachfront Homes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Vacation Rentals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Commercial Property
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 text-amber-400 flex-shrink-0 mt-0.5"
                />
                <span className="text-sm">
                  1234 Luxury Lane, Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={18}
                  className="mr-2 text-amber-400 flex-shrink-0"
                />
                <span className="text-sm">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-amber-400 flex-shrink-0" />
                <span className="text-sm">info@luxestates.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-36 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2025 Lux Estates. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
