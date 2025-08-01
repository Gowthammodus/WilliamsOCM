
import React, { FC } from 'react';

interface PowerBIReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportUrl: string;
  title: string;
}

const PowerBIReportModal: FC<PowerBIReportModalProps> = ({ isOpen, onClose, reportUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-slate-900 w-full max-w-7xl h-[95vh] rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-100">
            Report: <span className="text-sky-400">{title}</span>
          </h2>
          <button onClick={onClose} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        {/* Content */}
        <main className="flex-grow p-1 bg-black">
          <iframe
            title={title}
            src={reportUrl}
            frameBorder="0"
            allowFullScreen={true}
            className="w-full h-full"
          ></iframe>
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 flex justify-end p-4 border-t border-slate-700 bg-slate-900/50">
          <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200">
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PowerBIReportModal;
