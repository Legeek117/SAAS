const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const campaigns = await prisma.campaign.findMany({ 
        where: { isActive: true },
        include: { _count: { select: { contents: true } } }
    });
    
    console.log(`--- CAMPAIGN CONTENT DIAGNOSTIC ---`);
    campaigns.forEach(c => {
        console.log(`Campaign: "${c.name}" (${c.id})`);
        console.log(` - GroupID: ${c.groupId}`);
        console.log(` - Content Count: ${c._count.contents}`);
    });
}

check().catch(console.error).finally(() => prisma.$disconnect());
