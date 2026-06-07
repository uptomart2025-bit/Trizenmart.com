import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiShoppingCart, FiSearch, FiChevronDown } from 'react-icons/fi';
import { logout as logoutRequest } from '../../lib/auth.js';
import { logout } from '../../redux/slices/userSlice.js';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.current);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
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
    <div className="border-b border-slate-200 py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 gap-4">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold text-dark">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-primary">E</span>
          E-Shopper
        </Link>
        <div className="relative flex-1 max-w-xl">
          <FiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <Link to="/wishlist" className="relative flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 hover:border-primary hover:text-primary">
            <FiHeart /> Wishlist
            {wishlistCount > 0 && <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-primary/10 px-4 py-2 text-primary hover:bg-primary/15">
            <FiShoppingCart /> Cart
            {cartCount > 0 && <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-dark text-xs text-white">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-primary"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
                <span>{user.name}</span>
                <FiChevronDown className="h-4 w-4" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-3xl border border-slate-200 bg-white shadow-xl">
                  <div className="space-y-2 p-4 text-sm text-slate-700">
                    <div className="rounded-3xl bg-slate-50 p-3">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Link to="/profile" className="block rounded-3xl px-4 py-3 hover:bg-secondary">Profile</Link>
                    <Link to="/orders" className="block rounded-3xl px-4 py-3 hover:bg-secondary">My Orders</Link>
                    <Link to="/track" className="block rounded-3xl px-4 py-3 hover:bg-secondary">Track Orders</Link>
                    <button onClick={handleLogout} className="w-full rounded-3xl bg-[#DC143C] px-4 py-3 text-left text-sm font-semibold text-white hover:bg-[#b31234]">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link className="rounded-full border border-slate-200 px-4 py-2 text-sm hover:border-primary hover:text-primary" to="/login">Login</Link>
              <Link className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#BD8E88]" to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
