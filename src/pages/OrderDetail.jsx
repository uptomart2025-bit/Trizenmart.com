import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderDetail = () => {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.items);
  const products = useSelector((state) => state.products.items);
  const user = useSelector((state) => state.user.current);

  const order = useMemo(
    () => orders.find((orderItem) => orderItem._id === id),
    [orders, id]
  );

  const allowed = order && (order.customerEmail === user?.email || order.customerName === user?.name || user?.role === 'admin');

  if (!order || !allowed) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
        Order not found or you do not have permission to view this order.
      </div>
    );
  }

  const items = order.items.map((item) => {
    const product = products.find((productItem) => productItem._id === item.productId);
    return {
      ...item,
      name: item.name || product?.name || 'Product',
      price: item.price ?? product?.price ?? 0,
      image: product?.images?.[0]
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Order details</h1>
          <p className="mt-2 text-sm text-slate-500">Order #{order._id} placed on {new Date(order.createdAt).toLocaleDateString()}.</p>
        </div>
        <Link to="/orders" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-dark hover:bg-secondary">
          Back to orders
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Order ID</p>
              <p className="mt-3 text-lg font-semibold text-dark">{order._id}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</p>
              <p className={`mt-3 inline-flex rounded-full px-3 py-2 text-sm font-semibold ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {order.status}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Customer</p>
              <p className="mt-3 text-lg font-semibold text-dark">{order.customerName || 'Guest'}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total</p>
              <p className="mt-3 text-lg font-semibold text-dark">${order.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold text-dark">Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="grid gap-4 rounded-3xl border border-slate-200 bg-secondary p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="space-y-1">
                    <p className="font-semibold text-dark">{item.name}</p>
                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-dark">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-slate-500">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-dark">Shipping Info</h3>
            <p className="mt-3 text-sm text-slate-600">Delivery details and tracking are available once the order ships.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-dark">Order timeline</h3>
            <div className="mt-4 space-y-3">
              {order.statusHistory?.map((step, index) => (
                <div key={`${step.status}-${index}`} className="rounded-3xl bg-secondary p-4">
                  <p className="text-sm font-semibold text-dark">{step.status}</p>
                  <p className="text-sm text-slate-500">{new Date(step.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetail;
