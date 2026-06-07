import { useState } from 'react';

const OrderTracker = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState('Processing');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-dark">Order Tracker</h1>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter order number"
            className="flex-1 rounded-full border border-slate-200 px-5 py-3"
          />
          <button
            onClick={() => setStatus(orderNumber ? 'Shipped' : 'Processing')}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-[#BD8E88]"
          >
            Search
          </button>
        </div>
        <div className="mt-8 space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            {['Processing', 'Shipped', 'Delivered'].map((step) => (
              <div key={step} className={`rounded-3xl border p-5 text-center ${step === status ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                {step}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500">Current status: {orderNumber ? status : 'Enter an order number to track.'}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
