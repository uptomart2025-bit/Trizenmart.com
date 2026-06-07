import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

const categories = ['Dresses', 'Shirts', 'Jeans', 'Swimwear', 'Sportswear', 'Shoes'];
const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Shop Detail', to: '/product/1' },
  { label: 'Cart', to: '/cart' },
  { label: 'Checkout', to: '/checkout' },
  { label: 'Contact', to: '/contact' },
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/register' }
];

const Navbar = () => (
  <div className="bg-white shadow-sm">
    <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
      <div className="group relative">
        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 min-h-[48px]">
          Categories <FiChevronDown />
        </button>
        <div className="invisible absolute left-0 top-full z-10 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          {categories.map((item) => (
            <Link key={item} to="/shop" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-secondary">
              {item}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="hover:text-primary">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
    <div className="flex overflow-x-auto gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:hidden">
      {categories.map((item) => (
        <Link
          key={item}
          to="/shop"
          className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
          {item}
        </Link>
      ))}
    </div>
  </div>
);

export default Navbar;
