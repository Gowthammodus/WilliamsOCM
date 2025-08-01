

import React, { useState, useContext } from 'react';
import ModuleCard from '../components/ModuleCard';
import { DataContext } from '../contexts/DataContext';
import { HomeModule } from '../types';
import EditModal from '../components/EditModal';
import { PlusIcon } from '../components/Icons';

const homePageReports = [
  {
    title: "Change Readiness Survey Report",
    url: "https://app.powerbi.com/view?r=eyJrIjoiYzJhODBhMDAtMTcxMy00YTAwLWIyOTItNmY0M2MzYTY5YzhlIiwidCI6IjFiZTNhNTYzLTcyMDctNDg3YS1hMWJmLTRjNjllM2U0OTMwZSJ9"
  },
  {
    title: "Engagement Scoping Response Report",
    url: "https://app.powerbi.com/view?r=eyJrIjoiNjQ5YTU5NmUtYzIzYy00MGY2LTk4OTctNGE2NDFlNGJjNzM0IiwidCI6IjFiZTNhNTYzLTcyMDctNDg3YS1hMWJmLTRjNjllM2U0OTMwZSJ9"
  }
];

const HomePage: React.FC = () => {
  const { homeModules, addHomeModule, updateHomeModule, deleteHomeModule } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<HomeModule | null>(null);

  const handleOpenModal = (module: HomeModule | null = null) => {
    setEditingModule(module);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingModule(null);
  };

  const handleSave = (data: { title: string; description: string; imageUrl: string; }) => {
    if (editingModule) {
      updateHomeModule({ ...editingModule, ...data });
    } else {
      addHomeModule(data);
    }
    handleCloseModal();
  };
  
  const handleDelete = (moduleId: string) => {
    deleteHomeModule(moduleId);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-sky-400">
            Williams Racing Technology Hub
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Your central hub for engineering projects, race data, and performance analytics.
          </p>
        </div>
        
        <div className="flex justify-end mb-6">
            <button
                onClick={() => handleOpenModal()}
                className="flex items-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Module
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {homeModules.map((module) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              onEdit={() => handleOpenModal(module)} 
              onDelete={handleDelete}
            />
          ))}
        </div>
        
        {/* OCM Reports Section */}
        <div className="mt-16">
          <div className="text-left mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-sky-400">
              OCM Reports
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-2xl">
              Key operational reports, live from Power BI.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {homePageReports.map((report) => (
              <div key={report.title} className="bg-slate-800 rounded-lg shadow-lg flex flex-col overflow-hidden">
                <div className="bg-slate-700/50 p-4 border-b border-slate-600">
                  <h3 className="font-semibold text-slate-100 text-center">{report.title}</h3>
                </div>
                <div className="h-96 bg-black">
                  <iframe
                    title={report.title}
                    src={report.url}
                    frameBorder="0"
                    allowFullScreen={true}
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {isModalOpen && (
        <EditModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSave}
            item={editingModule}
            title={editingModule ? "Edit Module" : "Create New Module"}
        />
      )}
    </>
  );
};

export default HomePage;