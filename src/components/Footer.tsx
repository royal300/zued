import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import staticLogo from '@/assets/logo.png';

const Footer = () => {
  const [dynamicLogo, setDynamicLogo] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.ok ? r.json() : {})
      .then(d => {
        const settings = d as any;
        if (settings.site_logo) setDynamicLogo(settings.site_logo);
      })
      .catch(() => { });
  }, []);

  return (
    <footer id="contact" className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <img
              src="/zued_logo_big.png?v=1.1"
              alt="ZUED"
              className="h-16 sm:h-14 w-auto object-contain object-left"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Premium anti-tarnish jewellery. Designed for those who stand out.
            </p>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
              Shine That Stays.
            </p>
            <p className="text-muted-foreground text-[10px] tracking-wider uppercase mt-2">
              By <a href="https://royal300.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Royal 300</a>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-display text-xl tracking-widest">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Ring', to: '/?category=Ring' },
                { label: 'Bracelet', to: '/?category=Bracelet' },
                { label: 'Earring', to: '/?category=Earring' },
                { label: 'Wrestlet', to: '/?category=Wrestlet' },
                { label: 'Chain', to: '/?category=Chain' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact Us', to: '/contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-muted-foreground hover:text-gold text-sm tracking-wider uppercase transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-foreground font-display text-xl tracking-widest">Connect</h4>
            <a href="https://wa.me/918617201731" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-sm gradient-gold-bg flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_hsl(43,74%,49%,0.5)] transition-all duration-300">
                <MessageCircle size={18} className="text-background" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">WhatsApp</p>
                <p className="text-muted-foreground text-xs">+91 98362 08908</p>
              </div>
            </a>
            <a href="https://www.instagram.com/zued.jewels/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-sm gradient-gold-bg flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_hsl(43,74%,49%,0.5)] transition-all duration-300">
                <Instagram size={18} className="text-background" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">Instagram</p>
                <p className="text-muted-foreground text-xs">@zued.jewels</p>
              </div>
            </a>
            <a href="mailto:zued.jewels@gmail.com" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-sm gradient-gold-bg flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_hsl(43,74%,49%,0.5)] transition-all duration-300">
                <Mail size={18} className="text-background" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">Email</p>
                <p className="text-muted-foreground text-xs">zued.jewels@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs tracking-wider">© 2026 ZUED. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
