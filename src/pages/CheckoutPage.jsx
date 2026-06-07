import { useState } from 'react';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-8 pb-28 sm:pb-0">
      <h1 className="text-3xl font-bold text-dark">Checkout</h1>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {['Shipping', 'Payment', 'Confirm'].map((label, index) => (
            <div key={label} className={`rounded-3xl px-5 py-3 text-sm font-semibold ${step === index + 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
              {label}
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-6">
          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <input type="text" placeholder="Full Name" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <input type="email" placeholder="Email" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Address" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 md:col-span-2" />
              <input type="text" placeholder="City" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Postal Code" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 md:grid-cols-2">
              <input type="text" placeholder="Card Number" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Card Holder" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Expiry" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="CVC" className="rounded-3xl border border-slate-200 px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4 text-sm text-slate-600">
              <p>Review your order details and submit payment.</p>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-dark">Shipping Address</p>
                <p>123 Rose Avenue, Tech City</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="rounded-full border border-slate-300 px-5 py-3 text-sm">
              Back
            </button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#BD8E88]">
              Continue
            </button>
          ) : (
            <button className="rounded-full bg-dark px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900">
              Confirm Order
            </button>
          )}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 block bg-white/95 px-4 py-4 shadow-[0_-16px_40px_rgba(15,23,42,0.12)] sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Step {step} of 3</p>
            <p className="text-sm font-semibold text-dark">{step === 3 ? 'Confirm order' : 'Ready to continue'}</p>
          </div>
          <button
            onClick={() => setStep(step < 3 ? step + 1 : step)}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#BD8E88]"
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
