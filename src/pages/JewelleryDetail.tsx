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

const resolveImage = (img: string): string => {
  if (!img) return '';
  if (img.startsWith('http') || img.startsWith('/uploads')) return img;
  return getProductImage(img);
};

const JewelleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isApi = id?.startsWith('api-');
  const apiId = isApi ? id!.replace('api-', '') : null;

  const staticProduct = !isApi ? jewelleryProducts.find((p) => p.id === id) : undefined;

  const [apiProduct, setApiProduct] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(isApi);
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!isApi || !apiId) return;
    fetch(`/api/products/${apiId}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { setApiProduct(d); setApiLoading(false); })
      .catch(() => setApiLoading(false));
  }, [apiId, isApi]);

  if (apiLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gold" />
      </div>
    );
  }

  if (!staticProduct && !apiProduct) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link to="/jewellery" className="btn-gold px-6 py-3 rounded-sm text-sm">Back to Jewellery</Link>
        </div>
      </div>
    );
  }

  // === STATIC PRODUCT UI ===
  if (staticProduct) {
    const product = staticProduct;
    const price = parseInt(product.price.replace(/[₹,]/g, ''));

    const handleAddToCart = () => {
      addToCart({ productId: product.id, productType: 'jewellery', name: product.name, price, image: product.image, quantity: 1 });
      toast.success(`${product.name} added to cart!`);
    };

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-24 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <button onClick={() => navigate('/jewellery')} className="flex items-center gap-2 text-muted-foreground hover:text-gold text-xs tracking-wider uppercase mb-8 transition-colors group">
              <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />Back to Jewellery
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              <div className="space-y-3">
                <div className="relative aspect-square rounded-sm overflow-hidden gold-border-glow">
                  {showVideo ? (
                    <video src={jewelleryVideo} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                  ) : (
                    <img src={getProductImage(product.gallery[activeImage])} alt={product.name} className="w-full h-full object-cover animate-scale-in" />
                  )}
                  {product.badge && <div className="absolute top-4 left-4 gradient-gold-bg text-background text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">{product.badge}</div>}
                </div>
                <div className="flex gap-2">
                  {product.gallery.map((img, i) => (
                    <button key={i} onClick={() => { setActiveImage(i); setShowVideo(false); }}
                      className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${!showVideo && activeImage === i ? 'border-gold shadow-[0_0_10px_hsl(43,74%,49%,0.4)]' : 'border-border hover:border-gold/50'}`}>
                      <img src={getProductImage(img)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <button onClick={() => setShowVideo(true)} className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all relative bg-white flex items-center justify-center ${showVideo ? 'border-gold shadow-[0_0_10px_hsl(43,74%,49%,0.4)]' : 'border-border hover:border-gold/50'}`}>
                    <Play size={20} className="text-black" fill="currentColor" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-5 animate-fade-in-up">
                <div>
                  <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-2">{product.category}</p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-wider leading-none mb-3">{product.name.toUpperCase()}</h1>
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-gold/30 to-transparent" />
                <div>
                  <p className="text-muted-foreground text-xs tracking-wider uppercase mb-1">Price</p>
                  <p className="gold-gradient-text font-display text-3xl">{product.price}</p>
                </div>
                <div className="glass-card rounded-sm p-5 space-y-3">
                  {['Anti-Tarnish Coating — Premium finish that lasts', 'Hypoallergenic Materials — Safe for all skin types', 'Handcrafted Quality — Each piece inspected individually', 'Luxury Packaging — Gift-ready presentation'].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Star size={12} className="text-gold mt-0.5 flex-shrink-0" fill="currentColor" />
                      <p className="text-muted-foreground text-xs leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gradient-to-r from-gold/30 to-transparent" />
                <button onClick={handleAddToCart} className="btn-gold flex items-center justify-center gap-3 py-4 rounded-sm text-sm w-full">
                  <ShoppingCart size={18} /> Add to Cart — {product.price}
                </button>
              </div>
            </div>
          </div>
        </main>

        <ProductFeaturesStrip />

        <section className="py-20 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl text-foreground tracking-wider mb-8 uppercase">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {jewelleryProducts
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((p, i) => (
                  <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <JewelleryCard product={p} />
                  </div>
                ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // === API PRODUCT UI ===
  const p = apiProduct;
  const images: string[] = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images || []);
  const features: string[] = typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || []);
  const displayPrice = Number(p.sale_price || p.original_price);
  const hasSale = p.original_price && p.sale_price && Number(p.original_price) > Number(p.sale_price);
  const displayImage = images[activeImage] ? resolveImage(images[activeImage]) : '';

  const [apiProducts, setApiProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products?type=jewellery')
      .then(r => r.ok ? r.json() : [])
      .then(d => setApiProducts(Array.isArray(d) ? d : []))
      .catch(() => { });
  }, []);

  const handleAddApiToCart = () => {
    addToCart({ productId: `api-${p.id}`, productType: 'jewellery', name: p.name, price: displayPrice, image: displayImage, quantity: 1 });
    toast.success(`${p.name} added to cart!`);
  };

  const similarApiProducts = apiProducts
    .filter(ap => ap.category_name === p.category_name && `api-${ap.id}` !== id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-gold text-xs tracking-wider uppercase mb-8 transition-colors group">
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />Back to Store
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <div className="space-y-3">
              <div className="relative aspect-square rounded-sm overflow-hidden gold-border-glow bg-secondary">
                {displayImage ? (
                  <img src={displayImage} alt={p.name} className="w-full h-full object-cover animate-scale-in" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                )}
                {p.badge && <div className="absolute top-4 left-4 gradient-gold-bg text-background text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">{p.badge}</div>}
                {hasSale && <div className="absolute top-4 right-4 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm">SALE</div>}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${activeImage === i ? 'border-gold shadow-[0_0_10px_hsl(43,74%,49%,0.4)]' : 'border-border hover:border-gold/50'}`}>
                      <img src={resolveImage(img)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5 animate-fade-in-up">
              <div>
                {p.category_name && <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-2">{p.category_name}</p>}
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-wider leading-none mb-3">{p.name.toUpperCase()}</h1>
                {p.description && <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>}
              </div>
              <div className="h-px bg-gradient-to-r from-gold/30 to-transparent" />
              <div>
                <p className="text-muted-foreground text-xs tracking-wider uppercase mb-1">Price</p>
                <div className="flex items-end gap-3">
                  <p className="gold-gradient-text font-display text-3xl">₹{displayPrice.toLocaleString()}</p>
                  {hasSale && <p className="text-muted-foreground text-sm line-through mb-1">₹{Number(p.original_price).toLocaleString()}</p>}
                </div>
              </div>
              {features.length > 0 && (
                <div className="glass-card rounded-sm p-5 space-y-3">
                  {features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <Star size={12} className="text-gold mt-0.5 flex-shrink-0" fill="currentColor" />
                      <p className="text-muted-foreground text-xs leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="h-px bg-gradient-to-r from-gold/30 to-transparent" />
              <button onClick={handleAddApiToCart} className="btn-gold flex items-center justify-center gap-3 py-4 rounded-sm text-sm w-full">
                <ShoppingCart size={18} /> Add to Cart — ₹{displayPrice.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </main>

      <ProductFeaturesStrip />

      {similarApiProducts.length > 0 && (
        <section className="py-20 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl text-foreground tracking-wider mb-8 uppercase">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {similarApiProducts.map((ap, i) => (
                <div key={ap.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <ApiProductCard product={ap} type="jewellery" />
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
