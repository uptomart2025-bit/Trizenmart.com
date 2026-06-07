import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Topbar = () => (
  <div className="bg-secondary text-sm text-slate-700">
    <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2">
      <div className="flex items-center gap-3">
        <span>Follow us:</span>
        <FaFacebookF className="h-4 w-4" />
        <FaTwitter className="h-4 w-4" />
        <FaInstagram className="h-4 w-4" />
      </div>
      <div className="flex flex-wrap gap-4">
        <span>FAQs</span>
        <span>Help</span>
        <span>Support</span>
      </div>
    </div>
  </div>
);

export default Topbar;
