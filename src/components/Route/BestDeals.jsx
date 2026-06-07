const features = [
  { title: 'Quality Product', description: 'Verified premium selections.' },
  { title: 'Free Shipping', description: 'All orders above $99.' },
  { title: '14-Day Return', description: 'Hassle-free returns.' },
  { title: '24/7 Support', description: 'Always available for help.' }
];

const BestDeals = () => (
  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {features.map((feature) => (
      <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="mb-4 h-16 w-16 rounded-full bg-primary/10 text-primary grid place-items-center text-xl font-bold">✓</div>
        <h3 className="text-lg font-semibold text-dark">{feature.title}</h3>
        <p className="mt-2 text-sm text-slate-500">{feature.description}</p>
      </div>
    ))}
  </section>
);

export default BestDeals;
