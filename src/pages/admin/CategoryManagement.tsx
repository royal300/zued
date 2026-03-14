import { useEffect, useState } from 'react';
import { adminFetch } from '@/context/AdminAuthContext';
import { Plus, Trash2, Loader2, ChevronRight } from 'lucide-react';

const CategoryManagement = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const [productType, setProductType] = useState('all');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const load = async () => {
        setLoading(true);
        const res = await adminFetch('/api/admin/categories');
        const json = await res.json();
        setCategories(Array.isArray(json) ? json : []);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const mainCats = categories.filter(c => !c.parent_id);
    const subCats = categories.filter(c => c.parent_id);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);
        const res = await adminFetch('/api/admin/categories', {
            method: 'POST',
            body: JSON.stringify({ name, parent_id: parentId || null, product_type: productType }),
        });
        const json = await res.json();
        if (!res.ok) setError(json.error || 'Error');
        else { setName(''); setParentId(''); setProductType('all'); await load(); }
        setSaving(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this category? Sub-categories will also be deleted.')) return;
        await adminFetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
        await load();
    };

    return (
        <div className="p-6 min-h-screen bg-white">
            <h1 className="font-display text-2xl text-foreground tracking-widest mb-6 uppercase">Categories</h1>

            {/* Add Form */}
            <div className="bg-[#fdfdfd] border border-border/80 rounded-sm p-6 mb-6 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black mb-4">Add Category</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                        type="text"
                        placeholder="Category name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="bg-white border border-border rounded-sm px-3 py-2 text-sm text-black placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/60 col-span-1 shadow-inner"
                    />
                    <select
                        value={parentId}
                        onChange={e => setParentId(e.target.value)}
                        className="bg-white border border-border rounded-sm px-3 py-2 text-sm text-black focus:outline-none focus:border-gold/60 shadow-inner"
                    >
                        <option value="">— Main Category —</option>
                        {mainCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <select
                        value={productType}
                        onChange={e => setProductType(e.target.value)}
                        className="bg-white border border-border rounded-sm px-3 py-2 text-sm text-black focus:outline-none focus:border-gold/60 shadow-inner"
                    >
                        <option value="all">All</option>
                        <option value="jewellery">Jewellery</option>
                    </select>
                    <button type="submit" disabled={saving} className="btn-gold rounded-sm py-2 text-xs font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2">
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                        Add Category
                    </button>
                </form>
                {error && <p className="text-destructive text-[10px] font-semibold mt-2 uppercase">{error}</p>}
            </div>

            {/* Category Tree */}
            {loading ? (
                <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-gold" /></div>
            ) : (
                <div className="bg-white border border-border/80 rounded-sm shadow-sm overflow-hidden">
                    {mainCats.length === 0 ? (
                        <p className="text-muted-foreground text-sm text-center py-10">No categories yet. Add one above.</p>
                    ) : (
                        mainCats.map(main => (
                            <div key={main.id} className="border-b border-border/40 last:border-0">
                                <div className="flex items-center justify-between px-5 py-4 bg-[#fafafa]">
                                    <div className="flex items-center gap-3">
                                        <span className="text-black font-bold text-sm tracking-wide">{main.name.toUpperCase()}</span>
                                        <span className="text-[10px] font-bold text-gold bg-gold/5 border border-gold/20 px-2 py-0.5 rounded-sm uppercase tracking-tighter">{main.product_type}</span>
                                    </div>
                                    <button onClick={() => handleDelete(main.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1.5 hover:bg-destructive/5 rounded-full">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                {subCats.filter(s => s.parent_id === main.id).map(sub => (
                                    <div key={sub.id} className="flex items-center justify-between px-5 py-3 pl-12 border-t border-border/20 bg-white hover:bg-[#fcfcfc] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <ChevronRight size={12} className="text-gold" />
                                            <span className="text-sm text-foreground font-medium">{sub.name}</span>
                                            <span className="text-[9px] font-semibold text-muted-foreground bg-secondary/50 border border-border/50 px-1.5 py-0.5 rounded-sm uppercase">{sub.product_type}</span>
                                        </div>
                                        <button onClick={() => handleDelete(sub.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1.5 hover:bg-destructive/5 rounded-full">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;
