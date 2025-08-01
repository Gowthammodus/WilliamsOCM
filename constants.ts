

import { HomeModule, WorkbenchGroup, OCMSetupStep } from './types';

export const APP_TITLE = "Williams Racing";

export enum RoutePath {
  HOME = "/home",
  OCM_PORTFOLIO_PROJECT_WORKBENCH = "/aero-project-workbench",
  OCM_PROJECT_ASSETS = "/project-assets",
  OCM_CONFIG = "/simulation-data-analysis",
  OCM_ENGAGEMENT = "/race-strategy-hub",
  OCM_ADMIN = "/admin-config",
  OCM_REPORTING = "/ocm-reporting",
  PROJECT_DETAIL = "/project/:projectId",
  SETTINGS = "/settings",
}

export const HOME_MODULES: HomeModule[] = [
  { 
    id: "portfolio", 
    title: "OCM Portfolio and Change Workbench", 
    path: RoutePath.OCM_PORTFOLIO_PROJECT_WORKBENCH, 
    imageUrl: "https://cdn.sanity.io/images/fnx611yr/production/3ea25e10f56a8298477037ae8ec10e5724a855bd-4088x2299.jpg", 
    description: "Access OCM portfolios and change workbenches" 
  },
  { 
    id: "config", 
    title: "OCM Change Engagement Hub", 
    imageUrl: "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3cd44847-8a0c-4beb-9551-2c85adb9f51b.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1", 
    description: "Engage with stakeholders and manage communications" 
  },
  { 
    id: "engagement", 
    title: "OCM Workbench Setup", 
    path: RoutePath.OCM_ENGAGEMENT, 
    imageUrl: "https://cdn.williamsf1.tech/images/fnx611yr/production/4bb8769a24f51e506f1dbc3e9e85995a66dcd0c0-7794x4384.jpg?rect=975,0,5845,4384&w=1200&h=900&auto=format", 
    description: "Configure and set up OCM workbenches" 
  },
  { 
    id: "admin", 
    title: "System Admin & Config", 
    imageUrl: "https://static01.nyt.com/images/2022/07/02/multimedia/02sp-british-williams-inyt1/02sp-british-williams-inyt1-superJumbo.jpg", 
    description: "Manage system configurations" 
  },
  { 
    id: "scoping",
    title: "OCM Reporting",
    path: RoutePath.OCM_REPORTING,
    imageUrl: "https://cdn.sanity.io/images/fnx611yr/production/98267711b0bb7df487a226a1059ea8f23878b590-3840x2160.png",
    description: "View OCM reports and dashboards" 
  },
];

export const OCM_WORKBENCH_INTRODUCTION_TITLE = "Engineering Workbench Introduction";
export const OCM_WORKBENCH_INTRODUCTION_TEXT = "Welcome to the Williams Racing Engineering Project Workbench. This space provides a comprehensive overview of all vehicle development programs. Here, you can explore various sub-projects, track aerodynamic and mechanical updates, and access critical performance data. Our goal is to ensure rapid, seamless, and effective car development cycles. Navigate through the different development streams to find specific project information.";

export const MOCK_WORKBENCH_DATA: WorkbenchGroup[] = [
  {
    groupId: 'wg1',
    groupTitle: "Skills and Capability Management",
    items: [
      { id: "wb1", title: "OCM Workbench 1 - Driver Development Academy", imageUrl: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/manual/Misc/Williams_Academy/Williams_Academy_1.webp", description: "A focused program to cultivate top-tier driver capabilities through structured learning and on-track mentoring." },
      { id: "wb2", title: "OCM Workbench 2 - Pit Crew Performance Hiring Crew", imageUrl: "https://preview.redd.it/interesting-pit-crew-clothes-from-the-williams-team-v0-765ejf5z57ia1.jpg?width=640&crop=smart&auto=webp&s=18ae87da70736ab2019f079099ce71f7db2fdd4b", description: "Precision hiring and performance optimization strategy for building a high-speed, high-efficiency pit crew." },
      { id: "wb3", title: "OCM Workbench 3 - Brake Duct Revision", imageUrl: "https://c8.alamy.com/comp/2JT209B/august-27-2022-pit-crew-ready-the-williams-pit-equipment-before-the-third-practice-session-of-f1-rolex-grand-prix-of-belgium-at-circuit-de-spa-francorchamps-in-francorchamps-belgium-justin-coopercsm-2JT209B.jpg", description: "Aerodynamic and thermal optimization initiative targeting brake duct redesign for performance and compliance." },
    ],
  },
  {
    groupId: 'wg2',
    groupTitle: "Workplace Engagement and Wellbeing",
    items: [
      { id: "wb4", title: "OCM Workbench 4 - Drivers Seat Day", imageUrl: "https://www.the-race.com/content/images/2024/04/XPB_1268108_HiRes.jpg", description: "Immersive alignment sessions enabling drivers to shape cockpit ergonomics and communication systems." },
      { id: "wb5", title: "OCM Workbench 5 - High Speed Feedback Loops", imageUrl: "https://petrolicious.com/cdn/shop/articles/Williams-FW19-05.-Heinz-Harald-Frentzen-3.jpg?v=1742072224", description: "Real-time data-to-action feedback systems accelerating decision-making across race operations." },
    ],
  },
   {
    groupId: 'wg3',
    groupTitle: "Powertrain & Systems",
    items: [
      { id: "wb6", title: "OCM Workbench 6 - ERS-K Heat Management", imageUrl: "https://cdn-3.motorsport.com/images/amp/2QzAOyOY/s1000/alexander-albon-williams.jpg", description: "Engineering solution to improve thermal efficiency and reliability of the ERS-K energy recovery unit." },
      { id: "wb7", title: "OCM Workbench 7 - FW48 - Power Unit Integration", imageUrl: "https://www.theengineer.co.uk/media/vi1ajxku/williams-1.jpg", description: "End-to-end coordination for seamless integration of the FW48 chassis with next-gen power unit architecture." },
      { id: "wb8", title: "OCM Workbench 8 - Simulator Correlation Project", imageUrl: "https://cdn.williamsf1.tech/images/fnx611yr/production/a660355bda967afaa840828bb7958393ae2920a7-2764x1538.png?rect=0,0,2734,1538&w=720&h=405&auto=format", description: "Bridging track and sim by refining data fidelity and performance accuracy in virtual environments." },
    ],
  },
];

export const OCM_REPORTS = [
  {
    title: "Change Readiness Survey Report",
    description: "Measure the organization's readiness for upcoming changes.",
    url: "https://app.powerbi.com/view?r=eyJrIjoiYzJhODBhMDAtMTcxMy00YTAwLWIyOTItNmY0M2MzYTY5YzhlIiwidCI6IjFiZTNhNTYzLTcyMDctNDg3YS1hMWJmLTRjNjllM2U0OTMwZSJ9"
  },
  {
    title: "Change Adoption Survey Report",
    description: "Track adoption rates and user satisfaction post-implementation.",
    url: "https://app.powerbi.com/view?r=eyJrIjoiNjQ5YTU5NmUtYzIzYy00MGY2LTk4OTctNGE2NDFlNGJjNzM0IiwidCI6IjFiZTNhNTYzLTcyMDctNDg3YS1hMWJmLTRjNjllM2U0OTMwZSJ9"
  },
  {
    title: "Change Impact Analysis - Operational",
    description: "Analyze the impact of change on operational value chains."
  },
  {
    title: "Change Impact Analysis - HR",
    description: "Analyze the impact of change on HR value chains and roles."
  }
];

export const OCM_SETUP_DATA: OCMSetupStep[] = [
  {
    id: 'step1',
    title: 'Step 1 - OCM - Master Data Setup',
    topics: [
      { id: 't1_1', title: '01. Manage Hierarchy', items: [{ id: 'i1_1_1', text: '01.01 Setup 5 level Product Hierarchy' }] },
      { id: 't1_2', title: '02. Manage Org Hierarchy', items: [{ id: 'i1_2_1', text: '02.01 Setup 3 level Org Hierarchy' }, { id: 'i1_2_2', text: '02.02 Map Product Hierarchy to Org Hierarchy' }] },
      { id: 't1_3', title: '03. Manage User', items: [{ id: 'i1_3_1', text: '03.01. Setup User' }, { id: 'i1_3_2', text: '03.02 Map User to Role' }] },
      { id: 't1_4', title: '04. Manage Module Grouping', items: [{ id: 'i1_4_1', text: '04.01 Create Module Grouping' }] },
      { id: 't1_5', title: '05. Manage Sub-Module Set up', items: [{ id: 'i1_5_1', text: '05.01 Create Sub Module' }, { id: 'i1_5_2', text: '05.02 Map Group' }, { id: 'i1_5_3', text: '05.03 Provide Access to Role' }] },
    ],
    sidebarLinks: [
      { id: 'sl1_1', text: 'Modus Admin Home' },
      { id: 'sl1_2', text: '01. Manage Hierarchy' },
      { id: 'sl1_3', text: '02. Manage Org Hierarchy' },
      { id: 'sl1_4', text: '03. Manage User' },
      { id: 'sl1_5', text: '04. Manage Module Grouping' },
      { id: 'sl1_6', text: '05. Manage Sub-Module Set up' },
    ],
  },
  {
    id: 'step2',
    title: 'Step 2 - OCM Methodology',
    topics: [
      { id: 't2_1', title: '01. Methodology Value Chain', items: [{ id: 'i2_1_1', text: '01.01 Setup Header Level' }, { id: 'i2_1_2', text: '01.02 Setup Level Zero' }, { id: 'i2_1_3', text: '01.03 Setup Level One' }] },
      { id: 't2_2', title: '02. OCM Template Management', items: [{ id: 'i2_2_1', text: '02.01 Setup Asset Header' }, { id: 'i2_2_2', text: '02.02 Setup Assets' }, { id: 'i2_2_3', text: '02.03 Setup Instruction' }, { id: 'i2_2_4', text: '02.04 Setup Asset List' }, { id: 'i2_2_5', text: '02.05 Setup Asset Document' }, { id: 'i2_2_6', text: '02.06 Setup Report' }] },
    ],
    sidebarLinks: [
      { id: 'sl2_1', text: 'OCM - Methodology Value Chain' },
      { id: 'sl2_2', text: 'OCM - Template Management' },
    ],
  },
  {
    id: 'step3',
    title: 'Step 3 - Value Chain Setup',
    sidebarTitle: 'Modus Admin Set up',
    topics: [
      { id: 't3_1', title: '01. HR Value Chain', items: [{ id: 'i3_1_1', text: '01.01 Set up Header Level' }, { id: 'i3_1_2', text: '01.02 Setup Level Zero' }, { id: 'i3_1_3', text: '01.03 Setup Level One' }, { id: 'i3_1_4', text: '01.04 Setup Level Two' }, { id: 'i3_1_5', text: '01.05 Setup Level Three' }, { id: 'i3_1_6', text: '01.06 Setup Level Four' }, { id: 'i3_1_7', text: '01.07 Setup Operating Model Component' }] },
      { id: 't3_2', title: '02. Operational Value Chain', items: [{ id: 'i3_2_1', text: '02.01 Set up Header Level' }, { id: 'i3_2_2', text: '02.02 Setup Level Zero' }, { id: 'i3_2_3', text: '02.03 Setup Level One' }, { id: 'i3_2_4', text: '02.04 Setup Level Two' }, { id: 'i3_2_5', text: '02.05 Setup Level Three' }, { id: 'i3_2_6', text: '02.06 Setup Level Four' }, { id: 'i3_2_7', text: '02.07 Setup Operating Model Component' }] },
    ],
    sidebarLinks: [
      { id: 'sl3_1', text: 'HR Value Chain' },
      { id: 'sl3_2', text: 'Operational Value Chain' },
    ],
  },
  {
    id: 'step4',
    title: 'Step 4 - OCM Workbench Setup',
    imageCard: {
        title: 'OCM Project Set up',
        buttonText: 'Click to Open',
        imageUrl: 'https://picsum.photos/seed/f1blueprint/1200/400'
    },
    topics: [
      { id: 't4_1', title: '01. Pillar Setup', items: [{ id: 'i4_1_1', text: '01.01 Setup Pillar' }] },
      { id: 't4_2', title: '02. Programme Setup', items: [{ id: 'i4_2_1', text: '02.01 Setup Programme' }] },
      { id: 't4_3', title: '03. Workbench Setup', items: [{ id: 'i4_3_1', text: '03.01 Setup Workbench' }] },
      { id: 't4_4', title: '04. Workbench', items: [{ id: 'i4_4_1', text: '04.01 Add content in the Assets' }, { id: 'i4_4_2', text: '04.02 Setup Reports' }] },
    ],
    sidebarLinks: [
      { id: 'sl4_1', text: 'Modus Admin Home' },
      { id: 'sl4_2', text: 'Portfolio Admin Dashboard' },
      { id: 'sl4_3', text: '01. Pillar Setup' },
      { id: 'sl4_4', text: '02. Programme Setup' },
      { id: 'sl4_5', text: '03. Workbench Setup' },
      { id: 'sl4_6', text: '04. Workbench' },
    ],
  },
];