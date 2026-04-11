const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const groups = await prisma.accountGroup.findMany({
    include: {
      accounts: true,
      campaigns: true
    }
  });
  console.log('--- GROUPS ---');
  groups.forEach(g => {
    console.log(`Group: ${g.name} (${g.id}), Accounts: ${g.accounts.length}, Campaigns: ${g.campaigns.length}`);
    g.campaigns.forEach(c => {
        console.log(`  - Campaign: ${c.name} (${c.isActive ? 'ACTIVE' : 'INACTIVE'})`);
    });
  });

  const activeCampaigns = await prisma.campaign.findMany({
    where: { isActive: true },
    include: { contents: true }
  });
  console.log('\n--- ACTIVE CAMPAIGNS ---');
  activeCampaigns.forEach(c => {
    console.log(`Campaign: ${c.name}, Content Count: ${c.contents.length}, GroupId: ${c.groupId}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
