import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { jewelleryProducts } from '@/data/products';
import { JewelleryCard } from '@/components/ProductCard';
import ApiProductCard from '@/components/ApiProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductFeaturesStrip from '@/components/ProductFeaturesStrip';

const Jewellery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initCat = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initCat);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [apiCategories, setApiCategories] = useState<any[]>([]);

  const staticCats = ['All', 'Ring', 'Chain Pendant', 'Earrings', 'Bracelet', 'Bangles', 'Chain Earring Set'];

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

  const displayedStatic = activeCategory === 'All' ? filteredStatic : filteredStatic.slice(0, 8);
  const displayedApi = activeCategory === 'All' ? filteredApi : filteredApi.slice(0, 8 - displayedStatic.length);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-32 lg:pt-44 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-gold/8 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-black text-[10px] tracking-[0.5em] uppercase mb-4 animate-fade-in font-bold">
            Luxury Collection
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-foreground tracking-wider animate-fade-in-up">
            ANTI TARNISH
            <span className="block gold-gradient-text uppercase font-bold">Shine That Stays</span>
          </h1>
          <p className="text-muted-foreground text-sm tracking-wider max-w-md mx-auto mt-4 animate-fade-in delay-200">
            Adorn yourself in luxury. Each piece is a statement of your excellence.
          </p>
          <div className="flex items-center gap-4 justify-center mt-6 animate-fade-in delay-300">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </div>
      </section>

      <ProductFeaturesStrip />

      {/* Promotional Banners */}
      <section className="px-4 mt-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Banner 1 */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden group shadow-lg">
              <img
                src="/banner1.png"
                alt="Banner 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Banner 2 */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden group shadow-lg">
              <img
                src="/banner2.png"
                alt="Banner 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
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
                className={`px-5 py-2 rounded-sm text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${activeCategory === cat ? 'btn-gold' : 'bg-white border border-gold/30 text-gold hover:border-gold'
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
            {displayedStatic.map((product, i) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <JewelleryCard product={product} />
              </div>
            ))}
            {displayedApi.map((product, i) => (
              <div key={`api-${product.id}`} className="animate-fade-in-up" style={{ animationDelay: `${(displayedStatic.length + i) * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <ApiProductCard product={product} type="jewellery" />
              </div>
            ))}
          </div>
          {displayedStatic.length === 0 && displayedApi.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-16">No products in this category.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jewellery;
