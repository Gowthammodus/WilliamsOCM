
import React from 'react';
import { NavLink } from 'react-router-dom';
import { APP_TITLE, RoutePath } from '../constants';
import { IconProps } from '../types';

// --- Icons ---
const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const BriefcaseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const DocumentDuplicateIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);
const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
const CogIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const UsersIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 1.803" />
    </svg>
);
const XIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const F1CarIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.583 8.333a.5.5 0 0 0-.498-.416H15.5V6.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V7.917H5.917a.5.5 0 0 0-.498.416l-1.333 4.167A.5.5 0 0 0 4.5 13h1.25l-1.1 3.3a.5.5 0 0 0 .475.675h1.25a2.5 2.5 0 0 0 4.95 0h2.25a2.5 2.5 0 0 0 4.95 0h1.25a.5.5 0 0 0 .475-.675L18.25 13H19.5a.5.5 0 0 0 .417-.833l-1.334-4.167zM10 7h4v2h-4V7zm-2.5 11.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </svg>
);
// --- End Icons ---

interface SidebarLink {
  path: RoutePath | string;
  label: string;
  icon: React.FC<IconProps>;
  disabled?: boolean;
}

const sidebarLinks: SidebarLink[] = [
  { path: RoutePath.HOME, label: 'Home', icon: HomeIcon },
  { path: RoutePath.OCM_PORTFOLIO_PROJECT_WORKBENCH, label: 'Project Workbenches', icon: BriefcaseIcon },
  { path: RoutePath.OCM_PROJECT_ASSETS, label: 'Project Assets', icon: DocumentDuplicateIcon },
  { path: RoutePath.OCM_REPORTING, label: 'OCM Reports', icon: ChartBarIcon },
  { path: RoutePath.SETTINGS, label: 'Settings', icon: CogIcon, disabled: true },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const activeLinkClass = "bg-sky-900/50 text-sky-300 border-l-4 border-sky-400";
  const baseLinkClass = "flex items-center px-4 py-3 rounded-r-md text-sm font-medium transition-colors duration-200 w-full";
  const inactiveLinkClass = "text-slate-300 hover:bg-slate-700/50 hover:text-white border-l-4 border-transparent";
  const disabledLinkClass = "text-slate-500 cursor-not-allowed border-l-4 border-transparent opacity-60";

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
        role="presentation"
      ></div>

      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900/90 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700/50 flex-shrink-0">
           <div className="flex items-center space-x-3 group">
            <F1CarIcon className="w-7 h-7 text-sky-400"/>
            <h2 className="text-xl font-bold text-slate-100">{APP_TITLE}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Close menu">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-grow p-4 overflow-y-auto">
          <ul>
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
              <li key={link.label} className="mb-2">
                {link.disabled ? (
                  <span className={`${baseLinkClass} ${disabledLinkClass}`}>
                    <Icon className="w-5 h-5 mr-4 flex-shrink-0" />
                    <span>{link.label}</span>
                  </span>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) => 
                      `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                    }
                  >
                    <Icon className="w-5 h-5 mr-4 flex-shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                )}
              </li>
            )})}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
