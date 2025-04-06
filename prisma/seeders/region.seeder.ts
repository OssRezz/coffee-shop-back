import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRegions() {
  const regiones = [
    { name: 'Caldas' },
    { name: 'Risaralda' },
    { name: 'Quindío' },
    { name: 'Antioquia' },
    { name: 'Tolima' },
    { name: 'Huila' },
    { name: 'Cauca' },
    { name: 'Nariño' },
    { name: 'Valle del Cauca' },
    { name: 'Cundinamarca' },
    { name: 'Santander' },
    { name: 'Sierra Nevada de Santa Marta' },
  ];

  await prisma.region.deleteMany();
  await prisma.$executeRawUnsafe(`
    ALTER SEQUENCE public.regions_id_seq RESTART WITH 1;
  `);
  await prisma.region.createMany({ data: regiones });


  console.log('✅ Seed: regions completed successfully');
}
