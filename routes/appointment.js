import express from 'express';
import {
    createAppointment,
    // 
    getAllAppointments, getSingleAppointment, 
    getAllDoctors,
    // 
    editAppointment,
    // 
    deleteAppointment
} from '../data/database.js';
// import { getRounds } from 'bcryptjs';

export const appointments = express.Router()

appointments.get('/appointmentList', async (req,res)=>{
    const full = await getAllAppointments();
    const meddoc = await getAllDoctors();
    res.render('appointment',{
        doctor: meddoc,
        appointments: full,
        title: 'full list of appointments'
    });
    // console.log(meddoc[0].first_name)
});

appointments.get('/appointment/:id', async(req,res)=>{
    const id = req.params.id;
    const result= await getSingleAppointment(id);
    res.render('singleAppointment',{data:result, title:"Single Appointment"});
});

appointments.get('/makeApointmnet', async(req,res)=>{
    const meddoc = await getAllDoctors();
    res.render('createAppointment',{
        doctor:meddoc,
        title:'Create apointment'
    });
    // console.log(doc)
});
appointments.post('/createAppointment', async(req,res)=>{
    const newBook = new Object();
    newBook.first_name = req.body.first_name,
    newBook.last_name = req.body.last_name
    newBook.email = req.body.email,
    newBook.age = req.body.age,
    newBook.weight = req.body.weight,
    newBook.gender = req.body.gender,
    newBook.ethnicity = req.body.ethnicity,
    newBook.next_of_kin = req.body.next_of_kin,
    newBook.blood_type = req.body.blood_type,
    newBook.insurance = req.body.insurance,
    newBook.bank_info = req.body.bank_info,
    newBook.doctor = req.body.doctor
    // const created = await createAppointment(newBook);
    await createAppointment(newBook);
    // return created
    // res.redirect('/appointment/')
    res.redirect('/appointmentList')
});