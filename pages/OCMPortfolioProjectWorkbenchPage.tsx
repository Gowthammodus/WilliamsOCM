
import React, { useState, useContext } from 'react';
import WorkbenchCard from '../components/WorkbenchCard';
import { WorkbenchItem, WorkbenchGroup, IconProps } from '../types';
import { OCM_WORKBENCH_INTRODUCTION_TITLE, OCM_WORKBENCH_INTRODUCTION_TEXT } from '../constants';
import { DataContext } from '../contexts/DataContext';
import EditModal from '../components/EditModal';
import TextInputModal from '../components/TextInputModal';
import { PlusIcon, PencilIcon, TrashIcon } from '../components/Icons';


const FolderIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
  </svg>
);

const OCMPortfolioProjectWorkbenchPage: React.FC = () => {
  const { 
    workbenchData, 
    addWorkbenchGroup,
    updateWorkbenchGroup,
    deleteWorkbenchGroup,
    addWorkbenchItem,
    updateWorkbenchItem,
    deleteWorkbenchItem
  } = useContext(DataContext);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{item: WorkbenchItem, groupId: string} | null>(null);

  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [textModalConfig, setTextModalConfig] = useState<{ title: string; initialValue?: string; onSave: (value: string) => void; label?: string } | null>(null);

  const [addingToGroup, setAddingToGroup] = useState<string | null>(null);

  // Handlers for Workbench Items (Projects)
  const handleOpenEditModal = (item: WorkbenchItem, groupId: string) => {
    setEditingItem({ item, groupId });
    setIsEditModalOpen(true);
  };

  const handleOpenAddModal = (groupId: string) => {
    setEditingItem(null);
    setAddingToGroup(groupId);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
    setAddingToGroup(null);
  };

  const handleSaveItem = (data: { title: string; description: string; imageUrl: string; }) => {
    if (editingItem) {
      updateWorkbenchItem(editingItem.groupId, { ...editingItem.item, ...data });
    } else if (addingToGroup) {
      addWorkbenchItem(addingToGroup, data);
    }
    handleCloseEditModal();
  };
  
  const handleDeleteItem = (groupId: string, itemId: string) => {
    deleteWorkbenchItem(groupId, itemId);
  };

  // Handlers for Workbench Groups (Streams)
  const handleOpenTextModal = (config: any) => {
    setTextModalConfig(config);
    setIsTextModalOpen(true);
  };

  const handleCloseTextModal = () => {
    setIsTextModalOpen(false);
    setTextModalConfig(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-sky-400 tracking-tight">
          Engineering Project Workbench
        </h1>

        <section className="mb-12 p-6 bg-slate-800/70 rounded-xl shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-sky-300 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {OCM_WORKBENCH_INTRODUCTION_TITLE}
          </h2>
          <p className="text-slate-300 leading-relaxed">
            {OCM_WORKBENCH_INTRODUCTION_TEXT}
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-8 text-center sm:text-left">
            Development Streams
          </h2>
          {workbenchData.map((group: WorkbenchGroup) => (
            <div key={group.groupId} className="mb-10">
              <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-slate-700">
                <div className="flex items-center group">
                  <FolderIcon className="w-7 h-7 text-amber-400 mr-3 flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-medium text-amber-400">
                    {group.groupTitle}
                  </h3>
                   <div className="flex items-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenTextModal({ title: "Edit Stream Title", initialValue: group.groupTitle, onSave: (newTitle: string) => updateWorkbenchGroup(group.groupId, newTitle) })} className="p-2 rounded-full hover:bg-slate-700"><PencilIcon className="w-5 h-5 text-slate-400 hover:text-sky-300" /></button>
                      <button onClick={() => window.confirm(`Are you sure you want to delete the "${group.groupTitle}" stream?`) && deleteWorkbenchGroup(group.groupId)} className="p-2 rounded-full hover:bg-slate-700"><TrashIcon className="w-5 h-5 text-slate-400 hover:text-red-400" /></button>
                   </div>
                </div>
                <button
                  onClick={() => handleOpenAddModal(group.groupId)}
                  className="flex items-center bg-sky-700/50 hover:bg-sky-600/70 text-white font-semibold py-2 px-3 rounded-md transition-colors text-sm"
                >
                  <PlusIcon className="w-4 h-4 mr-1.5" />
                  Add Project
                </button>
              </div>
              {group.items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item: WorkbenchItem) => (
                    <WorkbenchCard 
                      key={item.id} 
                      item={item}
                      onEdit={() => handleOpenEditModal(item, group.groupId)}
                      onDelete={() => handleDeleteItem(group.groupId, item.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-6 border-2 border-dashed border-slate-700 rounded-lg">
                    <p className="text-slate-400">No projects in this stream yet.</p>
                    <button onClick={() => handleOpenAddModal(group.groupId)} className="mt-4 text-sky-400 font-semibold hover:underline">Add the first project</button>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center mt-8">
            <button
                onClick={() => handleOpenTextModal({ title: "Add New Development Stream", label: "Stream Title", onSave: (title: string) => addWorkbenchGroup(title) })}
                className="flex items-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 px-6 rounded-md transition-colors duration-200 shadow-lg hover:shadow-sky-500/30"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Development Stream
            </button>
          </div>
        </section>
      </div>

      {isEditModalOpen && (
        <EditModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onSave={handleSaveItem}
            item={editingItem?.item || null}
            title={editingItem ? "Edit Project" : "Add New Project"}
        />
      )}
       {isTextModalOpen && textModalConfig && (
          <TextInputModal 
              isOpen={isTextModalOpen}
              onClose={handleCloseTextModal}
              {...textModalConfig}
          />
      )}
    </>
  );
};

export default OCMPortfolioProjectWorkbenchPage;