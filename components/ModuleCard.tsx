
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeModule } from '../types';
import { DotsVerticalIcon, PencilIcon, TrashIcon } from './Icons';

interface ModuleCardProps {
  module: HomeModule;
  onEdit: (module: HomeModule) => void;
  onDelete: (moduleId: string) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onEdit, onDelete }) => {
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

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${module.title}"?`)) {
      onDelete(module.id);
    }
    setIsMenuOpen(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(module);
    setIsMenuOpen(false);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  }

  const isClickable = !!module.path;

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isClickable) {
      e.preventDefault();
    }
  };

  return (
    <div className="group relative">
      <Link 
        to={module.path || '#'} 
        onClick={handleCardClick}
        className={`block w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl 
          ${isClickable 
            ? 'transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50' 
            : 'cursor-not-allowed opacity-70'
          }`
        }
        aria-disabled={!isClickable}
      >
        <img 
          src={module.imageUrl} 
          alt={module.title} 
          className={`absolute inset-0 w-full h-full object-cover ${isClickable ? 'transition-transform duration-500 group-hover:scale-110' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className={`text-xl md:text-2xl font-semibold text-white mb-1 md:mb-2 ${isClickable ? 'group-hover:text-sky-300 transition-colors duration-300' : ''}`}>
            {module.title}
          </h3>
          <p className={`text-sm md:text-base text-sky-200 flex items-center ${isClickable ? 'group-hover:text-sky-100 transition-colors duration-300' : ''}`}>
            {module.description}
          </p>
        </div>
      </Link>
      
      {/* Edit/Delete Menu */}
      <div ref={menuRef} className="absolute top-2 right-2 z-10">
        <button onClick={toggleMenu} className="p-2 rounded-full bg-slate-800/60 text-white hover:bg-slate-700/80 transition-colors">
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
    </div>
  );
};

export default ModuleCard;