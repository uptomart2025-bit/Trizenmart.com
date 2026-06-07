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
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold text-slate-900">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-primary text-lg font-semibold text-white">E</span>
          <span className="tracking-tight">E-Shopper</span>
        </Link>

        <div className="flex-1 min-w-[240px] max-w-2xl">
          <label className="relative block">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search products, brands, categories"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <div className="flex items-center gap-3 text-slate-700">
          <Link
            to="/wishlist"
            className="relative inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
          >
            <FiHeart className="h-4 w-4" />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-200 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/15"
          >
            <FiShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-primary"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
                <span>{user.name}</span>
                <FiChevronDown className="h-4 w-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-56 rounded-3xl border border-slate-200 bg-white shadow-xl">
                  <div className="space-y-2 p-4 text-sm text-slate-700">
                    <div className="rounded-3xl bg-slate-50 p-3">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Link to="/profile" className="block rounded-3xl px-4 py-3 hover:bg-slate-100">Profile</Link>
                    <Link to="/orders" className="block rounded-3xl px-4 py-3 hover:bg-slate-100">My Orders</Link>
                    <Link to="/track" className="block rounded-3xl px-4 py-3 hover:bg-slate-100">Track Orders</Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-3xl bg-[#DC143C] px-4 py-3 text-left text-sm font-semibold text-white hover:bg-[#b31234]"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary">
                Login
              </Link>
              <Link to="/register" className="rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
