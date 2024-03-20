import express from "express";

[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]
//              routes
[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]

import { appointments } from './routes/appointment.js'
// import { schedules } from './routes/schedules.js'

const port = 9999
const app = express();

app.use('/', appointments);
// app.use('/', schedules);

app.set("view engine", "ejs")
app.use(express.urlencoded({
    extended:true
}));

// app.use()
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

app.listen(port, ()=>{
    console.log(`type "localhost:${port}"`)
});