import { useState, useEffect } from 'react';
import { Upload, Save, CheckCircle, AlertCircle, Settings as SettingsIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { adminFetch } from '@/context/AdminAuthContext';

const Settings = () => {
    const [logo, setLogo] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetch('/api/settings')
            .then(r => r.json())
            .then(d => {
                if (d.site_logo) setLogo(d.site_logo);
            })
            .catch(() => { });
    }, []);

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await adminFetch('/api/admin/settings/logo', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Upload failed' }));
                throw new Error(errorData.error || 'Upload failed');
            }
            const data = await res.json();
            setLogo(data.url);
            toast({
                title: "Logo uploaded",
                description: "Site logo has been updated successfully.",
            });
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to upload logo.",
                variant: "destructive"
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/10 rounded-sm">
                        <SettingsIcon size={20} className="text-gold" />
                    </div>
                    <h1 className="font-display text-2xl text-foreground tracking-tight uppercase">Site Settings</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest flex items-center gap-2">
                        Logo Configuration
                    </h2>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        Update your brand's central identity. This logo will appear in the main navbar and the landing page hero section.
                    </p>
                    <div className="mt-4 p-3 bg-secondary/30 rounded-sm border border-border/50">
                        <p className="text-[10px] font-medium uppercase text-gold tracking-wider mb-2">Recommended Specs</p>
                        <ul className="space-y-1">
                            <li className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-gold/40" />
                                PNG with transparency
                            </li>
                            <li className="text-[10px] text-muted-foreground flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-gold/40" />
                                Minimum 800px width
                            </li>
                            <li className="text-[10px] text-muted-foreground flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-gold/40" />
                                Aspect ratio ~ 2:1
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="glass-card p-8 rounded-sm border-gold/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors duration-500" />

                        <label className="block text-xs font-medium text-foreground/50 uppercase tracking-wider mb-4">Current Site Logo</label>

                        <div className="flex flex-col items-center justify-center min-h-[240px] border-2 border-dashed border-border/60 rounded-sm hover:border-gold/40 transition-all duration-500 bg-background/30 relative z-10">
                            {logo ? (
                                <div className="space-y-6 flex flex-col items-center w-full px-4">
                                    <div className="p-6 bg-gradient-to-b from-white/5 to-transparent rounded-sm flex items-center justify-center w-full min-h-[160px]">
                                        <img src={logo} alt="Current Logo" className="h-28 w-auto object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)] animate-fade-in" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm uppercase tracking-tighter">Live Asset</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-4">
                                    <div className="w-14 h-14 rounded-full bg-gold/5 flex items-center justify-center mx-auto border border-gold/10">
                                        <Upload size={24} className="text-gold/60" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-foreground font-medium uppercase tracking-wide">Upload New Logo</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Supports PNG, JPG, SVG</p>
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleLogoUpload}
                                disabled={uploading}
                                accept="image/*"
                            />
                        </div>

                        {uploading && (
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-gold animate-pulse font-bold tracking-widest justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                SYNCING BRAND IDENTITY...
                            </div>
                        )}

                        {!uploading && logo && (
                            <div className="mt-4 text-center">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Click the box above to replace current logo</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
