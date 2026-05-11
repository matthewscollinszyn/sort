# MRF Operations Workflow API Documentation

## Overview
This document describes the sequential workflow for MRF (Materials Recovery Facility) operations in the SORT v2 system.

## Workflow Status Lifecycle

```
PENDING → DISPATCHED → IN_PROGRESS → COMPLETED
```

### Status Descriptions:
- **PENDING**: Initial status when student/teacher creates a report
- **DISPATCHED**: Admin has assigned an MRF staff member to handle the report
- **IN_PROGRESS**: MRF staff has confirmed collection and entered kilos collected
- **COMPLETED**: MRF staff has finalized the report (reporter receives points)

---

## Database Schema Updates

### Report Model - New Fields:
```prisma
assignedStaffId   String?      // ID of the assigned MRF staff member
assignedStaffName String?      // Name of the assigned staff for easy display
kilosCollected    Float?       // Weight in kilograms collected by MRF staff
collectionDate    DateTime?    // When the collection was confirmed
```

### New Status Enums:
- `IN_PROGRESS`
- `COMPLETED`

---

## API Endpoints

### 1. Dispatch Staff (Admin Only)

**Endpoint:** `POST /api/reports/:id/dispatch`

**Authorization:** Admin only

**Description:** Assigns an MRF staff member to a PENDING or VERIFIED report and updates status to DISPATCHED.

**Request Body:**
```json
{
  "staffId": "clxxx123456",
  "staffName": "John Doe"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Report dispatched to John Doe",
  "data": {
    "report": {
      "id": "clyyy789012",
      "location": "Cafeteria - Block A",
      "status": "DISPATCHED",
      "assignedStaffId": "clxxx123456",
      "assignedStaffName": "John Doe",
      "user": { ... },
      "createdAt": "2026-04-30T10:00:00Z",
      "updatedAt": "2026-04-30T10:30:00Z"
    }
  }
}
```

**Error Responses:**
- `400`: Invalid status (cannot dispatch if not PENDING or VERIFIED)
- `403`: Access denied (not admin)
- `404`: Report not found

**Prisma Query:**
```javascript
await prisma.report.update({
    where: { id },
    data: {
        status: 'DISPATCHED',
        assignedStaffId: staffId,
        assignedStaffName: staffName
    }
});
```

---

### 2. Confirm Collection (MRF Staff Only)

**Endpoint:** `POST /api/reports/:id/confirm-collection`

**Authorization:** MRF staff only (must be assigned to the report)

**Description:** MRF staff confirms collection, enters kilos collected, and updates status to IN_PROGRESS.

**Request Body:**
```json
{
  "kilos": 15.5
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Collection confirmed: 15.5 kg recorded",
  "data": {
    "report": {
      "id": "clyyy789012",
      "location": "Cafeteria - Block A",
      "status": "IN_PROGRESS",
      "assignedStaffId": "clxxx123456",
      "assignedStaffName": "John Doe",
      "kilosCollected": 15.5,
      "collectionDate": "2026-04-30T11:00:00Z",
      "user": { ... },
      "createdAt": "2026-04-30T10:00:00Z",
      "updatedAt": "2026-04-30T11:00:00Z"
    }
  }
}
```

**Error Responses:**
- `400`: Invalid status (must be DISPATCHED) or invalid kilos value
- `403`: Access denied (not MRF staff or not assigned to this report)
- `404`: Report not found

**Validation:**
- `kilos` must be a positive number
- Report must have status `DISPATCHED`
- Staff member must be assigned to this report

**Prisma Query:**
```javascript
await prisma.report.update({
    where: { id },
    data: {
        status: 'IN_PROGRESS',
        kilosCollected: kilos,
        collectionDate: new Date()
    }
});
```

---

### 3. Mark as Done (MRF Staff Only)

**Endpoint:** `POST /api/reports/:id/mark-done`

**Authorization:** MRF staff only (must be assigned to the report)

**Description:** Finalizes the report by marking it as COMPLETED. Awards points to the original reporter.

**Request Body:** None required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Report marked as completed. 20 points awarded to reporter.",
  "data": {
    "report": {
      "id": "clyyy789012",
      "location": "Cafeteria - Block A",
      "status": "COMPLETED",
      "assignedStaffId": "clxxx123456",
      "assignedStaffName": "John Doe",
      "kilosCollected": 15.5,
      "collectionDate": "2026-04-30T11:00:00Z",
      "user": { ... },
      "createdAt": "2026-04-30T10:00:00Z",
      "updatedAt": "2026-04-30T11:30:00Z"
    },
    "pointsAwarded": 20
  }
}
```

**Error Responses:**
- `400`: Invalid status (must be IN_PROGRESS)
- `403`: Access denied (not MRF staff or not assigned to this report)
- `404`: Report not found

**Side Effects:**
- Awards 20 points to the original reporter
- Updates reporter's total points

**Prisma Queries:**
```javascript
// Update report status
await prisma.report.update({
    where: { id },
    data: { status: 'COMPLETED' }
});

// Award points to reporter
await prisma.user.update({
    where: { id: reporterId },
    data: { points: { increment: 20 } }
});
```

---

## Complete Workflow Example

### Step 1: Student Creates Report
```bash
POST /api/reports
{
  "location": "Cafeteria - Block A",
  "notes": "Full bin of plastic bottles",
  "urgency": "high",
  "wasteType": "recyclable"
}
# Status: PENDING
```

### Step 2: Admin Dispatches Staff
```bash
POST /api/reports/clyyy789012/dispatch
Authorization: Bearer <admin_token>
{
  "staffId": "clxxx123456",
  "staffName": "John Doe"
}
# Status: PENDING → DISPATCHED
```

### Step 3: MRF Staff Confirms Collection
```bash
POST /api/reports/clyyy789012/confirm-collection
Authorization: Bearer <mrf_staff_token>
{
  "kilos": 15.5
}
# Status: DISPATCHED → IN_PROGRESS
# Records: 15.5 kg collected at current timestamp
```

### Step 4: MRF Staff Marks as Done
```bash
POST /api/reports/clyyy789012/mark-done
Authorization: Bearer <mrf_staff_token>
# Status: IN_PROGRESS → COMPLETED
# Side effect: Reporter receives 20 points
```

---

## Notifications & Real-Time Updates

### Auto-Refresh Mechanism
The frontend dashboards (Student, Teacher, Admin) already implement auto-refresh every 10 seconds:

```javascript
useEffect(() => {
    if (user) {
        fetchReports();
        const interval = setInterval(fetchReports, 10000);
        return () => clearInterval(interval);
    }
}, [user]);
```

This ensures all dashboards see updated statuses immediately (within 10 seconds) without manual refresh.

### Dashboard Views:
- **Student Dashboard**: See own reports with current status
- **Teacher Dashboard**: See own reports with current status
- **Admin Dashboard**: See all reports, dispatch staff, monitor progress
- **MRF Staff Dashboard**: See assigned reports, update collection status

---

## Status Validation Rules

| Current Status | Can Transition To | Required Role | Required Action |
|----------------|-------------------|---------------|-----------------|
| PENDING | DISPATCHED | ADMIN | Assign staff |
| VERIFIED | DISPATCHED | ADMIN | Assign staff |
| DISPATCHED | IN_PROGRESS | MRF (assigned) | Enter kilos |
| IN_PROGRESS | COMPLETED | MRF (assigned) | Finalize |

**Note:** Direct status jumps (e.g., PENDING → COMPLETED) are prevented by validation logic.

---

## Points System

### Point Awards:
- **Report Verified by Admin**: 15 points (existing)
- **Report Completed by MRF**: 20 points (new)

**Total possible points per report**: 35 points (15 for verification + 20 for completion)

---

## Testing Endpoints

### Using curl:

**1. Dispatch Staff:**
```bash
curl -X POST http://localhost:5000/api/reports/{reportId}/dispatch \
  -H "Authorization: Bearer {admin_token}" \
  -H "Content-Type: application/json" \
  -d '{"staffId": "staff123", "staffName": "John Doe"}'
```

**2. Confirm Collection:**
```bash
curl -X POST http://localhost:5000/api/reports/{reportId}/confirm-collection \
  -H "Authorization: Bearer {mrf_token}" \
  -H "Content-Type: application/json" \
  -d '{"kilos": 15.5}'
```

**3. Mark as Done:**
```bash
curl -X POST http://localhost:5000/api/reports/{reportId}/mark-done \
  -H "Authorization: Bearer {mrf_token}"
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad request (validation error)
- `403`: Forbidden (insufficient permissions)
- `404`: Not found
- `500`: Server error

---

## Security Considerations

1. **Role-Based Access Control**: Each endpoint validates user role
2. **Assignment Verification**: MRF staff can only act on reports assigned to them
3. **Status Flow Validation**: Prevents invalid status transitions
4. **Input Validation**: Validates all user inputs (kilos must be positive number)
5. **JWT Authentication**: All endpoints require valid JWT token

---

## Frontend Integration Examples

### Admin Dispatch Modal:
```javascript
const handleDispatch = async (reportId, staffMember) => {
    try {
        const response = await api.post(`/reports/${reportId}/dispatch`, {
            staffId: staffMember.id,
            staffName: staffMember.name
        });
        
        if (response.success) {
            toast.success(`Dispatched to ${staffMember.name}`);
            fetchReports(); // Refresh list
        }
    } catch (error) {
        toast.error(error.message);
    }
};
```

### MRF Staff Collection Form:
```javascript
const handleConfirmCollection = async (reportId, kilos) => {
    try {
        const response = await api.post(`/reports/${reportId}/confirm-collection`, {
            kilos: parseFloat(kilos)
        });
        
        if (response.success) {
            toast.success(`Collection confirmed: ${kilos} kg`);
            fetchReports();
        }
    } catch (error) {
        toast.error(error.message);
    }
};
```

### MRF Staff Mark Done:
```javascript
const handleMarkDone = async (reportId) => {
    try {
        const response = await api.post(`/reports/${reportId}/mark-done`);
        
        if (response.success) {
            toast.success('Report completed!');
            fetchReports();
        }
    } catch (error) {
        toast.error(error.message);
    }
};
```

---

## Database Indexes

For optimal query performance, the schema includes indexes on:
- `userId` - Fast lookup of reports by user
- `status` - Fast filtering by status
- `assignedStaffId` - Fast lookup of reports by assigned staff

```prisma
@@index([userId])
@@index([status])
@@index([assignedStaffId])
```

---

## Summary

The MRF Operations workflow provides a complete lifecycle management system for waste collection reports with:

✅ Clear status progression (PENDING → DISPATCHED → IN_PROGRESS → COMPLETED)  
✅ Role-based access control (Admin, MRF Staff)  
✅ Data tracking (assigned staff, kilos collected, timestamps)  
✅ Automatic point rewards for completed reports  
✅ Real-time dashboard updates via auto-refresh  
✅ Comprehensive validation and error handling  
✅ RESTful API design following best practices  

The system ensures accountability and tracks the complete waste management process from initial report to final completion.
