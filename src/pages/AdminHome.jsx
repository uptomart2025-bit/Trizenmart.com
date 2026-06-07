import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useState } from 'react';
import { setHeroImage, setHeroHeading, setHeroText, setHeroButtonLabel, setHeroCtaPath } from '../redux/slices/heroSlice.js';

const AdminHome = () => {
  const products = useSelector((state) => state.products.items);
  const orders = useSelector((state) => state.orders.items);
  const users = useSelector((state) => state.user.users);
  const currentHeroImage = useSelector((state) => state.hero.image);
  const currentHeroHeading = useSelector((state) => state.hero.heading);
  const currentHeroText = useSelector((state) => state.hero.text);
  const currentHeroButtonLabel = useSelector((state) => state.hero.buttonLabel);
  const currentHeroCtaPath = useSelector((state) => state.hero.ctaPath);
  const dispatch = useDispatch();
  const [heroUrl, setHeroUrl] = useState(currentHeroImage);
  const [heroHeading, setHeroHeading] = useState(currentHeroHeading);
  const [heroText, setHeroTextState] = useState(currentHeroText);
  const [heroButtonLabel, setHeroButtonLabel] = useState(currentHeroButtonLabel);
  const [heroCtaPath, setHeroCtaPath] = useState(currentHeroCtaPath);
  const [saved, setSaved] = useState(false);

  const revenue = useMemo(() => orders.reduce((total, order) => total + order.total, 0), [orders]);

  const updateHeroImage = () => {
    dispatch(setHeroImage(heroUrl));
    dispatch(setHeroHeading(heroHeading));
    dispatch(setHeroText(heroText));
    dispatch(setHeroButtonLabel(heroButtonLabel));
    dispatch(setHeroCtaPath(heroCtaPath));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

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

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-dark">Hero Image Settings</h2>
          <p className="mt-2 text-sm text-slate-500">Update the homepage hero image shown on both mobile and desktop layouts.</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Hero image URL</label>
              <input
                type="url"
                value={heroUrl}
                onChange={(e) => setHeroUrl(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="https://example.com/hero-image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Hero heading</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter the hero heading"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Hero text</label>
              <textarea
                value={heroText}
                onChange={(e) => setHeroTextState(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter the secondary hero text shown on the homepage"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Hero button label</label>
              <input
                type="text"
                value={heroButtonLabel}
                onChange={(e) => setHeroButtonLabel(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter the hero button label"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Hero CTA path</label>
              <input
                type="text"
                value={heroCtaPath}
                onChange={(e) => setHeroCtaPath(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter the CTA path (e.g. /shop or /collection)"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={updateHeroImage}
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]"
              >
                Save hero settings
              </button>
              {saved && <span className="text-sm text-emerald-600">Hero settings updated.</span>}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-dark">Preview</h2>
          <div className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100">
            <img src={heroUrl} alt="Hero preview" className="h-64 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Preview</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{heroHeading}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-100">{heroText}</p>
              <button className="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-[#BD8E88]">
                {heroButtonLabel}
              </button>
              <p className="mt-3 text-xs text-slate-200">Target path: <span className="font-semibold">{heroCtaPath}</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-dark">Recent Orders</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead>
              <tr>
                <th className="border-b px-4 py-3">Order ID</th>
                <th className="border-b px-4 py-3">Status</th>
                <th className="border-b px-4 py-3">Items Qty</th>
                <th className="border-b px-4 py-3">Total</th>
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
