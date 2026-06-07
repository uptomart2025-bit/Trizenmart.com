import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'Discover Your New Favorite Outfit',
    subtitle: 'Fresh arrivals, tailored for every season.',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Style Made Simple',
    subtitle: 'Shop curated categories and exclusive deals.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'
  }
];

const Hero = () => (
  <div className="space-y-6">
    {slides.map(({ title, subtitle, image }, index) => (
      <div key={title} className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
        <img src={image} alt={title} className="h-96 w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/30" />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16">
          <span className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">Seasonal edit</span>
          <h2 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-md text-sm text-slate-200 md:text-base">{subtitle}</p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-[#BD8E88]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    ))}
  </div>
);

export default Hero;
