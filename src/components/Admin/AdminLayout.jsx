import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RxDashboard } from 'react-icons/rx';
import { FiShoppingBag } from 'react-icons/fi';
import { GrWorkshop } from 'react-icons/gr';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsHandbag } from 'react-icons/bs';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { CiMoneyBill } from 'react-icons/ci';
import { AiOutlineSetting } from 'react-icons/ai';
import { logout } from '../../redux/slices/userSlice.js';
import { logout as logoutRequest } from '../../lib/auth.js';

const items = [
  { label: 'Dashboard', to: '/admin', icon: RxDashboard },
  { label: 'All Orders', to: '/admin/orders', icon: FiShoppingBag },
  { label: 'All Users', to: '/admin/users', icon: HiOutlineUserGroup },
  { label: 'All Products', to: '/admin/products', icon: BsHandbag },
  { label: 'Events', to: '/admin', icon: MdOutlineLocalOffer },
  { label: 'Withdraw Requests', to: '/admin', icon: CiMoneyBill },
  { label: 'Settings', to: '/admin', icon: AiOutlineSetting }
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.current);

  const handleLogout = async () => {
    await logoutRequest();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
    <div className="flex min-h-screen">
      <aside className="w-72 border-r border-slate-200 bg-white p-6">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-dark">E-Shopper</h2>
          <p className="mt-2 text-sm text-slate-500">Admin portal</p>
        </div>
        <nav className="space-y-2">
          {items.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-[#DC143C]/10 text-[#DC143C]' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-lg font-semibold">Admin Dashboard</div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-2">
              <span className="h-10 w-10 rounded-full bg-slate-200"></span>
              <div>
                <p className="text-sm font-semibold">{user?.name || 'Admin'}</p>
                <p className="text-xs text-slate-500">{user?.role || 'Super user'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-full bg-[#DC143C] px-5 py-2 text-sm font-semibold text-white hover:bg-[#b31234]"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  </div>
  );
};

export default AdminLayout;
