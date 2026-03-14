import { useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Verified Buyer",
        content: "The quality of the rings is absolutely stunning. I've been wearing my signet ring for months, and the shine hasn't faded even a bit. Truly anti-tarnish!",
        rating: 5
    },
    {
        name: "Rahul Mehra",
        role: "Verified Buyer",
        content: "ZUED has the best collection of men's jewellery. The Cuban link chain is heavy, bold, and looks extremely premium. Highly recommended!",
        rating: 5
    },
    {
        name: "Ananya Iyer",
        role: "Verified Buyer",
        content: "I bought the serpent chain pendant and I'm in love with it. The detailing is beautiful and it goes with everything in my wardrobe.",
        rating: 5
    },
    {
        name: "Vikram Singh",
        role: "Verified Buyer",
        content: "Excellent customer service and very fast delivery. The packaging was also very elegant. This is my go-to place for jewellery now.",
        rating: 5
    }
];

const Testimonials = () => {
    const [emblaRef] = useEmblaCarousel({
        loop: true,
        align: 'start',
    });

    return (
        <section className="py-20 px-4 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-display text-4xl sm:text-5xl text-foreground tracking-wider mb-4 uppercase">What Our Clients Say</h2>
                    <div className="h-px w-24 bg-gold mx-auto" />
                </div>

                <div className="embla" ref={emblaRef}>
                    <div className="embla__container flex gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="embla__slide flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                                <div className="glass-card p-8 rounded-sm border border-gold/20 h-full flex flex-col justify-between hover:border-gold/50 transition-colors duration-300">
                                    <div>
                                        <Quote className="text-gold/30 mb-4" size={32} />
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(t.rating)].map((_, i) => (
                                                <Star key={i} size={14} className="text-gold" fill="currentColor" />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground text-sm italic mb-6 leading-relaxed">
                                            "{t.content}"
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-display text-lg text-foreground tracking-wider">{t.name.toUpperCase()}</p>
                                        <p className="text-gold text-[10px] tracking-[0.2em] uppercase font-semibold">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
