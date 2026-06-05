const dns = require('dns');
const net = require('net');

const region = 'ap-southeast-2';
const numbers = [0, 1, 2, 3, 4, 5];

async function checkNumber(n) {
  const host = `aws-${n}-${region}.pooler.supabase.com`;
  return new Promise((resolve) => {
    dns.lookup(host, { family: 4 }, (err, address) => {
      if (err) {
        resolve({ n, host, status: 'DNS_FAILED', err: err.message });
      } else {
        // Try TCP connection to port 6543
        const socket = new net.Socket();
        socket.setTimeout(2000);
        socket.connect(6543, host, () => {
          socket.destroy();
          resolve({ n, host, status: 'CONNECTED', ip: address });
        });
        socket.on('error', (connectErr) => {
          socket.destroy();
          resolve({ n, host, status: 'TCP_FAILED', ip: address, err: connectErr.message });
        });
        socket.on('timeout', () => {
          socket.destroy();
          resolve({ n, host, status: 'TIMEOUT', ip: address });
        });
      }
    });
  });
}

async function run() {
  console.log('Testing pooler numbers for ap-southeast-2...');
  const results = await Promise.all(numbers.map(checkNumber));
  console.log(JSON.stringify(results, null, 2));
}

run();
