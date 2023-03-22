import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import express from 'express';

function runExpress () {
	const app = express()
	app.get('/api/slow', (req, res) => {
		console.time('slow api');
		let result = 0;
		for(let i = Math.pow(7, 7); i >= 0; i --) {
			result += Math.tan(i) * Math.atan(i);
		}
		console.timeEnd('slow api');
		console.log(`Result number is ${result} - on process ${process.pid}`);
		res.send(`Result number is ${result}`);
	});
	app.listen(3000, () => {
		console.log('App listening on port 3000');
	});
}

if (cluster.isPrimary) {
	// 主进程
	console.log(`Master ${process.pid} running.`);
	const cupLen = cpus().length;
	console.log(`Cpu length ${cupLen}`);
	for (let i = 0; i < cupLen; i ++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		console.log(`Worker ${worker.process.pid} died.`);
	})
} else {
	runExpress();
	// http.createServer((req, res) => {
	// 	res.writeHead(200);
	// 	res.end('Hello');
	// }).listen(8000);
	console.log(`Worker ${process.pid} started.`);
}
