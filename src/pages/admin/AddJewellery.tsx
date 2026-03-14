import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminFetch } from '@/context/AdminAuthContext';
import { Loader2, Upload, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { getProductImage } from '@/components/ProductCard';
import { toast } from 'sonner';

const AddJewellery = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const defaultLongDescription = `Waterproof Jewellery — Made for daily wear\n\nSweat Resistant — Perfect for everyday style\n\nLightweight Design — Comfort all day\n\nPremium Plating — Long-lasting color`;

    const [categories, setCategories] = useState<any[]>([]);
    const [form, setForm] = useState({
        name: '', short_description: '', long_description: isEdit ? '' : defaultLongDescription, category_id: '', original_price: '',
        sale_price: '', stock: '', badge: '',
    });
    const [images, setImages] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>(['']);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        adminFetch('/api/admin/categories').then(r => r.json()).then(d => setCategories(Array.isArray(d) ? d : []));
        if (isEdit) {
            adminFetch('/api/admin/products').then(r => r.json()).then(d => {
                const p = d.find((x: any) => String(x.id) === id);
                if (p) {
                    setForm({
                        name: p.name,
                        short_description: p.short_description || '',
                        long_description: p.long_description || '',
                        category_id: p.category_id || '',
                        original_price: p.original_price,
                        sale_price: p.sale_price || '',
                        stock: p.stock,
                        badge: p.badge || ''
                    });
                    setImages(typeof p.images === 'string' ? JSON.parse(p.images) : (p.images || []));
                }
            });
        }
    }, [id, isEdit]);

    const discountPct = form.original_price && form.sale_price
        ? Math.round((1 - Number(form.sale_price) / Number(form.original_price)) * 100) : 0;

    const uploadImage = async (file: File) => {
        setUploading(true);
        const formData = new FormData(); formData.append('image', file);
        const token = localStorage.getItem('zued_admin_token');
        const res = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
        const json = await res.json();
        if (json.url) setImages(prev => [...prev, json.url]);
        setUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const body = { ...form, product_type: 'jewellery', images };
        const res = await adminFetch(isEdit ? `/api/admin/products/${id}` : '/api/admin/products', {
            method: isEdit ? 'PUT' : 'POST', body: JSON.stringify(body),
        });
        if (res.ok) { toast.success(isEdit ? 'Updated!' : 'Product created!'); navigate('/admin/products/jewellery'); }
        else { const d = await res.json(); toast.error(d.error || 'Error'); }
        setSaving(false);
    };

    const f = (key: string, val: any) => setForm(p => ({ ...p, [key]: val }));

    return (
        <div className="p-6 min-h-screen bg-white">
            <button onClick={() => navigate('/admin/products/jewellery')} className="flex items-center gap-2 text-muted-foreground hover:text-gold text-xs mb-6 transition-colors">
                <ArrowLeft size={14} /> Back to Jewellery
            </button>
            <h1 className="font-display text-2xl text-foreground tracking-widest mb-6">{isEdit ? 'EDIT' : 'ADD'} JEWELLERY</h1>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
                <div className="bg-[#fdfdfd] border border-border/80 rounded-sm p-5 space-y-4 shadow-sm">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-black">Basic Info</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Product Name *</label>
                            <input value={form.name} onChange={e => f('name', e.target.value)} required
                                placeholder="Enter product name"
                                className="w-full bg-white border border-border rounded-sm px-3 py-2 text-sm text-black placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 shadow-inner" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Category</label>
                            <select value={form.category_id} onChange={e => f('category_id', e.target.value)}
                                className="w-full bg-white border border-border rounded-sm px-3 py-2 text-sm text-black focus:outline-none focus:border-gold/60 shadow-inner">
                                <option value="">Select category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.parent_id ? '  └ ' : ''}{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Short Description (shown under name)</label>
                        <input value={form.short_description} onChange={e => f('short_description', e.target.value)}
                            placeholder="Brief catchy description"
                            className="w-full bg-white border border-border rounded-sm px-3 py-2 text-sm text-black placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 shadow-inner" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Long Description / Features</label>
                        <textarea value={form.long_description} onChange={e => f('long_description', e.target.value)} rows={6}
                            placeholder="Detailed description..."
                            className="w-full bg-white border border-border rounded-sm px-3 py-2 text-sm text-black placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 shadow-inner leading-relaxed" />
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-[#fdfdfd] border border-border/80 rounded-sm p-5 space-y-4 shadow-sm">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-black">Pricing & Stock</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Original Price (₹) *</label>
                            <input type="number" value={form.original_price} onChange={e => f('original_price', e.target.value)} required
                                placeholder="0.00"
                                className="w-full bg-white border border-border rounded-sm px-3 py-2 text-sm text-black placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 shadow-inner" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Sale Price (₹)</label>
                            <input type="number" value={form.sale_price} onChange={e => f('sale_price', e.target.value)}
                                placeholder="Optional sale price"
                                className="w-full bg-white border border-border rounded-sm px-3 py-2 text-sm text-black placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 shadow-inner" />
                        </div>
                        <div className="flex flex-col justify-end">
                            {discountPct > 0 && (
                                <span className="px-3 py-2 rounded-sm bg-green-500/10 border border-green-500/30 text-green-600 text-sm font-bold text-center">
                                    {discountPct}% OFF
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Stock</label>
                            <input type="number" value={form.stock} onChange={e => f('stock', e.target.value)}
                                placeholder="0"
                                className="w-full bg-white border border-border rounded-sm px-3 py-2 text-sm text-black placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 shadow-inner" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Badge (optional)</label>
                        <input value={form.badge} onChange={e => f('badge', e.target.value)} placeholder="e.g. LIMITED, NEW"
                            className="w-full sm:w-48 bg-white border border-border rounded-sm px-3 py-2 text-sm text-black placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 shadow-inner" />
                    </div>
                </div>

                <div className="bg-[#fdfdfd] border border-border/80 rounded-sm p-5 space-y-3 shadow-sm">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-black">Product Media (Images/Videos)</h2>
                    <p className="text-[10px] text-muted-foreground mb-2 italic">Tip: You can upload short videos (.mp4, .webm) for the gallery too!</p>
                    <div className="flex flex-wrap gap-3">
                        {images.map((img, i) => (
                            <div key={i} className="relative group">
                                {img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.webm') || img.toLowerCase().endsWith('.mov') ? (
                                    <video src={getProductImage(img)} className="w-20 h-20 object-cover rounded-sm border border-border shadow-sm" />
                                ) : (
                                    <img src={getProductImage(img)} className="w-20 h-20 object-cover rounded-sm border border-border shadow-sm" />
                                )}
                                <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive rounded-full text-white text-[10px] flex items-center justify-center border border-white opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            </div>
                        ))}
                        <label className="w-20 h-20 border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 transition-colors text-muted-foreground hover:text-gold bg-white shadow-sm">
                            {uploading ? <Loader2 size={16} className="animate-spin" /> : <><Upload size={16} /><span className="text-[10px] mt-1 font-semibold uppercase tracking-tighter">Upload</span></>}
                            <input type="file" accept="image/*,video/*" className="hidden" onChange={e => e.target.files && uploadImage(e.target.files[0])} />
                        </label>
                    </div>
                </div>

                <button type="submit" disabled={saving} className="btn-gold px-10 py-4 rounded-sm text-xs font-bold tracking-widest shadow-xl flex items-center gap-2">
                    {saving && <Loader2 size={15} className="animate-spin" />}
                    {isEdit ? 'SAVE PRODUCT CHANGES' : 'CREATE NEW PRODUCT'}
                </button>
            </form>
        </div>
    );
};

export default AddJewellery;
