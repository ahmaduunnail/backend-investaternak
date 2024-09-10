// prisma/seed/users.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
    await prisma.user.createMany({
        data: [
            {
                username: 'john_doe',
                password: 'hashed_password_1', // Ensure this is hashed if required
                name: 'John Doe',
                imageProfileUrl: 'https://example.com/image1.jpg',
                role: 'USERS',
            },
            {
                username: 'jane_smith',
                password: 'hashed_password_2', // Ensure this is hashed if required
                name: 'Jane Smith',
                imageProfileUrl: 'https://example.com/image2.jpg',
                role: 'ADMIN',
            },
            {
                username: 'alice_johnson',
                password: 'hashed_password_3', // Ensure this is hashed if required
                name: 'Alice Johnson',
                imageProfileUrl: 'https://example.com/image3.jpg',
                role: 'FARMERS',
            },
            {
                username: 'bob_brown',
                password: 'hashed_password_4', // Ensure this is hashed if required
                name: 'Bob Brown',
                imageProfileUrl: 'https://example.com/image4.jpg',
                role: 'USERS',
            },
            {
                username: 'carol_white',
                password: 'hashed_password_5', // Ensure this is hashed if required
                name: 'Carol White',
                imageProfileUrl: 'https://example.com/image5.jpg',
                role: 'ADMIN',
            },
        ],
        skipDuplicates: true
    });

    const getIdByUsername = async (name: string) => {
        const res: any = await prisma.user.findUnique({
            where: { username: name },
            select: {
                id: true
            }
        })

        return res.id
    }

    const data = [
        {
            email: 'john@example.com',
            nik: '123456789',
            address: '123 Main St',
            job: 'Software Engineer',
            point: 100,
            userId: await getIdByUsername("john_doe"), // Replace with the actual ID
        },
        {
            email: 'jane@example.com',
            nik: '987654321',
            address: '456 Elm St',
            job: 'Product Manager',
            point: 150,
            userId: await getIdByUsername("jane_smith"), // Replace with the actual ID
        },
        {
            email: 'alice@example.com',
            nik: '112233445',
            address: '789 Oak St',
            job: 'Farm Specialist',
            point: 200,
            userId: await getIdByUsername("alice_johnson"), // Replace with the actual ID
        },
        {
            email: 'bob@example.com',
            nik: '556677889',
            address: '101 Pine St',
            job: 'Consultant',
            point: 50,
            userId: await getIdByUsername("bob_brown"), // Replace with the actual ID
        },
        {
            email: 'carol@example.com',
            nik: '998877665',
            address: '202 Maple St',
            job: 'Designer',
            point: 120,
            userId: await getIdByUsername("carol_white"), // Replace with the actual ID
        },
    ]

    await prisma.profile.createMany({
        data: data,
        skipDuplicates: true
    });
}

seedUsers()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
