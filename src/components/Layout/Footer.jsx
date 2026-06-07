import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => (
  <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
    <div className="container mx-auto grid gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <h3 className="text-xl font-bold text-dark">E-Shopper</h3>
        <p className="mt-3 text-sm text-slate-600">Trusted e-commerce experience with curated products, fast shipping and secure checkout.</p>
      </div>
      <div>
        <h4 className="mb-3 font-semibold text-slate-900">Company</h4>
        <div className="space-y-2 text-sm">
          <Link to="/shop" className="block hover:text-primary">About</Link>
          <Link to="/contact" className="block hover:text-primary">Careers</Link>
          <Link to="/" className="block hover:text-primary">Blog</Link>
          <Link to="/contact" className="block hover:text-primary">Contact</Link>
        </div>
      </div>
      <div>
        <h4 className="mb-3 font-semibold text-slate-900">Contact</h4>
        <p className="text-sm">123 Rose Avenue, Tech City</p>
        <p className="mt-2 text-sm">support@eshopper.com</p>
        <p className="mt-2 text-sm">+1 (555) 123-4567</p>
      </div>
      <div>
        <h4 className="mb-3 font-semibold text-slate-900">Newsletter</h4>
        <p className="mb-3 text-sm text-slate-600">Subscribe for new arrivals and offers.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Email address" className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm" />
          <button className="rounded-full bg-dark px-4 py-2 text-sm text-white">Sign up</button>
        </div>
      </div>
    </div>
    <div className="border-t border-slate-200 bg-white py-4">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm sm:flex-row">
        <p>© 2026 E-Shopper. All rights reserved.</p>
        <div className="flex items-center gap-3 text-slate-600">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaPinterest />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
