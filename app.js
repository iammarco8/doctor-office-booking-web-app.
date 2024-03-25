import express from "express";
import bodyParser from "body-parser";

[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]
//              routes
[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]

import { appointments } from './routes/appointment.js'
// import { schedules } from './routes/schedules.js'

const port = 9999
const app = express();

app.set("view engine", "ejs")

app.use('/', appointments);
// app.use('/', schedules);
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static('public'));
app.use('/assets', express.static('assets'));
// app.use(express.bodyParser());

app.listen(port, ()=>{
    console.log(`type "localhost:${port}"`)
});