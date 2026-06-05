const dns = require('dns');
const net = require('net');

const regions = [
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1',
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1',
  'sa-east-1', 'ca-central-1'
];

async function checkRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  return new Promise((resolve) => {
    dns.lookup(host, { family: 4 }, (err, address) => {
      if (err) {
        resolve({ region, host, status: 'DNS_FAILED', err: err.message });
      } else {
        // Try TCP connection to port 6543 (transaction pooling) and 5432 (session pooling)
        // Let's test port 6543 first, as it's the standard pooler port
        const socket = new net.Socket();
        socket.setTimeout(3000);
        socket.connect(6543, host, () => {
          socket.destroy();
          resolve({ region, host, status: 'CONNECTED', ip: address, port: 6543 });
        });
        socket.on('error', (connectErr) => {
          socket.destroy();
          // Try port 5432
          const socket2 = new net.Socket();
          socket2.setTimeout(3000);
          socket2.connect(5432, host, () => {
            socket2.destroy();
            resolve({ region, host, status: 'CONNECTED', ip: address, port: 5432 });
          });
          socket2.on('error', (connectErr2) => {
            socket2.destroy();
            resolve({ region, host, status: 'TCP_FAILED', ip: address, err: `${connectErr.message} / ${connectErr2.message}` });
          });
          socket2.on('timeout', () => {
            socket2.destroy();
            resolve({ region, host, status: 'TIMEOUT', ip: address, port: 5432 });
          });
        });
        socket.on('timeout', () => {
          socket.destroy();
          resolve({ region, host, status: 'TIMEOUT', ip: address, port: 6543 });
        });
      }
    });
  });
}

async function run() {
  console.log('Testing regions...');
  const results = await Promise.all(regions.map(checkRegion));
  console.log(JSON.stringify(results, null, 2));
}

run();
