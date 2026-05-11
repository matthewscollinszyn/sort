# Admin Settings Management - Feature Documentation

## Overview
The admin dashboard now includes a comprehensive Settings tab that allows administrators to manage:
- **Asset Categories**: Configurable categories for asset reports (furniture, electronics, fixtures, etc.)
- **Locations**: Editable campus bin locations and room locations

## Database Schema

### AssetCategory Table
- `id`: Unique identifier
- `name`: Category name (lowercase, e.g., "furniture")
- `label`: Display label (e.g., "Furniture")
- `enabled`: Boolean flag to enable/disable category
- `sortOrder`: Integer for ordering
- `createdAt`, `updatedAt`: Timestamps

### Location Table
- `id`: Unique identifier
- `code`: Location code (e.g., "LOC-01", "ROOM-01")
- `name`: Location name
- `type`: Enum - `BIN_LOCATION` (waste reports) or `ROOM_LOCATION` (asset reports)
- `building`: Building name (for room locations)
- `enabled`: Boolean flag to enable/disable location
- `sortOrder`: Integer for ordering
- `mapX`, `mapY`: Map coordinates for visual representation (optional)
- `createdAt`, `updatedAt`: Timestamps

## API Endpoints

### Asset Categories
- `GET /api/settings/asset-categories` - Get all categories (authenticated users)
- `POST /api/settings/asset-categories` - Create new category (admin only)
- `PUT /api/settings/asset-categories/:id` - Update category (admin only)
- `DELETE /api/settings/asset-categories/:id` - Delete category (admin only)

### Locations
- `GET /api/settings/locations?type=BIN_LOCATION|ROOM_LOCATION` - Get locations (authenticated users)
- `POST /api/settings/locations` - Create new location (admin only)
- `PUT /api/settings/locations/:id` - Update location (admin only)
- `DELETE /api/settings/locations/:id` - Delete location (admin only)

## Admin UI Features

### Settings Tab
Access: Admin Dashboard → Settings tab (last tab with gear icon)

#### Asset Categories Section
- **View all categories**: See current asset categories with enabled/disabled status
- **Add new category**: Create custom asset categories with name and label
- **Edit category**: Update category labels and names
- **Enable/Disable**: Toggle categories on/off without deleting
- **Delete**: Remove categories permanently

#### Locations Section
Split into two subsections:

**Bin Locations (Waste Reports)**
- Manage campus bin locations for waste reporting
- Edit location names and codes
- Enable/disable locations
- Delete obsolete locations

**Room Locations (Asset Reports)**
- Manage room/building locations for asset reporting
- Specify building associations
- Edit location details
- Enable/disable locations

### How to Use

#### Adding a New Asset Category
1. Navigate to Admin Dashboard → Settings
2. Stay on "Asset Categories" section
3. Click "Add Category" button
4. Enter:
   - Category name (lowercase, e.g., "appliances")
   - Display label (e.g., "Appliances")
5. Click "Save"

#### Adding a New Location
1. Navigate to Admin Dashboard → Settings
2. Switch to "Locations" section
3. Fill in the form:
   - Location code (e.g., "LOC-11" or "ROOM-13")
   - Location name (e.g., "Library 3rd Floor")
   - Type: Select "Bin Location" or "Room Location"
   - Building (only for room locations)
4. Click "Add Location"

#### Editing Existing Items
1. Click the pencil/edit icon next to any category or location
2. Modify the values
3. Click "Save" to confirm or "Cancel" to discard

#### Enabling/Disabling Items
- Click the status badge (Enabled/Disabled) to toggle
- Disabled items won't appear in report forms but remain in the database
- Useful for temporary changes without data loss

## Backend Integration

### Report Creation Logic
The backend (`reportController.js`) now:
1. Fetches enabled asset categories from the database
2. Determines report type (WASTE or ASSET) based on dynamic categories
3. Validates against current enabled categories only

### Seeded Data
Default data includes:
- 5 asset categories: furniture, electronics, fixtures, equipment, other
- 10 bin locations (LOC-01 through LOC-10)
- 12 room locations (ROOM-01 through ROOM-12)

## Frontend Hooks

### useSettings.js
Located at: `src/hooks/useSettings.js`

Provides two hooks:
- `useAssetCategories()` - Fetch and manage asset categories
- `useLocations(type)` - Fetch locations by type (BIN_LOCATION or ROOM_LOCATION)

Both hooks include:
- Loading states
- Error handling
- Automatic fallback to defaults if API fails
- Refresh functionality

## Benefits

### For Admins
- **Flexibility**: Adjust categories and locations without code changes
- **Real-time**: Changes take effect immediately
- **Safe**: Enable/disable instead of delete to preserve data
- **Organized**: Clear visual interface for management

### For the System
- **Scalable**: Easy to add new asset types as campus needs grow
- **Maintainable**: Centralized configuration reduces code duplication
- **Validated**: Backend enforces enabled categories only
- **Future-proof**: Database-driven approach supports expansion

## Testing Checklist

- [x] Database migration successful
- [x] Seeding populates default data
- [x] API endpoints respond correctly
- [x] Admin can view categories and locations
- [x] Admin can add new categories
- [x] Admin can add new locations
- [x] Admin can edit items
- [x] Admin can enable/disable items
- [x] Admin can delete items
- [x] Non-admin users cannot access write endpoints
- [x] Report creation respects enabled categories
- [ ] Frontend forms load dynamic categories
- [ ] Location dropdowns use dynamic data

## Future Enhancements

1. **Drag-and-drop reordering**: Adjust sortOrder visually
2. **Bulk operations**: Enable/disable multiple items at once
3. **Map integration**: Visual pin placement for locations
4. **Category icons**: Custom icons for each asset category
5. **Import/Export**: Backup and restore settings
6. **Audit log**: Track who changed what and when
7. **Category descriptions**: Extended info for each category
8. **Location photos**: Visual reference for each location

## Files Modified/Created

### Backend
- `backend/prisma/schema.prisma` - Added AssetCategory and Location models
- `backend/prisma/seed.js` - Added seeding for new tables
- `backend/src/controllers/settingsController.js` - NEW: Settings CRUD operations
- `backend/src/routes/settings.js` - NEW: Settings API routes
- `backend/src/index.js` - Registered settings routes
- `backend/src/controllers/reportController.js` - Updated to use dynamic categories

### Frontend
- `src/pages/AdminDashboard/tabs/SettingsTab.tsx` - NEW: Settings management UI
- `src/pages/AdminDashboard/index.tsx` - Added Settings tab
- `src/services/api.js` - Added settings API methods
- `src/hooks/useSettings.js` - NEW: Hooks for fetching settings

## Access

**Admin Dashboard**: http://localhost:5173/admin
**Credentials**: admin / admin123
**Settings Tab**: Last tab in the navigation (gear icon)
