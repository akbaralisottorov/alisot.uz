const { PrismaClient } = require('@prisma/client');

const regions = [
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1',
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1',
  'sa-east-1', 'ca-central-1'
];

async function checkRegion(region) {
  // Use pgbouncer=true because port 6543 is transactional pooler, and set connection_limit to 1
  const url = `postgresql://postgres.gizxxdygdpweajzuckwg:Aliy.3653147!@aws-0-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    }
  });

  try {
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    return { region, url, success: true };
  } catch (err) {
    await prisma.$disconnect();
    return { region, url, success: false, error: err.message };
  }
}

async function run() {
  console.log('Testing regions with Prisma...');
  for (const region of regions) {
    console.log(`Checking ${region}...`);
    const res = await checkRegion(region);
    if (res.success) {
      console.log(`\nFOUND IT! Region is ${region}`);
      console.log(`URL: ${res.url}\n`);
      process.exit(0);
    } else {
      console.log(`Failed for ${region}: ${res.error.replace(/\n/g, ' ').substring(0, 150)}`);
    }
  }
  console.log('Finished checking all regions. None succeeded.');
  process.exit(1);
}

run();
