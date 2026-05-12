import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Plus, Edit3, Trash, Calendar, X } from 'lucide-react';
import { useCampusNews, TAG_OPTIONS, TAG_COLOR_MAP } from '../../../../hooks/useCampusNews';
import { useToast } from '../components/Toast';
import { Card } from '../components/Card';

const EMPTY_FORM = { tag: TAG_OPTIONS[0], date: '', title: '', desc: '' };

export function NewsTab() {
    const { addToast } = useToast();
    const { news, addNewsItem, updateNewsItem, deleteNewsItem } = useCampusNews();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const openAdd = () => {
        setEditingId(null);
        setForm({ ...EMPTY_FORM, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) });
        setShowForm(true);
    };
    const openEdit = (item: any) => { setEditingId(item.id); setForm({ tag: item.tag, date: item.date, title: item.title, desc: item.desc }); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditingId(null); setForm({ ...EMPTY_FORM }); };

    const handleSubmit = async () => {
        console.log('[NewsTab] handleSubmit called', { form, editingId, isSubmitting });
        if (isSubmitting) return;
        if (!form.title.trim() || !form.desc.trim() || !form.date.trim()) { addToast('Please fill in all fields', 'error'); return; }
        setIsSubmitting(true);
        try {
            console.log('[NewsTab] Calling API...', editingId ? 'update' : 'add');
            if (editingId) { 
                await updateNewsItem(editingId, form); 
                addToast('News item updated', 'success'); 
            }
            else { 
                await addNewsItem(form); 
                addToast('News item added', 'success'); 
            }
            closeForm();
        } catch (error: any) { 
            console.error('[NewsTab] Submit error:', error);
            addToast(error?.message || 'Failed to save news item', 'error'); 
        }
        finally { setIsSubmitting(false); }
    };

    const handleDelete = async (id: string) => {
        console.log('[NewsTab] handleDelete called', { id, isDeleting });
        if (isDeleting) return;
        setIsDeleting(true);
        try { 
            await deleteNewsItem(id); 
            addToast('News item deleted', 'info'); 
            setDeleteConfirm(null); // Only close modal after successful delete
        }
        catch (error: any) { 
            console.error('[NewsTab] Delete error:', error);
            addToast(error?.message || 'Failed to delete news item', 'error'); 
        }
        finally { setIsDeleting(false); }
    };

    const tagStyle = (tag: string) => (TAG_COLOR_MAP as any)[tag] || { tagColor: 'bg-slate-100 text-slate-600', iconBg: '' };

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Newspaper className="h-5 w-5 text-emerald-500" /> Campus News</h2>
                    <p className="text-sm text-slate-500 mt-1">{news.length} article{news.length !== 1 ? 's' : ''} — visible to students, teachers & the login page</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors">
                    <Plus className="h-4 w-4" /> Add News
                </button>
            </div>
            <div className="space-y-3">
                {news.length === 0 ? (
                    <Card className="text-center py-12"><Newspaper className="h-12 w-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500">No news articles yet. Click "Add News" to create one.</p></Card>
                ) : news.map((item: any) => {
                    const { tagColor } = tagStyle(item.tag);
                    return (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <span className={`shrink-0 mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tagColor}`}>{item.tag}</span>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-900 truncate">{item.title}</p>
                                        <p className="text-sm text-slate-500 line-clamp-2 mt-0.5">{item.desc}</p>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600" title="Edit"><Edit3 className="h-4 w-4" /></button>
                                    <button onClick={() => setDeleteConfirm(item.id)} className="p-2 rounded-lg hover:bg-red-100 text-red-500" title="Delete"><Trash className="h-4 w-4" /></button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={closeForm}>
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={e => e.stopPropagation()} className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100"><Newspaper className="h-5 w-5 text-emerald-600" /></div>
                                    <div><h3 className="font-semibold text-slate-900">{editingId ? 'Edit News' : 'Add News'}</h3><p className="text-xs text-slate-500">Visible to all users on the platform</p></div>
                                </div>
                                <button onClick={closeForm} className="p-2 rounded-lg hover:bg-slate-100"><X className="h-5 w-5 text-slate-500" /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Category / Tag</label>
                                    <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20">
                                        {TAG_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                                    <input type="text" placeholder="e.g. May 6, 2026" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                                    <input type="text" placeholder="News headline..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                                    <textarea rows={3} placeholder="Write a brief description..." value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none" />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                                <button onClick={closeForm} disabled={isSubmitting} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
                                <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                    {isSubmitting ? (editingId ? 'Saving...' : 'Publishing...') : (editingId ? 'Save Changes' : 'Publish')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {deleteConfirm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setDeleteConfirm(null)}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            onClick={e => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
                            <div className="p-6 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4"><Trash className="h-7 w-7 text-red-600" /></div>
                                <h3 className="text-lg font-semibold text-slate-900">Delete News?</h3>
                                <p className="mt-2 text-sm text-slate-500">This will remove the article from all pages. This cannot be undone.</p>
                            </div>
                            <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-4">
                                <button onClick={() => setDeleteConfirm(null)} disabled={isDeleting} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
                                <button onClick={() => handleDelete(deleteConfirm!)} disabled={isDeleting} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
