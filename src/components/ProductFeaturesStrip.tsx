import { Star, Droplets, ShieldCheck, Sparkles } from 'lucide-react';

const ProductFeaturesStrip = () => {
    const features = [
        {
            icon: <Star className="w-4 h-4 md:w-6 md:h-6" />,
            text: "High Quality Stainless Steel",
        },
        {
            icon: <Droplets className="w-4 h-4 md:w-6 md:h-6" />,
            text: "Water & Sweat Resistant",
        },
        {
            icon: <ShieldCheck className="w-4 h-4 md:w-6 md:h-6" />,
            text: "6 Month Colour Assurance",
        },
        {
            icon: <Sparkles className="w-4 h-4 md:w-6 md:h-6" />,
            text: "18K Gold Plated Finish",
        },
    ];

    return (
        <div className="w-full bg-white py-6 md:py-8 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:flex md:flex-row justify-between items-center gap-y-6 gap-x-2 md:gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-row items-center justify-center gap-2 md:gap-3">
                            <div className="text-pink-600 shrink-0">
                                {feature.icon}
                            </div>
                            <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-pink-600 whitespace-nowrap">
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
