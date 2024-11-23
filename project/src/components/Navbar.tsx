import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, BookMarked } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <Plane className="w-8 h-8 text-indigo-600" />
            </motion.div>
            <span className="text-xl font-bold text-gray-800">AasaiPath AI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <NavLink to="/" current={location.pathname === "/"}>
              Plan Trip
            </NavLink>
            <NavLink to="/saved" current={location.pathname === "/saved"}>
              <BookMarked className="w-5 h-5 mr-1" />
              Saved
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, current }: { to: string; children: React.ReactNode; current: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        current
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;