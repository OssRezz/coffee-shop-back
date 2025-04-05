import { PrismaClient } from '@prisma/client';
import { seedRegions } from './seeders/region.seeder';

const prisma = new PrismaClient();

async function main() {
  await seedRegions();
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
