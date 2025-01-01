import nodemailer from "nodemailer";
import pug from "pug";

export class Email {
  to: string;

  firstName: string;

  url: string;

  from: string;

  constructor(user: any, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `yourName <${process.env.MAILGUN_USERNAME}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //  mailgun
      return nodemailer.createTransport({
        host: process.env.GMAIL_HOST as string,
        port: parseInt(process.env.GMAIL_PORT as string, 10),
        auth: {
          user: process.env.EMAIL_FROM as string,
          pass: process.env.GMAIL_PASSWORD as string,
        },
      });
    } else if (process.env.NODE_ENV === "development") {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST as string,
        port: parseInt(process.env.EMAIL_PORT as string, 10),
        auth: {
          user: process.env.EMAIL_USERNAME as string,
          pass: process.env.EMAIL_PASSWORD as string,
        },
      });
    } else {
      throw new Error("No valid transport configuration found.");
    }
  }

  async send(template: any, subject: any) {
    //  send the actual email
    //  1)render the HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../view/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    //  2) Define emailOptions

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,

      html,
    };

    //  3) create a transport and send an email

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the ");
  }
  // await this.send('PUG_FILE_NAME', 'subject');

  async sendResetPassword() {
    await this.send(
      "passwordReset",
      "Your Password Reset Token (valid for only 10 minutes)"
    );
  }
}
