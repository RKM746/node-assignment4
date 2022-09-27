const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser')
const bcrypt=require('bcrypt');
const app=express();
const port=4000 || process.env.PORT

app.use(cors());
app.use(bodyparser.json());

const users=[];

app.get('/',(req,res)=>{
    res.send('server is started here');
    res.end();
})

app.get('/user',(req,res)=>{
    res.json(users);
})

app.post('/user',(req,res)=>{
        try{
            const {name,phone,email,password}=req.body
            const hashing=async()=>{
                const hashed_password=await bcrypt.hash(password,10);
                console.log(name,phone,email,hashed_password);
                const user={email:email,password:hashed_password}
                users.push(user)
            }
            hashing();
            res.status(200).send('user has successfully registered');
            res.end();
        }
        catch{
            res.status(500).send('user has not registered,please try again')
        }
})

app.listen(port,()=>{
    console.log(`server is started at port ${port}`)
})