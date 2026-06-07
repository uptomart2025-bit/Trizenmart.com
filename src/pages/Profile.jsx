import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice.js';
import { updateProfile } from '../lib/auth.js';

const Profile = () => {
  const user = useSelector((state) => state.user.current);
  const orders = useSelector((state) => state.orders.items);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userOrders = useMemo(
    () => orders.filter((order) => order.customerEmail === user?.email || order.customerName === user?.name),
    [orders, user]
  );

  const lastOrder = useMemo(
    () => userOrders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0],
    [userOrders]
  );

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const updated = await updateProfile({ name, email });
      dispatch(setUser(updated));
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.message || 'Unable to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark">Profile</h1>
            <p className="mt-2 text-sm text-slate-500">Manage your account and view a quick order history summary.</p>
          </div>
          <Link to="/orders" className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#BD8E88]">
            View My Orders
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-secondary p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Orders</p>
            <p className="mt-3 text-3xl font-bold text-dark">{userOrders.length}</p>
          </div>
          <div className="rounded-3xl bg-secondary p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Last order status</p>
            <p className="mt-3 text-xl font-semibold text-dark">{lastOrder?.status ?? 'No orders yet'}</p>
          </div>
          <div className="rounded-3xl bg-secondary p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Last order total</p>
            <p className="mt-3 text-xl font-semibold text-dark">{lastOrder ? `$${lastOrder.total.toFixed(2)}` : '-'}</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-xl font-semibold text-dark">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {message && <div className="rounded-3xl bg-emerald-100 px-4 py-3 text-sm text-emerald-700">{message}</div>}
        {error && <div className="rounded-3xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</div>}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 px-5 py-3"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-3xl border border-slate-200 px-5 py-3"
            />
          </div>
          <div className="rounded-3xl bg-secondary p-6 md:col-span-2">
            <p className="text-sm text-slate-600">Role</p>
            <p className="mt-2 text-lg font-semibold text-dark">{user?.role || 'customer'}</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-[#BD8E88] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Save Profile'}
        </button>
      </form>
    </div>
  </div>
  );
};

export default Profile;
