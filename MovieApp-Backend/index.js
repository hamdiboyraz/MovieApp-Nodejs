import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" // DAO: Data Access Object
import {} from 'dotenv/config'



const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_pasword = process.env['MONGO_PASSWORD'];
//const uri = `mongodb+srv://db:<password>@cluster0.cjtmiu3.mongodb.net/?retryWrites=true&w=majority`
// Thanks to ``, we can insert variables in it
const uri = `mongodb+srv://${mongo_username}:${mongo_pasword}@cluster0.cjtmiu3.mongodb.net/?retryWrites=true&w=majority`;
const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, ()=> {
            console.log(`listening on port ${port}`)
        })
    })
