import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../redux/slices/cartSlice.js';

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.orders.items);
  const user = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const latestOrder = useMemo(() => {
    const userOrders = orders.filter(
      (order) => order.customerEmail === user?.email || order.customerName === user?.name
    );
    return userOrders
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  }, [orders, user]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-dark">Your Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {cart.length ? (
            cart.map((item) => (
              <div key={item._id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
                <img src={item.images[0]} alt={item.name} className="h-28 w-28 rounded-3xl object-cover" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-dark">{item.name}</h2>
                  <p className="text-sm text-slate-500">${item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item._id, quantity: Math.max(1, item.quantity - 1) }))}
                    className="rounded-full border border-slate-300 px-3 py-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                    className="rounded-full border border-slate-300 px-3 py-2"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item._id))}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-slate-200"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">Your cart is empty.</div>
          )}
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-dark">Order Summary</h2>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            {latestOrder ? (
              <div className="space-y-2">
                <Link
                  to={`/orders/${latestOrder._id}`}
                  title="Open the latest order details"
                  className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm hover:bg-slate-100"
                >
                  Latest order: {latestOrder.status}
                </Link>
                <p className="text-xs text-slate-500">Click to view latest order details</p>
              </div>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                No recent orders
              </span>
            )}
            {latestOrder && <span className="ml-3">Latest order</span>}
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-lg font-bold text-dark">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[#BD8E88]">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
