import { Star, Droplets, ShieldCheck, Sparkles } from 'lucide-react';

const ProductFeaturesStrip = () => {
    const features = [
        {
            icon: <Star className="w-3 h-3 md:w-5 md:h-5" />,
            text: "High Quality Stainless Steel",
        },
        {
            icon: <Droplets className="w-3 h-3 md:w-5 md:h-5" />,
            text: "Water & Sweat Resistant",
        },
        {
            icon: <ShieldCheck className="w-3 h-3 md:w-5 md:h-5" />,
            text: "6 Month Colour Assurance",
        },
        {
            icon: <Sparkles className="w-3 h-3 md:w-5 md:h-5" />,
            text: "18K Gold Plated Finish",
        },
    ];

    return (
        <div className="w-full bg-white py-4 md:py-6 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-2 md:px-4">
                <div className="flex flex-row justify-between items-center gap-1 md:gap-4 overflow-hidden">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-row items-center justify-center gap-1 md:gap-3 flex-1">
                            <div className="text-pink-600 shrink-0">
                                {feature.icon}
                            </div>
                            <span className="text-[7px] min-[400px]:text-[8px] md:text-xs font-bold uppercase tracking-tighter md:tracking-wider text-pink-600 whitespace-nowrap">
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
