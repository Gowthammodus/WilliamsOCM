import React, { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { OCMSetupStep, OCMSetupImageCard, OCMSetupTopicGroup, OCMSetupItem, OCMSetupSidebarLink } from '../types';
import { GlobeIcon, ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon, PlusIcon } from '../components/Icons';
import TextInputModal from '../components/TextInputModal';
import EditModal from '../components/EditModal';

const EditDeleteButtons: React.FC<{ onEdit: () => void; onDelete: () => void; }> = ({ onEdit, onDelete }) => (
    <div className="flex items-center space-x-2 ml-2 opacity-30 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={onEdit} className="p-1.5 rounded-full text-slate-400 hover:bg-sky-500/20 hover:text-sky-300"><PencilIcon className="w-4 h-4" /></button>
        <button onClick={onDelete} className="p-1.5 rounded-full text-slate-400 hover:bg-red-500/20 hover:text-red-400"><TrashIcon className="w-4 h-4" /></button>
    </div>
);

const ImageCard: React.FC<{ card: OCMSetupImageCard, onEdit: () => void }> = ({ card, onEdit }) => (
    <div className="relative h-48 rounded-lg overflow-hidden mb-6 bg-cover bg-center shadow-lg group" style={{ backgroundImage: `url(${card.imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute top-3 right-3 z-10">
           <button onClick={onEdit} className="flex items-center bg-slate-900/60 text-white hover:bg-slate-800/90 transition-colors p-2 rounded-full shadow-md">
                <PencilIcon className="w-4 h-4" />
            </button>
        </div>
        <div className="relative h-full flex items-center p-8">
            <div className="bg-black/50 p-4 rounded-lg text-left backdrop-blur-sm">
                <h4 className="text-lg font-bold text-white">{card.title}</h4>
                <button className="mt-2 bg-sky-500 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-sky-400 transition-colors shadow-lg">
                    {card.buttonText}
                </button>
            </div>
        </div>
    </div>
);

const TopicGroup: React.FC<{
    stepId: string;
    topic: OCMSetupTopicGroup;
    openTextModal: (config: any) => void;
    deleteTopic: (stepId: string, topicId: string) => void;
    deleteItem: (stepId: string, topicId: string, itemId: string) => void;
    addItem: (stepId: string, topicId: string, text: string) => void;
    updateTopic: (stepId: string, topicId: string, newTitle: string) => void;
    updateItem: (stepId: string, topicId: string, itemId: string, newText: string) => void;
}> = ({ stepId, topic, openTextModal, deleteTopic, deleteItem, addItem, updateTopic, updateItem }) => {
    return (
        <div className="flex flex-col bg-slate-800/50 rounded-lg overflow-hidden ring-1 ring-slate-700">
            <div className="bg-slate-700/80 p-3 flex items-center justify-between group">
                <h4 className="font-bold text-base text-slate-100">{topic.title}</h4>
                <EditDeleteButtons
                    onEdit={() => openTextModal({ title: "Edit Topic Title", initialValue: topic.title, onSave: (newTitle: string) => updateTopic(stepId, topic.id, newTitle) })}
                    onDelete={() => window.confirm(`Delete topic "${topic.title}"?`) && deleteTopic(stepId, topic.id)}
                />
            </div>
            <div className="flex-grow p-2 space-y-1">
                {topic.items.map(item => (
                    <div key={item.id} className="p-2.5 rounded-md text-sm text-slate-300 flex items-center justify-between group hover:bg-slate-700/50">
                        <span>{item.text}</span>
                        <EditDeleteButtons
                            onEdit={() => openTextModal({ title: "Edit Item", initialValue: item.text, onSave: (newText: string) => updateItem(stepId, topic.id, item.id, newText) })}
                            onDelete={() => window.confirm(`Delete item "${item.text}"?`) && deleteItem(stepId, topic.id, item.id)}
                        />
                    </div>
                ))}
                {topic.items.length === 0 && (
                    <div className="p-2.5 text-center text-sm text-slate-500">No items yet.</div>
                )}
                 <button onClick={() => openTextModal({ title: "Add New Item", onSave: (text: string) => addItem(stepId, topic.id, text) })} className="w-full mt-1 p-2 text-sm text-sky-400 hover:bg-sky-500/10 rounded-md flex items-center justify-center transition-colors">
                    <PlusIcon className="w-4 h-4 mr-1" /> Add Item
                </button>
            </div>
        </div>
    );
};

const SetupStep: React.FC<{
    step: OCMSetupStep;
    isOpen: boolean;
    onToggle: () => void;
    openTextModal: (config: any) => void;
    openEditModal: (config: any) => void;
}> = ({ step, isOpen, onToggle, openTextModal, openEditModal }) => {
    const { 
      updateOcmStep, deleteOcmStep, 
      addOcmTopic, updateOcmTopic, deleteOcmTopic,
      addOcmItem, updateOcmItem, deleteOcmItem,
      addOcmSidebarLink, updateOcmSidebarLink, deleteOcmSidebarLink,
      updateOcmImageCard
    } = useContext(DataContext);
    
    const handleImageCardEdit = (data: { title: string; description: string; imageUrl: string; }) => {
      updateOcmImageCard(step.id, { title: data.title, buttonText: data.description, imageUrl: data.imageUrl });
    };

    return (
        <div className="border border-slate-700/50 rounded-xl overflow-hidden mb-6 bg-slate-800 shadow-xl">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 sm:p-5 bg-slate-800 hover:bg-slate-700/50 transition-colors group"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                   {isOpen ? <ChevronUpIcon className="w-6 h-6 mr-4 text-sky-400" /> : <ChevronDownIcon className="w-6 h-6 mr-4 text-slate-500 group-hover:text-sky-400 transition-colors" />}
                   <h2 className="text-xl sm:text-2xl font-semibold text-white text-left">
                       {step.title}
                   </h2>
                </div>
                <EditDeleteButtons
                    onEdit={() => openTextModal({ title: "Edit Step Title", initialValue: step.title, onSave: (newTitle: string) => updateOcmStep(step.id, newTitle) })}
                    onDelete={() => window.confirm(`Delete step "${step.title}"?`) && deleteOcmStep(step.id)}
                />
            </button>
            {isOpen && (
                <div className="p-4 sm:p-6 bg-slate-800/30 border-t border-slate-700/50 animate-fade-in">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-grow">
                            {step.imageCard && <ImageCard card={step.imageCard} onEdit={() => openEditModal({ item: {title: step.imageCard?.title, description: step.imageCard?.buttonText, imageUrl: step.imageCard?.imageUrl }, onSave: handleImageCardEdit, title: "Edit Image Card"})} />}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {step.topics.map(topic => (
                                   <TopicGroup key={topic.id} stepId={step.id} topic={topic} openTextModal={openTextModal} deleteTopic={deleteOcmTopic} deleteItem={deleteOcmItem} addItem={addOcmItem} updateTopic={updateOcmTopic} updateItem={updateOcmItem} />
                               ))}
                            </div>
                             <button onClick={() => openTextModal({ title: "Add New Topic Column", onSave: (title: string) => addOcmTopic(step.id, title) })} className="w-full mt-4 p-2.5 text-sm text-sky-400 hover:bg-sky-500/10 flex items-center justify-center rounded-lg border-2 border-dashed border-slate-700 hover:border-sky-500 transition-colors">
                                <PlusIcon className="w-4 h-4 mr-2" /> Add Topic Column
                            </button>
                        </div>
                        <div className="flex-shrink-0 lg:w-1/3 xl:w-1/4">
                            <div className="bg-slate-800/70 p-4 rounded-lg">
                                {step.sidebarTitle && <h3 className="text-lg font-bold mb-4 text-slate-100 px-2">{step.sidebarTitle}</h3>}
                                <div className="space-y-2">
                                    {step.sidebarLinks.map(link => (
                                        <div key={link.id} className="flex items-center p-3 rounded-md bg-slate-900/40 group hover:bg-slate-700/50 transition-colors">
                                            <GlobeIcon className="w-5 h-5 mr-3 text-sky-400 flex-shrink-0" />
                                            <span className="text-sm font-medium flex-grow text-slate-200">{link.text}</span>
                                            <EditDeleteButtons
                                                onEdit={() => openTextModal({ title: "Edit Link", initialValue: link.text, onSave: (newText: string) => (updateOcmSidebarLink(step.id, link.id, newText)) })}
                                                onDelete={() => window.confirm(`Delete link "${link.text}"?`) && deleteOcmSidebarLink(step.id, link.id)}
                                            />
                                        </div>
                                    ))}
                                    <button onClick={() => openTextModal({ title: "Add New Link", onSave: (text: string) => addOcmSidebarLink(step.id, text) })} className="w-full mt-2 p-2.5 text-sm text-sky-400 hover:bg-sky-500/10 flex items-center justify-center rounded-lg border-2 border-dashed border-slate-700 hover:border-sky-500 transition-colors">
                                        <PlusIcon className="w-4 h-4 mr-2" /> Add Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const OCMWorkbenchSetupPage: React.FC = () => {
    const { ocmSetupData, addOcmStep } = useContext(DataContext);
    const [openStep, setOpenStep] = useState<string>(ocmSetupData[0]?.id || '');
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [textModalConfig, setTextModalConfig] = useState<{ title: string; initialValue?: string; onSave: (value: string) => void; label?: string } | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalConfig, setEditModalConfig] = useState<any>(null);

    const handleToggleStep = (stepId: string) => {
        setOpenStep(prev => (prev === stepId ? '' : stepId));
    };

    const openTextModal = (config: any) => {
        setTextModalConfig(config);
        setIsTextModalOpen(true);
    };
    
    const openEditModal = (config: any) => {
        setEditModalConfig(config);
        setIsEditModalOpen(true);
    };

    return (
        <>
            <div className="min-h-screen text-slate-200 p-4 sm:p-8 animate-fade-in">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl font-bold text-sky-400 tracking-tight">OCM Workbench Setup</h1>
                        <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">A step-by-step guide to configuring the OCM environment.</p>
                    </div>
                    {ocmSetupData.length > 0 ? (
                        ocmSetupData.map(step => (
                            <SetupStep
                                key={step.id}
                                step={step}
                                isOpen={openStep === step.id}
                                onToggle={() => handleToggleStep(step.id)}
                                openTextModal={openTextModal}
                                openEditModal={openEditModal}
                            />
                        ))
                    ) : (
                         <div className="text-center py-16 px-6 bg-slate-800 rounded-lg">
                           <h3 className="text-2xl font-semibold text-slate-300">No setup steps defined.</h3>
                           <p className="text-slate-400 mt-2">Get started by adding the first step below.</p>
                        </div>
                    )}
                    <div className="flex justify-center mt-8">
                        <button onClick={() => openTextModal({ title: "Add New Step", label: "Step Title", onSave: (title) => addOcmStep(title) })} className="flex items-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 px-6 rounded-md transition-colors duration-200 shadow-lg hover:shadow-sky-500/30">
                            <PlusIcon className="w-5 h-5 mr-2" /> Add New Step
                        </button>
                    </div>
                </div>
            </div>
            
            {isTextModalOpen && textModalConfig && (
                <TextInputModal 
                    isOpen={isTextModalOpen}
                    onClose={() => setIsTextModalOpen(false)}
                    {...textModalConfig}
                />
            )}

            {isEditModalOpen && editModalConfig && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    item={editModalConfig.item}
                    onSave={editModalConfig.onSave}
                    title={editModalConfig.title}
                />
            )}
        </>
    );
};

export default OCMWorkbenchSetupPage;