const { PrismaClient } = require('@prisma/client');

async function run() {
  const password = encodeURIComponent('Aliy.3653147!');
  const url = `postgresql://postgres.gizxxdygdpweajzuckwg:${password}@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres?connection_limit=1`;
  
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    }
  });

  try {
    console.log('Checking Session Mode pooler (port 5432)...');
    await prisma.$queryRaw`SELECT 1`;
    console.log('SUCCESS connecting to Session Mode on port 5432!');
    await prisma.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error('FAILED connecting to Session Mode on port 5432:', err.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

run();
