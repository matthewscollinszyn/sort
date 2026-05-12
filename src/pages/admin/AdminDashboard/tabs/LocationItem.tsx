import { useState } from 'react';
import { Save, X, Edit2, Trash2, Building } from 'lucide-react';

interface Location {
    id: string;
    code: string;
    name: string;
    type: 'BIN_LOCATION' | 'ROOM_LOCATION';
    building?: string | null;
    enabled: boolean;
    sortOrder: number;
}

interface LocationItemProps {
    location: Location;
    theme: 'dark' | 'light';
    onUpdate: (id: string, updates: Partial<Location>) => void;
    onDelete: (id: string, name: string) => void;
}

export default function LocationItem({ location, theme, onUpdate, onDelete }: LocationItemProps) {
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(location.name);

    return (
        <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            {editing ? (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${theme === 'dark'
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                            }`}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                onUpdate(location.id, { name: editedName });
                                setEditing(false);
                            }}
                            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
                        >
                            <Save className="h-3 w-3" />
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setEditedName(location.name);
                                setEditing(false);
                            }}
                            className="flex items-center gap-1 px-3 py-1 bg-slate-500 text-white rounded-lg hover:bg-slate-600 text-xs"
                        >
                            <X className="h-3 w-3" />
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {location.name}
                            </p>
                            <span className={`text-xs px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
                                {location.code}
                            </span>
                        </div>
                        {location.building && (
                            <p className={`text-xs flex items-center gap-1 mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                                <Building className="h-3 w-3" />
                                {location.building}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onUpdate(location.id, { enabled: !location.enabled })}
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${location.enabled ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-slate-500'}`}
                        >
                            {location.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                        <button
                            onClick={() => setEditing(true)}
                            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}
                        >
                            <Edit2 className="h-4 w-4 text-blue-500" />
                        </button>
                        <button
                            onClick={() => onDelete(location.id, location.name)}
                            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
