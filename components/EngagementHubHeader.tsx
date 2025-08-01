
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RoutePath } from '../constants';
import { IconProps } from '../types';


const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const navLinks = [
    { label: 'Home', path: RoutePath.HOME },
    { label: 'Portfolio & Programmes', path: RoutePath.OCM_PORTFOLIO_PROJECT_WORKBENCH },
    { label: 'Meet the Team', path: '#' }, // Placeholder path
    { label: 'News & Insights', path: '#' }, // Placeholder path
];


const EngagementHubHeader: React.FC = () => {
  const baseLinkClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClass = "bg-gray-200 text-gray-900 font-semibold";
  const inactiveLinkClass = "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900";

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to={RoutePath.HOME} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Back to Home page</span>
            </Link>
             <nav className="hidden md:flex items-center space-x-4">
               {navLinks.map(link => (
                 <NavLink
                    key={link.label}
                    to={link.path}
                    className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                 >
                    {link.label}
                 </NavLink>
               ))}
            </nav>
          </div>
          <div className="flex items-center">
            <button className="flex items-center text-gray-500 hover:text-gray-900">
                <span className="text-sm font-medium mr-2">Search</span>
                <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EngagementHubHeader;
