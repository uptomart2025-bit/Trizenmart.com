import { useSelector } from 'react-redux';

const AdminProducts = () => {
  const products = useSelector((state) => state.products.items);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-dark">All Products</h1>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <input placeholder="Search products" className="rounded-full border border-slate-200 px-4 py-3 text-sm w-full max-w-md" />
          <select className="rounded-full border border-slate-200 px-4 py-3 text-sm">
            <option>All categories</option>
            <option>Dresses</option>
            <option>Shoes</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead>
              <tr>
                <th className="border-b px-4 py-3">Product</th>
                <th className="border-b px-4 py-3">Category</th>
                <th className="border-b px-4 py-3">Stock</th>
                <th className="border-b px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-4">{product.name}</td>
                  <td className="px-4 py-4">{product.category}</td>
                  <td className="px-4 py-4">{product.stock}</td>
                  <td className="px-4 py-4">${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
