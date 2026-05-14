import { PrismaClient } from './generated/prisma/index.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const prisma = new PrismaClient();

const students = [
    {
        username: 'a.rivera',
        password: 'Rivera2026!',
        role: 'STUDENT',
        firstName: 'Alyssa',
        lastName: 'Rivera',
        email: 'alyssa.rivera@school.edu',
        lrn: 'LRN202600001',
        yearLevel: 'Grade 11',
        section: 'A'
    },
    {
        username: 'j.delacruz',
        password: 'DeLaCruz2026!',
        role: 'STUDENT',
        firstName: 'Jordan',
        lastName: 'De La Cruz',
        email: 'jordan.delacruz@school.edu',
        lrn: 'LRN202600002',
        yearLevel: 'Grade 12',
        section: 'B'
    },
    {
        username: 'm.santos',
        password: 'Santos2026!',
        role: 'STUDENT',
        firstName: 'Mika',
        lastName: 'Santos',
        email: 'mika.santos@school.edu',
        lrn: 'LRN202600003',
        yearLevel: 'Grade 10',
        section: 'C'
    }
];

async function resetStudents() {
    try {
        console.log('Removing existing student accounts...');
        const deleted = await prisma.user.deleteMany({
            where: { role: 'STUDENT' }
        });
        console.log(`Deleted ${deleted.count} student accounts.`);

        console.log('Creating new student accounts...');
        for (const student of students) {
            const hashedPassword = await bcrypt.hash(student.password, 10);
            await prisma.user.create({
                data: {
                    username: student.username,
                    password: hashedPassword,
                    role: student.role,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email,
                    lrn: student.lrn,
                    yearLevel: student.yearLevel,
                    section: student.section
                }
            });
            console.log(`Created ${student.username} (${student.firstName} ${student.lastName})`);
        }

        console.log('Done. Student accounts reset.');
    } catch (error) {
        console.error('Error resetting students:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetStudents();
