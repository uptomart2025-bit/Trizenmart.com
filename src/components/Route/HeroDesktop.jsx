import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeroDesktop = () => {
  const heroImage = useSelector((state) => state.hero.image);
  const heroHeading = useSelector((state) => state.hero.heading);
  const heroText = useSelector((state) => state.hero.text);
  const heroButtonLabel = useSelector((state) => state.hero.buttonLabel);
  const heroCtaPath = useSelector((state) => state.hero.ctaPath);

  const isExternalLink = heroCtaPath.startsWith('http://') || heroCtaPath.startsWith('https://');

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        <img src={heroImage} alt="Homepage hero" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.45),transparent_35%)] opacity-90" />
        <div className="absolute right-0 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/20 blur-3xl lg:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),transparent_30%)]" />
        <div className="relative flex min-h-[500px] flex-col justify-between px-10 py-12 lg:px-16">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Mobile accessories</p>
            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
              {heroHeading}
            </h1>
            <p className="max-w-xl text-base text-slate-200 sm:text-lg">
              {heroText}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {isExternalLink ? (
              <a
                href={heroCtaPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-[#BD8E88]"
              >
                {heroButtonLabel}
              </a>
            ) : (
              <Link to={heroCtaPath} className="inline-flex min-h-[48px] items-center rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-[#BD8E88]">
                {heroButtonLabel}
              </Link>
            )}
            <Link to="/contact" className="inline-flex min-h-[48px] items-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
              Need help?
            </Link>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Premium picks
          </span>
          <div className="mt-6 space-y-4">
            {['Wireless earbuds', 'Smartwatches', 'Fast charging power banks'].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-dark">{item}</h3>
                <p className="mt-2 text-sm text-slate-600">Designed for smooth mobile use with premium materials and lasting battery.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.12)] lg:block">
          <h3 className="text-lg font-semibold">Visual product preview</h3>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[1.75rem] bg-slate-800 px-4 py-4 shadow-[0_18px_35px_rgba(15,23,42,0.16)]">
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Smartwatch</p>
              <p className="mt-2 text-sm text-slate-400">Premium tracking, always-on display, and smartwatch controls.</p>
            </div>
            <div className="rounded-[1.75rem] bg-slate-800 px-4 py-4 shadow-[0_18px_35px_rgba(15,23,42,0.16)]">
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Noise cancelling earbuds</p>
              <p className="mt-2 text-sm text-slate-400">Immersive audio and compact fit for on-the-go listening.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDesktop;
