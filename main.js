const http = require('http');

const hostname = '0.0.0.0';
const port = 8080;

console.log(process.env.ENVIRONMENT || 'e2e');
console.log(process.env.ENVIRONMENT || 'prod');

/*if (process.env.ENVIRONMENT === 'prod') {	
    process.exit(1);	
}*/

const server = http.createServer((_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
