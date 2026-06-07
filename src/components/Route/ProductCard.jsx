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
  <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div className="relative overflow-hidden">
      <img src={product.images[0]} alt={product.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/80 p-4 text-white">
        <span className="rounded-full bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.2em]">{product.category}</span>
        <button
          type="button"
          onClick={handleWishlist}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        >
          {isWishlisted ? <FaHeart className="text-primary" /> : <FaRegHeart />}
        </button>
      </div>
    </div>
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} className={index < product.rating ? 'text-amber-400' : 'text-slate-300'} />
          ))}
        </div>
        <span className="text-sm text-slate-500">{product.rating}.0</span>
      </div>
      <Link to={`/product/${product._id}`} className="text-lg font-semibold text-dark hover:text-primary">
        {product.name}
      </Link>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-dark">${product.price}</span>
        <Link to={`/product/${product._id}`} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#BD8E88]">
          Add
        </Link>
      </div>
    </div>
  </div>
);
};

export default ProductCard;
