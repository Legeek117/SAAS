const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function assignDefaultGroup() {
    try {
        console.log('🔍 Recherche des comptes sans groupe...');
        
        // Find accounts without groupId
        const accountsWithoutGroup = await prisma.twitterAccount.findMany({
            where: {
                groupId: null
            }
        });

        console.log(`📊 ${accountsWithoutGroup.length} comptes trouvés sans groupe`);

        if (accountsWithoutGroup.length === 0) {
            console.log('✅ Tous les comptes ont déjà un groupe!');
            return;
        }

        // Create or find default group
        let defaultGroup = await prisma.accountGroup.findFirst({
            where: {
                name: 'Default Group'
            }
        });

        if (!defaultGroup) {
            console.log('📝 Création du groupe par défaut...');
            defaultGroup = await prisma.accountGroup.create({
                data: {
                    name: 'Default Group',
                    description: 'Groupe par défaut pour les comptes existants',
                    taskType: 'engagement',
                    isActive: true,
                    userId: 'temp-user-id'
                }
            });
            console.log(`✅ Groupe par défaut créé: ${defaultGroup.id}`);
        } else {
            console.log(`✅ Groupe par défaut trouvé: ${defaultGroup.id}`);
        }

        // Assign all accounts to default group
        console.log('🔄 Assignation des comptes au groupe par défaut...');
        const updatePromises = accountsWithoutGroup.map(account => 
            prisma.twitterAccount.update({
                where: { id: account.id },
                data: { groupId: defaultGroup.id }
            })
        );

        await Promise.all(updatePromises);
        console.log(`✅ ${accountsWithoutGroup.length} comptes assignés au groupe par défaut`);

    } catch (error) {
        console.error('❌ Erreur:', error);
    } finally {
        await prisma.$disconnect();
    }
}

assignDefaultGroup();
