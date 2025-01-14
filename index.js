const express = require('express')
const user = require('./user.model')
const mongoose = require('mongoose')

let mongourl = process.env.MONGOURL
let port = process.env.PORT
const app = express()
const dbConnection = mongoose.connect(mongourl)
dbConnection()

app.post('/register',async (req,res) => {
    try {
        let {username} = req.body

        let isUserExist = await user.findOne({username})

        if(isUserExist){
            res.status(422).json({status: 'Error', message:"User Already Exist"})
        }else{
            await user.create(req.body)
            res.status(200).json({status: 'Success', message:"User Saved Successfully"})
        }

    } catch (ex) {
        res.status(500).json({status: 'Error', message:`Error while registering the User`})
    }
})

app.post('/login',async(req,res)=>{
    try {
        let {username} = req.body

        let isUserExist = await user.findOne({username})

        if(isUserExist){
            res.status(200).json({status: 'Success', message:"Welcome User", data:isUserExist})
        }else{
            res.status(400).json({status: 'Error', message:"User Not Found"})
        }
    } catch (ex) {
        res.status(500).json({status: 'Error', message:`Error while Loging the User`})
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})