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
    return userOrders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  }, [orders, user]);

  return (
    <div className="space-y-8 pb-24 sm:pb-0">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">Your cart</p>
        <h1 className="text-3xl font-bold text-slate-900">Review your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {cart.length ? (
            cart.map((item) => (
              <div key={item._id} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="grid gap-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                  <img src={item.images[0]} alt={item.name} className="h-32 w-full rounded-3xl object-cover sm:h-28 sm:w-28" />
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                    <p className="text-sm text-slate-500">${item.price}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: Math.max(1, item.quantity - 1) }))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-slate-600 transition hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-slate-600 transition hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeItem(item._id))}
                      className="rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              Your cart is empty.
            </div>
          )}
        </div>

        <aside className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Order summary</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Total</h2>
          </div>

          <div className="rounded-[1.75rem] bg-slate-50 p-5 text-sm text-slate-600">
            {latestOrder ? (
              <div className="space-y-3">
                <Link
                  to={`/orders/${latestOrder._id}`}
                  title="Open the latest order details"
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm hover:bg-slate-100"
                >
                  Latest order: {latestOrder.status}
                </Link>
                <p className="text-xs text-slate-500">Tap to review your most recent order.</p>
              </div>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                No recent orders
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 block bg-white/95 px-4 py-4 shadow-[0_-16px_40px_rgba(15,23,42,0.12)] sm:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Total</p>
            <p className="text-lg font-semibold text-slate-900">${subtotal.toFixed(2)}</p>
          </div>
          <Link
            to="/checkout"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
