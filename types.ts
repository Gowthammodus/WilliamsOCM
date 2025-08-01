

export interface HomeModule {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path?: string;
}

export interface WorkbenchItem {
  id:string;
  title: string;
  imageUrl: string;
  description?: string;
}

export interface WorkbenchGroup {
  groupId: string;
  groupTitle: string;
  items: WorkbenchItem[];
}

export interface IconProps {
  className?: string;
}

// --- Detailed Project Data Types for Workbench Modal ---

export interface KeyUpdateItem {
  id: number;
  portfolio: string;
  pillar: string;
  programme: string;
  project: string;
  previousRag: string;
  currentRag: string;
  commentary: string;
  owner: string;
}

export interface RAGEntry {
  period: string;
  overall: 'Green' | 'Amber' | 'Red';
  scope: 'Green' | 'Amber' | 'Red';
  schedule: 'Green' | 'Amber' | 'Red';
  budget: 'Green' | 'Amber' | 'Red';
  resources: 'Green' | 'Amber' | 'Red';
  risks: 'Green' | 'Amber' | 'Red';
  issues: 'Green' | 'Amber' | 'Red';
}

export interface QuickLink {
  name: string;
  url: string;
}

export interface Announcement {
  title: string;
  date: string;
  content: string;
}

export interface AssetLink {
  id: string;
  name: string;
  url?: string;
}

export interface AssetCategory {
  id: string;
  title: string;
  links: AssetLink[];
}

export interface ProjectDocument {
  name: string;
  type: string;
  version: string;
  lastModified: string;
  modifiedBy: string;
  url: string;
}

export interface ProjectRisk {
  id: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low';
  owner: string;
  mitigationPlan: string;
  status: 'Open' | 'Mitigated' | 'Closed';
}

export interface ProjectIssue {
  id: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  reported: string;
  due: string;
  status: 'Resolved' | 'In Progress' | 'New';
}

export interface ProjectAction {
  id: string;
  description: string;
  owner: string;
  dueDate: string;
  status: 'Open' | 'Completed' | 'Overdue';
}

export interface ProjectDependency {
  id: string;
  description: string;
  dependencyOn: string;
  impactIfFails: 'High' | 'Medium' | 'Low';
  status: 'On Track' | 'At Risk' | 'Delayed';
}

export interface ProjectAssumption {
  id: string;
  description: string;
  owner: string;
  validatedDate: string;
  status: 'Valid' | 'Invalid' | 'Pending Validation';
}

export interface LessonLearned {
  title: string;
  date: string;
  category: string;
  description: string;
  impact: string;
  recommendation: string;
}

export interface StatusUpdate {
  date: string;
  status: 'Green' | 'Amber' | 'Red';
  accomplishments: string;
  plannedNextPeriod: string;
  blockers: string;
}

export interface BudgetCategory {
  category: string;
  budgeted: number;
  spent: number;
}

export interface BudgetData {
  totalBudget: number;
  actualSpend: number;
  breakdown: BudgetCategory[];
}

export interface ProjectResource {
  role: string;
  assignedTo: string;
  allocation: number;
  startDate: string;
  endDate: string;
  notes: string;
}

export interface ProjectDetailsData {
  id: string;
  name: string;
  projectManager: string;
  description: string;
  businessOwner: string;
  startDate: string;
  finishDate: string;
  stage: string;
  percentComplete: number;
  overallHealth: 'Green' | 'Amber' | 'Red';
  ragHistory: RAGEntry[];
  quickLinks: QuickLink[];
  announcements: Announcement[];
  projectAssets: AssetCategory[];
  documents: ProjectDocument[];
  risks: ProjectRisk[];
  issues: ProjectIssue[];
  actions: ProjectAction[];
  dependencies: ProjectDependency[];
  assumptions: ProjectAssumption[];
  lessonsLearned: LessonLearned[];
  statusUpdates: StatusUpdate[];
  budget: BudgetData;
  resources: ProjectResource[];
  keyUpdates?: { [assetLinkId: string]: KeyUpdateItem[] };
  assetDocuments?: { [assetLinkId: string]: ProjectDocument[] };
}

export type WorkbenchModalTabName = 'Home' | 'Change Assets' | 'Reports' | 'Documents';

export interface DataContextType {
  homeModules: HomeModule[];
  updateHomeModule: (module: HomeModule) => void;
  addHomeModule: (moduleData: Omit<HomeModule, 'id' | 'path'>) => void;
  deleteHomeModule: (moduleId: string) => void;
  workbenchData: WorkbenchGroup[];
  projectDataMap: { [key: string]: ProjectDetailsData };
  addWorkbenchGroup: (groupTitle: string) => void;
  updateWorkbenchGroup: (groupId: string, newTitle: string) => void;
  deleteWorkbenchGroup: (groupId: string) => void;
  addWorkbenchItem: (groupId: string, itemData: { title: string; description: string; imageUrl: string; }) => void;
  updateWorkbenchItem: (groupId: string, updatedItem: WorkbenchItem) => void;
  deleteWorkbenchItem: (groupId: string, itemId: string) => void;
  ocmSetupData: OCMSetupStep[];
  addOcmStep: (title: string) => void;
  updateOcmStep: (stepId: string, newTitle: string) => void;
  deleteOcmStep: (stepId: string) => void;
  addOcmTopic: (stepId: string, title: string) => void;
  updateOcmTopic: (stepId: string, topicId: string, newTitle: string) => void;
  deleteOcmTopic: (stepId: string, topicId: string) => void;
  addOcmItem: (stepId: string, topicId: string, text: string) => void;
  updateOcmItem: (stepId: string, topicId: string, itemId: string, newText: string) => void;
  deleteOcmItem: (stepId: string, topicId: string, itemId: string) => void;
  addOcmSidebarLink: (stepId: string, text: string) => void;
  updateOcmSidebarLink: (stepId: string, linkId: string, newText: string) => void;
  deleteOcmSidebarLink: (stepId: string, linkId: string) => void;
  updateOcmImageCard: (stepId: string, cardData: OCMSetupImageCard) => void;

  // Project Detail CRUD
  updateProjectDetails: (projectId: string, data: Partial<Pick<ProjectDetailsData, 'projectManager' | 'businessOwner' | 'startDate' | 'finishDate' | 'stage' | 'percentComplete' | 'overallHealth'>>) => void;
  addRagEntry: (projectId: string, entry: Omit<RAGEntry, 'period'>) => void;

  addAnnouncement: (projectId: string, data: { title: string, content: string }) => void;
  updateAnnouncement: (projectId: string, data: Announcement) => void;
  deleteAnnouncement: (projectId: string, date: string) => void;

  addQuickLink: (projectId: string, data: { name: string, url: string }) => void;
  updateQuickLink: (projectId: string, data: QuickLink) => void;
  deleteQuickLink: (projectId: string, name: string) => void;

  addDocument: (projectId: string, data: Omit<ProjectDocument, 'version' | 'lastModified' | 'modifiedBy'>) => void;
  updateDocument: (projectId: string, data: ProjectDocument) => void;
  deleteDocument: (projectId: string, name: string) => void;

  addRisk: (projectId: string, data: Omit<ProjectRisk, 'id'>) => void;
  updateRisk: (projectId: string, data: ProjectRisk) => void;
  deleteRisk: (projectId: string, riskId: string) => void;

  addIssue: (projectId: string, data: Omit<ProjectIssue, 'id'>) => void;
  updateIssue: (projectId: string, data: ProjectIssue) => void;
  deleteIssue: (projectId: string, issueId: string) => void;

  addAction: (projectId: string, data: Omit<ProjectAction, 'id'>) => void;
  updateAction: (projectId: string, data: ProjectAction) => void;
  deleteAction: (projectId: string, actionId: string) => void;

  addDependency: (projectId: string, data: Omit<ProjectDependency, 'id'>) => void;
  updateDependency: (projectId: string, data: ProjectDependency) => void;
  deleteDependency: (projectId: string, dependencyId: string) => void;
  
  addAssumption: (projectId: string, data: Omit<ProjectAssumption, 'id'>) => void;
  updateAssumption: (projectId: string, data: ProjectAssumption) => void;
  deleteAssumption: (projectId: string, assumptionId: string) => void;

  addLesson: (projectId: string, data: Omit<LessonLearned, 'date'>) => void;
  updateLesson: (projectId: string, data: LessonLearned) => void;
  deleteLesson: (projectId: string, title: string) => void;

  addStatusUpdate: (projectId: string, data: Omit<StatusUpdate, 'date'>) => void;
  updateStatusUpdate: (projectId: string, data: StatusUpdate) => void;
  deleteStatusUpdate: (projectId: string, date: string) => void;

  updateBudget: (projectId: string, data: Partial<BudgetData>) => void;
  addBudgetCategory: (projectId: string, data: BudgetCategory) => void;
  updateBudgetCategory: (projectId: string, data: BudgetCategory) => void;
  deleteBudgetCategory: (projectId: string, categoryName: string) => void;

  addResource: (projectId: string, data: ProjectResource) => void;
  updateResource: (projectId: string, data: ProjectResource) => void;
  deleteResource: (projectId: string, role: string) => void;

  addAssetCategory: (projectId: string, title: string) => void;
  updateAssetCategory: (projectId: string, categoryId: string, newTitle: string) => void;
  deleteAssetCategory: (projectId: string, categoryId: string) => void;
  addAssetLink: (projectId: string, categoryId: string, link: Omit<AssetLink, 'id'>) => void;
  updateAssetLink: (projectId: string, categoryId: string, updatedLink: AssetLink) => void;
  deleteAssetLink: (projectId: string, categoryId: string, linkId: string) => void;

  addAssetDocument: (projectId: string, assetId: string, data: Omit<ProjectDocument, 'version' | 'lastModified' | 'modifiedBy'>) => void;
  updateAssetDocument: (projectId: string, assetId: string, data: ProjectDocument) => void;
  deleteAssetDocument: (projectId: string, assetId: string, docName: string) => void;
}

// --- OCM Workbench Setup Page Types ---
export interface OCMSetupItem {
  id: string;
  text: string;
}

export interface OCMSetupTopicGroup {
  id: string;
  title: string;
  items: OCMSetupItem[];
}

export interface OCMSetupSidebarLink {
  id: string;
  text: string;
}

export interface OCMSetupImageCard {
    title: string;
    buttonText: string;
    imageUrl: string;
}

export interface OCMSetupStep {
  id: string;
  title: string;
  imageCard?: OCMSetupImageCard;
  topics: OCMSetupTopicGroup[];
  sidebarTitle?: string;
  sidebarLinks: OCMSetupSidebarLink[];
}
