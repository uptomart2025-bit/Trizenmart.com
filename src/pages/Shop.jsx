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
    return userOrders
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  }, [orders, user]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-dark">Filters</h3>
            <div className="space-y-2">
              {filters.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                  className={`block w-full rounded-2xl px-4 py-3 text-left text-sm ${
                    selectedCategory === category ? 'bg-primary text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-dark">Price Range</h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-slate-500">${minPrice} - ${maxPrice}</p>
            </div>
          </div>
        </div>
      </aside>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark">Shop Products</h1>
            {latestOrder ? (
              <Link
                to={`/orders/${latestOrder._id}`}
                title="View the latest order details"
                className="mt-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-dark hover:bg-slate-100"
              >
                Latest order: {latestOrder.status}
              </Link>
            ) : (
              <span className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                No recent orders
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">{filteredProducts.length} items found</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
