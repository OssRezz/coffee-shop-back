import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRegions() {
  const regiones = [
    { id: 1, name: 'Caldas' },
    { id: 2, name: 'Risaralda' },
    { id: 3, name: 'Quindío' },
    { id: 4, name: 'Antioquia' },
    { id: 5, name: 'Tolima' },
    { id: 6, name: 'Huila' },
    { id: 7, name: 'Cauca' },
    { id: 8, name: 'Nariño' },
    { id: 9, name: 'Valle del Cauca' },
    { id: 10, name: 'Cundinamarca' },
    { id: 11, name: 'Santander' },
    { id: 12, name: 'Sierra Nevada de Santa Marta' },
  ];

  await prisma.region.deleteMany();
  await prisma.region.createMany({ data: regiones });

  console.log('✅ Seed: regions completed successfully');
}
