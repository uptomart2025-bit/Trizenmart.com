import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { logout as logoutRequest } from '../../lib/auth.js';
import { logout } from '../../redux/slices/userSlice.js';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', to: '/contact' },
  { label: 'Orders', to: '/orders' }
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.current);
  const cartCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutRequest();
    dispatch(logout());
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white">E</span>
          <div>
            <div className="text-lg font-bold">E-Shopper</div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Modern ecommerce</div>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-3 text-slate-700 transition hover:bg-slate-100 sm:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>

        <nav className={`w-full sm:flex sm:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 shadow-sm sm:flex-row sm:items-center sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block rounded-full px-4 py-2 transition ${isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 hover:text-slate-900'}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 text-sm sm:flex">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <FiShoppingCart className="h-4 w-4" />
            Cart ({cartCount})
          </Link>
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
