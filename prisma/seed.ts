import { PrismaClient } from '@prisma/client';
import { seedRegions } from './seeders/region.seeder';
import { seedProductTypes } from './seeders/product-types.seeder';
const prisma = new PrismaClient();

async function main() {
  await seedRegions();
  await seedProductTypes();
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
