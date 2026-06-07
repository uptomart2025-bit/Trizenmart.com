import Hero from '../components/Route/Hero.jsx';
import BestDeals from '../components/Route/BestDeals.jsx';
import Categories from '../components/Route/Categories.jsx';
import ProductCard from '../components/Route/ProductCard.jsx';
import { useSelector } from 'react-redux';

const Home = () => {
  const products = useSelector((state) => state.products.items);

  return (
    <div className="space-y-10">
      <Hero />
      <section>
        <h2 className="mb-6 text-3xl font-bold text-dark">Why E-Shopper?</h2>
        <BestDeals />
      </section>
      <section>
        <h2 className="mb-6 text-3xl font-bold text-dark">Shop by Category</h2>
        <Categories />
      </section>
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-dark">Best Deals</h2>
          <p className="text-sm text-slate-500">High quality items with fast delivery.</p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
