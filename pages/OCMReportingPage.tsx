import React, { useState } from 'react';
import { MOCK_WORKBENCH_DATA, OCM_REPORTS } from '../constants';
import { PROJECT_DATA_MAP } from '../data/projectData';
import PowerBIReportModal from '../components/PowerBIReportModal';
import { AssetLink } from '../types';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon, ChartIcon } from '../components/Icons';

const ProjectReportsList: React.FC<{ reports: AssetLink[], onReportClick: (report: AssetLink) => void }> = ({ reports, onReportClick }) => {
    if (reports.length === 0) {
        return (
            <div className="p-6 bg-slate-800/50 text-center text-slate-400 border-t border-slate-700">
                No reports available for this project.
            </div>
        );
    }
    return (
        <div className="p-4 bg-slate-800/50 border-t border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map(report => (
                    <button
                        key={report.id}
                        onClick={() => onReportClick(report)}
                        className="bg-slate-800 p-4 rounded-lg shadow-md hover:bg-slate-700/70 hover:ring-1 hover:ring-sky-600 transition-all flex items-start text-left group"
                    >
                        <ChartIcon className="w-6 h-6 text-sky-400 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">{report.name}</h3>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};


const OCMReportingPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const allProjects = MOCK_WORKBENCH_DATA.flatMap(group => group.items);
    const [isGeneralReportsOpen, setIsGeneralReportsOpen] = useState(true);
    
    const [openProjectId, setOpenProjectId] = useState<string | null>(() => {
        const firstProjectWithReports = allProjects
            .map(p => ({ ...p, details: PROJECT_DATA_MAP[p.id] }))
            .filter(p => p.details)
            .find(p => {
                const reports = p.details.projectAssets.find(cat => cat.id === 'reports-management')?.links.filter(link => !!link.url) || [];
                return reports.length > 0;
            });
        return firstProjectWithReports?.id || null;
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<{title: string, url: string} | null>(null);

    const filteredGeneralReports = OCM_REPORTS.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const projectsWithDetails = allProjects
        .map(p => ({ ...p, details: PROJECT_DATA_MAP[p.id] }))
        .filter(p => p.details);

    const filteredProjects = projectsWithDetails.filter(project => {
        const hasReports = (project.details.projectAssets.find(cat => cat.id === 'reports-management')?.links || []).some(link => !!link.url);
        if (!hasReports) return false;

        const term = searchTerm.toLowerCase();
        if (!term) return true;

        const projectReports = project.details.projectAssets
            .find(cat => cat.id === 'reports-management')?.links
            .filter(link => !!link.url) || [];

        const inTitle = project.title.toLowerCase().includes(term);
        const inReports = projectReports.some(report => report.name.toLowerCase().includes(term));
        
        return inTitle || inReports;
    });

    const handleOpenProjectReport = (report: AssetLink) => {
        if(!report.url) return;
        setSelectedReport({ title: report.name, url: report.url });
        setIsModalOpen(true);
    };
    
    const handleOpenGeneralReport = (report: { title: string, url?: string }) => {
        if (report.url) {
            setSelectedReport({ title: report.title, url: report.url });
            setIsModalOpen(true);
        }
    };

    const handleCloseReport = () => {
        setIsModalOpen(false);
        setSelectedReport(null);
    };

    const handleToggleProject = (projectId: string) => {
        setOpenProjectId(prevId => prevId === projectId ? null : projectId);
    };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-sky-400">
            OCM Reporting Dashboard
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            A centralized, filterable view of all reports across the OCM portfolio.
          </p>
        </div>

        {/* Filter */}
        <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Filter by report or project name..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-full py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-slate-400" />
                </div>
            </div>
        </div>

        {/* General Reports Section */}
        {(filteredGeneralReports.length > 0 || !searchTerm) && (
             <div className="mb-12 max-w-6xl mx-auto">
                <div className="border border-slate-700/50 rounded-xl overflow-hidden bg-slate-800/50 shadow-lg">
                    <button
                        onClick={() => setIsGeneralReportsOpen(!isGeneralReportsOpen)}
                        className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-700/50 transition-colors"
                        aria-expanded={isGeneralReportsOpen}
                    >
                        <span className="font-semibold text-lg text-sky-300">General OCM Reports</span>
                        {isGeneralReportsOpen ? (
                            <ChevronUpIcon className="w-6 h-6 text-sky-400" />
                        ) : (
                            <ChevronDownIcon className="w-6 h-6 text-slate-500" />
                        )}
                    </button>
                    {isGeneralReportsOpen && (
                        <div className="p-4 bg-slate-800/50 border-t border-slate-700/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGeneralReports.map((report) => (
                                    <button
                                        key={report.title}
                                        onClick={() => handleOpenGeneralReport(report)}
                                        disabled={!report.url}
                                        className="bg-slate-800 p-6 rounded-lg shadow-lg enabled:hover:bg-slate-700/70 enabled:hover:ring-1 enabled:hover:ring-sky-600 transition-all flex flex-col items-start text-left group h-full disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <div className="flex items-start mb-3">
                                            <ChartIcon className="w-8 h-8 text-sky-400 mr-4 flex-shrink-0" />
                                            <h3 className="font-semibold text-lg text-slate-100 group-enabled:group-hover:text-sky-300 transition-colors">{report.title}</h3>
                                        </div>
                                        <p className="text-slate-400 text-sm flex-grow">{report.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
        
        {/* Project Specific Reports Section */}
        {filteredProjects.length > 0 && (
            <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-6 text-center sm:text-left max-w-6xl mx-auto">
                    Project Specific Reports
                </h2>
                <div className="space-y-4 max-w-6xl mx-auto">
                    {filteredProjects.map(project => {
                        const projectReports = project.details.projectAssets
                            .find(cat => cat.id === 'reports-management')?.links
                            .filter(link => !!link.url) || [];
                        
                        return (
                            <div key={project.id} className="border border-slate-700/50 rounded-xl overflow-hidden bg-slate-800/50 shadow-lg">
                                <button
                                    onClick={() => handleToggleProject(project.id)}
                                    className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-700/50 transition-colors"
                                    aria-expanded={openProjectId === project.id}
                                >
                                    <span className="font-semibold text-lg text-amber-400">{project.title}</span>
                                    {openProjectId === project.id ? (
                                        <ChevronUpIcon className="w-6 h-6 text-sky-400" />
                                    ) : (
                                        <ChevronDownIcon className="w-6 h-6 text-slate-500" />
                                    )}
                                </button>
                                {openProjectId === project.id && (
                                   <ProjectReportsList reports={projectReports} onReportClick={handleOpenProjectReport} />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        )}

        {filteredProjects.length === 0 && filteredGeneralReports.length === 0 && (
             <div className="text-center py-16 px-6 bg-slate-800 rounded-lg max-w-6xl mx-auto">
                <h3 className="text-xl font-semibold text-slate-300">No reports found.</h3>
                {searchTerm && <p className="text-slate-400 mt-2">Try adjusting your filter.</p>}
            </div>
        )}
      </div>

      {isModalOpen && selectedReport && (
        <PowerBIReportModal
          isOpen={isModalOpen}
          onClose={handleCloseReport}
          reportUrl={selectedReport.url}
          title={selectedReport.title}
        />
      )}
    </>
  );
};

export default OCMReportingPage;