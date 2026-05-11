/* ========================================
   SORT v2 Gantt Chart — Project Data
   10-Week Development Plan
   ======================================== */

const PROJECT = {
    name: "SMART OPERATIONAL RECOVERY AND TRACKING",
    totalWeeks: 10,
    startDate: "2026-02-23", // Project starts
    taskDuration: 2, // Days per task
    team: {
        pm: "Anessa Julia Malabago",
        dev: "Althea Nacion",
        jr: "Eva Jane Dolar",
        editor: "Princess Henson"
    }
};

/*
  Each task:
    id          – unique string
    name        – display name
    startWeek   – 1-based week number
    duration    – number of weeks
    assignee    – team key(s) from PROJECT.team
    phase       – planning | design | backend | frontend | testing | deploy
    critical    – true if on the critical path
    depends     – array of task IDs this depends on
    milestone   – true if milestone marker (duration ignored, shown as diamond)
    deliverable – short description for tooltip
*/

const PHASES = [
    {
        id: "phase-1",
        name: "Phase 1 — Planning & Research",
        icon: "📋",
        phase: "planning",
        tasks: [
            {
                id: "t1",
                name: "Define project scope & objectives",
                startWeek: 1,
                duration: 1,
                assignee: ["pm", "dev"],
                phase: "planning",
                critical: true,
                depends: [],
                deliverable: "Project charter with goals, scope, deliverables, and constraints documented."
            },
            {
                id: "t2",
                name: "Identify stakeholders & gather requirements",
                startWeek: 1,
                duration: 1,
                assignee: ["pm", "editor"],
                phase: "planning",
                critical: true,
                depends: [],
                deliverable: "Requirements document listing functional & non-functional requirements for all 4 roles."
            },
            {
                id: "t3",
                name: "Research tech stack (React 19, Vite 7, Prisma, PostgreSQL)",
                startWeek: 1,
                duration: 1,
                assignee: ["dev", "jr"],
                phase: "planning",
                critical: false,
                depends: [],
                deliverable: "Tech stack comparison report: React 19 + Vite 7 + TailwindCSS 4 + Express 5 + Prisma 6."
            },
            {
                id: "t4",
                name: "Create project timeline & Gantt chart",
                startWeek: 1,
                duration: 1,
                assignee: ["pm"],
                phase: "planning",
                critical: true,
                depends: ["t1"],
                deliverable: "10-week Gantt chart with critical path, milestones, and resource assignments."
            },
            {
                id: "t5",
                name: "Set up cost plan & fundraising strategy",
                startWeek: 1,
                duration: 1,
                assignee: ["pm", "editor"],
                phase: "planning",
                critical: false,
                depends: ["t1"],
                deliverable: "Budget spreadsheet (₱4,400 expenses, ₱4,500 fundraised) with +₱100 buffer."
            },
            {
                id: "m1",
                name: "✦ Milestone: Planning Complete",
                startWeek: 1,
                duration: 0,
                assignee: ["pm"],
                phase: "planning",
                critical: true,
                depends: ["t1", "t2", "t4"],
                milestone: true,
                deliverable: "All planning documents approved. Project officially kicks off."
            }
        ]
    },
    {
        id: "phase-2",
        name: "Phase 2 — System Design & Architecture",
        icon: "🎨",
        phase: "design",
        tasks: [
            {
                id: "t6",
                name: "Design database schema (User, Report, Enums)",
                startWeek: 2,
                duration: 1,
                assignee: ["dev"],
                phase: "design",
                critical: true,
                depends: ["m1"],
                deliverable: "Prisma schema with User model (roles, profile, gamification), Report model (status lifecycle), Role & Status enums."
            },
            {
                id: "t7",
                name: "Design REST API endpoints & authentication flow",
                startWeek: 2,
                duration: 1,
                assignee: ["dev"],
                phase: "design",
                critical: true,
                depends: ["m1"],
                deliverable: "API spec: /auth (signin, me, users), /reports (CRUD + status update). JWT 7-day tokens, role-based authorization."
            },
            {
                id: "t8",
                name: "Create UI/UX wireframes (4 dashboards + landing)",
                startWeek: 2,
                duration: 1.5,
                assignee: ["jr", "editor"],
                phase: "design",
                critical: false,
                depends: ["m1"],
                deliverable: "Figma wireframes for LandingPage, StudentLandingPage, TeacherLandingPage, AdminDashboard, MRFStaffDashboard."
            },
            {
                id: "t9",
                name: "Define report lifecycle workflow (6 states)",
                startWeek: 2,
                duration: 1,
                assignee: ["pm", "dev"],
                phase: "design",
                critical: true,
                depends: ["t6"],
                deliverable: "Workflow diagram: PENDING → VERIFIED → DISPATCHED → COLLECTED → RESOLVED (+ DISMISSED branch)."
            },
            {
                id: "t10",
                name: "Plan component architecture & routing",
                startWeek: 2,
                duration: 1,
                assignee: ["dev", "jr"],
                phase: "design",
                critical: false,
                depends: ["m1"],
                deliverable: "React component tree: App → Layout → Pages. Routes: /, /student/:tab, /teacher/:tab, /admin, /mrf."
            },
            {
                id: "m2",
                name: "✦ Milestone: Design Phase Complete",
                startWeek: 3,
                duration: 0,
                assignee: ["pm"],
                phase: "design",
                critical: true,
                depends: ["t6", "t7", "t9"],
                milestone: true,
                deliverable: "Database schema, API spec, and workflow approved. Development begins."
            }
        ]
    },
    {
        id: "phase-3",
        name: "Phase 3 — Backend Development",
        icon: "⚙️",
        phase: "backend",
        tasks: [
            {
                id: "t11",
                name: "Set up Express 5 server, CORS, middleware",
                startWeek: 3,
                duration: 1,
                assignee: ["dev"],
                phase: "backend",
                critical: true,
                depends: ["m2"],
                deliverable: "Express server on port 5000 with CORS (localhost:5173/5174/3000), JSON parsing, error middleware, health endpoint."
            },
            {
                id: "t12",
                name: "Implement Prisma ORM & PostgreSQL connection",
                startWeek: 3,
                duration: 1,
                assignee: ["dev"],
                phase: "backend",
                critical: true,
                depends: ["m2"],
                deliverable: "Prisma Client connected to PostgreSQL. Schema pushed with db:push. Models: User, Report with relations."
            },
            {
                id: "t13",
                name: "Build authentication system (JWT + bcrypt)",
                startWeek: 3,
                duration: 1.5,
                assignee: ["dev"],
                phase: "backend",
                critical: true,
                depends: ["t11", "t12"],
                deliverable: "authController: signin (bcrypt compare, JWT issue), getMe (token validation), getAllUsers (admin). authenticate + authorize middleware."
            },
            {
                id: "t14",
                name: "Build report CRUD endpoints",
                startWeek: 4,
                duration: 1.5,
                assignee: ["dev"],
                phase: "backend",
                critical: true,
                depends: ["t13"],
                deliverable: "reportController: createReport (auto-increment user.reports), getMyReports, getAllReports (admin/MRF), getReportById, deleteReport."
            },
            {
                id: "t15",
                name: "Implement report status workflow & points system",
                startWeek: 4,
                duration: 1,
                assignee: ["dev"],
                phase: "backend",
                critical: true,
                depends: ["t14"],
                deliverable: "updateReportStatus: validate transitions (PENDING→VERIFIED→DISPATCHED→COLLECTED→RESOLVED). Award 15 points on VERIFIED."
            },
            {
                id: "t16",
                name: "Create seed script with demo data",
                startWeek: 4,
                duration: 0.5,
                assignee: ["jr"],
                phase: "backend",
                critical: false,
                depends: ["t12"],
                deliverable: "seed.js: 4 demo users (student/teacher/admin/mrf with hashed passwords), 6 sample reports across different statuses."
            },
            {
                id: "t17",
                name: "Write API test scripts & validate endpoints",
                startWeek: 5,
                duration: 1,
                assignee: ["dev", "editor"],
                phase: "backend",
                critical: false,
                depends: ["t14", "t15"],
                deliverable: "test-api.mjs: Automated tests for signin, token validation, report CRUD, status transitions, role authorization."
            },
            {
                id: "m3",
                name: "✦ Milestone: Backend API Complete",
                startWeek: 5,
                duration: 0,
                assignee: ["pm"],
                phase: "backend",
                critical: true,
                depends: ["t14", "t15"],
                milestone: true,
                deliverable: "All API endpoints functional. Auth, reports, status workflow, and points system verified."
            }
        ]
    },
    {
        id: "phase-4",
        name: "Phase 4 — Frontend Development",
        icon: "🖥️",
        phase: "frontend",
        tasks: [
            {
                id: "t18",
                name: "Set up React 19 + Vite 7 + TailwindCSS 4 project",
                startWeek: 3,
                duration: 0.5,
                assignee: ["dev"],
                phase: "frontend",
                critical: false,
                depends: ["m2"],
                deliverable: "Vite project with React 19, TailwindCSS 4, Framer Motion 12, Lucide icons, React Router 7. ESLint configured."
            },
            {
                id: "t19",
                name: "Build AuthContext & ThemeContext providers",
                startWeek: 4,
                duration: 1,
                assignee: ["dev"],
                phase: "frontend",
                critical: true,
                depends: ["t18", "t13"],
                deliverable: "AuthContext: useAuth() hook (signin, signout, role checks). ThemeContext: dark/light toggle with localStorage. SessionStorage token management."
            },
            {
                id: "t20",
                name: "Build API service layer (singleton pattern)",
                startWeek: 4,
                duration: 1,
                assignee: ["dev"],
                phase: "frontend",
                critical: true,
                depends: ["t18", "t13"],
                deliverable: "api.js: Singleton with Bearer token auth. Methods: signin, getMe, getAllUsers, createReport, getMyReports, getAllReports, updateReportStatus, deleteReport."
            },
            {
                id: "t21",
                name: "Build Landing Page (hero, auth, features)",
                startWeek: 5,
                duration: 1,
                assignee: ["jr", "editor"],
                phase: "frontend",
                critical: false,
                depends: ["t19"],
                deliverable: "LandingPage.jsx (2,200+ lines): Hero section, live stats, features grid, how-it-works, testimonials, dual-mode auth (sign in + sign up with demo buttons)."
            },
            {
                id: "t22",
                name: "Build Student Dashboard (4 tabs)",
                startWeek: 5,
                duration: 1.5,
                assignee: ["jr"],
                phase: "frontend",
                critical: true,
                depends: ["t19", "t20"],
                deliverable: "StudentLandingPage.jsx (2,400+ lines): Home (news, challenges, leaderboard), Report (photo capture, location picker, waste type), Map (10 bins), Activity (history)."
            },
            {
                id: "t23",
                name: "Build Teacher Dashboard (6 report categories)",
                startWeek: 6,
                duration: 1.5,
                assignee: ["jr"],
                phase: "frontend",
                critical: true,
                depends: ["t22"],
                deliverable: "TeacherLandingPage.jsx (3,100+ lines): Extended reporting (Waste, Furniture, Electronics, Fixtures, Equipment, Other), asset condition assessment, 12 campus rooms."
            },
            {
                id: "t24",
                name: "Build Admin Dashboard (5 tabs, full workflow)",
                startWeek: 6,
                duration: 2,
                assignee: ["dev"],
                phase: "frontend",
                critical: true,
                depends: ["t19", "t20", "m3"],
                deliverable: "AdminDashboard.jsx (2,800+ lines): Overview, Waste Reports (filterable), Asset Reports, Bin Map, Users. Modals: Dispatch, Details, Collection, Verification."
            },
            {
                id: "t25",
                name: "Build MRF Staff Dashboard (3 mobile tabs)",
                startWeek: 7,
                duration: 1,
                assignee: ["jr"],
                phase: "frontend",
                critical: false,
                depends: ["t23"],
                deliverable: "MRFStaffDashboard.jsx (800+ lines): Input (category, weight, location), History (grouped), Stats (weekly chart). Mobile-first, 10 waste categories."
            },
            {
                id: "t26",
                name: "Build mock data & state management (reportState.js)",
                startWeek: 5,
                duration: 1,
                assignee: ["jr"],
                phase: "frontend",
                critical: false,
                depends: ["t19"],
                deliverable: "reportState.js (400+ lines): Status enums (BIN_STATUS, ASSET_STATUS), 10 waste categories, 12 campus locations, sample data, leaderboard, impact stats, MRF staff, audit log."
            },
            {
                id: "t27",
                name: "Implement routing & Layout component",
                startWeek: 5,
                duration: 0.5,
                assignee: ["dev"],
                phase: "frontend",
                critical: false,
                depends: ["t19"],
                deliverable: "App.jsx with React Router 7: Landing(/), Student(/student/:tab), Teacher(/teacher/:tab), Admin(/admin), MRF(/mrf). Layout.jsx wrapper."
            },
            {
                id: "m4",
                name: "✦ Milestone: All Dashboards Complete",
                startWeek: 8,
                duration: 0,
                assignee: ["pm"],
                phase: "frontend",
                critical: true,
                depends: ["t22", "t23", "t24", "t25"],
                milestone: true,
                deliverable: "All 4 role-based dashboards fully functional with real API integration and mock data fallback."
            }
        ]
    },
    {
        id: "phase-5",
        name: "Phase 5 — Testing & Quality Assurance",
        icon: "🧪",
        phase: "testing",
        tasks: [
            {
                id: "t28",
                name: "Functional testing: auth flow & role routing",
                startWeek: 8,
                duration: 1,
                assignee: ["editor", "jr"],
                phase: "testing",
                critical: true,
                depends: ["m4"],
                deliverable: "Test all 4 role logins, token persistence, role-based redirects, signout, and unauthorized access prevention."
            },
            {
                id: "t29",
                name: "Functional testing: full report lifecycle",
                startWeek: 8,
                duration: 1,
                assignee: ["editor", "dev"],
                phase: "testing",
                critical: true,
                depends: ["m4"],
                deliverable: "Test PENDING→VERIFIED→DISPATCHED→COLLECTED→RESOLVED for waste reports. Test DISMISSED branch. Verify points awarded on VERIFIED."
            },
            {
                id: "t30",
                name: "Responsive design testing (desktop/tablet/mobile)",
                startWeek: 8,
                duration: 1,
                assignee: ["jr", "editor"],
                phase: "testing",
                critical: false,
                depends: ["m4"],
                deliverable: "Verify all dashboards at 1024px, 768px, 480px breakpoints. Test safe-area support on mobile. Fix layout issues."
            },
            {
                id: "t31",
                name: "Cross-browser & performance testing",
                startWeek: 9,
                duration: 0.5,
                assignee: ["dev", "jr"],
                phase: "testing",
                critical: false,
                depends: ["t28", "t29"],
                deliverable: "Test on Chrome, Firefox, Edge. Check Lighthouse scores. Optimize bundle size and load times."
            },
            {
                id: "t32",
                name: "Bug fixing & UI polish",
                startWeek: 9,
                duration: 1,
                assignee: ["dev", "jr"],
                phase: "testing",
                critical: true,
                depends: ["t28", "t29", "t30"],
                deliverable: "Fix all critical/major bugs from testing. Polish animations (Framer Motion), color consistency, spacing, and micro-interactions."
            },
            {
                id: "m5",
                name: "✦ Milestone: QA Complete — Release Candidate",
                startWeek: 9,
                duration: 0,
                assignee: ["pm"],
                phase: "testing",
                critical: true,
                depends: ["t32"],
                milestone: true,
                deliverable: "All critical bugs fixed. Application stable for deployment."
            }
        ]
    },
    {
        id: "phase-6",
        name: "Phase 6 — Deployment & Documentation",
        icon: "🚀",
        phase: "deploy",
        tasks: [
            {
                id: "t33",
                name: "Deploy frontend (Vercel) & backend (Railway)",
                startWeek: 9,
                duration: 1,
                assignee: ["dev"],
                phase: "deploy",
                critical: true,
                depends: ["m5"],
                deliverable: "Frontend on Vercel (custom domain, env vars). Backend on Railway (PostgreSQL, auto-deploy from Git). CORS configured for production."
            },
            {
                id: "t34",
                name: "Write technical documentation & README",
                startWeek: 9,
                duration: 1.5,
                assignee: ["editor"],
                phase: "deploy",
                critical: false,
                depends: ["m5"],
                deliverable: "README.md (setup, env vars, API docs), backend/README.md (database, seeding, endpoints). Code comments for complex logic."
            },
            {
                id: "t35",
                name: "Create user manual & guide",
                startWeek: 9,
                duration: 1.5,
                assignee: ["editor", "pm"],
                phase: "deploy",
                critical: false,
                depends: ["m5"],
                deliverable: "User guide for all 4 roles: how to report waste, verify reports, dispatch MRF, view analytics. Screenshots included."
            },
            {
                id: "t36",
                name: "Compile final project report",
                startWeek: 10,
                duration: 1,
                assignee: ["pm", "editor"],
                phase: "deploy",
                critical: true,
                depends: ["t33", "t34", "t35"],
                deliverable: "Complete project report: objectives, methodology, system architecture, results, challenges, recommendations, and financial summary."
            },
            {
                id: "t37",
                name: "Prepare presentation & demo",
                startWeek: 10,
                duration: 1,
                assignee: ["pm", "dev", "jr", "editor"],
                phase: "deploy",
                critical: true,
                depends: ["t33"],
                deliverable: "Slide deck (15-20 slides), live demo script, role-play scenario for each dashboard. Practice run completed."
            },
            {
                id: "t38",
                name: "Final review & submission",
                startWeek: 10,
                duration: 0.5,
                assignee: ["pm", "dev", "jr", "editor"],
                phase: "deploy",
                critical: true,
                depends: ["t36", "t37"],
                deliverable: "All deliverables reviewed, zipped, and submitted: source code, documentation, report, presentation, deployed URLs."
            },
            {
                id: "m6",
                name: "✦ Milestone: PROJECT COMPLETE 🎉",
                startWeek: 10,
                duration: 0,
                assignee: ["pm", "dev", "jr", "editor"],
                phase: "deploy",
                critical: true,
                depends: ["t38"],
                milestone: true,
                deliverable: "SMART OPERATIONAL RECOVERY AND TRACKING delivered on time and within budget. All success criteria met!"
            }
        ]
    }
];

/* ----- Week Labels ----- */
const WEEK_LABELS = [
    "Week 1\nFeb 24–Mar 2",
    "Week 2\nMar 3–9",
    "Week 3\nMar 10–16",
    "Week 4\nMar 17–23",
    "Week 5\nMar 24–30",
    "Week 6\nMar 31–Apr 6",
    "Week 7\nApr 7–13",
    "Week 8\nApr 14–20",
    "Week 9\nApr 21–27",
    "Week 10\nApr 28–May 4"
];

/* ----- Phase Colors Map ----- */
const PHASE_COLORS = {
    planning: "#3b82f6",
    design: "#8b5cf6",
    backend: "#10b981",
    frontend: "#f59e0b",
    testing: "#ef4444",
    deploy: "#ec4899"
};
