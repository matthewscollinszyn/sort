import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// RBAC Demo Accounts
// Format: username / password
// - student1 / student123
// - student2 / student123
// - student3 / student123
// - teacher / teacher123
// - ricomendoza / rico123 (MRF Staff)
// - admin / admin123

const demoUsers = [
    {
        username: 'student1',
        password: 'student123',
        role: 'STUDENT',
        firstName: 'Ava',
        lastName: 'Santos',
        email: 'student1@school.edu',
        lrn: 'LRN000000001',
        yearLevel: 'Grade 11',
        section: 'A',
        points: 0,
        reports: 0
    },
    {
        username: 'student2',
        password: 'student123',
        role: 'STUDENT',
        firstName: 'Noah',
        lastName: 'Reyes',
        email: 'student2@school.edu',
        lrn: 'LRN000000002',
        yearLevel: 'Grade 10',
        section: 'B',
        points: 0,
        reports: 0
    },
    {
        username: 'student3',
        password: 'student123',
        role: 'STUDENT',
        firstName: 'Mia',
        lastName: 'Cruz',
        email: 'student3@school.edu',
        lrn: 'LRN000000003',
        yearLevel: 'Grade 12',
        section: 'C',
        points: 0,
        reports: 0
    },
    {
        username: 'teacher',
        password: 'teacher123',
        role: 'TEACHER',
        firstName: 'Grace',
        lastName: 'Velasco',
        email: 'teacher@school.edu',
        yearLevel: null,
        section: null,
        points: 0,
        reports: 0
    },
    {
        username: 'ricomendoza',
        password: 'rico123',
        role: 'MRF',
        firstName: 'Rico',
        lastName: 'Mendoza',
        email: 'rico.mendoza@school.edu',
        yearLevel: null,
        section: null,
        points: 0,
        reports: 0
    },
    {
        username: 'admin',
        password: 'admin123',
        role: 'ADMIN',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@school.edu',
        yearLevel: null,
        section: null,
        points: 0,
        reports: 0
    }
];

const defaultNews = [
    {
        tag: 'MRF Update',
        date: 'Feb 24, 2026',
        title: 'Extended Collection Hours Campus-Wide',
        desc: 'Starting March 1, MRF collection trucks will operate from 6 AM to 8 PM on weekdays — two extra hours to keep campus clean.',
    },
    {
        tag: 'New Facility',
        date: 'Feb 20, 2026',
        title: '5 New Segregation Stations Installed',
        desc: 'Color-coded recycling stations are now live near Science Hall, the Gym, and Admin Building. Look for the green, blue, and yellow bins.',
    },
    {
        tag: 'Achievement',
        date: 'Feb 18, 2026',
        title: 'Campus Hits 2,000+ Reports This Semester',
        desc: 'Thanks to student participation, our campus filed over 2,000 waste reports — a 68% increase from last semester.',
    },
];

const defaultSystemSettings = [
    { key: 'points_1st', value: '15', label: '1st Reporter Points' },
    { key: 'points_2nd', value: '10', label: '2nd Reporter Points' },
    { key: 'points_3rd', value: '5', label: '3rd Reporter Points' },
    { key: 'points_gold_threshold', value: '300', label: 'Gold Certificate Quarterly Threshold' },
    { key: 'current_quarter_end', value: null, label: 'Current Quarter End Date (YYYY-MM-DD)' },
];

async function main() {
    console.log('🌱 Seeding database with demo users...\n');

    const createdUsers = [];

    for (const user of demoUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const created = await prisma.user.upsert({
            where: { username: user.username },
            update: {
                password: hashedPassword,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                lrn: user.lrn || null,
                yearLevel: user.yearLevel || null,
                section: user.section || null,
                points: user.points || 0,
                reports: user.reports || 0
            },
            create: {
                username: user.username,
                password: hashedPassword,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                lrn: user.lrn || null,
                yearLevel: user.yearLevel || null,
                section: user.section || null,
                points: user.points || 0,
                reports: user.reports || 0
            }
        });

        console.log(`✅ User created/updated: ${created.username} (${created.role})`);
        createdUsers.push(created);
    }

    // Only seed campus news if none exist
    const newsCount = await prisma.campusNews.count();
    if (newsCount === 0) {
        const adminUser = createdUsers.find((user) => user.role === 'ADMIN');
        await prisma.campusNews.createMany({
            data: defaultNews.map((item) => ({
                ...item,
                publishedById: adminUser?.id || null,
            })),
        });
        console.log('📰 Seeded campus news');
    } else {
        console.log('📰 Skipped campus news (already exists)');
    }

    // Seed system settings defaults so point values align with the UI and backend logic
    for (const setting of defaultSystemSettings) {
        await prisma.systemSettings.upsert({
            where: { key: setting.key },
            update: {
                value: setting.value,
                label: setting.label,
            },
            create: setting,
        });
    }
    console.log('⚙️  Seeded system settings');

    // Upsert asset categories (safe, never deletes existing)
    const defaultCategories = [
        { name: 'furniture', label: 'Furniture', sortOrder: 1 },
        { name: 'electronics', label: 'Electronics', sortOrder: 2 },
        { name: 'fixtures', label: 'Fixtures', sortOrder: 3 },
        { name: 'equipment', label: 'Equipment', sortOrder: 4 },
        { name: 'other', label: 'Other', sortOrder: 5 }
    ];

    const createdCategories = {};
    for (const cat of defaultCategories) {
        const category = await prisma.assetCategory.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        });
        createdCategories[cat.name] = category.id;
    }
    console.log('🏷️  Seeded asset categories');

    // Upsert item presets (safe, never deletes existing)
    const existingPresetNames = new Set(
        (await prisma.itemPreset.findMany({ select: { name: true } })).map(p => p.name)
    );
    const defaultItemPresets = [
        // Furniture items
        { name: 'Arm Chair (Plastic)', icon: '🪑', categoryId: createdCategories.furniture, sortOrder: 1 },
        { name: 'Arm Chair (Wooden)', icon: '🪑', categoryId: createdCategories.furniture, sortOrder: 2 },
        { name: 'Office Chair', icon: '🪑', categoryId: createdCategories.furniture, sortOrder: 3 },
        { name: 'Student Desk', icon: '🪑', categoryId: createdCategories.furniture, sortOrder: 4 },
        { name: 'Teacher\'s Table', icon: '🪑', categoryId: createdCategories.furniture, sortOrder: 5 },
        { name: 'Wooden Table', icon: '🪑', categoryId: createdCategories.furniture, sortOrder: 6 },
        { name: 'Filing Cabinet', icon: '🗄️', categoryId: createdCategories.furniture, sortOrder: 7 },
        { name: 'Bookshelf', icon: '📚', categoryId: createdCategories.furniture, sortOrder: 8 },
        { name: 'Whiteboard Stand', icon: '📋', categoryId: createdCategories.furniture, sortOrder: 9 },
        // Electronics items
        { name: 'Desktop Computer', icon: '🖥️', categoryId: createdCategories.electronics, sortOrder: 1 },
        { name: 'Laptop', icon: '💻', categoryId: createdCategories.electronics, sortOrder: 2 },
        { name: 'LCD Projector', icon: '📽️', categoryId: createdCategories.electronics, sortOrder: 3 },
        { name: 'LED TV/Monitor', icon: '📺', categoryId: createdCategories.electronics, sortOrder: 4 },
        { name: 'Printer', icon: '🖨️', categoryId: createdCategories.electronics, sortOrder: 5 },
        { name: 'Scanner', icon: '🖨️', categoryId: createdCategories.electronics, sortOrder: 6 },
        { name: 'Speaker System', icon: '🔊', categoryId: createdCategories.electronics, sortOrder: 7 },
        { name: 'Microphone', icon: '🎤', categoryId: createdCategories.electronics, sortOrder: 8 },
        { name: 'Document Camera', icon: '📷', categoryId: createdCategories.electronics, sortOrder: 9 },
        // Fixtures items
        { name: 'Ceiling Light/Fluorescent', icon: '💡', categoryId: createdCategories.fixtures, sortOrder: 1 },
        { name: 'Ceiling Fan', icon: '🌀', categoryId: createdCategories.fixtures, sortOrder: 2 },
        { name: 'Wall-mounted AC Unit', icon: '❄️', categoryId: createdCategories.fixtures, sortOrder: 3 },
        { name: 'Standing Fan', icon: '🌀', categoryId: createdCategories.fixtures, sortOrder: 4 },
        { name: 'Exhaust Fan', icon: '🌀', categoryId: createdCategories.fixtures, sortOrder: 5 },
        { name: 'Wall Clock', icon: '🕐', categoryId: createdCategories.fixtures, sortOrder: 6 },
        { name: 'Whiteboard (Wall-mounted)', icon: '📋', categoryId: createdCategories.fixtures, sortOrder: 7 },
        { name: 'Bulletin Board', icon: '📌', categoryId: createdCategories.fixtures, sortOrder: 8 },
        // Equipment items
        { name: 'Laboratory Equipment', icon: '🔬', categoryId: createdCategories.equipment, sortOrder: 1 },
        { name: 'Sports Equipment', icon: '⚽', categoryId: createdCategories.equipment, sortOrder: 2 },
        { name: 'Cleaning Tools', icon: '🧹', categoryId: createdCategories.equipment, sortOrder: 3 },
        { name: 'Fire Extinguisher', icon: '🧯', categoryId: createdCategories.equipment, sortOrder: 4 },
        { name: 'First Aid Kit', icon: '🩹', categoryId: createdCategories.equipment, sortOrder: 5 },
        { name: 'Water Dispenser', icon: '💧', categoryId: createdCategories.equipment, sortOrder: 6 },
        { name: 'Ladder', icon: '🪜', categoryId: createdCategories.equipment, sortOrder: 7 },
        // Other items
        { name: 'Curtains/Blinds', icon: '🪟', categoryId: createdCategories.other, sortOrder: 1 },
        { name: 'Carpet/Rugs', icon: '🧶', categoryId: createdCategories.other, sortOrder: 2 },
        { name: 'Door/Lock', icon: '🚪', categoryId: createdCategories.other, sortOrder: 3 },
        { name: 'Window', icon: '🪟', categoryId: createdCategories.other, sortOrder: 4 },
        { name: 'Plumbing Fixture', icon: '🚰', categoryId: createdCategories.other, sortOrder: 5 },
        { name: 'Custom Item', icon: '📦', categoryId: createdCategories.other, sortOrder: 6 }
    ];
    const newPresets = defaultItemPresets.filter(p => !existingPresetNames.has(p.name));
    if (newPresets.length > 0) {
        await prisma.itemPreset.createMany({ data: newPresets });
    }
    console.log('📦 Seeded item presets');

    // Upsert locations (safe, never deletes existing)
    const defaultLocations = [
        // Bin locations for waste reports
        { code: 'LOC-01', name: 'Cafeteria – Block A', type: 'BIN_LOCATION', sortOrder: 1, mapX: 63.3, mapY: 40.0 },
        { code: 'LOC-02', name: 'Library Entrance', type: 'BIN_LOCATION', sortOrder: 2, mapX: 44.1, mapY: 62.8 },
        { code: 'LOC-03', name: 'Gym Hallway', type: 'BIN_LOCATION', sortOrder: 3, mapX: 39.2, mapY: 23.0 },
        { code: 'LOC-04', name: 'Engineering Bldg – 2F', type: 'BIN_LOCATION', sortOrder: 4, mapX: 20.5, mapY: 35.2 },
        { code: 'LOC-05', name: 'Parking Lot B', type: 'BIN_LOCATION', sortOrder: 5, mapX: 34.5, mapY: 71.3 },
        { code: 'LOC-06', name: 'Student Center', type: 'BIN_LOCATION', sortOrder: 6, mapX: 55.0, mapY: 52.5 },
        { code: 'LOC-07', name: 'Science Hall – 1F', type: 'BIN_LOCATION', sortOrder: 7, mapX: 28.4, mapY: 68.1 },
        { code: 'LOC-08', name: 'Admin Building Lobby', type: 'BIN_LOCATION', sortOrder: 8, mapX: 50.2, mapY: 18.5 },
        { code: 'LOC-09', name: 'Arts Building – GF', type: 'BIN_LOCATION', sortOrder: 9, mapX: 78.6, mapY: 25.4 },
        { code: 'LOC-10', name: 'Main Gate Area', type: 'BIN_LOCATION', sortOrder: 10, mapX: 12.5, mapY: 82.0 },
        // Room locations for asset reports
        { code: 'ROOM-01', name: 'Room 101 – Science Hall', type: 'ROOM_LOCATION', building: 'Science Hall', sortOrder: 1 },
        { code: 'ROOM-02', name: 'Room 102 – Admin Building', type: 'ROOM_LOCATION', building: 'Admin Building', sortOrder: 2 },
        { code: 'ROOM-03', name: 'Room 201 – Science Hall', type: 'ROOM_LOCATION', building: 'Science Hall', sortOrder: 3 },
        { code: 'ROOM-04', name: 'Room 204 – Arts Building', type: 'ROOM_LOCATION', building: 'Arts Building', sortOrder: 4 },
        { code: 'ROOM-05', name: 'Room 305 – Engineering', type: 'ROOM_LOCATION', building: 'Engineering Building', sortOrder: 5 },
        { code: 'ROOM-06', name: 'Computer Lab 1 – IT Building', type: 'ROOM_LOCATION', building: 'IT Building', sortOrder: 6 },
        { code: 'ROOM-07', name: 'Computer Lab 2 – IT Building', type: 'ROOM_LOCATION', building: 'IT Building', sortOrder: 7 },
        { code: 'ROOM-08', name: 'Computer Lab 3 – IT Building', type: 'ROOM_LOCATION', building: 'IT Building', sortOrder: 8 },
        { code: 'ROOM-09', name: 'Faculty Office – Admin Building', type: 'ROOM_LOCATION', building: 'Admin Building', sortOrder: 9 },
        { code: 'ROOM-10', name: 'Conference Room – Admin Building', type: 'ROOM_LOCATION', building: 'Admin Building', sortOrder: 10 },
        { code: 'ROOM-11', name: 'Library – 2nd Floor', type: 'ROOM_LOCATION', building: 'Library', sortOrder: 11 },
        { code: 'ROOM-12', name: 'Gym – Sports Complex', type: 'ROOM_LOCATION', building: 'Sports Complex', sortOrder: 12 }
    ];
    await prisma.location.createMany({
        data: defaultLocations,
        skipDuplicates: true
    });
    console.log('📍 Seeded campus locations');

    // Seed waste types
    const defaultWasteTypes = [
        { key: 'recyclable', label: 'Recyclable', emoji: '♻️', sortOrder: 1 },
        { key: 'biodegradable', label: 'Biodegradable', emoji: '🌿', sortOrder: 2 },
        { key: 'residual', label: 'Residual', emoji: '🗑️', sortOrder: 3 },
        { key: 'hazardous', label: 'Special/Hazardous', emoji: '☣️', sortOrder: 4 },
    ];
    await prisma.wasteType.createMany({
        data: defaultWasteTypes,
        skipDuplicates: true
    });
    console.log('🗑️  Seeded waste types');

    // Seed urgency levels
    const defaultUrgencyLevels = [
        {
            key: 'low',
            label: 'Low',
            description: 'Not full yet, but reported',
            color: 'border-slate-400 bg-slate-100 text-slate-500',
            sortOrder: 1
        },
        {
            key: 'normal',
            label: 'Normal',
            description: 'Full, needs collection',
            color: 'border-amber-500/30 bg-amber-400/10 text-amber-400',
            sortOrder: 2
        },
        {
            key: 'high',
            label: 'Urgent',
            description: 'Overflowing / hazard',
            color: 'border-red-500/30 bg-red-400/10 text-red-400',
            sortOrder: 3
        },
    ];
    await prisma.urgencyLevel.createMany({
        data: defaultUrgencyLevels,
        skipDuplicates: true
    });
    console.log('⚠️  Seeded urgency levels');

    // Seed asset conditions
    const defaultAssetConditions = [
        { key: 'damaged', label: 'Damaged', description: 'Broken but may be repairable', sortOrder: 1 },
        { key: 'malfunctioning', label: 'Malfunctioning', description: 'Not working properly', sortOrder: 2 },
        { key: 'worn', label: 'Worn Out', description: 'Heavy wear, needs replacement', sortOrder: 3 },
        { key: 'missing', label: 'Missing Parts', description: 'Incomplete, parts missing', sortOrder: 4 },
    ];
    await prisma.assetCondition.createMany({
        data: defaultAssetConditions,
        skipDuplicates: true
    });
    console.log('🔧 Seeded asset conditions');

    console.log('\n🎉 Seeding complete!\n');
    console.log('Demo Credentials (LRN-based login):');
    console.log('─────────────────────────────────');
    demoUsers.forEach(u => {
        console.log(`  ${u.role.padEnd(8)} → ${u.username} / ${u.password}`);
    });
    console.log('─────────────────────────────────');
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
