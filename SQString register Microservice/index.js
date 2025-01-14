const mongo = require('mongo')

let mongourl = process.env.MONGOURL

const dbConnection = async()=>{
    try {
        const db = await mongo.connect(mongourl)
        if(db){
            return db
        }else{
            return `Issue in connecting the DB`
        }

    } catch (ex) {
        console.log(ex)
        return `issues while connecting to DB`
    }
}

export const handler = async(event)=>{
    try {
        let data = JSON.parse(event.body)
        let {username} = data
        let db = await dbConnection()
        let isUserExist = db.collection('user').findOne({username})
        if(isUserExist){
            return{
                code:422,
                message:"User Already Exist"
            }
        }else{
            await db.collection('user').create(data)
            return{
                code:200,
                message:"User Registered Successfully"
            }
        }
    } catch (ex) {
        return{
            code:500,
            message:"Something went wrong"
        }
    } finally{
        if(db){
            db.close()
        }
    }
}
