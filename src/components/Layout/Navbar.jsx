import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiShoppingCart, FiUser } from 'react-icons/fi';

const categories = ['Dresses', 'Shirts', 'Jeans', 'Swimwear', 'Sportswear', 'Shoes'];
const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Cart', to: '/cart' },
  { label: 'Checkout', to: '/checkout' },
  { label: 'Contact', to: '/contact' }
];

const Navbar = () => (
  <nav className="bg-white shadow-sm">
    <div className="container mx-auto hidden items-center justify-between gap-6 px-4 py-4 sm:flex sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-3">
        {categories.slice(0, 5).map((item) => (
          <Link
            key={item}
            to="/shop"
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="transition hover:text-primary">
            {link.label}
          </Link>
        ))}
      </div>
    </div>

    <div className="sticky bottom-0 z-40 flex items-center justify-between gap-2 overflow-x-auto border-t border-slate-200 bg-white px-4 py-3 text-slate-700 sm:hidden">
      <Link to="/" className="inline-flex min-w-[72px] flex-col items-center justify-center gap-1 rounded-3xl bg-slate-50 px-3 py-3 text-[0.75rem] font-semibold text-slate-700 transition hover:bg-primary/10 hover:text-primary">
        <FiHome className="h-5 w-5" />
        Home
      </Link>
      <Link to="/shop" className="inline-flex min-w-[72px] flex-col items-center justify-center gap-1 rounded-3xl bg-slate-50 px-3 py-3 text-[0.75rem] font-semibold text-slate-700 transition hover:bg-primary/10 hover:text-primary">
        <FiShoppingBag className="h-5 w-5" />
        Shop
      </Link>
      <Link to="/cart" className="inline-flex min-w-[72px] flex-col items-center justify-center gap-1 rounded-3xl bg-slate-50 px-3 py-3 text-[0.75rem] font-semibold text-slate-700 transition hover:bg-primary/10 hover:text-primary">
        <FiShoppingCart className="h-5 w-5" />
        Cart
      </Link>
      <Link to="/profile" className="inline-flex min-w-[72px] flex-col items-center justify-center gap-1 rounded-3xl bg-slate-50 px-3 py-3 text-[0.75rem] font-semibold text-slate-700 transition hover:bg-primary/10 hover:text-primary">
        <FiUser className="h-5 w-5" />
        Account
      </Link>
    </div>
  </nav>
);

export default Navbar;
