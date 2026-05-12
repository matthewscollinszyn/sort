import { motion } from 'framer-motion';
import { Plus, Save, X, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../components';

interface AssetCondition {
    id: string;
    key: string;
    label: string;
    description: string;
    enabled: boolean;
    sortOrder: number;
}

interface AssetConditionsSectionProps {
    theme: 'dark' | 'light';
    assetConditions: AssetCondition[];
    editingId: string | null;
    setEditingId: (id: string | null) => void;
    adding: boolean;
    setAdding: (v: boolean) => void;
    assetConditionForm: { key: string; label: string; description: string };
    setAssetConditionForm: (f: { key: string; label: string; description: string }) => void;
    onAdd: () => void;
    onUpdate: (id: string, updates: Partial<AssetCondition>) => void;
    onDelete: (id: string, label: string) => void;
}

export default function AssetConditionsSection({
    theme, assetConditions, editingId, setEditingId,
    adding, setAdding, assetConditionForm, setAssetConditionForm,
    onAdd, onUpdate, onDelete,
}: AssetConditionsSectionProps) {
    return (
        <Card theme={theme}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Asset Conditions
                </h3>
                <button
                    onClick={() => setAdding(!adding)}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                >
                    <Plus className="h-4 w-4" />
                    Add Condition
                </button>
            </div>

            {adding && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl space-y-3"
                >
                    <input
                        type="text"
                        placeholder="Key (e.g., damaged, malfunctioning)"
                        value={assetConditionForm.key}
                        onChange={(e) => setAssetConditionForm({ ...assetConditionForm, key: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            }`}
                    />
                    <input
                        type="text"
                        placeholder="Label (e.g., Damaged, Malfunctioning)"
                        value={assetConditionForm.label}
                        onChange={(e) => setAssetConditionForm({ ...assetConditionForm, label: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            }`}
                    />
                    <input
                        type="text"
                        placeholder="Description (e.g., Broken but may be repairable)"
                        value={assetConditionForm.description}
                        onChange={(e) => setAssetConditionForm({ ...assetConditionForm, description: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            }`}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={onAdd}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                        >
                            <Save className="h-4 w-4" />
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setAdding(false);
                                setAssetConditionForm({ key: '', label: '', description: '' });
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
                {assetConditions.map((condition) => (
                    <div
                        key={condition.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-slate-50 border-slate-200'
                            }`}
                    >
                        <div className="flex items-center gap-3 flex-1">
                            {editingId === condition.id ? (
                                <div className="flex gap-2 flex-1">
                                    <input
                                        type="text"
                                        defaultValue={condition.label}
                                        onBlur={(e) => onUpdate(condition.id, { label: e.target.value })}
                                        className={`px-3 py-1 rounded border ${theme === 'dark'
                                            ? 'bg-slate-700 border-slate-600 text-white'
                                            : 'bg-white border-slate-300 text-slate-900'
                                            }`}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                        {condition.label}
                                    </p>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {condition.description}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onUpdate(condition.id, { enabled: !condition.enabled })}
                                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${condition.enabled
                                    ? 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                                    : 'bg-slate-500/20 text-slate-600 hover:bg-slate-500/30'
                                    }`}
                            >
                                {condition.enabled ? 'Enabled' : 'Disabled'}
                            </button>
                            <button
                                onClick={() => setEditingId(editingId === condition.id ? null : condition.id)}
                                className="p-2 rounded hover:bg-blue-500/10 text-blue-500 transition-colors"
                            >
                                <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => onDelete(condition.id, condition.label)}
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
