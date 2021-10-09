const gateway = require('fast-gateway');
const port = 3000;
const server = gateway({
	middlewares: [
		(req,res,next)=>{
			if(!req.headers || !req.headers.authorization || req.headers.authorization !== 'tareq'){
				res.send({ message : 'Invalid or Expired token' },401)
			}
			next();
		}
	],
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
