import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jewelleryProducts } from '@/data/products';
import { JewelleryCard } from '@/components/ProductCard';
import ApiProductCard from '@/components/ApiProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Jewellery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initCat = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initCat);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [apiCategories, setApiCategories] = useState<any[]>([]);

  const staticCats = ['All', 'Ring', 'Bracelet', 'Earring', 'Wrestlet', 'Chain'];

  useEffect(() => {
    fetch('/api/products?type=jewellery')
      .then(r => r.ok ? r.json() : [])
      .then(d => setApiProducts(Array.isArray(d) ? d : []))
      .catch(() => { });

    fetch('/api/categories')
      .then(r => r.ok ? r.json() : [])
      .catch(() => { });
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setActiveCategory(cat);
  }, [searchParams]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setSearchParams(new URLSearchParams());
    } else {
      setSearchParams({ category: cat });
    }
  };

  const apiCatNames = apiCategories
    .filter(c => c.product_type === 'jewellery' || c.product_type === 'all')
    .map(c => c.name);
  const extraCats = apiCatNames.filter(n => !staticCats.includes(n));
  const allCategories = [...staticCats, ...extraCats];

  const filteredStatic = activeCategory === 'All'
    ? jewelleryProducts
    : jewelleryProducts.filter(p => p.category === activeCategory);

  const filteredApi = apiProducts.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category_name === activeCategory;
  });

  const totalCount = jewelleryProducts.length + apiProducts.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-gold/8 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4 animate-fade-in">
            Luxury Collection
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-foreground tracking-wider animate-fade-in-up">
            ANTI TARNISH
            <span className="block gold-gradient-text">JEWELLERY</span>
          </h1>
          <p className="text-muted-foreground text-sm tracking-wider max-w-md mx-auto mt-4 animate-fade-in delay-200">
            Adorn yourself in luxury. Each piece is a statement of your excellence.
          </p>
          <div className="flex items-center gap-4 justify-center mt-6 animate-fade-in delay-300">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold text-[10px] tracking-[0.4em] uppercase">{totalCount} Pieces</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Banner 1 - Rings */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden group shadow-lg">
              <img
                src="/rings-banner.png"
                alt="Rings Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
                <span className="text-foreground tracking-[0.3em] text-xs font-bold uppercase mb-2">Exclusive Rings</span>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-gold mb-2 drop-shadow-md">
                  10% DISCOUNT
                </h3>
                <p className="text-foreground/90 text-sm sm:text-base font-medium max-w-[80%] drop-shadow-sm">
                  on purchases above ₹299/-
                </p>
                <button className="mt-4 px-6 py-2 bg-foreground text-background text-xs tracking-widest uppercase font-bold hover:bg-gold transition-colors duration-300">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Banner 2 - Bangles & Bracelets */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden group shadow-lg">
              <img
                src="/bangles-banner.png"
                alt="Bangles Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
                <span className="text-foreground tracking-[0.3em] text-xs font-bold uppercase mb-2">Bangles & Wrestlets</span>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-gold mb-2 drop-shadow-md">
                  FLAT 20% OFF
                </h3>
                <p className="text-foreground/90 text-sm sm:text-base font-medium max-w-[80%] drop-shadow-sm">
                  on purchases above ₹1000/-
                </p>
                <button className="mt-4 px-6 py-2 bg-foreground text-background text-xs tracking-widest uppercase font-bold hover:bg-gold transition-colors duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-5 py-2 rounded-sm text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${activeCategory === cat ? 'btn-gold' : 'btn-outline-gold'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredStatic.map((product, i) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <JewelleryCard product={product} />
              </div>
            ))}
            {filteredApi.map((product, i) => (
              <div key={`api-${product.id}`} className="animate-fade-in-up" style={{ animationDelay: `${(filteredStatic.length + i) * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <ApiProductCard product={product} type="jewellery" />
              </div>
            ))}
          </div>
          {filteredStatic.length === 0 && filteredApi.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-16">No products in this category.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jewellery;
