# 🎓 College Placement Management System (CPMS)

An enterprise-grade, full-stack **College Placement Management System** designed for engineering institutions, universities, and BCA/B.Tech academic presentations. The platform streamlines campus recruitments across three dedicated portals: **Students**, **Placement Officers (TPO / Admin)**, and **Corporate Recruiters / Companies**.

---

## 🌟 Key Highlights & Academic Features

- **Automated Eligibility Engine**: Instant, rule-based verification evaluating CGPA cutoffs, active backlog limits, class 10th/12th percentages, eligible departments, graduation batches, and drive deadlines. Rejections include human-readable reason breakdowns.
- **Role-Based Portals**:
  - 👨‍🎓 **Student Portal**: Profile management, academic record tracking, multi-version resume upload/selection, eligible drive discovery, one-click applications, real-time stage tracking, interview schedules, and instant alerts.
  - 🏛️ **Admin (TPO) Portal**: Executive KPI dashboards, placement statistics & CTC charts, student verification, company approval gatekeeping, drive creation & management, stage progression (Applied ➔ Shortlisted ➔ Interview Scheduled ➔ Selected / Rejected), automated CSV report generation.
  - 🏢 **Company Recruiter Portal**: Self-registration with admin approval workflow, company profile showcase, placement drive proposals, eligible applicant filtering, and applicant stage review.
- **Enterprise Security**:
  - Secure session management with HTTP-only cookies and JSON Web Tokens (JWT).
  - One-way password hashing via `bcryptjs` with salt rounds.
  - Guaranteed single-application per student-drive pair enforced at both database schema (`@@unique([studentId, driveId])`) and API layers.
- **Visual Analytics**: Interactive placement trends, package distribution (Highest, Average, Median CTC), company participation, and branch-wise placement metrics built with Recharts.
- **Automated Test Suite**: 9 comprehensive unit and integration tests covering password security, JWT issuance, multi-criteria eligibility logic, and database constraints.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript), [Tailwind CSS](https://tailwindcss.com/) |
| **Icons & UI** | [Lucide React](https://lucide.dev/), Tailwind UI Utilities |
| **Data Visualization** | [Recharts](https://recharts.org/) (Responsive Charts: Bar, Area, Pie) |
| **Backend & APIs** | Next.js API Route Handlers (`src/app/api/...`), Server Actions |
| **Validation** | [Zod](https://zod.dev/) Type-Safe Validation Schemas |
| **Database & ORM** | [SQLite](https://www.sqlite.org/) for zero-config local portability, [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | Custom Session Tokens (`jsonwebtoken`), HTTP-only Cookies, `bcryptjs` |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.18.0 or newer (v20+ recommended)
- **npm**: v9+

### 2. Installation & Setup

Open your terminal (PowerShell or Bash) in the project root:

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (defaults to SQLite dev.db)
cp .env.example .env

# 3. Synchronize database schema
npx prisma db push

# 4. Seed realistic academic demo data
npm run seed

# 5. Run the automated test suite
npm test

# 6. Launch development server
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Pre-Seeded Demo Credentials

All test accounts come pre-configured with academic records, applications, and placement drives:

| Portal | Email | Password | Role & Persona |
| :--- | :--- | :--- | :--- |
| **Placement Officer (Admin)** | `admin@college.edu` | `AdminPassword@123` | Head Training & Placement Officer (TPO) |
| **Student (BCA / CS - Eligible)** | `rahul.verma@college.edu` | `StudentPassword@123` | CGPA 8.75, 0 Backlogs, 2026 Batch (BCA) |
| **Student (CSE - Placed)** | `priya.nair@college.edu` | `StudentPassword@123` | CGPA 9.20, 0 Backlogs, Selected at Razorpay |
| **Student (B.Tech IT - Active)** | `amit.patel@college.edu` | `StudentPassword@123` | CGPA 7.80, 0 Backlogs, Shortlisted at TCS |
| **Student (B.Tech - 1 Backlog)** | `sneha.roy@college.edu` | `StudentPassword@123` | CGPA 8.10, 1 Backlog (Tests backlog criteria) |
| **Corporate Recruiter (Google)** | `campus@google.com` | `CompanyPassword@123` | Approved Top-tier MNC Recruiter |
| **Corporate Recruiter (Microsoft)** | `university@microsoft.com` | `CompanyPassword@123` | Approved Cloud & Enterprise Recruiter |
| **Corporate Recruiter (Razorpay)** | `careers@razorpay.com` | `CompanyPassword@123` | Approved Fintech Recruiter |

> **Note**: You can also register brand new student and recruiter accounts directly from the UI. New recruiter accounts will appear in the Admin Portal under **Company Approvals**.

---

## 📁 Project Architecture

```
newcpm/
├── prisma/
│   ├── schema.prisma           # Prisma SQLite schema (10 relational models)
│   └── seed.mjs                # Demo database seeder
├── src/
│   ├── app/
│   │   ├── page.tsx            # Public Landing Page with placement stats
│   │   ├── login/              # Unified role-based login
│   │   ├── register/           # Student registration
│   │   ├── register-company/   # Recruiter registration
│   │   ├── student/            # Student portal pages (8 views)
│   │   │   ├── dashboard/      # Overview, metrics, upcoming interviews
│   │   │   ├── profile/        # Academic scores, bio, personal info
│   │   │   ├── resumes/        # Multi-version resume repository
│   │   │   ├── drives/         # Eligible campus drives catalog
│   │   │   │   └── [id]/       # Drive details & eligibility assessment modal
│   │   │   ├── applications/   # Live application lifecycle tracker
│   │   │   ├── interviews/     # Schedule with meeting links and rounds
│   │   │   └── notifications/  # Notification center
│   │   ├── admin/              # Placement Officer portal (8 views)
│   │   │   ├── dashboard/      # Executive KPIs, charts & quick actions
│   │   │   ├── students/       # Student database & verification
│   │   │   ├── companies/      # Recruiter approval workflow
│   │   │   ├── drives/         # Drive creation wizard & management
│   │   │   ├── applicants/     # Applicant stage progression manager
│   │   │   ├── interviews/     # Interview scheduling & round manager
│   │   │   ├── announcements/  # Campus placement broadcast notices
│   │   │   └── reports/        # Analytics & instant CSV export
│   │   ├── company/            # Corporate Recruiter portal (4 views)
│   │   │   ├── dashboard/      # Drive performance metrics
│   │   │   ├── profile/        # Company brand & HR contact details
│   │   │   ├── drives/         # Company-specific drives & applicants
│   │   │   └── applicants/     # Review eligible applicants & statuses
│   │   └── api/                # 20+ secure REST API Route Handlers
│   ├── components/             # Reusable UI & presentation components
│   │   ├── Sidebar.tsx         # Responsive portal navigation
│   │   ├── DashboardHeader.tsx # Header with user context & quick logout
│   │   ├── MetricCard.tsx      # Stat counters with change indicators
│   │   ├── StatusBadge.tsx     # Color-coded workflow badges
│   │   ├── ApplicationTimeline.tsx # Visual progress stepper
│   │   ├── EligibilityModal.tsx # Multi-factor criteria feedback modal
│   │   └── Charts.tsx          # Recharts visualizations
│   └── lib/
│       ├── prisma.ts           # Global Prisma Client singleton
│       ├── auth.ts             # JWT signing, cookie handlers, bcrypt
│       ├── eligibility.ts      # Automated criteria assessment engine
│       └── validators.ts       # Zod schemas for input validation
├── tests/
│   └── system.test.mjs         # Automated end-to-end unit/integration tests
├── package.json
└── README.md
```

---

## 📊 Database Schema (Prisma Models)

The SQLite database (`prisma/schema.prisma`) comprises 10 relational entities:

1. **`User`**: Base authentication entity storing email, password hash, role (`STUDENT`, `ADMIN`, `COMPANY`), and active status.
2. **`StudentProfile`**: Roll number, branch/department, batch year, skills, social profiles, and verification status.
3. **`AcademicRecord`**: Current CGPA, active backlogs, total backlogs, 10th percentage/board/year, 12th percentage/board/year, diploma scores, and semester-wise marks.
4. **`Company`**: Corporate profile, HR contact details, industry, verification status (`isApproved`), and approval notes.
5. **`PlacementDrive`**: Title, job role, package/CTC, job location, minimum CGPA, maximum backlogs, 10th/12th cutoffs, eligible departments/batches, deadline, and status (`UPCOMING`, `ACTIVE`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
6. **`JobApplication`**: Links student to drive with selected resume, current status (`APPLIED`, `SHORTLISTED`, `INTERVIEW_SCHEDULED`, `SELECTED`, `REJECTED`), applied date, and feedback notes.
7. **`Interview`**: Round details (`ONLINE_TEST`, `TECHNICAL_ROUND_1`, `TECHNICAL_ROUND_2`, `HR_ROUND`, `FINAL_DISCUSSION`), scheduled datetime, duration, location/link, and status.
8. **`Resume`**: Title, file URL, upload date, and default selection flag.
9. **`Announcement`**: Broadcast notices categorized by `GENERAL`, `URGENT`, `DRIVE_ALERT`, `POLICY`.
10. **`Notification`**: Real-time student alerts for shortlisting, interview calls, and application updates.

---

## 🧪 Automated Testing

Run the included verification suite:

```bash
npm test
```

The test runner evaluates:
- [x] Password encryption & validation with `bcryptjs`.
- [x] JWT token generation and claims verification.
- [x] Eligibility checking with passing criteria.
- [x] Rejection handling for CGPA below cutoff.
- [x] Rejection handling for active backlogs exceeding threshold.
- [x] Rejection handling for ineligible academic departments.
- [x] Rejection handling for expired application deadlines.
- [x] Database seeding integrity check.
- [x] Prisma database constraint preventing duplicate applications.

---

## 💡 Viva / Presentation Discussion Points

When presenting this project for your academic review, highlight:
1. **Three-Tier Architecture**: Clear separation of concern between Next.js React client components, Server-Side API routes, and Prisma ORM data layer.
2. **Database Integrity**: Strict foreign key relationships, cascade deletions, and database-level unique constraints preventing double applications.
3. **Automated Qualification**: How the algorithm evaluates students instantly, eliminating manual sorting of hundreds of resumes by the TPO.
4. **Security Best Practices**: Passwords are never stored in plain text; tokens are stored in HTTP-only cookies preventing XSS token theft.
5. **Real-world Business Logic**: Recruiter gatekeeping prevents unauthorized postings until verified by the university placement department.

---

## 📄 License
This project is built for educational and demonstration purposes. Feel free to modify and expand for your academic requirements!
