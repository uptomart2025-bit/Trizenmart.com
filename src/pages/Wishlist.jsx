import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleWishlist } from '../redux/slices/wishlistSlice.js';

const Wishlist = () => {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-dark">Your Wishlist</h1>
      {items.length ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {items.map((item) => (
            <div key={item._id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
              <img src={item.images[0]} alt={item.name} className="h-32 w-32 rounded-3xl object-cover" />
              <div className="flex-1">
                <Link to={`/product/${item._id}`} className="text-lg font-semibold text-dark hover:text-primary">
                  {item.name}
                </Link>
                <p className="mt-2 text-sm text-slate-500">{item.category}</p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xl font-bold text-dark">${item.price}</span>
                <button
                  type="button"
                  onClick={() => dispatch(toggleWishlist(item))}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          You have no wishlist items yet. <Link to="/shop" className="text-primary underline">Browse products</Link> to add favorites.
        </div>
      )}
    </div>
  );
};

export default Wishlist;
