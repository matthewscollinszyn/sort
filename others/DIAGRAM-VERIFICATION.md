# SORT v2 Diagram Verification & Corrections

## Date: May 7, 2026

## Summary of Changes

### ❌ Issues Found with Original Diagrams

#### 1. **Data Flow Diagram (DFD) - CRITICAL ERROR**
The original "green" DFD diagram was **completely incorrect** for the SORT system:
- Showed: Customer, Admin actors with "Manage Customers Information", "Manage Sales Information", "Manage Stocks"
- This was for a **sales/inventory system**, NOT a Material Recovery Facility system
- Had nothing to do with waste tracking, report submission, or MRF operations

#### 2. **Use Case Diagrams - Minor Adjustments Needed**
The use case diagrams were mostly correct but needed verification against actual implementation:
- ✅ Actors (Student, Teacher, Admin, MRF Staff) were correct
- ✅ Main use cases were accurate
- ⚠️ Needed to verify against actual API endpoints and database schema
- ⚠️ Missing some implementation details (e.g., point values, exact status flow)

---

## ✅ What Was Created/Fixed

### 1. **New Data Flow Diagram (Level 0 & Level 1)**
**File:** `diagrams-dfd.html`

**Level 0 - Context Diagram:**
- External Entities: Student/Teacher, Admin, MRF Staff
- Central Process: SORT v2 System
- Data Flows: Report submissions, validations, assignments, collections, points, news

**Level 1 - Detailed Process Diagram:**
- **Process 1.1:** Submit & Track Reports
- **Process 1.2:** Validate & Process Reports
- **Process 1.3:** Dispatch & Assign Staff
- **Process 1.4:** Log Collection & Complete
- **Process 1.5:** Award Points & Generate Stats
- **Process 1.6:** Manage Campus News

**Data Stores:**
- D1: Reports DB (PostgreSQL)
- D2: Users DB (Points, Profiles)
- D3: Campus News

**Status Flow Diagram:**
- PENDING → VERIFIED → DISPATCHED → IN_PROGRESS → COMPLETED
- Alternative: PENDING → DISMISSED

### 2. **Finalized Use Case Diagrams**
**File:** `diagrams-usecase.html`

**Use Case 1: Student & Teacher Operations**
- Login / Authenticate
- Submit Waste Report (General, Organic, etc.)
- Submit Asset Report (Furniture, Electronics)
- View Points & Leaderboard
- View Certificates

**Use Case 2: Admin & MRF Staff Operations**

**Admin:**
- Login / Authenticate
- Validate & Confirm Report
- Dismiss Report
- Dispatch Staff
- View Reports & Analytics
- Publish Campus News

**MRF Staff:**
- Login / Authenticate
- Review Assigned Tasks
- Log Material Weight (Confirm Collection)
- Mark Task as Completed
- View Impact Analytics

---

## 🔍 Verification Against Implementation

All diagrams were verified against the actual codebase:

### ✅ Database Schema (Prisma)
- **User Model:** id, username, password, role (STUDENT/TEACHER/ADMIN/MRF), points, reports count
- **Report Model:** id, location, notes, photoUrl, type (WASTE/ASSET), status, assignedStaffId, kilosCollected, collectionDate
- **CampusNews Model:** id, tag, date, title, desc, publishedById

### ✅ API Endpoints Verified
- `POST /api/auth/signin` - Authentication
- `POST /api/reports` - Create report
- `POST /api/reports/:id/verify` - Admin verify (awards points)
- `POST /api/reports/:id/dismiss` - Admin dismiss
- `POST /api/reports/:id/dispatch` - Assign staff
- `POST /api/reports/:id/confirm-collection` - MRF log weight
- `POST /api/reports/:id/mark-done` - MRF complete (awards 20 points)
- `GET /api/auth/leaderboard` - View top students by points
- News CRUD endpoints

### ✅ Report Status Flow
```
PENDING 
  ↓ (Admin verifies)
VERIFIED 
  ↓ (Admin assigns staff)
DISPATCHED 
  ↓ (MRF confirms collection + logs weight)
IN_PROGRESS 
  ↓ (MRF marks done + awards points)
COMPLETED

Alternative: PENDING → DISMISSED (invalid reports)
```

### ✅ Point System
- Reporter receives **20 points** when MRF staff marks report as COMPLETED
- Points tracked in User.points field
- Report count tracked in User.reports field
- Leaderboard shows top students by points

### ✅ Report Types
- **WASTE:** General waste, organic, recyclables
- **ASSET:** Furniture, Electronics, Fixtures, Equipment, Other

---

## 📁 File Locations

1. **diagrams-dfd.html** - Complete Data Flow Diagrams (Level 0 & 1)
2. **diagrams-usecase.html** - Complete Use Case Diagrams with verification
3. **operational-framework.html** - Existing Mermaid diagrams (already correct)

---

## 🎯 How to Use

1. Open `diagrams-dfd.html` in a browser to view the corrected Data Flow Diagrams
2. Open `diagrams-usecase.html` in a browser to view the verified Use Case Diagrams
3. Both files are standalone HTML with embedded SVG graphics
4. Green checkmarks indicate verified features against actual implementation
5. All diagrams match the Prisma schema and backend API exactly

---

## ✅ Conclusion

**All diagrams are now finalized and verified:**
- ✅ DFD replaced with correct SORT system processes
- ✅ Use case diagrams verified against actual implementation
- ✅ All actors, processes, and data flows match the codebase
- ✅ Status lifecycle accurately represents backend logic
- ✅ Point system and gamification features documented
- ✅ Database structure matches Prisma schema

The diagrams are now accurate, complete, and ready for documentation or presentation purposes.