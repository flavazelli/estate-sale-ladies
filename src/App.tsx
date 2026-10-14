import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import logo from './assets/images/estate-sale-ladies-logo.png';
import heroRoom from './assets/images/estate-sale-room.jpg';
import { upcomingSales } from './data/sales';

const phone = '514-833-9245';
const email = 'info@theestatesaleladies.com';
const googleReviewsUrl = 'https://www.google.com/search?q=The+Estate+Sale+Ladies+West+Island+Montr%C3%A9al';

function Arrow({ diagonal = false, direction = 'right' }: { diagonal?: boolean; direction?: 'right' | 'left' }) {
  return <span className={`arrow${diagonal ? ' arrow--diagonal' : ''}${direction === 'left' ? ' arrow--left' : ''}`} aria-hidden="true" />;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return <>
    <div className="topline">
      <div className="container topline-inner">
        <span>Estate · moving · downsizing sales</span>
        <a href={`tel:${phone.replaceAll('-', '')}`}>Call {phone}</a>
      </div>
    </div>
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="The Estate Sale Ladies home">
          <span className="brand-seal"><img src={logo} alt="" /></span>
          <span className="brand-type"><span>The Estate</span><strong>Sale Ladies</strong></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <Link to="/#services" onClick={() => setMenuOpen(false)}>Our services</Link>
          <Link to="/#process" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link to="/#sales" onClick={() => setMenuOpen(false)}>Upcoming sales</Link>
          <Link to="/#faqs" onClick={() => setMenuOpen(false)}>Questions</Link>
          <Link className="nav-cta" to="/#contact" onClick={() => setMenuOpen(false)}>Book a consultation <Arrow diagonal /></Link>
        </nav>
      </div>
    </header>
  </>;
}

function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function ConsultationForm() {
  const [prepared, setPrepared] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Free consultation: ${form.get('service') || 'Estate or moving sale'}`);
    const body = encodeURIComponent([
      `Name: ${form.get('name')}`,
      `Email: ${form.get('reply')}`,
      `Phone: ${form.get('phone') || 'Not provided'}`,
      `Sale type: ${form.get('service') || 'Not specified'}`,
      `Area: ${form.get('area') || 'Not provided'}`,
      `Timing: ${form.get('timing') || 'Not provided'}`,
      '',
      String(form.get('details') || ''),
    ].join('\n'));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setPrepared(true);
  }

  return <form className="consultation-form" onSubmit={submit}>
    <div className="form-row">
      <label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label>
      <label>Email address<input name="reply" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
    </div>
    <div className="form-row">
      <label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="514-555-0123" /></label>
      <label>What brings you here?
        <select name="service" defaultValue="">
          <option value="">Choose one</option>
          <option>Estate sale</option><option>Moving sale</option><option>Downsizing sale</option><option>Upcoming sale information</option>
        </select>
      </label>
    </div>
    <div className="form-row">
      <label>Neighbourhood or town <span>(optional)</span><input name="area" autoComplete="address-level2" placeholder="West Island" /></label>
      <label>When are you hoping to hold the sale? <span>(optional)</span><input name="timing" placeholder="A month or approximate date" /></label>
    </div>
    <label>Anything you’d like us to know?<textarea name="details" rows={4} placeholder="Share what would help us prepare for a first conversation." /></label>
    <button className="button button-light" type="submit">Request a free consultation <Arrow diagonal /></button>
    <p className="form-note" aria-live="polite">{prepared ? 'Your email app should open with your message ready to review.' : 'This form opens a pre-filled email for you to review and send.'}</p>
  </form>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label"><span aria-hidden="true" />{children}</p>;
}

function HomePage() {
  return <main>
    <section className="hero container" id="top">
      <div className="hero-copy">
        <h1>A thoughtful next chapter <em>starts here.</em></h1>
        <p className="hero-lede">Estate, moving and downsizing sales, handled with care for you and the things that matter.</p>
        <div className="hero-actions">
          <Link className="button" to="/#contact">Talk with our team <Arrow diagonal /></Link>
          <Link className="text-link" to="/#process">See how it works <Arrow /></Link>
        </div>
        <div className="hero-note"><span className="note-rule" />Free first consultation</div>
      </div>
      <figure className="hero-visual">
        <img src={heroRoom} alt="Illustrative sitting room with vintage furniture, books, artwork and collected objects" />
        <figcaption>Representative image · not a past sale</figcaption>
        <div className="photo-stamp" aria-hidden="true"><span>WEST</span><b>ISLAND</b><span>MONTRÉAL</span></div>
      </figure>
    </section>

    <section className="trust-strip" aria-label="Service details">
      <div className="container trust-inner">
        <span><b>01</b> Estate sales</span><span><b>02</b> Moving & downsizing</span><span><b>03</b> Free consultation</span><span><b>04</b> Appraisal specialists when needed</span>
      </div>
    </section>

    <section className="story section" id="about">
      <div className="container story-layout">
        <div className="story-title"><SectionLabel>With care at every step</SectionLabel><h2>A home holds more than <em>things.</em></h2></div>
        <div className="story-copy">
          <p>Sorting a home can bring a lot with it. The Estate Sale Ladies offer hands-on support as you decide what to keep, sell or donate, and take time to understand your preferences and timeline.</p>
          <p>Whether you’re settling an estate or preparing for a move, the team plans and hosts a sale around your situation. If an item needs a closer valuation, they can work with specialists.</p>
          <Link className="text-link" to="/#contact">Start with a conversation <Arrow /></Link>
        </div>
      </div>
    </section>

    <section className="services-section section" id="services">
      <div className="container">
        <div className="section-heading">
          <div><SectionLabel>Ways we can help</SectionLabel><h2>One home. A plan that fits.</h2></div>
          <p>Estate, moving and downsizing sales throughout the West Island and surrounding communities.</p>
        </div>
        <div className="service-grid">
          <article className="service-card estate-card">
            <span className="service-index">01 / ESTATE SALE</span>
            <h3>Make room for what comes next.</h3>
            <p>Get help sorting personal belongings, deciding what to sell, and planning a sale that respects the family’s priorities.</p>
            <Link to="/#contact" aria-label="Ask about an estate sale">Talk about an estate sale <Arrow /></Link>
          </article>
          <article className="service-card moving-card">
            <span className="service-index">02 / MOVING & DOWNSIZING</span>
            <h3>A more manageable move.</h3>
            <p>When you’re moving to a smaller home or retirement residence, the team can organize and host a sale around your plans.</p>
            <Link to="/#contact" aria-label="Ask about a moving or downsizing sale">Talk about a move <Arrow /></Link>
          </article>
        </div>
      </div>
    </section>

    <section className="process-section section" id="process">
      <div className="container process-layout">
        <div className="process-intro">
          <SectionLabel>What to expect</SectionLabel>
          <h2>Clear steps.<br /><em>Room to decide.</em></h2>
          <p>Every sale is different. The first conversation is about your needs, your preferences and the timing that works for you.</p>
          <Link className="button button-outline" to="/#contact">Ask about your situation <Arrow diagonal /></Link>
        </div>
        <div className="process-list">
          <article><span>01</span><div><h3>Talk through the home</h3><p>Share what’s changing, who’s involved and what you’d like the sale to accomplish.</p></div></article>
          <article><span>02</span><div><h3>Decide what stays and goes</h3><p>Sort belongings together and identify what to keep, sell or donate.</p></div></article>
          <article><span>03</span><div><h3>Plan and host the sale</h3><p>The team organizes and runs a sale shaped around your home, preferences and timeline.</p></div></article>
          <article><span>04</span><div><h3>Make a plan for what remains</h3><p>After the sale, the team can help clear remaining items. Options are discussed for your situation.</p></div></article>
        </div>
      </div>
    </section>

    <section className="sales-section section" id="sales">
      <div className="container">
        <div className="section-heading sales-heading">
          <div><SectionLabel>For buyers and browsers</SectionLabel><h2>Upcoming sales</h2></div>
          <p>Browse a few example listings to see the kind of details buyers can find before a sale.</p>
        </div>
        {upcomingSales.length ? <>
          <p className="sample-notice">Sample listings for website preview · Dates, locations and items below are fictional.</p>
          <div className="sale-grid">{upcomingSales.map(sale => <article className="sale-card" key={sale.slug}>
          <div className={`sale-card-art sale-card-art--${sale.coverTone || 'blush'}`} aria-hidden="true"><span>Estate Sale</span><strong>{sale.location.split(',')[0]}</strong><small>Preview listing</small></div>
          <div><span className="sale-date">{sale.dateLabel}</span><h3>{sale.title}</h3><p>{sale.location}</p><Link to={`/sales/${sale.slug}`}>View sample details <Arrow /></Link></div>
        </article>)}</div>
        </> : <div className="sales-empty">
          <div className="empty-mark" aria-hidden="true">✳</div>
          <div><h3>No dates posted right now.</h3><p>New sales will appear here with their date, neighbourhood, photos and featured finds. Ask us about the next one.</p></div>
          <a className="text-link" href={`mailto:${email}?subject=${encodeURIComponent('Upcoming estate sale dates')}`}>Ask about upcoming sales <Arrow diagonal /></a>
        </div>}
      </div>
    </section>

    <section className="questions-section section" id="faqs">
      <div className="container questions-layout">
        <div><SectionLabel>Good to know</SectionLabel><h2>Questions families ask.</h2><p>Not sure where to begin? Start with a free consultation and talk it through.</p><Link className="text-link" to="/#contact">Ask us directly <Arrow /></Link></div>
        <div className="faq-list">
          <details><summary>How do we decide what to sell?</summary><p>The team helps you go through the belongings and decide what to keep, sell or donate. Your preferences guide the plan.</p></details>
          <details><summary>What if some pieces need an appraisal?</summary><p>When additional appraisals are needed, the team works with specialists.</p></details>
          <details><summary>What happens to items left after the sale?</summary><p>The team can help clear remaining items after the sale. The options can be discussed during your consultation.</p></details>
          <details><summary>Can you help with a move or downsizing?</summary><p>Yes. The team organizes and hosts moving and downsizing sales, including for people moving to a smaller home or retirement residence.</p></details>
          <details><summary>Where do you work?</summary><p>The Estate Sale Ladies serve the West Island of Montréal and surrounding communities. Ask whether your area is covered.</p></details>
        </div>
      </div>
    </section>

    <section className="contact-section section" id="contact">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionLabel>A good place to start</SectionLabel>
          <h2>Let’s talk about <em>your next step.</em></h2>
          <p>Tell us a little about the home and what you’re planning. The first consultation is free.</p>
          <div className="contact-links">
            <a href={`tel:${phone.replaceAll('-', '')}`}><span>CALL</span><b>{phone}</b><Arrow diagonal /></a>
            <a href={`mailto:${email}`}><span>EMAIL</span><b>{email}</b><Arrow diagonal /></a>
          </div>
        </div>
        <div className="form-panel"><div className="form-heading"><h3>Request a consultation</h3><span>FREE · NO OBLIGATION</span></div><ConsultationForm /></div>
      </div>
    </section>
  </main>;
}

function SaleDetailPage() {
  const { slug } = useParams();
  const sale = upcomingSales.find(item => item.slug === slug);
  if (!sale) return <main className="not-found container"><SectionLabel>Sale listing</SectionLabel><h1>This sale page isn’t available.</h1><p>Check the current dates or contact the team for upcoming sales.</p><Link className="button" to="/#sales">See upcoming sales <Arrow /></Link></main>;

  return <main className="sale-detail container">
    <Link className="back-link" to="/#sales"><Arrow direction="left" /> All upcoming sales</Link>
    <div className="sale-detail-heading"><SectionLabel>Sample listing · preview only</SectionLabel><h1>{sale.title}</h1><p>{sale.dateLabel} <span>·</span> {sale.location}</p><p className="sample-detail-note">This is a fictional example to show how upcoming sale pages could look. It is not a scheduled event.</p></div>
    {sale.summary && <p className="sale-summary">{sale.summary}</p>}
    {sale.photos.length > 0 && <div className="sale-gallery">{sale.photos.map((photo, index) => <img key={photo.src} src={photo.src} alt={photo.alt || `${sale.title} photo ${index + 1}`} />)}</div>}
    {sale.featuredItems.length > 0 && <section className="featured-finds"><h2>Featured finds</h2><ul>{sale.featuredItems.map(item => <li key={item}>{item}</li>)}</ul></section>}
    <div className="sale-contact"><p>Have a question about this sale?</p><a className="button" href={`mailto:${email}?subject=${encodeURIComponent(`Question about ${sale.title}`)}`}>Email the team <Arrow diagonal /></a></div>
  </main>;
}

function NotFoundPage() {
  return <main className="not-found container"><SectionLabel>The Estate Sale Ladies</SectionLabel><h1>We couldn’t find that page.</h1><Link className="button" to="/">Return to the home page <Arrow /></Link></main>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <Link to="/" className="footer-brand"><span>The Estate</span><strong>Sale Ladies</strong></Link>
      <p>Estate, moving and downsizing sales<br />West Island · Montréal</p>
      <div className="footer-contact"><a href={`tel:${phone.replaceAll('-', '')}`}>{phone}</a><a href={`mailto:${email}`}>{email}</a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} The Estate Sale Ladies</span><a href={googleReviewsUrl} target="_blank" rel="noreferrer">Find us on Google <Arrow diagonal /></a><Link to="/#top">Back to top</Link></div>
  </footer>;
}

export function App() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <RouteScroll />
    <div id="main-content"><Routes><Route path="/" element={<HomePage />} /><Route path="/sales/:slug" element={<SaleDetailPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></div>
    <Footer />
  </>;
}
