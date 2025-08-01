import React, { useState, FC, useEffect, useContext } from 'react';
import { ProjectDetailsData, RAGEntry, AssetLink, WorkbenchModalTabName, ProjectRisk, ProjectDocument, ProjectIssue, Announcement, QuickLink, AssetCategory, ProjectAction, ProjectDependency, KeyUpdateItem, ProjectAssumption } from '../../types';
import ChatBot from '../ChatBot';
import PowerBIReportModal from '../PowerBIReportModal';
import { DocumentDuplicateIcon, PencilIcon, TrashIcon, PlusIcon, ChartIcon, SearchIcon } from '../Icons';
import { DataContext } from '../../contexts/DataContext';

// --- HELPER & GENERIC MODAL COMPONENTS ---

const ActionButtons: FC<{onEdit: () => void, onDelete: () => void, size?: number, className?: string}> = ({onEdit, onDelete, size = 4, className = ''}) => (
    <div className={`flex items-center space-x-1 ${className}`}>
        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-1.5 rounded-full text-slate-400 hover:bg-sky-500/20 hover:text-sky-300"><PencilIcon className={`w-${size} h-${size}`} /></button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 rounded-full text-slate-400 hover:bg-red-500/20 hover:text-red-400"><TrashIcon className={`w-${size} h-${size}`} /></button>
    </div>
);

const SectionHeader: FC<{title: string, onAdd?: () => void, children?: React.ReactNode, centerTitle?: boolean}> = ({title, onAdd, children, centerTitle = false}) => {
    if (centerTitle) {
        return (
            <div className="flex justify-center items-center mb-6 relative">
                <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>
                {onAdd && (
                    <div className="absolute right-0">
                        <button onClick={onAdd} className="flex items-center bg-sky-700/60 hover:bg-sky-600/80 text-white font-semibold py-1 px-3 rounded-md transition-colors text-sm">
                            <PlusIcon className="w-4 h-4 mr-1.5" /> Add
                        </button>
                    </div>
                )}
                {children}
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-sky-300">{title}</h3>
            {onAdd && (
            <button onClick={onAdd} className="flex items-center bg-sky-700/60 hover:bg-sky-600/80 text-white font-semibold py-1 px-3 rounded-md transition-colors text-sm">
                <PlusIcon className="w-4 h-4 mr-1.5" /> Add
            </button>
            )}
            {children}
        </div>
    );
};

interface FormModalField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'date';
  options?: readonly string[];
  required?: boolean;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  fields: FormModalField[];
  initialData?: any;
}

const FormModal: FC<FormModalProps> = ({ isOpen, onClose, onSave, title, fields, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData((prev: any) => ({ ...prev, [name]: isNumber ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-slate-800 w-full max-w-lg rounded-lg shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <header className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
            <button type="button" onClick={onClose} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>
          <main className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {fields.map(field => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-slate-300 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea id={field.name} name={field.name} value={formData[field.name] || ''} onChange={handleChange} required={field.required} rows={4} className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                ) : field.type === 'select' ? (
                  <select id={field.name} name={field.name} value={formData[field.name] || ''} onChange={handleChange} required={field.required} className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="" disabled>Select {field.label}</option>
                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input type={field.type} id={field.name} name={field.name} value={formData[field.name] || ''} onChange={handleChange} required={field.required} className="w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                )}
              </div>
            ))}
          </main>
          <footer className="flex justify-end p-4 border-t border-slate-700 bg-slate-800/50 space-x-3">
            <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-2 px-4 rounded-md">Cancel</button>
            <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-4 rounded-md">Save</button>
          </footer>
        </form>
      </div>
    </div>
  );
};


// --- ICONS for Change Assets Tab ---
const HealthIndicator: FC<{ health: 'Green' | 'Amber' | 'Red' }> = ({ health }) => {
  const colorClasses = {
    Green: 'bg-green-500',
    Amber: 'bg-amber-500',
    Red: 'bg-red-500',
  };
  return <div className={`w-4 h-4 rounded-full ${colorClasses[health]}`}></div>;
};

// --- RAG & Key Update Components ---
const RagStatusDisplay: FC<{ rag: string }> = ({ rag }) => {
    const [level, status] = rag.split('. ');
    const colorClass = status === 'Red' ? 'text-red-400' : status === 'Amber' ? 'text-amber-400' : 'text-green-400';
    return <span className={colorClass}>{rag}</span>;
}

const KeyUpdatesList: FC<{ updates: KeyUpdateItem[] }> = ({ updates }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const handleRowSelect = (id: number) => {
        setSelectedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const filteredUpdates = updates.filter(update =>
        Object.values(update).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-3 rounded-md transition-colors text-sm">
                        <PlusIcon className="w-4 h-4 mr-1.5" /> new item
                    </button>
                    <span className="text-slate-400 text-sm">or</span>
                    <button className="flex items-center text-sky-400 hover:text-sky-300 font-semibold py-2 px-3 rounded-md transition-colors text-sm">
                        <PencilIcon className="w-4 h-4 mr-1.5" /> edit this list
                    </button>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Find an item"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-md py-2 pl-10 pr-4 text-sm w-64 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-700">
                <table className="min-w-full text-sm text-left table-auto">
                    <thead className="bg-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                        <tr>
                            <th className="p-3 text-center"><span className="sr-only">Select</span></th>
                            <th className="p-3 font-medium">ID</th>
                            <th className="p-3 font-medium">Portfolio</th>
                            <th className="p-3 font-medium">Pillar</th>
                            <th className="p-3 font-medium">Programme</th>
                            <th className="p-3 font-medium">Project</th>
                            <th className="p-3 font-medium">Previous RAG</th>
                            <th className="p-3 font-medium">Current RAG</th>
                            <th className="p-3 font-medium min-w-[300px] w-1/3">Commentary</th>
                            <th className="p-3 font-medium">Owner</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {filteredUpdates.map((update) => (
                            <tr key={update.id} className={`hover:bg-slate-800/50 ${selectedRows.has(update.id) ? 'bg-sky-900/20' : ''}`}>
                                <td className="p-3 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.has(update.id)}
                                        onChange={() => handleRowSelect(update.id)}
                                        className="bg-slate-700 border-slate-500 rounded text-sky-500 focus:ring-sky-500"
                                    />
                                </td>
                                <td className="p-3 font-medium text-slate-200">{update.id}</td>
                                <td className="p-3 text-slate-300">{update.portfolio}</td>
                                <td className="p-3 text-slate-300">{update.pillar}</td>
                                <td className="p-3 text-slate-300">{update.programme}</td>
                                <td className="p-3 text-slate-300">{update.project}</td>
                                <td className="p-3"><RagStatusDisplay rag={update.previousRag} /></td>
                                <td className="p-3"><RagStatusDisplay rag={update.currentRag} /></td>
                                <td className="p-3 text-slate-300 whitespace-pre-wrap">{update.commentary}</td>
                                <td className="p-3 text-slate-300">{update.owner}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AssetDocumentsTable: FC<{ 
  documents: ProjectDocument[]; 
  onAdd: () => void; 
  onEdit: (doc: ProjectDocument) => void; 
  onDelete: (docName: string) => void; 
}> = ({ documents, onAdd, onEdit, onDelete }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-100">Project Documents</h3>
        <button onClick={onAdd} className="flex items-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm shadow-md">
            <PlusIcon className="w-5 h-5 mr-2" /> Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 font-medium w-2/5">NAME</th>
              <th className="px-4 py-3 font-medium">TYPE</th>
              <th className="px-4 py-3 font-medium">VERSION</th>
              <th className="px-4 py-3 font-medium">LAST MODIFIED</th>
              <th className="px-4 py-3 font-medium">MODIFIED BY</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {documents.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400">No documents found for this asset.</td>
                </tr>
            )}
            {documents.map(doc => (
              <tr key={doc.name} className="hover:bg-slate-700/30 group">
                <td className="px-4 py-3 font-medium text-sky-400">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{doc.name}</a>
                </td>
                <td className="px-4 py-3 text-slate-300">{doc.type}</td>
                <td className="px-4 py-3 text-slate-300">{doc.version}</td>
                <td className="px-4 py-3 text-slate-300">{doc.lastModified}</td>
                <td className="px-4 py-3 text-slate-300">{doc.modifiedBy}</td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons
                    className="opacity-0 group-hover:opacity-100 justify-end"
                    onEdit={() => onEdit(doc)}
                    onDelete={() => onDelete(doc.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AssetReportView: FC<{ assetName: string; reportUrl: string; }> = ({ assetName, reportUrl }) => {
  return (
    <div className="animate-fade-in">
        <div className="h-[65vh] bg-black rounded-lg overflow-hidden border border-slate-700">
            <iframe
                title={`Report for ${assetName}`}
                src={reportUrl}
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full"
            ></iframe>
        </div>
    </div>
  );
};


// --- TAB COMPONENTS ---

const RagDot: FC<{ status: 'Green' | 'Amber' | 'Red' }> = ({ status }) => {
  const color = {
    Green: 'bg-green-500',
    Amber: 'bg-amber-500',
    Red: 'bg-red-500',
  }[status];
  return <div className={`w-3.5 h-3.5 rounded-full ${color}`}></div>;
};

const ProjectDetailsSection: FC<{ data: ProjectDetailsData; onAdd: () => void; }> = ({ data, onAdd }) => (
    <div className="bg-slate-800 p-6 rounded-lg">
        <SectionHeader title="Project Details" onAdd={onAdd} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm mt-4">
            <div>
                <p className="text-slate-400">Project Name:</p>
                <p className="font-medium text-slate-200">{data.name}</p>
            </div>
            <div>
                <p className="text-slate-400">Project Manager:</p>
                <p className="font-medium text-slate-200">{data.projectManager}</p>
            </div>
            <div className="md:col-span-2">
                <p className="text-slate-400">Description:</p>
                <p className="font-medium text-slate-200">{data.description}</p>
            </div>
            <div>
                <p className="text-slate-400">Technical Director:</p>
                <p className="font-medium text-slate-200">{data.businessOwner}</p>
            </div>
            <div>
                <p className="text-slate-400">Start Date:</p>
                <p className="font-medium text-slate-200">{data.startDate}</p>
            </div>
            <div>
                <p className="text-slate-400">Finish Date:</p>
                <p className="font-medium text-slate-200">{data.finishDate}</p>
            </div>
            <div>
                <p className="text-slate-400">Stage:</p>
                <p className="font-medium text-slate-200">{data.stage}</p>
            </div>
            <div>
                <p className="text-slate-400">% Complete:</p>
                <p className="font-medium text-slate-200">{data.percentComplete}%</p>
            </div>
            <div>
                <p className="text-slate-400">Overall Health:</p>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${
                    data.overallHealth === 'Green' ? 'bg-green-200 text-green-800' :
                    data.overallHealth === 'Amber' ? 'bg-amber-200 text-amber-800' :
                    'bg-red-200 text-red-800'
                }`}>{data.overallHealth}</span>
            </div>
        </div>
    </div>
);

const RagHistorySection: FC<{ ragHistory: RAGEntry[]; onAdd: () => void; }> = ({ ragHistory, onAdd }) => (
    <div className="bg-slate-800 p-6 rounded-lg">
        <SectionHeader title="Recent RAG History" onAdd={onAdd} />
        <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
                    <tr>
                        <th className="px-4 py-2 font-medium">PERIOD</th>
                        <th className="px-4 py-2 text-center font-medium">OVERALL</th>
                        <th className="px-4 py-2 text-center font-medium">SCOPE</th>
                        <th className="px-4 py-2 text-center font-medium">SCHEDULE</th>
                        <th className="px-4 py-2 text-center font-medium">BUDGET</th>
                        <th className="px-4 py-2 text-center font-medium">RISKS</th>
                    </tr>
                </thead>
                <tbody>
                    {ragHistory.slice(0, 2).map(entry => (
                        <tr key={entry.period} className="border-b border-slate-700/50">
                            <td className="px-4 py-3 font-medium text-slate-200">{entry.period}</td>
                            <td className="px-4 py-3"><div className="flex justify-center"><RagDot status={entry.overall} /></div></td>
                            <td className="px-4 py-3"><div className="flex justify-center"><RagDot status={entry.scope} /></div></td>
                            <td className="px-4 py-3"><div className="flex justify-center"><RagDot status={entry.schedule} /></div></td>
                            <td className="px-4 py-3"><div className="flex justify-center"><RagDot status={entry.budget} /></div></td>
                            <td className="px-4 py-3"><div className="flex justify-center"><RagDot status={entry.risks} /></div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const HomeTab: FC<{ data: ProjectDetailsData; onModalOpen: (config: any) => void; }> = ({ data, onModalOpen }) => {
  const { 
    addAnnouncement, updateAnnouncement, deleteAnnouncement, 
    addQuickLink, updateQuickLink, deleteQuickLink, 
    updateProjectDetails, addRagEntry 
  } = useContext(DataContext);
  
  const projectDetailsFields: FormModalField[] = [
      { name: 'projectManager', label: 'Project Manager', type: 'text'},
      { name: 'businessOwner', label: 'Technical Director', type: 'text'},
      { name: 'startDate', label: 'Start Date', type: 'date'},
      { name: 'finishDate', label: 'Finish Date', type: 'date'},
      { name: 'stage', label: 'Stage', type: 'text'},
      { name: 'percentComplete', label: '% Complete', type: 'number'},
      { name: 'overallHealth', label: 'Overall Health', type: 'select', options: ['Green', 'Amber', 'Red']},
  ];

  const ragEntryFields: FormModalField[] = [
      { name: 'overall', label: 'Overall', type: 'select', options: ['Green', 'Amber', 'Red'] },
      { name: 'scope', label: 'Scope', type: 'select', options: ['Green', 'Amber', 'Red'] },
      { name: 'schedule', label: 'Schedule', type: 'select', options: ['Green', 'Amber', 'Red'] },
      { name: 'budget', label: 'Budget', type: 'select', options: ['Green', 'Amber', 'Red'] },
      { name: 'risks', label: 'Risks', type: 'select', options: ['Green', 'Amber', 'Red'] },
  ];
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* --- Left Column --- */}
      <div className="lg:col-span-2 space-y-6">
        <ProjectDetailsSection 
            data={data} 
            onAdd={() => onModalOpen({ 
                title: "Edit Project Details", 
                fields: projectDetailsFields, 
                initialData: data, 
                onSave: (d: any) => updateProjectDetails(data.id, d) 
            })} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-800 p-6 rounded-lg">
            <SectionHeader title="Announcements" onAdd={() => onModalOpen({
              title: "Add Announcement", fields: [{name: 'content', label: 'Content', type: 'textarea'}], onSave: (d: any) => addAnnouncement(data.id, d)
            })} />
            <ul className="space-y-4 mt-4">
              {data.announcements.slice(0, 2).map(ann => (
                <li key={ann.date} className="text-sm group relative border-b border-slate-700/50 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-300 flex-grow pr-4">{ann.content}</p>
                    <div className="flex items-center flex-shrink-0 text-slate-400">
                      <span className="mr-2">({ann.date})</span>
                      <ActionButtons onEdit={() => onModalOpen({ title: "Edit Announcement", initialData: ann, fields: [{name: 'content', label: 'Content', type: 'textarea'}], onSave: (d: any) => updateAnnouncement(data.id, {...ann, ...d}) })} onDelete={() => deleteAnnouncement(data.id, ann.date)} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
              <SectionHeader title="Quick Links" onAdd={() => onModalOpen({
                title: "Add Quick Link", fields: [{name: 'name', label: 'Name', type: 'text'}, {name: 'url', label: 'URL', type: 'text'}], onSave: (d: any) => addQuickLink(data.id, d)
              })} />
              <ul className="space-y-2 mt-4">
                {data.quickLinks.map(link => (
                  <li key={link.name} className="group flex items-center justify-between p-1 hover:bg-slate-700/30 rounded-md">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline text-sm flex-grow">
                      {link.name}
                    </a>
                    <ActionButtons onEdit={() => onModalOpen({ title: "Edit Quick Link", initialData: link, fields: [{name: 'name', label: 'Name', type: 'text'}, {name: 'url', label: 'URL', type: 'text'}], onSave: (d: any) => updateQuickLink(data.id, d)})} onDelete={() => deleteQuickLink(data.id, link.name)} />
                  </li>
                ))}
              </ul>
            </div>
        </div>

        <RagHistorySection 
            ragHistory={data.ragHistory} 
            onAdd={() => onModalOpen({ 
                title: "Add RAG Entry", 
                fields: ragEntryFields, 
                onSave: (d: any) => addRagEntry(data.id, d) 
            })} 
        />

      </div>
      
      {/* --- Right Column --- */}
      <div className="lg:col-span-1">
        <ChatBot />
      </div>
    </div>
  );
};

const AssetDetailView: FC<{ asset: AssetLink, projectData: ProjectDetailsData, onBack: () => void, onModalOpen: (config: any) => void; }> = ({ asset, projectData, onBack, onModalOpen }) => {
  const [activeSubTab, setActiveSubTab] = useState<'List' | 'Documents' | 'Report'>('List');
  const SUB_TABS = ['List', 'Documents', 'Report'];

  const RAID_LOG_REPORT_URL = "https://app.powerbi.com/view?r=eyJrIjoiN2JmNDE5MjgtNGZlZi00MzE4LTgwYjEtMzRmZjc5MDRmZDY1IiwidCI6IjFiZTNhNTYzLTcyMDctNDg3YS1hMWJmLTRjNjllM2U0OTMwZSJ9";
  const GENERIC_ASSET_REPORT_URL = "https://app.powerbi.com/view?r=eyJrIjoiMzI1YTU2MjItYzIxOC00ODk1LWE3M2ItMjk3YmUyOGJjNTM3IiwidCI6IjFiZTNhNTYzLTcyMDctNDg3YS1hMWJmLTRjNjllM2U0OTMwZSJ9";

  const isReportTabDisabled = ['dependencies', 'actions', 'assumptions'].includes(asset.id);
  const reportUrl = ['risks', 'issues'].includes(asset.id) ? RAID_LOG_REPORT_URL : GENERIC_ASSET_REPORT_URL;

  const keyUpdates = projectData.keyUpdates?.[asset.id] || [];
  const assetDocuments = projectData.assetDocuments?.[asset.id] || [];
  const { addAssetDocument, updateAssetDocument, deleteAssetDocument } = useContext(DataContext);

  const documentFields: FormModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'type', label: 'Type', type: 'text', required: true },
    { name: 'url', label: 'URL', type: 'text', required: true },
  ];

  const handleSaveDoc = (d: any, originalDoc?: ProjectDocument) => {
      if (originalDoc) {
          updateAssetDocument(projectData.id, asset.id, { ...originalDoc, ...d });
      } else {
          addAssetDocument(projectData.id, asset.id, d);
      }
  };
  
  const renderListContent = () => {
    switch (asset.id) {
        case 'key-updates':
            return keyUpdates.length > 0 ? <KeyUpdatesList updates={keyUpdates} /> : <div className="text-center py-10 text-slate-400">No Key Updates found.</div>;
        case 'risks':
            return <ProjectRisksSection data={projectData} onModalOpen={onModalOpen} />;
        case 'issues':
            return <ProjectIssuesSection data={projectData} onModalOpen={onModalOpen} />;
        case 'actions':
            return <ProjectActionsSection data={projectData} onModalOpen={onModalOpen} />;
        case 'dependencies':
            return <ProjectDependenciesSection data={projectData} onModalOpen={onModalOpen} />;
        case 'assumptions':
            return <ProjectAssumptionsSection data={projectData} onModalOpen={onModalOpen} />;
        default:
            return (
                <div className="min-h-[200px] flex items-center justify-center">
                    <p className="text-slate-400">Content for {asset.name} - List goes here.</p>
                </div>
            );
    }
  };


  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center text-sm text-sky-400 hover:text-sky-300 mb-4 p-2 rounded-md hover:bg-slate-700/50 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Change Assets
      </button>
      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-sky-300 mb-4">{asset.name}</h3>
        
        {/* Sub-navigation */}
        <div className="border-b border-slate-700 mb-4">
          <ul className="flex space-x-2 -mb-px">
            {SUB_TABS.map(tab => {
                const isDisabled = tab === 'Report' && isReportTabDisabled;
                return (
                  <li key={tab}>
                    <button
                      onClick={() => !isDisabled && setActiveSubTab(tab as any)}
                      disabled={isDisabled}
                      className={`inline-block py-2 px-3 text-sm font-medium text-center rounded-t-md transition-colors ${
                        activeSubTab === tab && !isDisabled
                          ? 'text-sky-400 border-b-2 border-sky-400 bg-slate-700/50'
                          : 'text-slate-400 border-b-2 border-transparent'
                      } ${ isDisabled ? 'text-slate-600 cursor-not-allowed' : 'hover:text-slate-200'}`}
                    >
                      {tab}
                    </button>
                  </li>
                );
            })}
          </ul>
        </div>
        
        <div className="mt-4">
          {activeSubTab === 'List' && renderListContent()}
          {activeSubTab === 'Documents' && (
             <AssetDocumentsTable
              documents={assetDocuments}
              onAdd={() => onModalOpen({
                title: "Add Document",
                fields: documentFields,
                initialData: { name: '', type: '', url: '#' },
                onSave: (d: any) => handleSaveDoc(d)
              })}
              onEdit={(doc) => onModalOpen({
                title: "Edit Document",
                initialData: doc,
                fields: documentFields.filter(f => f.name !== 'name'), // Name is key, not editable
                onSave: (d: any) => handleSaveDoc(d, doc)
              })}
              onDelete={(docName) => window.confirm(`Delete document "${docName}"?`) && deleteAssetDocument(projectData.id, asset.id, docName)}
            />
          )}
          {activeSubTab === 'Report' && (
            isReportTabDisabled ? (
                <div className="min-h-[200px] flex items-center justify-center">
                    <p className="text-slate-500">No report available for this asset.</p>
                </div>
            ) : (
                <AssetReportView assetName={asset.name} reportUrl={reportUrl} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const ChangeAssetsTab: FC<{ data: ProjectDetailsData; onModalOpen: (config: any) => void; }> = ({ data, onModalOpen }) => {
    const [selectedAsset, setSelectedAsset] = useState<AssetLink | null>(null);
    const { addAssetCategory, updateAssetCategory, deleteAssetCategory, addAssetLink, updateAssetLink, deleteAssetLink } = useContext(DataContext);
    
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

    if (selectedAsset) {
        return <AssetDetailView asset={selectedAsset} projectData={data} onBack={() => setSelectedAsset(null)} onModalOpen={onModalOpen} />;
    }
  
    return (
      <>
        <SectionHeader 
          title="Project Assets" 
          centerTitle={true}
          onAdd={() => onModalOpen({ title: 'Add Asset Category', fields: [{ name: 'title', label: 'Category Title', type: 'text'}], onSave: (d: any) => addAssetCategory(data.id, d.title) })} 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projectAssets.map(category => (
                <div 
                    key={category.id} 
                    className="bg-slate-800 rounded-lg shadow-lg flex flex-col group"
                >
                    <div className="bg-sky-700 text-white font-semibold p-3 text-center rounded-t-lg flex justify-between items-center">
                        <span>{category.title}</span>
                        <ActionButtons onEdit={() => onModalOpen({ title: "Edit Category", initialData: {title: category.title}, fields: [{ name: 'title', label: 'Category Title', type: 'text'}], onSave: (d: any) => updateAssetCategory(data.id, category.id, d.title)})} onDelete={() => deleteAssetCategory(data.id, category.id)} />
                    </div>
                    <div className="p-4 space-y-3 flex-grow flex flex-col">
                        <div className="flex-grow">
                          {category.links.map(link => (
                              <div key={link.id} className="w-full flex items-center justify-between text-slate-300 hover:bg-slate-700/50 p-2 rounded-md transition-colors group/link">
                                <button onClick={() => setSelectedAsset(link)} className="flex items-center space-x-3 text-left flex-grow hover:text-sky-300">
                                    <DocumentDuplicateIcon className="w-5 h-5 text-sky-400" />
                                    <span className="text-sm">{link.name}</span>
                                </button>
                                <ActionButtons onEdit={() => onModalOpen({ title: "Edit Link", initialData: link, fields: [{name: 'name', label: 'Link Name', type: 'text'}, {name: 'url', label: 'URL (optional)', type: 'text'}], onSave: (d: any) => updateAssetLink(data.id, category.id, {...d, id: link.id})})} onDelete={() => deleteAssetLink(data.id, category.id, link.id)} />
                              </div>
                          ))}
                        </div>
                        <button onClick={() => onModalOpen({ title: "Add Asset Link", fields: [{name: 'name', label: 'Link Name', type: 'text'}, {name: 'url', label: 'URL (optional)', type: 'text'}], onSave: (d: any) => addAssetLink(data.id, category.id, d)})} className="w-full mt-1 p-2 text-sm text-sky-400 hover:bg-sky-500/10 rounded-md flex items-center justify-center transition-colors">
                            <PlusIcon className="w-4 h-4 mr-1" /> Add Link
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Custom Change Roadmap Section */}
        <div className="mt-12">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-slate-100">Custom Change Roadmap</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmapData.map((card, index) => (
                    <div key={index} className="bg-slate-800 rounded-lg shadow-lg flex flex-col group">
                        <div className="bg-sky-700 text-white font-semibold p-3 text-center rounded-t-lg">
                            {card.title}
                        </div>
                        <div className="p-4 space-y-3 flex-grow flex flex-col">
                            <div className="flex-grow">
                                {card.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="w-full flex items-center space-x-3 text-slate-300 p-2">
                                        <DocumentDuplicateIcon className="w-5 h-5 text-sky-400 flex-shrink-0" />
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
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
        </div>
      </>
    );
};

const ReportsTab: FC<{ data: ProjectDetailsData; onReportClick: (report: AssetLink) => void; onModalOpen: (config: any) => void; }> = ({ data, onReportClick, onModalOpen }) => {
  const reportsCategory = data.projectAssets.find(cat => cat.id === 'reports-management');
  const reports = reportsCategory?.links || [];
  const { addAssetLink, updateAssetLink, deleteAssetLink } = useContext(DataContext);

  const handleSave = (d: any, originalLink?: AssetLink) => {
    if (!reportsCategory) return;
    if (originalLink) {
        updateAssetLink(data.id, reportsCategory.id, {...d, id: originalLink.id });
    } else {
        addAssetLink(data.id, reportsCategory.id, d);
    }
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg animate-fade-in">
      <SectionHeader title="Available Reports" onAdd={() => onModalOpen({
          title: "Add Report",
          fields: [{name: 'name', label: 'Report Name', type: 'text'}, {name: 'url', label: 'PowerBI URL', type: 'text'}],
          onSave: (d: any) => handleSave(d)
      })} />
      <div className="space-y-3">
        {reports.map(report => {
          const isAvailable = !!report.url;
          return (
            <div
              key={report.id}
              className={`w-full flex items-center justify-between p-4 bg-slate-700/50 rounded-lg group transition-colors ${
                isAvailable ? 'hover:bg-slate-700' : 'opacity-60'
              }`}
            >
              <button
                onClick={() => isAvailable && onReportClick(report)}
                disabled={!isAvailable}
                className="flex items-center flex-grow text-left disabled:cursor-not-allowed"
              >
                <ChartIcon className="w-6 h-6 text-sky-400 mr-4" />
                <span className="font-medium text-slate-200 group-hover:text-sky-300">{report.name}</span>
              </button>
              <ActionButtons
                onEdit={() => onModalOpen({ title: "Edit Report", initialData: report, fields: [{name: 'name', label: 'Report Name', type: 'text'}, {name: 'url', label: 'PowerBI URL', type: 'text'}], onSave: (d: any) => handleSave(d, report) })}
                onDelete={() => reportsCategory && deleteAssetLink(data.id, reportsCategory.id, report.id)}
              />
            </div>
          )
        })}
        {reports.length === 0 && <p className="text-slate-400">No reports available for this project.</p>}
      </div>
    </div>
  );
};

const DocumentsTab: FC<{ data: ProjectDetailsData; onModalOpen: (config: any) => void; }> = ({ data, onModalOpen }) => {
  const { addDocument, updateDocument, deleteDocument } = useContext(DataContext);
  const documentFields: FormModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'type', label: 'Type', type: 'text', required: true },
    { name: 'url', label: 'URL', type: 'text', required: true },
  ];

  const handleSave = (d: any, originalDoc?: ProjectDocument) => {
      if (originalDoc) {
          // Note: 'name' is used as a key, so it's not editable here.
          // The FormModal will preserve the original name.
          updateDocument(data.id, { ...originalDoc, ...d });
      } else {
          addDocument(data.id, d);
      }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg animate-fade-in">
      <SectionHeader title="Project Documents" onAdd={() => onModalOpen({
        title: "Add Document",
        fields: documentFields,
        initialData: { name: '', type: '', url: '#' },
        onSave: (d: any) => handleSave(d)
      })} />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 font-medium w-2/5">NAME</th>
              <th className="px-4 py-3 font-medium">TYPE</th>
              <th className="px-4 py-3 font-medium">VERSION</th>
              <th className="px-4 py-3 font-medium">LAST MODIFIED</th>
              <th className="px-4 py-3 font-medium">MODIFIED BY</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.documents.map(doc => (
              <tr key={doc.name} className="border-b border-slate-700/50 hover:bg-slate-700/30 group">
                <td className="px-4 py-3 font-medium text-sky-400">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{doc.name}</a>
                </td>
                <td className="px-4 py-3 text-slate-300">{doc.type}</td>
                <td className="px-4 py-3 text-slate-300">{doc.version}</td>
                <td className="px-4 py-3 text-slate-300">{doc.lastModified}</td>
                <td className="px-4 py-3 text-slate-300">{doc.modifiedBy}</td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons
                    className="opacity-0 group-hover:opacity-100 justify-end"
                    onEdit={() => onModalOpen({
                      title: "Edit Document",
                      initialData: doc,
                      fields: documentFields.filter(f => f.name !== 'name'), // Name is key, not editable
                      onSave: (d: any) => handleSave(d, doc)
                    })}
                    onDelete={() => deleteDocument(data.id, doc.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const ProjectRisksSection: FC<{ data: ProjectDetailsData; onModalOpen: (config: any) => void; }> = ({ data, onModalOpen }) => {
  const { addRisk, updateRisk, deleteRisk } = useContext(DataContext);
  const riskFields: FormModalField[] = [
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'impact', label: 'Impact', type: 'select', options: ['High', 'Medium', 'Low'], required: true },
    { name: 'likelihood', label: 'Likelihood', type: 'select', options: ['High', 'Medium', 'Low'], required: true },
    { name: 'owner', label: 'Owner', type: 'text', required: true },
    { name: 'mitigationPlan', label: 'Mitigation Plan', type: 'textarea', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Open', 'Mitigated', 'Closed'], required: true },
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-lg animate-fade-in">
      <SectionHeader title="Project Risks" onAdd={() => onModalOpen({
        title: "Add Risk",
        fields: riskFields,
        initialData: { impact: 'Low', likelihood: 'Low', status: 'Open' },
        onSave: (d: any) => addRisk(data.id, d)
      })} />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium w-1/4">DESCRIPTION</th>
              <th className="px-4 py-3 font-medium">IMPACT</th>
              <th className="px-4 py-3 font-medium">LIKELIHOOD</th>
              <th className="px-4 py-3 font-medium">OWNER</th>
              <th className="px-4 py-3 font-medium w-1/4">MITIGATION PLAN</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.risks.map(risk => (
              <tr key={risk.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 group">
                <td className="px-4 py-3 text-slate-300">{risk.id}</td>
                <td className="px-4 py-3 text-slate-300">{risk.description}</td>
                <td className="px-4 py-3 text-slate-300">{risk.impact}</td>
                <td className="px-4 py-3 text-slate-300">{risk.likelihood}</td>
                <td className="px-4 py-3 text-slate-300">{risk.owner}</td>
                <td className="px-4 py-3 text-slate-300">{risk.mitigationPlan}</td>
                <td className="px-4 py-3 font-medium">
                  <span className={`${
                    risk.status === 'Open' ? 'text-yellow-400' :
                    risk.status === 'Mitigated' ? 'text-green-400' :
                    'text-slate-400'
                  }`}>{risk.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons
                    className="opacity-0 group-hover:opacity-100 justify-end"
                    onEdit={() => onModalOpen({
                      title: "Edit Risk",
                      initialData: risk,
                      fields: riskFields,
                      onSave: (d: any) => updateRisk(data.id, d)
                    })}
                    onDelete={() => window.confirm(`Delete risk ${risk.id}?`) && deleteRisk(data.id, risk.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProjectIssuesSection: FC<{ data: ProjectDetailsData; onModalOpen: (config: any) => void; }> = ({ data, onModalOpen }) => {
  const { addIssue, updateIssue, deleteIssue } = useContext(DataContext);
  const issueFields: FormModalField[] = [
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'], required: true },
    { name: 'assignedTo', label: 'Assigned To', type: 'text', required: true },
    { name: 'due', label: 'Due Date', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['New', 'In Progress', 'Resolved'], required: true },
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-lg animate-fade-in">
      <SectionHeader title="Project Issues" onAdd={() => onModalOpen({
        title: "Add Issue",
        fields: issueFields,
        initialData: { priority: 'Low', status: 'New' },
        onSave: (d: any) => addIssue(data.id, d)
      })} />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium w-2/5">DESCRIPTION</th>
              <th className="px-4 py-3 font-medium">PRIORITY</th>
              <th className="px-4 py-3 font-medium">ASSIGNED TO</th>
              <th className="px-4 py-3 font-medium">REPORTED</th>
              <th className="px-4 py-3 font-medium">DUE</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.issues.map(issue => (
              <tr key={issue.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 group">
                <td className="px-4 py-3 text-slate-300">{issue.id}</td>
                <td className="px-4 py-3 text-slate-300">{issue.description}</td>
                <td className="px-4 py-3 text-slate-300">{issue.priority}</td>
                <td className="px-4 py-3 text-slate-300">{issue.assignedTo}</td>
                <td className="px-4 py-3 text-slate-300">{issue.reported}</td>
                <td className="px-4 py-3 text-slate-300">{issue.due}</td>
                <td className="px-4 py-3 font-medium">
                   <span className={`${
                    issue.status === 'In Progress' ? 'text-sky-400' :
                    issue.status === 'Resolved' ? 'text-green-400' :
                    'text-yellow-400'
                  }`}>{issue.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons
                    className="opacity-0 group-hover:opacity-100 justify-end"
                    onEdit={() => onModalOpen({
                      title: "Edit Issue",
                      initialData: issue,
                      fields: issueFields,
                      onSave: (d: any) => updateIssue(data.id, d)
                    })}
                    onDelete={() => window.confirm(`Delete issue ${issue.id}?`) && deleteIssue(data.id, issue.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProjectActionsSection: FC<{ data: ProjectDetailsData; onModalOpen: (config: any) => void; }> = ({ data, onModalOpen }) => {
  const { addAction, updateAction, deleteAction } = useContext(DataContext);
  const fields: FormModalField[] = [
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'owner', label: 'Owner', type: 'text', required: true },
    { name: 'dueDate', label: 'Due Date', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Open', 'Completed', 'Overdue'], required: true },
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <SectionHeader title="Project Actions" onAdd={() => onModalOpen({ title: "Add Action", fields, initialData: { status: 'Open' }, onSave: (d: any) => addAction(data.id, d) })} />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium w-3/5">DESCRIPTION</th>
              <th className="px-4 py-3 font-medium">OWNER</th>
              <th className="px-4 py-3 font-medium">DUE DATE</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.actions.map(item => (
              <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 group">
                <td className="px-4 py-3 text-gray-300">{item.id}</td>
                <td className="px-4 py-3 text-gray-300">{item.description}</td>
                <td className="px-4 py-3 text-gray-300">{item.owner}</td>
                <td className="px-4 py-3 text-gray-300">{item.dueDate}</td>
                <td className="px-4 py-3 font-medium">
                   <span className={`${
                        item.status === 'Open' ? 'text-amber-400' :
                        item.status === 'Completed' ? 'text-green-400' :
                        'text-red-400' // Overdue
                    }`}>{item.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons className="opacity-0 group-hover:opacity-100 justify-end" onEdit={() => onModalOpen({ title: "Edit Action", fields, initialData: item, onSave: (d: any) => updateAction(data.id, d) })} onDelete={() => window.confirm(`Delete action ${item.id}?`) && deleteAction(data.id, item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProjectDependenciesSection: FC<{ data: ProjectDetailsData; onModalOpen: (config: any) => void; }> = ({ data, onModalOpen }) => {
  const { addDependency, updateDependency, deleteDependency } = useContext(DataContext);
  const fields: FormModalField[] = [
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'dependencyOn', label: 'Dependency On', type: 'text', required: true },
    { name: 'impactIfFails', label: 'Impact if Fails', type: 'select', options: ['High', 'Medium', 'Low'], required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['On Track', 'At Risk', 'Delayed'], required: true },
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <SectionHeader title="Project Dependencies" onAdd={() => onModalOpen({ title: "Add Dependency", fields, initialData: { status: 'On Track', impactIfFails: 'Low' }, onSave: (d: any) => addDependency(data.id, d) })} />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium w-3/5">DESCRIPTION</th>
              <th className="px-4 py-3 font-medium">DEPENDENCY ON</th>
              <th className="px-4 py-3 font-medium">IMPACT</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.dependencies.map(item => (
              <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 group">
                <td className="px-4 py-3 text-gray-300">{item.id}</td>
                <td className="px-4 py-3 text-gray-300">{item.description}</td>
                <td className="px-4 py-3 text-gray-300">{item.dependencyOn}</td>
                <td className="px-4 py-3 text-gray-300">{item.impactIfFails}</td>
                <td className="px-4 py-3 font-medium">
                   <span className={`${
                        item.status === 'On Track' ? 'text-green-400' :
                        item.status === 'At Risk' ? 'text-red-400' :
                        'text-yellow-400' // Delayed
                    }`}>{item.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons className="opacity-0 group-hover:opacity-100 justify-end" onEdit={() => onModalOpen({ title: "Edit Dependency", fields, initialData: item, onSave: (d: any) => updateDependency(data.id, d) })} onDelete={() => window.confirm(`Delete dependency ${item.id}?`) && deleteDependency(data.id, item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProjectAssumptionsSection: FC<{ data: ProjectDetailsData; onModalOpen: (config: any) => void; }> = ({ data, onModalOpen }) => {
  const { addAssumption, updateAssumption, deleteAssumption } = useContext(DataContext);
  const fields: FormModalField[] = [
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'owner', label: 'Owner', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Valid', 'Invalid', 'Pending Validation'], required: true },
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <SectionHeader title="Project Assumptions" onAdd={() => onModalOpen({ title: "Add Assumption", fields, initialData: { status: 'Pending Validation' }, onSave: (d: any) => addAssumption(data.id, d) })} />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium w-3/5">DESCRIPTION</th>
              <th className="px-4 py-3 font-medium">OWNER</th>
              <th className="px-4 py-3 font-medium">VALIDATED</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.assumptions.map(item => (
              <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 group">
                <td className="px-4 py-3 text-gray-300">{item.id}</td>
                <td className="px-4 py-3 text-gray-300">{item.description}</td>
                <td className="px-4 py-3 text-gray-300">{item.owner}</td>
                <td className="px-4 py-3 text-gray-300">{item.validatedDate}</td>
                <td className="px-4 py-3 font-medium">
                   <span className={`${
                        item.status === 'Valid' ? 'text-green-400' :
                        item.status === 'Invalid' ? 'text-red-400' :
                        'text-yellow-400' // Pending Validation
                    }`}>{item.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons className="opacity-0 group-hover:opacity-100 justify-end" onEdit={() => onModalOpen({ title: "Edit Assumption", fields, initialData: item, onSave: (d: any) => updateAssumption(data.id, d) })} onDelete={() => window.confirm(`Delete assumption ${item.id}?`) && deleteAssumption(data.id, item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TABS: { name: WorkbenchModalTabName, component: React.ComponentType<any> }[] = [
    { name: 'Home', component: HomeTab },
    { name: 'Change Assets', component: ChangeAssetsTab },
    { name: 'Reports', component: ReportsTab },
    { name: 'Documents', component: DocumentsTab },
];

// --- MAIN MODAL COMPONENT ---

interface ProjectWorkbenchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: ProjectDetailsData;
  initialTab?: WorkbenchModalTabName;
  mode?: 'full' | 'single-view';
}


const ProjectWorkbenchModal: FC<ProjectWorkbenchModalProps> = ({ isOpen, onClose, projectData, initialTab, mode = 'full' }) => {
  const [activeTab, setActiveTab] = useState<WorkbenchModalTabName>(initialTab || 'Home');
  const [isPowerBIModalOpen, setIsPowerBIModalOpen] = useState(false);
  const [powerBIReportConfig, setPowerBIReportConfig] = useState<{ url: string; title: string } | null>(null);
  
  const [modalConfig, setModalConfig] = useState<any>({ isOpen: false });

  const handleOpenModal = (config: Omit<FormModalProps, 'isOpen' | 'onClose'>) => {
    setModalConfig({ ...config, isOpen: true });
  };
  const handleCloseModal = () => {
    setModalConfig({ isOpen: false });
  };

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || 'Home');
    }
  }, [isOpen, initialTab]);
  
  const handleReportClick = (report: AssetLink) => {
    if (!report.url) return;
    setPowerBIReportConfig({ url: report.url, title: report.name });
    setIsPowerBIModalOpen(true);
  };

  if (!isOpen) return null;

  const ActiveComponent = TABS.find(tab => tab.name === activeTab)?.component;
  const isSingleView = mode === 'single-view';

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
        <div className="bg-slate-900 w-full max-w-7xl h-[95vh] rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
            <h2 className="text-xl font-bold text-slate-100">
              {isSingleView 
                ? <>{activeTab}: <span className="text-sky-400">{projectData.name}</span></>
                : <>Project Site: <span className="text-sky-400">{projectData.name}</span></>
              }
            </h2>
            <button onClick={onClose} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>

          {/* Tab Navigation */}
          {!isSingleView && (
            <nav className="flex-shrink-0 border-b border-slate-700">
              <ul className="flex space-x-2 -mb-px px-4 overflow-x-auto">
                {TABS.map(tab => (
                  <li key={tab.name}>
                    <button
                      onClick={() => setActiveTab(tab.name)}
                      className={`inline-block py-3 px-4 text-sm font-medium text-center rounded-t-lg transition-colors ${
                        activeTab === tab.name
                          ? 'text-sky-400 border-b-2 border-sky-400'
                          : 'text-slate-400 hover:text-slate-200 hover:border-slate-500 border-b-2 border-transparent'
                      }`}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Content */}
          <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
            {ActiveComponent && <ActiveComponent data={projectData} onReportClick={handleReportClick} onModalOpen={handleOpenModal} />}
          </main>

          {/* Footer */}
          <footer className="flex-shrink-0 flex justify-end p-4 border-t border-slate-700 bg-slate-900/50">
            <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200">
              Close
            </button>
          </footer>
        </div>
      </div>
      
      {isPowerBIModalOpen && powerBIReportConfig && (
        <PowerBIReportModal
            isOpen={isPowerBIModalOpen}
            onClose={() => setIsPowerBIModalOpen(false)}
            reportUrl={powerBIReportConfig.url}
            title={powerBIReportConfig.title}
        />
       )}

       {modalConfig.isOpen && (
          <FormModal
            {...modalConfig}
            onClose={handleCloseModal}
          />
        )}
    </>
  );
};

export default ProjectWorkbenchModal;