import Nodemailer from  "nodemailer";
import { MailtrapTransport }from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sender = {
  address: "no-reply@hireceylon.com",
  name: "MERN Auth + CRUD",
};