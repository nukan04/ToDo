/**
 * Module dependencies.
 */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import routerAuth from './routerAuth.js'

/**
 * Port
 * @type {string|number}
 */
const PORT = process.env.PORT || 5000;

/**
 * Create Express server.
 * @type {Express}
 */
const app = express();

app.use(express.json());
app.use("/auth", routerAuth)

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const CONNECTION_URL = 'mongodb+srv://nurdaulet:sjB6dmykKLUfFW73@cluster0.0tvpp8m.mongodb.net/?retryWrites=true&w=majority';
/**
 * Connect to MongoDB and start Express server.
 * @returns {}
 */
const start = async () => {
    try{
        await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () =>  console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e);
    }
}
start()
/*


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.connect(CONNECTION_URL).then(()=>{console.log('...')})

 */