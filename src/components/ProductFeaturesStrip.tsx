import { Award, ShieldCheck, Clock } from 'lucide-react';

const ProductFeaturesStrip = () => {
    const features = [
        {
            icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
            text: "High Quality Product",
        },
        {
            icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
            text: "Water and Sweat Resistance",
        },
        {
            icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
            text: "6 month colour assurance",
        },
    ];

    return (
        <div className="w-full bg-white py-6 md:py-8 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center gap-2 md:gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-2 md:gap-3 flex-1">
                            <div className="text-pink-600">
                                {feature.icon}
                            </div>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-pink-600">
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
