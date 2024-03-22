import express from 'express';
import {
    createAppointment,
    // 
    getAllAppointments, getSingleAppointment, 
    // 
    editAppointment,
    // 
    deleteAppointment
} from '../data/database.js';
// import { getRounds } from 'bcryptjs';

export const appointments = express.Router()

appointments.get('/appointmentList', async (req,res)=>{
    const full = await getAllAppointments();
    res.render('appointment',{
        appointments: full,
        title: 'full list of appointments'
    });
});

appointments.get('/appointment/:id', async(req,res)=>{
    const id = req.params.id;
    const result= await getSingleAppointment(id);
    res.render('singleAppointment',{data:result, title:"Single Appointment"});
});

appointments.get('/makeApointmnet', async(req,res)=>{
    res.render('createAppointment',{
        title:'Create apointment'
    });
});