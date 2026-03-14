import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jewelleryProducts } from '@/data/products';
import { JewelleryCard } from '@/components/ProductCard';
import ApiProductCard from '@/components/ApiProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Map URL slug → display name & description
const categoryMeta: Record<string, { name: string; description: string; headline: string }> = {
    ring: {
        name: 'Ring',
        headline: 'RINGS',
        description: 'From minimalist bands to bold statement pieces — crafted to endure.',
    },
    'chain-pendant': {
        name: 'Chain Pendant',
        headline: 'CHAIN PENDANTS',
        description: 'Timeless chains with artisan pendants, plated in anti-tarnish gold.',
    },
    earrings: {
        name: 'Earrings',
        headline: 'EARRINGS',
        description: 'Studs, hoops and drops for every occasion. Effortlessly elegant.',
    },
    bracelet: {
        name: 'Bracelet',
        headline: 'BRACELETS',
        description: 'Bold links and delicate chains — handcrafted wrist luxury.',
    },
    bangles: {
        name: 'Bangles',
        headline: 'BANGLES',
        description: 'Classic and stacking bangles in premium gold-plated finish.',
    },
    'chain-earring-set': {
        name: 'Chain Earring Set',
        headline: 'CHAIN EARRING SETS',
        description: 'Perfectly matched chain and earring sets for a complete look.',
    },
};

const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const meta = slug ? categoryMeta[slug] : null;

    const [apiProducts, setApiProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/products?type=jewellery')
            .then(r => r.ok ? r.json() : [])
            .then(d => setApiProducts(Array.isArray(d) ? d : []))
            .catch(() => { });
    }, []);

    if (!meta) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Category not found</p>
                    <Link to="/" className="btn-gold px-6 py-3 rounded-sm text-sm">Back to Home</Link>
                </div>
            </div>
        );
    }

    const filteredStatic = jewelleryProducts.filter(p => p.category === meta.name);
    const filteredApi = apiProducts.filter(p => p.category_name === meta.name);
    const totalCount = filteredStatic.length + filteredApi.length;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero */}
            <section className="relative pt-44 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
                <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-gold/8 blur-[100px] pointer-events-none" />
                <div className="absolute top-32 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-black text-[10px] tracking-[0.5em] uppercase mb-4 animate-fade-in font-bold">
                        Luxury Collection
                    </p>
                    <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-foreground tracking-wider animate-fade-in-up">
                        <span className="block gold-gradient-text">{meta.headline}</span>
                    </h1>
                    <p className="text-muted-foreground text-sm tracking-wider max-w-md mx-auto mt-4 animate-fade-in delay-200">
                        {meta.description}
                    </p>
                    <div className="flex items-center gap-4 justify-center mt-6 animate-fade-in delay-300">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
                        <span className="text-gold text-[10px] tracking-[0.4em] uppercase">
                            {totalCount} {totalCount === 1 ? 'Piece' : 'Pieces'}
                        </span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
                    </div>
                </div>
            </section>

            {/* Breadcrumb */}
            <section className="px-4 mb-4">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                        <span className="text-gold">/</span>
                        <span className="text-foreground font-semibold tracking-wider">{meta.name}</span>
                    </nav>
                </div>
            </section>

            {/* Product Grid */}
            <section className="px-4 pb-20 pt-6">
                <div className="max-w-7xl mx-auto">
                    {(filteredStatic.length === 0 && filteredApi.length === 0) ? (
                        <div className="text-center py-24">
                            <p className="text-muted-foreground text-sm tracking-wider">
                                No products available in this category yet. Check back soon!
                            </p>
                            <Link to="/" className="btn-gold px-6 py-3 rounded-sm text-sm mt-6 inline-block">
                                View All Products
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                            {filteredStatic.map((product, i) => (
                                <div
                                    key={product.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}
                                >
                                    <JewelleryCard product={product} />
                                </div>
                            ))}
                            {filteredApi.map((product, i) => (
                                <div
                                    key={`api-${product.id}`}
                                    className="animate-fade-in-up"
                                    style={{
                                        animationDelay: `${(filteredStatic.length + i) * 0.08}s`,
                                        opacity: 0,
                                        animationFillMode: 'forwards',
                                    }}
                                >
                                    <ApiProductCard product={product} type="jewellery" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CategoryPage;
