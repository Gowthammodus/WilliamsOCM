
import React, { useState, FC } from 'react';
import { HomeModule, WorkbenchItem } from '../types';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string, description: string, imageUrl: string }) => void;
  item: HomeModule | WorkbenchItem | null;
  title: string;
}

const EditModal: FC<EditModalProps> = ({ isOpen, onClose, onSave, item, title }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    imageUrl: item?.imageUrl || '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="bg-slate-800 w-full max-w-lg rounded-lg shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
            <button type="button" onClick={onClose} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>

          {/* Content */}
          <main className="p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://picsum.photos/seed/..."
                className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          </main>

          {/* Footer */}
          <footer className="flex justify-end p-4 border-t border-slate-700 bg-slate-800/50 space-x-3">
            <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
              Cancel
            </button>
            <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
              Save Changes
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
