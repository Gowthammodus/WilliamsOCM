import React from 'react';
import { Link } from 'react-router-dom';
import { APP_TITLE, RoutePath } from '../constants';
import { IconProps } from '../types';

const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const F1CarIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.583 8.333a.5.5 0 0 0-.498-.416H15.5V6.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V7.917H5.917a.5.5 0 0 0-.498.416l-1.333 4.167A.5.5 0 0 0 4.5 13h1.25l-1.1 3.3a.5.5 0 0 0 .475.675h1.25a2.5 2.5 0 0 0 4.95 0h2.25a2.5 2.5 0 0 0 4.95 0h1.25a.5.5 0 0 0 .475-.675L18.25 13H19.5a.5.5 0 0 0 .417-.833l-1.334-4.167zM10 7h4v2h-4V7zm-2.5 11.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </svg>
);

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-30 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/50"
              aria-label="Open sidebar"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <Link to={RoutePath.HOME} className="flex items-center ml-4">
              <F1CarIcon className="w-8 h-8 text-sky-400" />
              <h1 className="text-xl font-bold text-slate-100 ml-3">{APP_TITLE}</h1>
            </Link>
          </div>
          <div className="flex items-center">
            {/* Placeholder for user icon/menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
