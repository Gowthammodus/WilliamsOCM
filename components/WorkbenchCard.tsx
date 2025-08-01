import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WorkbenchItem } from '../types';
import { WrenchIcon, DotsVerticalIcon, PencilIcon, TrashIcon } from './Icons';

interface WorkbenchCardProps {
  item: WorkbenchItem;
  onEdit: (item: WorkbenchItem) => void;
  onDelete: (itemId: string) => void;
}

const WorkbenchCard: React.FC<WorkbenchCardProps> = ({ item, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      onDelete(item.id);
    }
    setIsMenuOpen(false);
  };

  const handleEdit = () => {
    onEdit(item);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-sky-500/30 hover:ring-1 hover:ring-sky-500 transform hover:-translate-y-1 flex flex-col">
      <div ref={menuRef} className="absolute top-2 right-2 z-10">
        <button onClick={() => setIsMenuOpen(prev => !prev)} className="p-2 rounded-full bg-slate-900/50 text-white hover:bg-slate-700/80 transition-colors">
          <DotsVerticalIcon className="w-5 h-5" />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
            <button onClick={handleEdit} className="flex items-center w-full px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">
              <PencilIcon className="w-4 h-4 mr-2" /> Edit
            </button>
            <button onClick={handleDelete} className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-700">
              <TrashIcon className="w-4 h-4 mr-2" /> Delete
            </button>
          </div>
        )}
      </div>

      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start mb-2 pr-8">
            <WrenchIcon className="w-5 h-5 text-sky-400 mr-2 flex-shrink-0 mt-0.5" />
            <h4 className="text-lg font-semibold text-slate-100" title={item.title}>
              {item.title}
            </h4>
        </div>
        {item.description && (
          <p className="text-sm text-slate-400 line-clamp-2 flex-grow">{item.description}</p>
        )}
        <Link 
          to={`/project/${item.id}`}
          className="mt-4 w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm flex items-center justify-center"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default WorkbenchCard;