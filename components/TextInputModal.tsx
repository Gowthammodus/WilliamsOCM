import React, { useState, FC, useEffect } from 'react';

interface TextInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  title: string;
  initialValue?: string;
  label?: string;
}

const TextInputModal: FC<TextInputModalProps> = ({ isOpen, onClose, onSave, title, initialValue = '', label = 'Value' }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="bg-slate-800 w-full max-w-md rounded-lg shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <header className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-lg font-bold text-slate-100">{title}</h2>
            <button type="button" onClick={onClose} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>

          <main className="p-6">
            <div>
              <label htmlFor="text-input" className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
              <input
                type="text"
                id="text-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
                autoFocus
              />
            </div>
          </main>

          <footer className="flex justify-end p-4 border-t border-slate-700 bg-slate-800/50 space-x-3">
            <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
              Cancel
            </button>
            <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
              Save
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default TextInputModal;