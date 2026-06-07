import { useState } from 'react';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-8 pb-28 sm:pb-0">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">Checkout</p>
        <h1 className="text-3xl font-bold text-slate-900">Secure checkout</h1>
        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Complete your order with a smooth payment flow and clear order tracking every step of the way.
        </p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {['Shipping', 'Payment', 'Confirm'].map((label, index) => (
            <div
              key={label}
              className={`rounded-3xl px-4 py-3 text-center text-sm font-semibold transition ${
                step === index + 1 ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <input type="text" placeholder="Full Name" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="email" placeholder="Email" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Address" className="md:col-span-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="City" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Postal Code" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 md:grid-cols-2">
              <input type="text" placeholder="Card Number" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Card Holder" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Expiry" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="CVC" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-sm text-slate-600">
              <p className="text-base font-semibold text-slate-900">Review your order</p>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">Shipping Address</p>
                <p className="mt-2">123 Rose Avenue, Tech City</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Payment method</p>
                <p className="mt-2 font-semibold text-slate-900">Visa ending in 1234</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => setStep(step < 3 ? step + 1 : step)}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]"
          >
            {step < 3 ? 'Continue' : 'Confirm Order'}
          </button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 block bg-white/95 px-4 py-4 shadow-[0_-16px_40px_rgba(15,23,42,0.12)] sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Step {step} of 3</p>
            <p className="text-sm font-semibold text-slate-900">{step === 3 ? 'Confirm order' : 'Ready to continue'}</p>
          </div>
          <button
            type="button"
            onClick={() => setStep(step < 3 ? step + 1 : step)}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#BD8E88]"
          >
            {step < 3 ? 'Continue' : 'Confirm'}
          </button>
        </div>
      </div>

      <div className="h-24 sm:hidden" />
    </div>
  );
};

export default CheckoutPage;
