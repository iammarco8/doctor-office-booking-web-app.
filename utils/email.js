import ejs from 'ejs';
import nodmailer from "nodemailer";
import { htmlToText } from 'html-to-text';
import { dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta. url));

export class Email {
    #templateURL = path.join(__dirname,'../views/email/');
    constructor(patient){
        this.to = patient.email;
        this.first_name = patient.first_name;
        this.last_name = patient.last_name;
        this.from = `[Mandeville Public/Hargreeves Memorial Hospital] <${process.env.EMAIL_FROM}>` 
        // how does this know where the config file is?
    }; 
    createMailTranport(){
        if(process.env.NODE_ENV != 'production'){
            return nodemailer.createTransport({
                host: 'sandbox.smtp.mailtrap.io',
                port: 587,
                auth: {
                    user:process.env.MAILTRAP_USER,
                    pass:process.env.MAILTRAP_PASS
                }
            });
        }else{
            return nodemailer.createTransport({
                host: 'mail.CanteenDomain.com',
                port: 465,
                secure: true,
                auth: {
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASS
                }
            });
        }
    }

    async sendMail(template, subject, Orderinfo){
        const transport = this.createMailTranport();
        const html = await ejs.renderFile(this.#templateURL + template + '.ejs', {
            subject:subject,
            patient_first_name: this.first_name,
            patient_last_name: this.last_name,
        });
        return await transport.sendMail({
            to:`${this.to}, ${process.env.COPY_EMAIL}`,
            from:this.from,
            html:html,
            text:htmlToText(html),
            subject:subject
        });
    }
};