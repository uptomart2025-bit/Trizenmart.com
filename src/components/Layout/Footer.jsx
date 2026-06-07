import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-slate-950 text-slate-300">
    <div className="container mx-auto grid gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">E-Shopper</h3>
        <p className="text-sm leading-6 text-slate-400">
          Fast checkout, transparent order tracking, and a mobile-friendly storefront built for modern shoppers.
        </p>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-white">Company</h4>
        <div className="space-y-2 text-sm text-slate-400">
          <Link to="/shop" className="block transition hover:text-white">About</Link>
          <Link to="/contact" className="block transition hover:text-white">Careers</Link>
          <Link to="/" className="block transition hover:text-white">Blog</Link>
          <Link to="/contact" className="block transition hover:text-white">Contact</Link>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-white">Contact</h4>
        <p className="text-sm text-slate-400">123 Rose Avenue, Tech City</p>
        <p className="text-sm text-slate-400">support@eshopper.com</p>
        <p className="text-sm text-slate-400">+1 (555) 123-4567</p>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-white">Newsletter</h4>
        <p className="text-sm text-slate-400">Get early access to new collections and promo offers.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="Email address" className="flex-1 rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" />
          <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]">Subscribe</button>
        </div>
      </div>
    </div>
    <div className="border-t border-slate-800 bg-slate-900 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm sm:flex-row sm:px-8">
        <p className="text-slate-500">© 2026 E-Shopper. All rights reserved.</p>
        <div className="flex items-center gap-4 text-slate-400">
          <FaFacebookF className="transition hover:text-white" />
          <FaTwitter className="transition hover:text-white" />
          <FaInstagram className="transition hover:text-white" />
          <FaPinterest className="transition hover:text-white" />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
