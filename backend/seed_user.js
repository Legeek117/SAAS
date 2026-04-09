const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('YVeT6TFm', 10);
    
    await prisma.user.upsert({
        where: { id: 'admin-user-id' },
        update: {},
        create: {
            id: 'admin-user-id',
            email: 'ghost@centent.com',
            password: hashedPassword,
            role: 'ADMIN',
            isActive: true
        }
    });

    // Also update the temp user to have a hashed password if it's used elsewhere
    const tempHashedPassword = await bcrypt.hash('password', 10);
    await prisma.user.upsert({
        where: { id: 'temp-user-id' },
        update: {},
        create: {
            id: 'temp-user-id',
            email: 'admin@duupflow.com',
            password: tempHashedPassword,
            role: 'USER',
            isActive: true
        }
    });

    console.log("Admin account (ghost@centent.com) and temp user created/updated");
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
