import { useSelector } from 'react-redux';

const AdminOrders = () => {
  const orders = useSelector((state) => state.orders.items);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-dark">All Orders</h1>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <input placeholder="Search orders" className="rounded-full border border-slate-200 px-4 py-3 text-sm w-full max-w-md" />
          <select className="rounded-full border border-slate-200 px-4 py-3 text-sm">
            <option>All statuses</option>
            <option>Delivered</option>
            <option>Processing</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead>
              <tr>
                <th className="border-b px-4 py-3">Order ID</th>
                <th className="border-b px-4 py-3">Customer</th>
                <th className="border-b px-4 py-3">Status</th>
                <th className="border-b px-4 py-3">Qty</th>
                <th className="border-b px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-4">{order._id}</td>
                  <td className="px-4 py-4">{order.customerName || 'Guest'}</td>
                  <td className={`px-4 py-4 font-semibold ${order.status === 'Delivered' ? 'text-emerald-600' : 'text-rose-600'}`}>{order.status}</td>
                  <td className="px-4 py-4">{order.items.length}</td>
                  <td className="px-4 py-4">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
