import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [navLinks, setNavLinks] = useState([
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ]);

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.ok ? r.json() : [])
      .then(d => {
        if (Array.isArray(d)) {
          const cats = d.filter(c => c.product_type === 'jewellery' || c.product_type === 'all');
          const dynamicLinks = cats.map(c => ({
            label: c.name,
            to: `/category/${c.name.toLowerCase().replace(/\s+/g, '-')}`
          }));
          setNavLinks([
            { label: 'Home', to: '/' },
            ...dynamicLinks,
            { label: 'About Us', to: '/about' },
            { label: 'Contact Us', to: '/contact' },
          ]);
        }
      })
      .catch(() => { });
  }, []);

  const isActive = (to: string) => {
    return location.pathname === to;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/10 backdrop-blur-3xl border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/zued_logo_big.png?v=1.1"
              alt="ZUED - Shine That Stays"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain object-center transition-transform duration-300 group-hover:scale-105"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`relative text-[11px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 group ${isActive(link.to)
                  ? 'text-gold'
                  : 'text-foreground/70 hover:text-foreground'
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-300 ${isActive(link.to) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side: Cart */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <div className="relative">
              <Link
                to="/cart"
                className="flex items-center gap-2 btn-gold px-4 py-2 rounded-sm text-xs"
              >
                <ShoppingCart size={14} />
                <span className="hidden md:inline">Cart</span>
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center shadow-md z-10">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-foreground/80 hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-semibold tracking-[0.2em] uppercase py-2 border-b border-border/50 transition-colors ${isActive(link.to) ? 'text-gold' : 'text-foreground/70 hover:text-gold'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
