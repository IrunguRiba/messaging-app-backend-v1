/*

Create HTTP server

Connect database

Initialize WebSockets

Start listening on a port

*/


const app=require('./app');
const connectDb=require('./src/config/db');
const {port} = require('./src/config/env');


async function start(){
    await connectDb();
    app.listen(port,()=>{
        console.log(`Server is running on port ${port} 💚`);
    });
}
start();
