import { Outlet } from 'react-router-dom';
import Topbar from './Topbar.jsx';
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Layout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Topbar />
    <Header />
    <Navbar />
    <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
