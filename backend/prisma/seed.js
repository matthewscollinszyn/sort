import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// RBAC Demo Accounts
// Format: username / password
// - student / student123
// - teacher / teacher123
// - mrf / mrf123
// - admin / admin123

const demoUsers = [
    {
        username: 'student',
        password: 'student123',
        role: 'STUDENT',
        firstName: 'Student',
        lastName: 'User',
        email: 'student@school.edu',
        studentId: 'LRN000000001',
        course: '',
        section: '',
        department: '',
        points: 0,
        reports: 0
    },
    {
        username: 'teacher',
        password: 'teacher123',
        role: 'TEACHER',
        firstName: 'Teacher',
        lastName: 'User',
        email: 'teacher@school.edu',
        department: '',
        points: 0,
        reports: 0
    },
    {
        username: 'mrf',
        password: 'mrf123',
        role: 'MRF',
        firstName: 'MRF Staff',
        lastName: 'User',
        email: 'mrf@school.edu',
        department: 'Materials Recovery Facility',
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
        department: 'Administration',
        points: 0,
        reports: 0
    }
];

async function main() {
    console.log('🌱 Seeding database with demo users...\n');

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
                studentId: user.studentId || null,
                course: user.course || null,
                section: user.section || null,
                department: user.department || null,
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
                studentId: user.studentId || null,
                course: user.course || null,
                section: user.section || null,
                department: user.department || null,
                points: user.points || 0,
                reports: user.reports || 0
            }
        });

        console.log(`✅ User created/updated: ${created.username} (${created.role})`);
    }

    // Clear any existing reports for a fresh start
    await prisma.report.deleteMany({});
    console.log('\n🗑️  Cleared existing reports for fresh start');

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
