import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-44 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4 animate-fade-in font-bold">
              Get In Touch
            </p>
            <h1 className="font-display text-5xl sm:text-7xl text-foreground tracking-wider animate-fade-in-up uppercase">
              Contact <span className="gold-gradient-text">Us</span>
            </h1>
            <p className="text-muted-foreground text-sm tracking-wider max-w-md mx-auto mt-4 animate-fade-in delay-200">
              We're here to assist you with your luxury selection. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Address */}
            <div className="glass-card p-8 rounded-sm text-center flex flex-col items-center group hover:border-gold/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-sm gradient-gold-bg flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_hsl(344,100%,65%,0.3)] transition-all">
                <MapPin size={24} className="text-background" />
              </div>
              <h3 className="font-display text-2xl text-foreground tracking-wide mb-3">VISIT US</h3>
              <p className="text-muted-foreground text-sm leading-relaxed uppercase tracking-wider">
                E49, Subhasnagar, Nilgunj,<br /> Kolkata-700121, West Bengal
              </p>
            </div>

            {/* Mobile */}
            <div className="glass-card p-8 rounded-sm text-center flex flex-col items-center group hover:border-gold/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-sm gradient-gold-bg flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_hsl(344,100%,65%,0.3)] transition-all">
                <Phone size={24} className="text-background" />
              </div>
              <h3 className="font-display text-2xl text-foreground tracking-wide mb-3">CALL US</h3>
              <p className="text-muted-foreground text-sm leading-relaxed tracking-widest">
                +91 98362 08908
              </p>
              <a
                href="https://wa.me/919836208908"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-gold text-xs font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
              >
                <MessageCircle size={14} /> WhatsApp Support
              </a>
            </div>

            {/* Mail */}
            <div className="glass-card p-8 rounded-sm text-center flex flex-col items-center group hover:border-gold/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-sm gradient-gold-bg flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_hsl(344,100%,65%,0.3)] transition-all">
                <Mail size={24} className="text-background" />
              </div>
              <h3 className="font-display text-2xl text-foreground tracking-wide mb-3">EMAIL US</h3>
              <p className="text-muted-foreground text-sm leading-relaxed tracking-wider lowercase">
                zued.jewels@gmail.com
              </p>
              <a
                href="mailto:zued.jewels@gmail.com"
                className="mt-4 text-gold text-xs font-bold tracking-[0.2em] uppercase border-b border-gold/30 pb-1 hover:border-gold transition-colors"
              >
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
