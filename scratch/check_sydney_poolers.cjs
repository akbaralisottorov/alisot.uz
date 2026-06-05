const { PrismaClient } = require('@prisma/client');

async function checkUrl(url, label) {
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    }
  });

  try {
    console.log(`Checking ${label}...`);
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    return { success: true, url };
  } catch (err) {
    await prisma.$disconnect();
    return { success: false, error: err.message };
  }
}

async function run() {
  const password = encodeURIComponent('Aliy.3653147!');
  const url0 = `postgresql://postgres.gizxxdygdpweajzuckwg:${password}@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;
  const url1 = `postgresql://postgres.gizxxdygdpweajzuckwg:${password}@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;

  const res0 = await checkUrl(url0, 'aws-0');
  if (res0.success) {
    console.log('SUCCESS on aws-0!');
    console.log('URL:', url0);
    process.exit(0);
  } else {
    console.log('FAILED on aws-0:', res0.error.replace(/\n/g, ' ').substring(0, 150));
  }

  const res1 = await checkUrl(url1, 'aws-1');
  if (res1.success) {
    console.log('SUCCESS on aws-1!');
    console.log('URL:', url1);
    process.exit(0);
  } else {
    console.log('FAILED on aws-1:', res1.error.replace(/\n/g, ' ').substring(0, 150));
  }

  process.exit(1);
}

run();
