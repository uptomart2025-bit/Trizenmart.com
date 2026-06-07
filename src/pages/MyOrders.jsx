import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.items);
  const products = useSelector((state) => state.products.items);
  const user = useSelector((state) => state.user.current);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const userOrders = useMemo(
    () => orders.filter((order) => order.customerEmail === user?.email || order.customerName === user?.name),
    [orders, user]
  );

  const latestOrder = useMemo(
    () => userOrders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0],
    [userOrders]
  );

  const resolveItem = (item) => {
    const product = products.find((productItem) => productItem._id === item.productId);
    return {
      name: item.name || product?.name || 'Product',
      price: item.price ?? product?.price ?? 0,
      quantity: item.quantity
    };
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dark">My Orders</h1>
              <p className="mt-2 text-sm text-slate-500">Explore your recent orders and open individual order details.</p>
            </div>
            <Link to="/profile" className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#BD8E88]">
              Edit profile
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-secondary p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total orders</p>
              <p className="mt-3 text-3xl font-bold text-dark">{userOrders.length}</p>
            </div>
            <div className="rounded-3xl bg-secondary p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Latest order</p>
              <p className="mt-3 text-xl font-semibold text-dark">{latestOrder ? `#${latestOrder._id}` : 'No orders yet'}</p>
              {latestOrder && <p className="text-sm text-slate-500">{latestOrder.status}</p>}
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Order history</p>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">Quickly jump into any order to view item details, delivery status, and order timestamps.</p>
            {latestOrder ? (
              <Link
                to={`/orders/${latestOrder._id}`}
                className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#BD8E88]"
              >
                View latest order
              </Link>
            ) : (
              <span className="inline-flex rounded-full bg-slate-100 px-5 py-3 text-sm text-slate-600">No history yet</span>
            )}
          </div>
        </div>
      </div>

      {userOrders.length ? (
        <div className="space-y-6">
          {userOrders.map((order) => (
            <div key={order._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="text-lg font-semibold text-dark">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className={`rounded-full px-3 py-2 text-sm font-semibold ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {order.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-lg font-semibold text-dark">${order.total.toFixed(2)}</p>
                </div>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
                  <button
                    type="button"
                    onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-[#BD8E88]"
                  >
                    {expandedOrderId === order._id ? 'Hide details' : 'View details'}
                  </button>
                  <Link
                    to={`/orders/${order._id}`}
                    className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-dark hover:bg-secondary"
                  >
                    Order details
                  </Link>
                </div>
              </div>
              {expandedOrderId === order._id && (
                <div className="mt-6 rounded-3xl bg-secondary p-5">
                  <h3 className="text-sm font-semibold text-dark">Items</h3>
                  <div className="mt-3 space-y-3">
                    {order.items.map((item, index) => {
                      const resolved = resolveItem(item);
                      return (
                        <div key={`${item.productId}-${index}`} className="flex items-center justify-between rounded-2xl bg-white p-4">
                          <div className="space-y-1">
                            <p className="font-semibold text-dark">{resolved.name}</p>
                            <p className="text-sm text-slate-500">Qty: {resolved.quantity}</p>
                          </div>
                          <span className="font-semibold text-dark">${resolved.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          No orders found. Start shopping to place your first order.
        </div>
      )}
    </div>
  );
};

export default MyOrders;
