
const express=require('express');
const cors=require('cors');
const router= require('./src/modules/auth/auth.routes');
const userRouter=require('./src/modules/users/user.routes');



const app=express();


const corsOptions={
    origin:'*',
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());



app.use('/api/auth', router);
app.use('/api/users', userRouter);


module.exports=app;