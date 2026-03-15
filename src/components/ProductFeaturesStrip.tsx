import { Star, Droplets, ShieldCheck, Sparkles } from 'lucide-react';

const ProductFeaturesStrip = () => {
    const features = [
        {
            icon: Star,
            text: "High Quality Stainless Steel",
        },
        {
            icon: Droplets,
            text: "Water & Sweat Resistant",
        },
        {
            icon: ShieldCheck,
            text: "6 Month Colour Assurance",
        },
        {
            icon: Sparkles,
            text: "18K Gold Plated Finish",
        },
    ];

    return (
        <div className="w-full bg-white py-4 md:py-8 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-3">
                <div className="grid grid-cols-2 lg:flex lg:flex-row justify-between items-center gap-y-4 gap-x-2 lg:gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-row items-center justify-center lg:justify-start gap-1.5 md:gap-3">
                            <div className="w-7 h-7 md:w-10 md:h-10 bg-pink-600 rounded-full flex items-center justify-center shrink-0 shadow-sm shadow-pink-200">
                                <feature.icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                            </div>
                            <span className="text-[9px] sm:text-[10px] md:text-sm font-bold uppercase tracking-wide text-pink-700 leading-tight">
                                {feature.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductFeaturesStrip;
