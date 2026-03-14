import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Play, Loader2 } from 'lucide-react';
import { jewelleryProducts } from '@/data/products';
import { getProductImage } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import jewelleryVideo from '@/assets/jewellery-video.mp4';
import ProductFeaturesStrip from '@/components/ProductFeaturesStrip';
import { JewelleryCard } from '@/components/ProductCard';
import ApiProductCard from '@/components/ApiProductCard';

// getProductImage is now imported from @/components/ProductCard


const JewelleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- 1. ALL HOOKS AT THE TOP ---
  const staticProduct = jewelleryProducts.find((p) => p.id === id);
  const isApi = !staticProduct && !!id && !isNaN(Number(id));
  const apiId = isApi ? id : null;

  const [apiProduct, setApiProduct] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(isApi);
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [apiProducts, setApiProducts] = useState<any[]>([]);

  // Reset state when ID changes
  useEffect(() => {
    setApiProduct(null);
    setApiLoading(isApi);
    setActiveImage(0);
    setShowVideo(false);
  }, [id, isApi]);

  // Fetch specific product if it's an API ID
  useEffect(() => {
    if (!isApi || !apiId) return;
    fetch(`/api/products/${apiId}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { 
        setApiProduct(d); 
        setApiLoading(false); 
      })
      .catch(() => setApiLoading(false));
  }, [apiId, isApi]);

  // Fetch all products for "Similar Products" section
  useEffect(() => {
    fetch('/api/products?type=jewellery')
      .then(r => r.ok ? r.json() : [])
      .then(d => setApiProducts(Array.isArray(d) ? d : []))
      .catch(() => { });
  }, []);

  // --- 2. EARLY RETURNS (After Hooks) ---
  if (apiLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 size={32} className="animate-spin text-gold" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!staticProduct && !apiProduct) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Product not found</p>
            <Link to="/" className="btn-gold px-6 py-3 rounded-sm text-sm">Back to Jewellery</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --- 3. DATA PREPARATION ---
  const isStatic = !!staticProduct;
  const product = staticProduct || apiProduct;

  // Normalize data for both types
  const name = product.name;
  const category = isStatic ? product.category : product.category_name;
  const description = isStatic ? product.description : product.short_description;
  const longDescription = isStatic ? null : product.long_description;
  const badge = product.badge;
  
  // Price logic
  let displayPrice: number;
  let originalPrice: number | null = null;
  let priceString: string;

  if (isStatic) {
    displayPrice = parseInt(product.price.replace(/[₹,]/g, ''));
    priceString = product.price;
  } else {
    displayPrice = Number(product.sale_price || product.original_price);
    originalPrice = product.original_price ? Number(product.original_price) : null;
    priceString = `₹${displayPrice.toLocaleString()}`;
  }

  const hasSale = !isStatic && originalPrice && displayPrice < originalPrice;

  // Image/Gallery logic
  let gallery: string[] = [];
  if (isStatic) {
    gallery = product.gallery || [];
  } else {
    gallery = typeof product.images === 'string' ? JSON.parse(product.images) : (product.images || []);
  }

  const activeImageUrl = gallery[activeImage] ? getProductImage(gallery[activeImage]) : '';
  const isVideo = (url: string) => url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.mov');
  const activeUrlIsVideo = isStatic ? showVideo : (activeImageUrl && isVideo(activeImageUrl));

  const handleAddToCart = () => {
    addToCart({ 
      productId: String(product.id), 
      productType: 'jewellery', 
      name: product.name, 
      price: displayPrice, 
      image: isStatic ? product.image : activeImageUrl, 
      quantity: 1 
    });
    toast.success(`${product.name} added to cart!`);
  };

  const similarProducts = isStatic 
    ? jewelleryProducts.filter(p => p.category === category && p.id !== product.id).slice(0, 4)
    : apiProducts.filter(ap => ap.category_name === category && String(ap.id) !== id).slice(0, 4);

  // --- 4. MAIN RENDER ---
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-gold text-xs tracking-wider uppercase mb-8 transition-colors group">
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />Back
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Gallery Section */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-sm overflow-hidden gold-border-glow bg-secondary">
                {activeUrlIsVideo ? (
                  <video 
                    src={isStatic ? jewelleryVideo : activeImageUrl} 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                  />
                ) : activeImageUrl ? (
                  <img 
                    src={activeImageUrl} 
                    alt={name} 
                    className="w-full h-full object-cover animate-scale-in" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                )}
                
                {badge && (
                  <div className="absolute top-4 left-4 gradient-gold-bg text-background text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
                    {badge}
                  </div>
                )}
                
                {hasSale && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                    SALE
                  </div>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                {gallery.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setActiveImage(i); setShowVideo(false); }}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${!showVideo && activeImage === i ? 'border-gold shadow-[0_0_10px_hsl(43,74%,49%,0.4)]' : 'border-border hover:border-gold/50'}`}
                  >
                    {isVideo(img) ? (
                      <div className="w-full h-full flex items-center justify-center bg-black/5">
                        <Play size={20} className="text-gold/50" />
                      </div>
                    ) : (
                      <img src={getProductImage(img)} alt="" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
                
                {isStatic && (
                  <button 
                    onClick={() => setShowVideo(true)} 
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all relative bg-white flex items-center justify-center ${showVideo ? 'border-gold shadow-[0_0_10px_hsl(43,74%,49%,0.4)]' : 'border-border hover:border-gold/50'}`}
                  >
                    <Play size={20} className="text-black" fill="currentColor" />
                  </button>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-5 animate-fade-in-up">
              <div>
                {category && <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-2">{category}</p>}
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-wider leading-none mb-3">{name.toUpperCase()}</h1>
                {description && <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>}
              </div>

              <div className="h-px bg-gradient-to-r from-gold/30 to-transparent" />
              
              <div>
                <p className="text-muted-foreground text-xs tracking-wider uppercase mb-1">Price</p>
                <div className="flex items-end gap-3">
                  <p className="gold-gradient-text font-display text-3xl">{priceString}</p>
                  {hasSale && originalPrice && (
                    <p className="text-muted-foreground text-sm line-through mb-1">₹{originalPrice.toLocaleString()}</p>
                  )}
                </div>
              </div>

              <div className="glass-card rounded-sm p-5 space-y-3">
                {longDescription ? (
                  longDescription.split('\n').filter(Boolean).map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <Star size={12} className="text-gold mt-0.5 flex-shrink-0" fill="currentColor" />
                      <p className="text-muted-foreground text-xs leading-relaxed">{feature}</p>
                    </div>
                  ))
                ) : (
                  ['Anti-Tarnish Coating — Premium finish that lasts', 'Hypoallergenic Materials — Safe for all skin types', 'Handcrafted Quality — Each piece inspected individually', 'Luxury Packaging — Gift-ready presentation'].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Star size={12} className="text-gold mt-0.5 flex-shrink-0" fill="currentColor" />
                      <p className="text-muted-foreground text-xs leading-relaxed">{feature}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-gold/30 to-transparent" />
              
              <button 
                onClick={handleAddToCart} 
                className="btn-gold flex items-center justify-center gap-3 py-4 rounded-sm text-sm w-full"
              >
                <ShoppingCart size={18} /> Add to Cart — {priceString}
              </button>
            </div>
          </div>
        </div>
      </main>

      <ProductFeaturesStrip />

      {similarProducts.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl text-foreground tracking-wider mb-8 uppercase">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {similarProducts.map((p: any, i: number) => (
                <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  {isStatic ? (
                    <JewelleryCard product={p} />
                  ) : (
                    <ApiProductCard product={p} type="jewellery" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default JewelleryDetail;
