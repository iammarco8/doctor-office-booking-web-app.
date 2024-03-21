import mysql from "mysql2";
import  dotenv  from "dotenv";
// import { encryptPW } from '../utils/auth.js'

dotenv.config({path:'./config.env'})
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
    const [bookings] = await pool.query(`
    SELECT 
    u.first_name as patient_first, u.last_name as patient_last, u.age, u.weight, u.gender, 
    u.ethnicity, u.next_of_kin, u.blood_type, u.misc, u.insurance,
    u.bank_info, u.email
    , d.first_name, d.last_name, d.specialty
    , a.concern, a.id
    FROM appointment a, user u, doctor d
    WHERE
    u.id = a.patient
    AND d.id = a.doctor`)
    return bookings
};
export const getSingleAppointment = async(id)=>{
    const single = await pool.query(`
    SELECT 
    u.first_name, u.last_name, u.age, u.weight, u.gender, 
    u.ethnicity, u.next_of_kin, u.blood_type, u.misc, u.insurance,
    u.bank_info, u.email
    ,d.first_name, d.last_name, d.specialty
    ,a.concern
    FROM appointment a, user u, doctor d
    WHERE
    u.id = a.patient
    AND d.id = a.doctor
    AND a.id = ?`, [id]);
    return single[0]
};
export const getAllDoctors = async()=>{
    const [all] = await pool.query(`
    SELECT * FROM doctors
    `);
    return all
};
export const getAllRooms = async()=>{
    const [all] = await pool.query(`SELECT * FROM rooms`)
    return all
};
export const getAllUsers = async()=>{
    const [all] = await pool.query(`
    SELECT * FROM users`);
    return all
};
[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]
//                  create funtion
[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]
export const createShedule = async(appointment)=>{
    const create = await pool.query(` INSERT INTO schedule
    (date, doctor_id, patient_id, room)
    VALUE(?,?,?,?,?,?);`,
    [appointment.date, appointment.doctor_id,
    appointment.patient_id, appointment.room
    ]);
    return create;
};
export const createAppointment = async(appointment)=>{
    const request = await pool.query(`
    INSERT INTO appointment
    (patient, date, concern, doctor, gender, ethnicity,
        next_of_kin, blood_type, misc, insurance, bank_info)
        VALUE(?,?,?,?,?,?,?,?,?,?,?)`,
        [appointment.patient, appointment.date, appointment.concern,
        appointment.doctor, appointment.gender, appointment.ethnicity,
        appointment.next_of_kin, appointment.blood_type,
        appointment.misc, appointment.insurance, appointment.bank_info]
    );
    return request;
};
export const createUser = async(user)=>{
    const patient = await pool.query(`
    INSERT INTO user
    (first_name, last_name, email, age, weight, gender, ethnicity, 
        next_of_kin, blood_type, misc, insurance, bank_info)`,
        [user.first_name, user.last_name, user.email, user.age, user.weight,
        user.ethnicity, user.next_of_kin, user.blood_type, user.misc,
        user.insurance, user.bank_info
    ]);
    return patient;
};
[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
//              edit function
[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
export const editAppointment = async(appointment)=>{
    const edit = await pool.query(`
    UPDATE appointment
    SET
    patient=?, date=?, concern=?, doctor=?
    WHERE id = ?`,
    [appointment.patient, appointment.date, appointment.concern,
    appointment.doctor, appointment.gender, appointment.ethnicity,
    appointment.next_of_kin, appointment,blood_type,
    appointment.misc, appointment.insurance, appointment.bank_info, appointment.id ]);
    return edit
};
export const editSchedule = async(schedule)=>{
    const edit = await pool.query(`
    UPDATE schedule
    SET
    date = ?, doctor_id = ?, patient_id = ?, room = ?
    WHERE id = ?`,
    [schedule.date, schedule.doctor_id, schedule.patient_id, schedule.room
    , schedule.id ])
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
export const deleteSchedule = async(id)=>{
    const del = await pool.query(`
    DELETE FROM schedule
    WHERE id = ?`,
    [id]);
    return del
};