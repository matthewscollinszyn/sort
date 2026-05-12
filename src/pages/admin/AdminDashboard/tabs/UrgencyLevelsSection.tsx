import { motion } from 'framer-motion';
import { Plus, Save, X, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../components';

interface UrgencyLevel {
    id: string;
    key: string;
    label: string;
    description: string;
    color: string;
    enabled: boolean;
    sortOrder: number;
}

interface UrgencyLevelsSectionProps {
    theme: 'dark' | 'light';
    urgencyLevels: UrgencyLevel[];
    editingId: string | null;
    setEditingId: (id: string | null) => void;
    adding: boolean;
    setAdding: (v: boolean) => void;
    urgencyLevelForm: { key: string; label: string; description: string; color: string };
    setUrgencyLevelForm: (f: { key: string; label: string; description: string; color: string }) => void;
    onAdd: () => void;
    onUpdate: (id: string, updates: Partial<UrgencyLevel>) => void;
    onDelete: (id: string, label: string) => void;
}

export default function UrgencyLevelsSection({
    theme, urgencyLevels, editingId, setEditingId,
    adding, setAdding, urgencyLevelForm, setUrgencyLevelForm,
    onAdd, onUpdate, onDelete,
}: UrgencyLevelsSectionProps) {
    return (
        <Card theme={theme}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Urgency Levels
                </h3>
                <button
                    onClick={() => setAdding(!adding)}
                    className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                >
                    <Plus className="h-4 w-4" />
                    Add Urgency Level
                </button>
            </div>

            {adding && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl space-y-3"
                >
                    <input
                        type="text"
                        placeholder="Key (e.g., low, normal, high)"
                        value={urgencyLevelForm.key}
                        onChange={(e) => setUrgencyLevelForm({ ...urgencyLevelForm, key: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            }`}
                    />
                    <input
                        type="text"
                        placeholder="Label (e.g., Low, Normal, High)"
                        value={urgencyLevelForm.label}
                        onChange={(e) => setUrgencyLevelForm({ ...urgencyLevelForm, label: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            }`}
                    />
                    <input
                        type="text"
                        placeholder="Description (e.g., Not full yet, not urgent)"
                        value={urgencyLevelForm.description}
                        onChange={(e) => setUrgencyLevelForm({ ...urgencyLevelForm, description: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            }`}
                    />
                    <input
                        type="text"
                        placeholder="Color CSS classes (e.g., border-red-500/30 bg-red-400/10 text-red-400)"
                        value={urgencyLevelForm.color}
                        onChange={(e) => setUrgencyLevelForm({ ...urgencyLevelForm, color: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            }`}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={onAdd}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                        >
                            <Save className="h-4 w-4" />
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setAdding(false);
                                setUrgencyLevelForm({ key: '', label: '', description: '', color: 'border-slate-400 bg-slate-100 text-slate-500' });
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="space-y-2">
                {urgencyLevels.map((level) => (
                    <div
                        key={level.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-slate-50 border-slate-200'
                            }`}
                    >
                        <div className="flex items-center gap-3 flex-1">
                            {editingId === level.id ? (
                                <div className="flex gap-2 flex-1">
                                    <input
                                        type="text"
                                        defaultValue={level.label}
                                        onBlur={(e) => onUpdate(level.id, { label: e.target.value })}
                                        className={`px-3 py-1 rounded border ${theme === 'dark'
                                            ? 'bg-slate-700 border-slate-600 text-white'
                                            : 'bg-white border-slate-300 text-slate-900'
                                            }`}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                        {level.label}
                                    </p>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {level.description}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onUpdate(level.id, { enabled: !level.enabled })}
                                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${level.enabled
                                    ? 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                                    : 'bg-slate-500/20 text-slate-600 hover:bg-slate-500/30'
                                    }`}
                            >
                                {level.enabled ? 'Enabled' : 'Disabled'}
                            </button>
                            <button
                                onClick={() => setEditingId(editingId === level.id ? null : level.id)}
                                className="p-2 rounded hover:bg-blue-500/10 text-blue-500 transition-colors"
                            >
                                <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => onDelete(level.id, level.label)}
                                className="p-2 rounded hover:bg-red-500/10 text-red-500 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
