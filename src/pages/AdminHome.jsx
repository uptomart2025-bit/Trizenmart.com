import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useProducts } from '../hooks/useProducts.js';

const AdminHome = () => {
  const products = useSelector((state) => state.products.items);
  const orders = useSelector((state) => state.orders.items);
  const users = useSelector((state) => state.user.users);

  const revenue = useMemo(() => orders.reduce((total, order) => total + order.total, 0), [orders]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Earnings</p>
          <p className="mt-4 text-3xl font-bold text-dark">${revenue.toFixed(2)}</p>
          <p className="mt-3 text-sm text-slate-500">10% commission applied</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">All Orders</p>
          <p className="mt-4 text-3xl font-bold text-dark">{orders.length}</p>
          <p className="mt-3 text-sm text-slate-500">Recent sales overview</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">All Sellers</p>
          <p className="mt-4 text-3xl font-bold text-dark">{users.length}</p>
          <p className="mt-3 text-sm text-slate-500">Customer and seller accounts</p>
        </div>
      </div>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-dark">Recent Orders</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead>
              <tr>
                <th className="border-b px-4 py-3">Order ID</th>
                <th className="border-b px-4 py-3">Status</th>
                <th className="border-b px-4 py-3">Items Qty</th>
                <th classname="border-b px-4 py-3">Total</th>
                <th className="border-b px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-4">{order._id}</td>
                  <td className={`px-4 py-4 font-semibold ${order.status === 'Delivered' ? 'text-emerald-600' : 'text-rose-600'}`}>{order.status}</td>
                  <td className="px-4 py-4">{order.items.length}</td>
                  <td className="px-4 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
