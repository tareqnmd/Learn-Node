const gateway = require('fast-gateway');
const port = 3000;
const server = gateway({
	routes: [
		{
			prefix: '/customers',
			target: 'http://localhost:3001',
		},
		{
			prefix: '/accounts',
			target: 'http://localhost:3002',
		},
		{
			prefix: '/transactions',
			target: 'http://localhost:3003',
		},
	],
});

server.start(port).then(()=>{console.log(`Server Started at port ${port}`)});
