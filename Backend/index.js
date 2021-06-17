const express = require('express')
const app=express()
const mongoose  = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
var flash = require('connect-flash');
var session = require('express-session')

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Database Connected"),{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
})

app.use(express.json())
app.use(cookieParser())
app.use(session({ cookie: { maxAge: 60000 },secret: '123'}));
app.use(flash());
app.use(cors({
    credentials:true,
    origin:['http://localhost:3000','http://localhost:4040']
}))
app.use('/app',routesUrls)
app.listen(4040, () => console.log("server is running"))