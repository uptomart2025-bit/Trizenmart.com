import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/Route/ProductCard.jsx';

const Home = () => {
  const products = useSelector((state) => state.products.items);

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.25)]">
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
          alt="Shop hero"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="relative flex min-h-[420px] flex-col items-start justify-center gap-6 px-6 py-16 sm:px-10 lg:px-16">
          <span className="inline-flex rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            Limited time offer
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Discover the best trend-right pieces for every wardrobe.
          </h1>
          <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
            Shop curated apparel, accessories and essentials with fast shipping and a modern experience built for mobile-first shoppers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]"
            >
              Shop now
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Premium quality', description: 'Only the best products selected for your needs.' },
          { title: 'Fast shipping', description: 'Get your order delivered quickly and reliably.' },
          { title: '24/7 support', description: 'Help whenever you need it from our friendly team.' }
        ].map((feature) => (
          <div key={feature.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-primary">Featured collection</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Shop the best sellers</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-primary transition hover:text-primary/80">
            View all products
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
