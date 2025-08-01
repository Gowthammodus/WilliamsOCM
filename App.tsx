import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OCMPortfolioProjectWorkbenchPage from './pages/OCMPortfolioProjectWorkbenchPage';
import Header from './components/Header';
import EngagementHubHeader from './components/EngagementHubHeader';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { RoutePath } from './constants';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { DataProvider } from './contexts/DataContext';
import OCMReportingPage from './pages/OCMReportingPage';
import OCMWorkbenchSetupPage from './pages/OCMWorkbenchSetupPage';
import ProjectAssetsPage from './pages/ProjectAssetsPage';
import OCMEngagementHubPage from './pages/OCMEngagementHubPage';

// Placeholder components for other routes
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center text-sky-400">{title}</h1>
    <p className="text-center mt-4 text-slate-300">This page is under construction or is a placeholder for a newly created item.</p>
    <img src={`https://picsum.photos/seed/${title.replace(/\s+/g, '')}/1200/600`} alt="Placeholder" className="mt-8 rounded-lg shadow-xl mx-auto" />
  </div>
);

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isEngagementHub = location.pathname === RoutePath.OCM_CONFIG;

  return (
    <div className={!isEngagementHub ? 'dark' : ''}>
        <div className={`min-h-screen flex flex-col ${isEngagementHub ? 'bg-white' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900'}`}>
            {!isEngagementHub && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
            
            {isEngagementHub 
                ? <EngagementHubHeader /> 
                : <Header onMenuClick={() => setIsSidebarOpen(true)} />
            }

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Navigate to={RoutePath.HOME} replace />} />
                    <Route path={RoutePath.HOME} element={<HomePage />} />
                    <Route path={RoutePath.OCM_PORTFOLIO_PROJECT_WORKBENCH} element={<OCMPortfolioProjectWorkbenchPage />} />
                    <Route path={RoutePath.PROJECT_DETAIL} element={<ProjectDetailPage />} />
                    <Route path="/module/:moduleId" element={<PlaceholderPage title="Module Detail" />} />
                    <Route path={RoutePath.OCM_CONFIG} element={<OCMEngagementHubPage />} />
                    <Route path={RoutePath.OCM_ENGAGEMENT} element={<OCMWorkbenchSetupPage />} />
                    <Route path={RoutePath.OCM_ADMIN} element={<PlaceholderPage title="OCM Admin Backend" />} />
                    <Route path={RoutePath.OCM_REPORTING} element={<OCMReportingPage />} />
                    <Route path={RoutePath.OCM_PROJECT_ASSETS} element={<ProjectAssetsPage />} />
                    <Route path={RoutePath.SETTINGS} element={<PlaceholderPage title="Settings" />} />
                </Routes>
            </main>
            {!isEngagementHub && <Footer />}
        </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </DataProvider>
  );
};

export default App;
