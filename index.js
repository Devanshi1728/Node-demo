const express = require('express')
const cors = require("cors")
const moment = require('moment');


require('./db/config');
const User = require('./db/users');

const app = express()
app.use(cors())

app.use(express.json());

app.post('/register', async (req,res) => {
    const data = await User.find();
    if(data.map(i => i.userName.includes(req.body.userName))){
        return res.status(201).send({'userName': req.body.userName})
    }
    else{
        let users = new User(req.body);
        let result = await users.save()
        result = result.toObject()
        res.status(200).send(result)
    }
})

app.patch('/addTask', async (req,res) => {
    const user = await User.find();
    if(user){
        formNumber = moment(new Date()).format('DDMMYY')+'-'+ (user.length+1)
    }
    const data = {...req.body, 
        formNumber: formNumber
    }
    let users = new User(data);
    let result = await users.save()
    result = result.toObject()
    res.status(200).send(result)
})

app.get('/', async(req,res) => {
    try {
        const data = await User.find()
        if (data)
            return res.status(200).send(data)
        else
            return res.status(400).send('No Data found')
    } catch (e) {
        return res.status(500).send(e)
    }
})

app.get('/user/:id', async(req,res) => {
    try {
        const {id} = req.params;
        if (User) {
            const data = await User.findById(id)
            return res.status(200).send(data)
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/edit/:id', async(req,res) => {
    try{
        const {id} = req.params;
        if(id){
            const data = await User.findByIdAndUpdate(id,req.body,{new: true});
            return res.status(200).send(data);
        }else{
            return res.status(404).send('User not found');
        }
    } catch(error){
        res.status(500).send(error)
    }
})


app.listen(3000);