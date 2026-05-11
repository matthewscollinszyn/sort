# Schema Field Catalog

Source: backend/prisma/schema.prisma

Note: Length is only listed when a native DB type specifies it (e.g., @db.VarChar(255)).

## User

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| username | String | | Unique username |
| password | String | | Password hash |
| role | Role | | User role (default STUDENT) |
| firstName | String? | | First name |
| lastName | String? | | Last name |
| email | String? | | Unique email |
| studentId | String? | | Unique student ID |
| course | String? | | Course name/code |
| section | String? | | Class section |
| department | String? | | Department name |
| points | Int | | Points total |
| reports | Int | | Report count |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |
| submittedReports | Report[] | | Reports submitted by user |
| assignedReports | Report[] | | Reports assigned to user (MRF staff) |
| newsPosts | CampusNews[] | | News posts published by user |

## Report

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| location | String | | Location description |
| notes | String? | | Report notes |
| photoUrl | String? | | Photo URL |
| urgency | String | | Urgency label (default "normal") |
| wasteType | String | | Waste type label (default "general") |
| type | ReportType | | Report type (WASTE/ASSET) |
| status | ReportStatus | | Workflow status |
| assignedStaffId | Int? | | Assigned staff user ID |
| kilosCollected | Float? | | Collected weight in kilograms |
| collectionDate | DateTime? | | Collection confirmation time |
| userId | Int | | Reporting user ID |
| user | User | | Reporting user relation |
| assignedStaff | User? | | Assigned staff relation |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |

## CampusNews

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| tag | String | | Tag label |
| date | String | | Display date string |
| title | String | | News title |
| desc | String | | News description |
| publishedById | Int? | | Publisher user ID |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |
| publishedBy | User? | | Publisher relation |

## AssetCategory

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| name | String | | Unique category name |
| label | String | | Display label |
| enabled | Boolean | | Enabled flag |
| sortOrder | Int | | Sort order |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |
| itemPresets | ItemPreset[] | | Presets in this category |

## ItemPreset

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| name | String | | Preset name |
| icon | String | | Icon emoji (default ":package:") |
| categoryId | Int | | Category ID |
| enabled | Boolean | | Enabled flag |
| sortOrder | Int | | Sort order |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |
| category | AssetCategory | | Category relation |

## Location

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| code | String | | Unique code (e.g., LOC-01, ROOM-01) |
| name | String | | Display name |
| type | LocationType | | Location type |
| building | String? | | Building name for rooms |
| enabled | Boolean | | Enabled flag |
| sortOrder | Int | | Sort order |
| mapX | Float? | | Map X coordinate |
| mapY | Float? | | Map Y coordinate |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |

## CampusMap

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| imageData | String | | Base64 encoded image (@db.Text) |
| imageName | String? | | Image filename |
| imageSize | String? | | Image size label |
| uploadedById | Int? | | Uploader user ID |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |

## BinStatus

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| locationId | Int | | Location ID (unique) |
| fillStatus | String | | Fill status (empty/half/full) |
| lastUpdated | DateTime | | Last status update time |
| updatedBy | Int? | | Updating user ID |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |

## SystemSettings

| Field Name | Data Type | Length | Description |
| --- | --- | --- | --- |
| id | Int | | Primary key |
| key | String | | Unique setting key |
| value | String | | Stored value (string) |
| label | String? | | Human-readable label |
| updatedById | Int? | | Updating user ID |
| createdAt | DateTime | | Created timestamp |
| updatedAt | DateTime | | Updated timestamp |
