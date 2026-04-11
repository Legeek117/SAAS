const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const campaigns = await prisma.campaign.findMany({ where: { isActive: true } });
    const autoAccounts = await prisma.twitterAccount.findMany({ where: { autoMode: true } });
    const groups = await prisma.accountGroup.findMany();
    
    console.log(`--- DB DIAGNOSTIC ---`);
    console.log(`Active Campaigns: ${campaigns.length}`);
    campaigns.forEach(c => console.log(` - Campaign: "${c.name}", GroupID: ${c.groupId}`));
    
    console.log(`Groups: ${groups.length}`);
    groups.forEach(g => console.log(` - Group: "${g.name}", ID: ${g.id}`));

    console.log(`AutoMode Accounts: ${autoAccounts.length}`);
    autoAccounts.forEach(a => console.log(` - Account: ${a.username}, GroupID: ${a.groupId}, Type: ${a.type}`));
}

check().catch(console.error).finally(() => prisma.$disconnect());
