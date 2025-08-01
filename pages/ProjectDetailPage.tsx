

import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RoutePath, OCM_REPORTS } from '../constants';
import { IconProps, WorkbenchModalTabName, AssetLink } from '../types';
import ProjectWorkbenchModal from '../components/workbench-modal/ProjectWorkbenchModal';
import PowerBIReportModal from '../components/PowerBIReportModal';
import { DataContext } from '../contexts/DataContext';


// --- Icons for sections ---
const ClipboardCheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);
const FolderIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);
const UsersIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 1.803" />
    </svg>
);
const ClipboardListIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);
const DocumentTextIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);
const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CogIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const UserGroupIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-3-3h-2M10 17H5v-2a3 3 0 013-3h2m-4 5a4 4 0 100-8 4 4 0 000 8zm10-5a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);
const UserCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

type SectionAction = 
  | { type: 'workbench'; tab: WorkbenchModalTabName; mode: 'full' | 'single-view' }
  | { type: 'powerbi'; url: string; title: string }
  | { type: 'navigate'; path: string };


const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { workbenchData, projectDataMap } = useContext(DataContext);
    const navigate = useNavigate();
    
    const [isWorkbenchModalOpen, setIsWorkbenchModalOpen] = useState(false);
    const [initialTab, setInitialTab] = useState<WorkbenchModalTabName>('Home');
    const [modalMode, setModalMode] = useState<'full' | 'single-view'>('full');
    const [isPowerBIModalOpen, setIsPowerBIModalOpen] = useState(false);
    const [powerBIReportConfig, setPowerBIReportConfig] = useState<{ url: string; title: string } | null>(null);
    
    const project = workbenchData
        .flatMap(group => group.items)
        .find(item => item.id === projectId);

    const projectDetails = (projectId && projectDataMap[projectId]);

    if (!project || !projectDetails) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold text-red-400">Project Not Found</h1>
                <p className="mt-4 text-slate-300">The project you are looking for does not exist or may have been moved.</p>
                <Link to={RoutePath.OCM_PORTFOLIO_PROJECT_WORKBENCH} className="mt-6 inline-block bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200">
                  Back to Workbench
                </Link>
            </div>
        );
    }
    
    // General reports
    const reportMap = OCM_REPORTS.reduce((acc, report) => {
        acc[report.title] = report;
        return acc;
    }, {} as { [key: string]: { title: string; description: string; url?: string; } });

    // Project-specific reports
    const projectReportLinks = projectDetails.projectAssets.find(cat => cat.id === 'reports-management')?.links || [];
    const projectReportMap = projectReportLinks.reduce((map, report) => {
        if (report.url) {
            map[report.name] = report.url;
        }
        return map;
    }, {} as {[key: string]: string});

    const stakeholderImpactReportUrl = projectReportMap['Stakeholder Impact Analysis Report'];
    const raidLogReportUrl = projectReportMap['RAID Log Report'];

    const readinessReport = reportMap['Change Readiness Survey Report'];
    const adoptionReport = reportMap['Change Adoption Survey Report'];


    const sections: { id: string; title: string; icon: React.FC<IconProps>; description: string; action: SectionAction | null }[] = [
        { id: 'workbench', title: "Change Project Workbench", icon: ClipboardCheckIcon, description: "Access detailed plans, tasks, and progress for the change project.", action: { type: 'workbench', tab: 'Home', mode: 'full' } },
        { id: 'assets', title: "Change Project Assets", icon: FolderIcon, description: "Central repository for all project-related assets and documentation.", action: { type: 'workbench', tab: 'Change Assets', mode: 'single-view' } },
        { 
            id: 'raid_log', 
            title: "Raid Log Report", 
            icon: DocumentTextIcon, 
            description: "Review the project's Risks, Assumptions, Issues, and Dependencies.",
            action: raidLogReportUrl 
                ? { type: 'powerbi', url: raidLogReportUrl, title: 'RAID Log Report' } 
                : null
        },
        { id: 'readiness_survey', title: "Change Readiness Survey", icon: ClipboardListIcon, description: "Measure the organization's readiness for the upcoming change.", action: (readinessReport && readinessReport.url) ? { type: 'powerbi', url: readinessReport.url, title: readinessReport.title } : null },
        { id: 'adoption_survey', title: "Change Adoption Survey", icon: CheckCircleIcon, description: "Track the adoption rate and user satisfaction post-implementation.", action: (adoptionReport && adoptionReport.url) ? { type: 'powerbi', url: adoptionReport.url, title: adoptionReport.title } : null },
        { id: 'impact_operational', title: "Change Impact Analysis - Operational", icon: CogIcon, description: "Analyze the impact of change on operational value chains.", action: null },
        { id: 'impact_hr', title: "Change Impact Analysis - HR", icon: UserGroupIcon, description: "Analyze the impact of change on HR value chains and roles.", action: null },
        { 
            id: 'stakeholder_impact', 
            title: "Stakeholder Impact Analysis", 
            icon: UserCircleIcon, 
            description: "Assess the impact of the change on various stakeholder groups.", 
            action: stakeholderImpactReportUrl 
                ? { type: 'powerbi', url: stakeholderImpactReportUrl, title: "Stakeholder Impact Analysis Report" } 
                : null
        },
        { id: 'hub', title: "Engagement Hub", icon: UsersIcon, description: "Tools for communication, feedback, and stakeholder engagement.", action: null },
    ];
    
    const handleSectionClick = (action: SectionAction | null) => {
        if (!action) return;

        if (action.type === 'workbench') {
            setInitialTab(action.tab);
            setModalMode(action.mode);
            setIsWorkbenchModalOpen(true);
        } else if (action.type === 'powerbi' && action.url) {
            setPowerBIReportConfig({ url: action.url, title: action.title });
            setIsPowerBIModalOpen(true);
        } else if (action.type === 'navigate') {
            navigate(action.path);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
                {/* Page Header */}
                <div className="relative rounded-lg overflow-hidden mb-12 shadow-2xl h-64 md:h-80">
                    <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover filter brightness-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="relative h-full flex flex-col justify-end p-6 md:p-10 text-white">
                        <Link to={RoutePath.OCM_PORTFOLIO_PROJECT_WORKBENCH} className="absolute top-4 left-4 flex items-center text-sm text-sky-300 hover:text-sky-100 transition-colors bg-black/40 backdrop-blur-sm py-1.5 px-3 rounded-lg z-10">
                           <ArrowLeftIcon className="w-5 h-5 mr-2" />
                           Back to Workbench
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-shadow-lg">{project.title}</h1>
                        <p className="mt-2 text-lg text-slate-300 max-w-3xl text-shadow">{project.description}</p>
                    </div>
                </div>

                {/* Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map((section, index) => {
                        const isDisabled = !section.action;
                        
                        return (
                            <div 
                              key={section.id} 
                              className="bg-slate-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-sky-500/20 hover:ring-1 hover:ring-sky-600 transform hover:-translate-y-1 flex flex-col"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-slate-700/50 rounded-lg mr-4">
                                       <section.icon className="w-7 h-7 text-sky-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-100">{section.title}</h2>
                                </div>
                                <p className="text-slate-400 mb-5 flex-grow">{section.description}</p>
                                <button 
                                    onClick={() => handleSectionClick(section.action)}
                                    disabled={isDisabled}
                                    className="mt-auto w-full bg-slate-700 hover:bg-slate-600 text-sky-300 font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm enabled:hover:bg-sky-600 enabled:text-white disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                                >
                                    Explore Section
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            {isWorkbenchModalOpen && projectDetails && (
                <ProjectWorkbenchModal 
                    isOpen={isWorkbenchModalOpen} 
                    onClose={() => setIsWorkbenchModalOpen(false)}
                    projectData={{ ...projectDetails, name: project.title }}
                    initialTab={initialTab}
                    mode={modalMode}
                />
            )}

            {isPowerBIModalOpen && powerBIReportConfig && (
                <PowerBIReportModal
                    isOpen={isPowerBIModalOpen}
                    onClose={() => setIsPowerBIModalOpen(false)}
                    reportUrl={powerBIReportConfig.url}
                    title={powerBIReportConfig.title}
                />
            )}
        </>
    );
}

export default ProjectDetailPage;