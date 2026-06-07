import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice.js';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.items.find((item) => item._id === id));

  if (!product) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">Product not found.</div>;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {product.images.map((image) => (
            <img key={image} src={image} alt={product.name} className="h-72 w-full rounded-3xl object-cover" />
          ))}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-dark">{product.name}</h1>
          <p className="mt-3 text-sm text-slate-500">{product.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-bold text-dark">${product.price}</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-sm text-dark">{product.category}</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>{index < product.rating ? '★' : '☆'}</span>
            ))}
            <span className="text-sm text-slate-500">({product.reviews.length} reviews)</span>
          </div>
          <button
            onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-[#BD8E88]"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <aside className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-dark">Product Details</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Stock: {product.stock}</li>
            <li>Category: {product.category}</li>
            <li>SKU: {product._id}</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-dark">Related Products</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Link to="/shop" className="block text-primary hover:underline">More items like this</Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetail;
