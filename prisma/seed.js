import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.food.deleteMany();

    await prisma.food.createMany({
        data: [
            {
                name: 'macarrão a Bolonhesa',
                description: 'Massa feita de trigo acompanhado por molho de tomate e carne moida',
                price: 15.50,
                category: 'massas',
                available: true,
            },
            {
                name: 'Balde de Frango frito',
                description: 'coxinhas empanadas em farinha panko e fritasna hora',
                price: 20.76,
                category: 'frituras',
                available: false,
            },
            {
                name: 'Lasanha 4 queijos',
                description: 'tradicional Lasanha ',
                price: 85.00,
                category: 'carnes',
                available: true,
            },
            {
                name: 'costela com molho barbecue',
                description: 'costelas feitas na churrasqueira que vem acompanhadas de molho barbecue',
                price: 100.00,
                category: 'carnes',
                available: true,
            },
            {
                name: 'Sushi',
                description: 'Sushi de Salmão',
                price: 85.00,
                category: 'oriental',
                available: true,
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
