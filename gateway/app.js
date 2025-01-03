import express from 'express';
import expressProxy from 'express-http-proxy';

const app = express();

app.use('/user', expressProxy('http://localhost:3001'));

app.listen(3000, ()=>{
    console.log('Gateway server is running on PORT 3000');
    
});