import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center relative">
        <Link to="/" className="text-2xl font-bold text-blue-600">Seller Hub</Link>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className={`md:flex md:items-center space-x-4 absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-16 px-4 md:px-0 py-2 md:py-0 ${menuOpen ? 'block' : 'hidden'} md:block`}>
          {/* 👇 Home Button */}
          <Link to="/" className="text-blue-600 font-semibold block md:inline-block mb-2 md:mb-0">
            Home
          </Link>

          {user && (
            <Link to="/add-product" className="text-blue-600 font-semibold block md:inline-block mb-2 md:mb-0">
              Add New Product
            </Link>
          )}

          {user ? (
            <>
              <span className="text-gray-700 block md:inline-block">{user.name}</span>
              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded block md:inline-block mt-2 md:mt-0">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-3 py-1 rounded">
              Login / Signup
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
