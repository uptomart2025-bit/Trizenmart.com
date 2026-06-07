import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { toggleWishlist } from '../../redux/slices/wishlistSlice.js';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.user.current);
  const navigate = useNavigate();
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const handleWishlist = () => {
    if (!user) {
      return navigate('/login');
    }
    dispatch(toggleWishlist(product));
  };

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img src={product.images[0]} alt={product.name} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/95 px-4 py-4 text-white">
          <span className="rounded-full bg-slate-900/70 px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-slate-100">
            {product.category}
          </span>
          <button
            type="button"
            onClick={handleWishlist}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Add to wishlist"
          >
            {isWishlisted ? <FaHeart className="text-primary" /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} className={index < product.rating ? 'text-amber-400' : 'text-slate-300'} />
            ))}
          </div>
          <span>{product.rating}.0</span>
        </div>
        <Link to={`/product/${product._id}`} className="block text-lg font-semibold text-slate-900 transition hover:text-primary">
          {product.name}
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price}</span>
          <Link
            to={`/product/${product._id}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]"
          >
            View product
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
