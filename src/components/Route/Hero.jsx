import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const heroCards = [
  {
    title: 'Elevate your daily essentials',
    subtitle: 'Fast shipping, premium picks, and effortless mobile shopping.'
  },
  {
    title: 'Designed for every pocket',
    subtitle: 'Discover curated outfits, sneakers, and accessories in one place.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'
  }
];

const Hero = () => {
  const heroImage = useSelector((state) => state.hero.image);
  const heroHeading = useSelector((state) => state.hero.heading);
  const heroText = useSelector((state) => state.hero.text);
  const heroButtonLabel = useSelector((state) => state.hero.buttonLabel);
  const heroCtaPath = useSelector((state) => state.hero.ctaPath);

  const isExternalLink = heroCtaPath.startsWith('http://') || heroCtaPath.startsWith('https://');

  return (
    <div className="space-y-6">
      {heroCards.map(({ title, subtitle, image }, index) => (
        <div key={title} className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
          <img
            src={index === 0 ? heroImage : image}
            alt={title}
            className="h-96 w-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              New arrival
            </span>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{index === 0 ? heroHeading : title}</h2>
            <p className="mt-4 max-w-xl text-sm text-slate-200 sm:text-base">{index === 0 ? heroText : subtitle}</p>
            {index === 0 && isExternalLink ? (
              <a
                href={heroCtaPath}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-[#BD8E88]"
              >
                {heroButtonLabel}
              </a>
            ) : (
              <Link
                to={index === 0 ? heroCtaPath : '/shop'}
                className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-[#BD8E88]"
              >
                {index === 0 ? heroButtonLabel : 'Browse the collection'}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
