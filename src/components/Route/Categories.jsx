import { Link } from 'react-router-dom';

const categories = [
  { name: 'Dresses', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', count: 28 },
  { name: 'Shoes', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', count: 12 },
  { name: 'Sportswear', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', count: 15 }
];

const Categories = () => (
  <section className="space-y-4">
    <div className="flex gap-4 overflow-x-auto px-1 pb-2 sm:hidden">
      {categories.map((category) => (
        <Link
          key={category.name}
          to="/shop"
          className="shrink-0 min-w-[220px] rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-semibold text-dark">{category.name}</p>
          <p className="mt-1 text-xs text-slate-500">{category.count} products</p>
        </Link>
      ))}
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {categories.map((category) => (
        <Link key={category.name} to="/shop" className="group relative overflow-hidden rounded-3xl">
          <img src={category.image} alt={category.name} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-semibold">{category.name}</h3>
            <p className="text-sm">{category.count} Products</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default Categories;
