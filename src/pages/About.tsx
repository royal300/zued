import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Gem, ShieldCircle, Droplets, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6">
              About <span className="text-gold">ZUED</span>
            </h1>
            <div className="w-24 h-px bg-gold/50 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              At ZUED, we believe jewellery should be more than just an accessory — it should be a reflection of your style, confidence, and individuality.
            </p>
          </div>

          <div className="space-y-20">
            {/* Mission Section */}
            <section className="animate-slide-up">
              <div className="glass-card p-8 md:p-12 rounded-sm border border-border/50 bg-white/5 backdrop-blur-md">
                <p className="text-lg text-foreground/80 leading-relaxed mb-0">
                  Our goal is to create timeless pieces that combine modern aesthetics with lasting quality, so you can wear them every day with confidence.
                </p>
              </div>
            </section>

            {/* Quality Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-3 text-gold mb-2">
                  <Gem size={24} />
                  <h2 className="font-display text-xl tracking-wider uppercase">Crafted with Premium Materials</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Every ZUED piece is carefully crafted using high-quality stainless steel (202 & 304 grade). These materials are known for their strength, durability, and skin-friendly properties, ensuring that your jewellery remains beautiful and comfortable to wear.
                </p>
              </section>

              <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 text-gold mb-2">
                  <Sparkles size={24} />
                  <h2 className="font-display text-xl tracking-wider uppercase">Luxury Gold Finish</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To achieve a rich and elegant appearance, our jewellery features 18K gold plating with advanced IGP coating. This process helps maintain the brilliance of the jewellery while protecting it from everyday wear.
                </p>
              </section>

              <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 text-gold mb-2">
                  <Droplets size={24} />
                  <h2 className="font-display text-xl tracking-wider uppercase">Long-Lasting Colour Assurance</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We understand that jewellery should keep its shine over time. That is why our pieces are designed with anti-tarnish technology and colour assurance, helping them maintain their elegant look even with regular use.
                </p>
              </section>

              <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 text-gold mb-2">
                  <ShieldCircle size={24} />
                  <h2 className="font-display text-xl tracking-wider uppercase">Designed with Trust in Mind</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  At ZUED, customer trust is at the heart of everything we do. Each piece is thoughtfully designed, carefully inspected, and created to offer style, durability, and confidence in every wear.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
