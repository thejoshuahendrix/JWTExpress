const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) => {
    res.json({
        message:"Welcome to the API"
    })
});



app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretKey' , (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:"Post Created",
                authData
            })
        }

    })
    
    
    
})


app.post('/api/login', (req, res) => { 
    //Mock USER
    const user = {
        id:1,
        name:"Josh",
        email:"josh@me.com",
        password:"1234"
    }
    
    jwt.sign({user},'secretKey', (err, token)=>{
        res.json({token})
    })
})



//Format of token
//Authorization : Bearer <token>

//Verify TOken
function verifyToken(req,res,next) {
    //Get auth header
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    try{
        if(typeof bearerHeader !== undefined){
            const bearer = bearerHeader.split(' ');
            //get token from array
            const bearerToken = bearer[1];
            //set the token
            req.token = bearerToken;
            next();
        }else{
            //Forbidden
            res.sendStatus(403);
        }
    } catch (err) {
        res.sendStatus(403);
    }
    
}



app.listen(5000, ()=> {
    console.log('Running on ' + 5000)
})

