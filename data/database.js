import mysql from "mysql2";
import dotenv from "dotenv";
import { encryptPW } from '../utils/auth.js'

dotenv.config({path: '/config.env'})
const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
}).promise();

[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]
//              read funtion
[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]
export const getAllAppointments = async()=>{
    const [bookings] = await pool.query(`SELECT * FROM appointments;`)
    return bookings
};
export const getSingleAppointment = async(id)=>{
    const single = await pool.query(`SELECT * FROM appointment
    WHERE id = ?`, [id]);
    return single[0]
};
[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]
//                  create funtion
[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]
export const createAppointment = async(appointment)=>{
    const create = await pool.query(` INSERT INTO apointments
    (patient, date, purpose, room, doctor)
    VALUE(?,?,?,?,?,?);`,
    [appointment.patient, appointment.date,
    appointment.purpose, appointment.room,
    appointment.doctor]);
    return create;
};
[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
//              edit function
[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
export const editAppointment = async(appointment)=>{
    const edit = await pool.query(`
    UPDATE appointment
    SET
    patient=?, date=?, purpose=?, room=?, doctor=?
    WHERE id = ?`,
    [appointment.patient, appointment.date,appointment.purpose,
    appointment.room,appointment.doctor]);
    return edit
};
[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
//                   delete
[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
export const deleteAppointment = async(id)=>{
    const del = await pool.query(`
    DELETE FROM appointment
    WHERE id = ?`,
    [id]);
    return del
};
