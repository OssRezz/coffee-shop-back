import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProductTypes() {
  const productTypes = [
    { name: 'Café en grano' },
    { name: 'Café molido' },
    { name: 'Café instantáneo' },
    { name: 'Café en cápsulas' },
    { name: 'Café en sobres' },
    { name: 'Café liofilizado' },
    { name: 'Café verde (sin tostar)' },
    { name: 'Café descafeinado' },
    { name: 'Café líquido (embotellado o enlatado)' },
  ];

  await prisma.productType.deleteMany();
  await prisma.$executeRawUnsafe(`
    ALTER SEQUENCE product_types_id_seq RESTART WITH 1;
  `);
  await prisma.productType.createMany({ data: productTypes });

  console.log('✅ Seed: product types completed successfully');
}
