import React, { createContext, useState, ReactNode } from 'react';
import { HomeModule, DataContextType, OCMSetupStep, OCMSetupImageCard, WorkbenchGroup, WorkbenchItem, ProjectDetailsData, RAGEntry, Announcement, QuickLink, ProjectDocument, ProjectRisk, ProjectIssue, ProjectAction, ProjectDependency, LessonLearned, StatusUpdate, BudgetData, BudgetCategory, ProjectResource, AssetCategory, AssetLink, ProjectAssumption } from '../types';
import { HOME_MODULES, OCM_SETUP_DATA, MOCK_WORKBENCH_DATA } from '../constants';
import { PROJECT_DATA_MAP, BASE_PROJECT_DETAILS } from '../data/projectData';

export const DataContext = createContext<DataContextType>({
  homeModules: [],
  updateHomeModule: () => {},
  addHomeModule: () => {},
  deleteHomeModule: () => {},
  workbenchData: [],
  projectDataMap: {},
  addWorkbenchGroup: () => {},
  updateWorkbenchGroup: () => {},
  deleteWorkbenchGroup: () => {},
  addWorkbenchItem: () => {},
  updateWorkbenchItem: () => {},
  deleteWorkbenchItem: () => {},
  ocmSetupData: [],
  addOcmStep: () => {},
  updateOcmStep: () => {},
  deleteOcmStep: () => {},
  addOcmTopic: () => {},
  updateOcmTopic: () => {},
  deleteOcmTopic: () => {},
  addOcmItem: () => {},
  updateOcmItem: () => {},
  deleteOcmItem: () => {},
  addOcmSidebarLink: () => {},
  updateOcmSidebarLink: () => {},
  deleteOcmSidebarLink: () => {},
  updateOcmImageCard: () => {},
  // Project Detail CRUD
  updateProjectDetails: () => {},
  addRagEntry: () => {},
  addAnnouncement: () => {},
  updateAnnouncement: () => {},
  deleteAnnouncement: () => {},
  addQuickLink: () => {},
  updateQuickLink: () => {},
  deleteQuickLink: () => {},
  addDocument: () => {},
  updateDocument: () => {},
  deleteDocument: () => {},
  addRisk: () => {},
  updateRisk: () => {},
  deleteRisk: () => {},
  addIssue: () => {},
  updateIssue: () => {},
  deleteIssue: () => {},
  addAction: () => {},
  updateAction: () => {},
  deleteAction: () => {},
  addDependency: () => {},
  updateDependency: () => {},
  deleteDependency: () => {},
  addAssumption: () => {},
  updateAssumption: () => {},
  deleteAssumption: () => {},
  addLesson: () => {},
  updateLesson: () => {},
  deleteLesson: () => {},
  addStatusUpdate: () => {},
  updateStatusUpdate: () => {},
  deleteStatusUpdate: () => {},
  updateBudget: () => {},
  addBudgetCategory: () => {},
  updateBudgetCategory: () => {},
  deleteBudgetCategory: () => {},
  addResource: () => {},
  updateResource: () => {},
  deleteResource: () => {},
  addAssetCategory: () => {},
  updateAssetCategory: () => {},
  deleteAssetCategory: () => {},
  addAssetLink: () => {},
  updateAssetLink: () => {},
  deleteAssetLink: () => {},
  addAssetDocument: () => {},
  updateAssetDocument: () => {},
  deleteAssetDocument: () => {},
});

// Helper to get current date string
const getCurrentDate = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [homeModules, setHomeModules] = useState<HomeModule[]>(HOME_MODULES);
  const [workbenchData, setWorkbenchData] = useState<WorkbenchGroup[]>(MOCK_WORKBENCH_DATA);
  const [projectDataMap, setProjectDataMap] = useState<{ [key: string]: ProjectDetailsData }>(PROJECT_DATA_MAP);
  const [ocmSetupData, setOcmSetupData] = useState<OCMSetupStep[]>(OCM_SETUP_DATA);

  const updateProjectData = (projectId: string, updater: (project: ProjectDetailsData) => ProjectDetailsData) => {
    setProjectDataMap(prev => {
      const project = prev[projectId];
      if (!project) return prev;
      return { ...prev, [projectId]: updater(project) };
    });
  };

  // --- Home Module CRUD ---
  const addHomeModule = (moduleData: Omit<HomeModule, 'id' | 'path'>) => {
    const newId = `hm-${Date.now()}`;
    const newModule: HomeModule = {
      ...moduleData,
      id: newId,
      path: `/module/${newId}`, // Generic path for new modules
    };
    setHomeModules(prev => [...prev, newModule]);
  };

  const updateHomeModule = (updatedModule: HomeModule) => {
    setHomeModules(prev => prev.map(m => m.id === updatedModule.id ? updatedModule : m));
  };

  const deleteHomeModule = (moduleId: string) => {
    setHomeModules(prev => prev.filter(m => m.id !== moduleId));
  };
  
  // --- Workbench CRUD ---
  const addWorkbenchGroup = (groupTitle: string) => {
    const newGroup: WorkbenchGroup = {
      groupId: `wg-${Date.now()}`,
      groupTitle,
      items: [],
    };
    setWorkbenchData(prev => [...prev, newGroup]);
  };

  const updateWorkbenchGroup = (groupId: string, newTitle: string) => {
    setWorkbenchData(prev => prev.map(g => (g.groupId === groupId ? { ...g, groupTitle: newTitle } : g)));
  };

  const deleteWorkbenchGroup = (groupId: string) => {
    setWorkbenchData(prev => prev.filter(g => g.groupId !== groupId));
    // Note: This could orphan project data. For this implementation, we assume items are moved first.
  };

  const addWorkbenchItem = (groupId: string, itemData: { title: string; description: string; imageUrl: string; }) => {
    const newItemId = `wb-${Date.now()}`;
    const newItem: WorkbenchItem = {
      id: newItemId,
      ...itemData,
    };
    
    setWorkbenchData(prev => prev.map(g => {
      if (g.groupId === groupId) {
        return { ...g, items: [...g.items, newItem] };
      }
      return g;
    }));

    const newProjectDetails: ProjectDetailsData = {
      ...BASE_PROJECT_DETAILS,
      id: newItemId,
      name: itemData.title,
      description: itemData.description,
    };
    setProjectDataMap(prev => ({ ...prev, [newItemId]: newProjectDetails }));
  };

  const updateWorkbenchItem = (groupId: string, updatedItem: WorkbenchItem) => {
    setWorkbenchData(prev => prev.map(g => {
      if (g.groupId === groupId) {
        return { ...g, items: g.items.map(i => i.id === updatedItem.id ? updatedItem : i) };
      }
      return g;
    }));

    setProjectDataMap(prev => {
        if(prev[updatedItem.id]) {
            return {
                ...prev,
                [updatedItem.id]: {
                    ...prev[updatedItem.id],
                    name: updatedItem.title,
                    description: updatedItem.description || '',
                }
            }
        }
        return prev;
    });
  };

  const deleteWorkbenchItem = (groupId: string, itemId: string) => {
    setWorkbenchData(prev => prev.map(g => {
      if (g.groupId === groupId) {
        return { ...g, items: g.items.filter(i => i.id !== itemId) };
      }
      return g;
    }));
    
    setProjectDataMap(prev => {
        const newMap = {...prev};
        delete newMap[itemId];
        return newMap;
    })
  };


  // --- OCM Setup CRUD ---
  const addOcmStep = (title: string) => {
    const newStep: OCMSetupStep = {
      id: `step-${Date.now()}`,
      title,
      topics: [],
      sidebarLinks: [],
    };
    setOcmSetupData(prev => [...prev, newStep]);
  };
  
  const updateOcmStep = (stepId: string, newTitle: string) => {
    setOcmSetupData(prev => prev.map(s => s.id === stepId ? { ...s, title: newTitle } : s));
  };
  
  const deleteOcmStep = (stepId: string) => {
    setOcmSetupData(prev => prev.filter(s => s.id !== stepId));
  };

  const addOcmTopic = (stepId: string, title: string) => {
    setOcmSetupData(prev => prev.map(s => {
      if (s.id === stepId) {
        const newTopic = { id: `topic-${Date.now()}`, title, items: [] };
        return { ...s, topics: [...s.topics, newTopic] };
      }
      return s;
    }));
  };

  const updateOcmTopic = (stepId: string, topicId: string, newTitle: string) => {
    setOcmSetupData(prev => prev.map(s => {
      if (s.id === stepId) {
        const newTopics = s.topics.map(t => t.id === topicId ? { ...t, title: newTitle } : t);
        return { ...s, topics: newTopics };
      }
      return s;
    }));
  };

  const deleteOcmTopic = (stepId: string, topicId: string) => {
    setOcmSetupData(prev => prev.map(s => {
      if (s.id === stepId) {
        return { ...s, topics: s.topics.filter(t => t.id !== topicId) };
      }
      return s;
    }));
  };

  const addOcmItem = (stepId: string, topicId: string, text: string) => {
    setOcmSetupData(prev => prev.map(s => {
      if (s.id === stepId) {
        const newTopics = s.topics.map(t => {
          if (t.id === topicId) {
            const newItem = { id: `item-${Date.now()}`, text };
            return { ...t, items: [...t.items, newItem] };
          }
          return t;
        });
        return { ...s, topics: newTopics };
      }
      return s;
    }));
  };

  const updateOcmItem = (stepId: string, topicId: string, itemId: string, newText: string) => {
    setOcmSetupData(prev => prev.map(s => {
      if (s.id === stepId) {
        const newTopics = s.topics.map(t => {
          if (t.id === topicId) {
            const newItems = t.items.map(i => i.id === itemId ? { ...i, text: newText } : i);
            return { ...t, items: newItems };
          }
          return t;
        });
        return { ...s, topics: newTopics };
      }
      return s;
    }));
  };

  const deleteOcmItem = (stepId: string, topicId: string, itemId: string) => {
     setOcmSetupData(prev => prev.map(s => {
      if (s.id === stepId) {
        const newTopics = s.topics.map(t => {
          if (t.id === topicId) {
            return { ...t, items: t.items.filter(i => i.id !== itemId) };
          }
          return t;
        });
        return { ...s, topics: newTopics };
      }
      return s;
    }));
  };
  
  const addOcmSidebarLink = (stepId: string, text: string) => {
    setOcmSetupData(prev => prev.map(s => {
        if(s.id === stepId) {
            const newLink = { id: `link-${Date.now()}`, text };
            return {...s, sidebarLinks: [...s.sidebarLinks, newLink]}
        }
        return s;
    }));
  };

  const updateOcmSidebarLink = (stepId: string, linkId: string, newText: string) => {
     setOcmSetupData(prev => prev.map(s => {
        if(s.id === stepId) {
            const newLinks = s.sidebarLinks.map(l => l.id === linkId ? {...l, text: newText} : l);
            return {...s, sidebarLinks: newLinks};
        }
        return s;
    }));
  };

  const deleteOcmSidebarLink = (stepId: string, linkId: string) => {
      setOcmSetupData(prev => prev.map(s => {
        if(s.id === stepId) {
            return {...s, sidebarLinks: s.sidebarLinks.filter(l => l.id !== linkId)};
        }
        return s;
    }));
  };

  const updateOcmImageCard = (stepId: string, cardData: OCMSetupImageCard) => {
    setOcmSetupData(prev => prev.map(s => {
      if(s.id === stepId) {
          return {...s, imageCard: cardData};
      }
      return s;
    }));
  };

  // --- Project Detail CRUD ---
  const updateProjectDetails = (projectId: string, data: Partial<ProjectDetailsData>) => updateProjectData(projectId, p => ({ ...p, ...data }));
  const addRagEntry = (projectId: string, entry: Omit<RAGEntry, 'period'>) => updateProjectData(projectId, p => ({ ...p, ragHistory: [{ ...entry, period: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }, ...p.ragHistory] }));
  
  const addAnnouncement = (projectId: string, data: { title: string, content: string }) => updateProjectData(projectId, p => ({ ...p, announcements: [{ ...data, date: getCurrentDate() }, ...p.announcements] }));
  const updateAnnouncement = (projectId: string, data: Announcement) => updateProjectData(projectId, p => ({ ...p, announcements: p.announcements.map(a => a.date === data.date ? data : a) }));
  const deleteAnnouncement = (projectId: string, date: string) => updateProjectData(projectId, p => ({ ...p, announcements: p.announcements.filter(a => a.date !== date) }));

  const addQuickLink = (projectId: string, data: QuickLink) => updateProjectData(projectId, p => ({ ...p, quickLinks: [...p.quickLinks, data] }));
  const updateQuickLink = (projectId: string, data: QuickLink) => updateProjectData(projectId, p => ({ ...p, quickLinks: p.quickLinks.map(q => q.name === data.name ? data : q) }));
  const deleteQuickLink = (projectId: string, name: string) => updateProjectData(projectId, p => ({ ...p, quickLinks: p.quickLinks.filter(q => q.name !== name) }));

  const addDocument = (projectId: string, data: Omit<ProjectDocument, 'version' | 'lastModified' | 'modifiedBy'>) => updateProjectData(projectId, p => ({ ...p, documents: [...p.documents, { ...data, version: '1.0', lastModified: getCurrentDate(), modifiedBy: 'Current User' }] }));
  const updateDocument = (projectId: string, data: ProjectDocument) => updateProjectData(projectId, p => ({ ...p, documents: p.documents.map(d => d.name === data.name ? { ...data, lastModified: getCurrentDate(), modifiedBy: 'Current User' } : d) }));
  const deleteDocument = (projectId: string, name: string) => updateProjectData(projectId, p => ({ ...p, documents: p.documents.filter(d => d.name !== name) }));

  const addRisk = (projectId: string, data: Omit<ProjectRisk, 'id'>) => updateProjectData(projectId, p => ({ ...p, risks: [...p.risks, { ...data, id: `risk-${Date.now()}` }] }));
  const updateRisk = (projectId: string, data: ProjectRisk) => updateProjectData(projectId, p => ({ ...p, risks: p.risks.map(r => r.id === data.id ? data : r) }));
  const deleteRisk = (projectId: string, riskId: string) => updateProjectData(projectId, p => ({ ...p, risks: p.risks.filter(r => r.id !== riskId) }));

  const addIssue = (projectId: string, data: Omit<ProjectIssue, 'id'>) => updateProjectData(projectId, p => ({ ...p, issues: [{ ...data, id: `issue-${Date.now()}`, reported: getCurrentDate() }, ...p.issues] }));
  const updateIssue = (projectId: string, data: ProjectIssue) => updateProjectData(projectId, p => ({ ...p, issues: p.issues.map(i => i.id === data.id ? data : i) }));
  const deleteIssue = (projectId: string, issueId: string) => updateProjectData(projectId, p => ({ ...p, issues: p.issues.filter(i => i.id !== issueId) }));

  const addAction = (projectId: string, data: Omit<ProjectAction, 'id'>) => updateProjectData(projectId, p => ({ ...p, actions: [...p.actions, { ...data, id: `action-${Date.now()}` }] }));
  const updateAction = (projectId: string, data: ProjectAction) => updateProjectData(projectId, p => ({ ...p, actions: p.actions.map(a => a.id === data.id ? data : a) }));
  const deleteAction = (projectId: string, actionId: string) => updateProjectData(projectId, p => ({ ...p, actions: p.actions.filter(a => a.id !== actionId) }));

  const addDependency = (projectId: string, data: Omit<ProjectDependency, 'id'>) => updateProjectData(projectId, p => ({ ...p, dependencies: [...p.dependencies, { ...data, id: `dep-${Date.now()}` }] }));
  const updateDependency = (projectId: string, data: ProjectDependency) => updateProjectData(projectId, p => ({ ...p, dependencies: p.dependencies.map(d => d.id === data.id ? data : d) }));
  const deleteDependency = (projectId: string, dependencyId: string) => updateProjectData(projectId, p => ({ ...p, dependencies: p.dependencies.filter(d => d.id !== dependencyId) }));
  
  const addAssumption = (projectId: string, data: Omit<ProjectAssumption, 'id'>) => updateProjectData(projectId, p => ({ ...p, assumptions: [...p.assumptions, { ...data, id: `asm-${Date.now()}`, validatedDate: getCurrentDate() }] }));
  const updateAssumption = (projectId: string, data: ProjectAssumption) => updateProjectData(projectId, p => ({ ...p, assumptions: p.assumptions.map(a => a.id === data.id ? data : a) }));
  const deleteAssumption = (projectId: string, assumptionId: string) => updateProjectData(projectId, p => ({ ...p, assumptions: p.assumptions.filter(a => a.id !== assumptionId) }));

  const addLesson = (projectId: string, data: Omit<LessonLearned, 'date'>) => updateProjectData(projectId, p => ({ ...p, lessonsLearned: [{ ...data, date: getCurrentDate() }, ...p.lessonsLearned] }));
  const updateLesson = (projectId: string, data: LessonLearned) => updateProjectData(projectId, p => ({ ...p, lessonsLearned: p.lessonsLearned.map(l => l.date === data.date ? data : l) }));
  const deleteLesson = (projectId: string, title: string) => updateProjectData(projectId, p => ({ ...p, lessonsLearned: p.lessonsLearned.filter(l => l.title !== title) }));
  
  const addStatusUpdate = (projectId: string, data: Omit<StatusUpdate, 'date'>) => updateProjectData(projectId, p => ({...p, statusUpdates: [{...data, date: getCurrentDate()}, ...p.statusUpdates]}));
  const updateStatusUpdate = (projectId: string, data: StatusUpdate) => updateProjectData(projectId, p => ({...p, statusUpdates: p.statusUpdates.map(s => s.date === data.date ? data : s)}));
  const deleteStatusUpdate = (projectId: string, date: string) => updateProjectData(projectId, p => ({...p, statusUpdates: p.statusUpdates.filter(s => s.date !== date)}));

  const updateBudget = (projectId: string, data: Partial<BudgetData>) => updateProjectData(projectId, p => ({...p, budget: {...p.budget, ...data}}));
  const addBudgetCategory = (projectId: string, data: BudgetCategory) => updateProjectData(projectId, p => ({...p, budget: {...p.budget, breakdown: [...p.budget.breakdown, data]}}));
  const updateBudgetCategory = (projectId: string, data: BudgetCategory) => updateProjectData(projectId, p => ({...p, budget: {...p.budget, breakdown: p.budget.breakdown.map(b => b.category === data.category ? data : b)}}));
  const deleteBudgetCategory = (projectId: string, categoryName: string) => updateProjectData(projectId, p => ({...p, budget: {...p.budget, breakdown: p.budget.breakdown.filter(b => b.category !== categoryName)}}));
  
  const addResource = (projectId: string, data: ProjectResource) => updateProjectData(projectId, p => ({...p, resources: [...p.resources, data]}));
  const updateResource = (projectId: string, data: ProjectResource) => updateProjectData(projectId, p => ({...p, resources: p.resources.map(r => r.role === data.role ? data : r)}));
  const deleteResource = (projectId: string, role: string) => updateProjectData(projectId, p => ({...p, resources: p.resources.filter(r => r.role !== role)}));
  
  const addAssetCategory = (projectId: string, title: string) => updateProjectData(projectId, p => ({...p, projectAssets: [...p.projectAssets, {id: `cat-${Date.now()}`, title, links: []}]}));
  const updateAssetCategory = (projectId: string, categoryId: string, newTitle: string) => updateProjectData(projectId, p => ({...p, projectAssets: p.projectAssets.map(c => c.id === categoryId ? {...c, title: newTitle} : c)}));
  const deleteAssetCategory = (projectId: string, categoryId: string) => updateProjectData(projectId, p => ({...p, projectAssets: p.projectAssets.filter(c => c.id !== categoryId)}));
  const addAssetLink = (projectId: string, categoryId: string, link: Omit<AssetLink, 'id'>) => updateProjectData(projectId, p => ({...p, projectAssets: p.projectAssets.map(c => c.id === categoryId ? {...c, links: [...c.links, {...link, id: `link-${Date.now()}`}]} : c)}));
  const updateAssetLink = (projectId: string, categoryId: string, updatedLink: AssetLink) => updateProjectData(projectId, p => ({...p, projectAssets: p.projectAssets.map(c => c.id === categoryId ? {...c, links: c.links.map(l => l.id === updatedLink.id ? updatedLink : l)} : c)}));
  const deleteAssetLink = (projectId: string, categoryId: string, linkId: string) => updateProjectData(projectId, p => ({...p, projectAssets: p.projectAssets.map(c => c.id === categoryId ? {...c, links: c.links.filter(l => l.id !== linkId)} : c)}));

  // --- Asset Document CRUD ---
  const addAssetDocument = (projectId: string, assetId: string, data: Omit<ProjectDocument, 'version' | 'lastModified' | 'modifiedBy'>) => {
    updateProjectData(projectId, p => {
      const assetDocs = p.assetDocuments?.[assetId] || [];
      const newDoc = { ...data, version: '1.0', lastModified: getCurrentDate(), modifiedBy: 'Current User' };
      return {
        ...p,
        assetDocuments: {
          ...p.assetDocuments,
          [assetId]: [...assetDocs, newDoc]
        }
      };
    });
  };

  const updateAssetDocument = (projectId: string, assetId: string, data: ProjectDocument) => {
    updateProjectData(projectId, p => {
      if (!p.assetDocuments || !p.assetDocuments[assetId]) return p;
      const assetDocs = p.assetDocuments[assetId];
      const updatedDocs = assetDocs.map(d => d.name === data.name ? { ...data, lastModified: getCurrentDate(), modifiedBy: 'Current User' } : d);
      return {
        ...p,
        assetDocuments: {
          ...p.assetDocuments,
          [assetId]: updatedDocs
        }
      };
    });
  };

  const deleteAssetDocument = (projectId: string, assetId: string, docName: string) => {
    updateProjectData(projectId, p => {
      if (!p.assetDocuments || !p.assetDocuments[assetId]) return p;
      const assetDocs = p.assetDocuments[assetId];
      const updatedDocs = assetDocs.filter(d => d.name !== docName);
      return {
        ...p,
        assetDocuments: {
          ...p.assetDocuments,
          [assetId]: updatedDocs
        }
      };
    });
  };


  return (
    <DataContext.Provider value={{
      homeModules,
      addHomeModule,
      updateHomeModule,
      deleteHomeModule,
      workbenchData,
      projectDataMap,
      addWorkbenchGroup,
      updateWorkbenchGroup,
      deleteWorkbenchGroup,
      addWorkbenchItem,
      updateWorkbenchItem,
      deleteWorkbenchItem,
      ocmSetupData,
      addOcmStep,
      updateOcmStep,
      deleteOcmStep,
      addOcmTopic,
      updateOcmTopic,
      deleteOcmTopic,
      addOcmItem,
      updateOcmItem,
      deleteOcmItem,
      addOcmSidebarLink,
      updateOcmSidebarLink,
      deleteOcmSidebarLink,
      updateOcmImageCard,
      updateProjectDetails,
      addRagEntry,
      addAnnouncement, updateAnnouncement, deleteAnnouncement,
      addQuickLink, updateQuickLink, deleteQuickLink,
      addDocument, updateDocument, deleteDocument,
      addRisk, updateRisk, deleteRisk,
      addIssue, updateIssue, deleteIssue,
      addAction, updateAction, deleteAction,
      addDependency, updateDependency, deleteDependency,
      addAssumption, updateAssumption, deleteAssumption,
      addLesson, updateLesson, deleteLesson,
      addStatusUpdate, updateStatusUpdate, deleteStatusUpdate,
      updateBudget, addBudgetCategory, updateBudgetCategory, deleteBudgetCategory,
      addResource, updateResource, deleteResource,
      addAssetCategory, updateAssetCategory, deleteAssetCategory,
      addAssetLink, updateAssetLink, deleteAssetLink,
      addAssetDocument, updateAssetDocument, deleteAssetDocument
    }}>
      {children}
    </DataContext.Provider>
  );
};