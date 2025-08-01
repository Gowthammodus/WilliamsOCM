
import React, { useState } from 'react';
import { MOCK_WORKBENCH_DATA } from '../constants';
import { PROJECT_DATA_MAP } from '../data/projectData';
import { AssetCategory } from '../types';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon, DocumentDuplicateIcon } from '../components/Icons';

const ProjectAssetsList: React.FC<{ assets: AssetCategory[] }> = ({ assets }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map(category => (
                <div key={category.id} className="bg-slate-800 rounded-lg shadow-md flex flex-col">
                    <div className="bg-sky-800 text-white font-semibold p-2.5 text-center rounded-t-lg text-sm">
                        {category.title}
                    </div>
                    <div className="p-3 space-y-2">
                        {category.links.map(link => (
                            <button key={link.id} className="w-full text-left flex items-center space-x-3 text-slate-300 hover:text-sky-300 hover:bg-slate-700/50 p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!link.url}>
                                <DocumentDuplicateIcon className="w-5 h-5 text-sky-400" />
                                <span className="text-sm">{link.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const CustomChangeRoadmap: React.FC = () => {
    const roadmapData = [
      { title: 'Project Team Plan', items: ['Project Plan', 'Guide', 'Document', 'Report'], paginated: false },
      { title: 'Create', items: ['Strategy Scoping', 'Project Scope', 'Business Case', 'Sponsor Plan', 'Governance'], paginated: true },
      { title: 'Assess', items: ['Roadmap Scoping', 'Stakeholder Analysis', 'Change Impact Analysis', 'CQ-Change Intelligence Assessment', 'Change Capable Assessment'], paginated: true },
      { title: 'Plan', items: ['Plan Scoping', 'Customized Change Roadmap', 'Training Curriculam', 'Communication Plan', 'Organisational Design Plan'], paginated: true },
      { title: 'Align', items: ['Stakeholder Analysis Alignment', 'RACI Matrix Alignment', 'Change Roadmap Alignment', 'Communication Plan Alignment', 'Training Plan Alignment'], paginated: true },
      { title: 'Build', items: ['Train the Trainer Program', 'Future State Process Maps SOPs', 'Role Maps', 'Communications Messaging', 'Infographics Video Podcasts'], paginated: true },
      { title: 'Launch', items: ['Training Delivery', 'Project Go-Live Communications', 'Training Surveys', 'Deployment Cutover Plan-L', 'Post Go-Live Support Plan'], paginated: true },
      { title: 'Enable', items: ['Success Win Communications', 'Rewards and Recognition', 'Celebration Events', 'Measure Change Adoption', 'Key Findings Results'], paginated: true }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapData.map((card, index) => (
                <div key={index} className="bg-slate-800/70 border border-slate-700 rounded-lg shadow-lg flex flex-col">
                    <div className="bg-sky-700 text-white font-semibold p-3 text-center rounded-t-lg">
                        {card.title}
                    </div>
                    <div className="p-4 space-y-2 flex-grow flex flex-col">
                        <ul className="flex-grow space-y-2">
                            {card.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start space-x-3 text-slate-300">
                                    <DocumentDuplicateIcon className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                        {card.paginated && (
                            <div className="text-center text-xs text-slate-400 mt-auto pt-3 border-t border-slate-700">
                                <button className="hover:text-white px-2">prev</button>
                                <span className="text-slate-500">|</span>
                                <button className="hover:text-white px-2">next</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};


const ProjectAssetsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openProjectId, setOpenProjectId] = useState<string | null>(MOCK_WORKBENCH_DATA.flatMap(g => g.items)[0]?.id || null);

    const allProjects = MOCK_WORKBENCH_DATA.flatMap(group => group.items);
    
    const projectsWithDetails = allProjects
      .map(p => ({ ...p, details: PROJECT_DATA_MAP[p.id] }))
      .filter(p => p.details);

    const filteredProjects = projectsWithDetails.filter(project => {
        const term = searchTerm.toLowerCase();
        if (!term) return true;

        const inTitle = project.title.toLowerCase().includes(term);
        const inDescription = project.description?.toLowerCase().includes(term);
        const inAssets = project.details.projectAssets.some(category => 
            category.title.toLowerCase().includes(term) ||
            category.links.some(link => link.name.toLowerCase().includes(term))
        );
        return inTitle || inDescription || inAssets;
    });

    const handleToggleProject = (projectId: string) => {
        setOpenProjectId(prevId => prevId === projectId ? null : projectId);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-sky-400">
                    Project Assets Directory
                </h1>
                <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
                    A centralized, filterable view of all assets across all engineering projects.
                </p>
            </div>

            <div className="max-w-3xl mx-auto mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Filter by project, asset category, or asset name..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-full py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
            </div>

            <div className="space-y-4 max-w-6xl mx-auto">
                {filteredProjects.map(project => (
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
                           <div className="p-4 bg-slate-900/30 border-t border-slate-700/50">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-semibold text-slate-100">Project Assets</h2>
                                </div>
                                <ProjectAssetsList assets={project.details.projectAssets} />
                                
                                <div className="mt-12">
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-semibold text-slate-100">Custom Change Roadmap</h2>
                                    </div>
                                    <CustomChangeRoadmap />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-16 px-6 bg-slate-800 rounded-lg">
                        <h3 className="text-xl font-semibold text-slate-300">No projects found.</h3>
                        <p className="text-slate-400 mt-2">Try adjusting your filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectAssetsPage;