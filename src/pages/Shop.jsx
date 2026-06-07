import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/Route/ProductCard.jsx';

const filters = ['Dresses', 'Shirts', 'Jeans', 'Swimwear', 'Shoes', 'Sportswear'];

const Shop = () => {
  const products = useSelector((state) => state.products.items);
  const orders = useSelector((state) => state.orders.items);
  const user = useSelector((state) => state.user.current);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const latestOrder = useMemo(() => {
    const userOrders = orders.filter(
      (order) => order.customerEmail === user?.email || order.customerName === user?.name
    );
    return userOrders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  }, [orders, user]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Discover</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Shop the latest arrivals</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
              Browse curated collections, quick filters, and an easier checkout experience built for mobile-first shoppers.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm">
            {filteredProducts.length} items available
          </div>
        </div>

        <div className="mt-6 overflow-x-auto pb-3">
          <div className="flex gap-3 min-w-[650px]">
            {filters.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                  selectedCategory === category ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
        <aside className="hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm xl:block">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Quick filters</h2>
              <div className="mt-4 space-y-3">
                {filters.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                    className={`block w-full rounded-3xl px-4 py-3 text-left text-sm font-semibold transition ${
                      selectedCategory === category ? 'bg-primary text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Price range</h2>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm text-slate-500">Min</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-slate-500">Max</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  ${minPrice} - ${maxPrice}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Sort by</p>
              <p className="mt-2 text-base font-semibold text-slate-900">Popular picks first</p>
            </div>
            <Link
              to="/orders"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]"
            >
              View order history
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
