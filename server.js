const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: '*', // Replace '*' with your React app domain in production
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email sending endpoint for the main form
app.post('/send-email', async (req, res) => {
    const { name, phone, school_name, state, city, designation, school_board } = req.body;

    console.log('Main Form Data Received:', req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mainFormAdminMailOptions = {
        from: 'no-reply@skilledity.in',
        to: process.env.RECEIVER_EMAIL,
        subject: `Brochure Downloaded by ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="background-color: #55679c; color: white; padding: 15px; text-align: center;">
                    <h2>skilledity Solutions Pvt Ltd</h2>
                </div>
                <div style="padding: 20px;">
                    <h3 style="color: #55679c;">Brochure Downloaded by ${name}:</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                        <div style="flex: 1 1 calc(50% - 10px); background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                        </div>
                        <div style="flex: 1 1 calc(50% - 10px); background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
                            <p><strong>School Name:</strong> ${school_name}</p>
                            <p><strong>State:</strong> ${state}</p>
                        </div>
                        <div style="flex: 1 1 calc(50% - 10px); background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
                            <p><strong>City:</strong> ${city}</p>
                            <p><strong>Designation:</strong> ${designation}</p>
                        </div>
                        <div style="flex: 1 1 calc(50% - 10px); background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
                            <p><strong>School Board:</strong> ${school_board}</p>
                        </div>
                    </div>
                </div>
                <div style="background-color: #55679c; color: white; padding: 10px; text-align: center;">
                    <p>© 2025 skilledity Solutions Pvt Ltd. All Rights Reserved.</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mainFormAdminMailOptions);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email' });
    }
});

// Email sending endpoint for the contact page
app.post('/send-email-contactpage', async (req, res) => {
    const { name, phone, email, school_name, city, state, designation, message } = req.body;

    console.log('Contact Page Form Data Received:', req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Email to admin
    const contactPageAdminMailOptions = {
        from: 'no-reply@skilledity.in',
        to: process.env.RECEIVER_EMAIL,
        subject: `Contact Detail from the website by ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="background-color: #55679c; color: white; padding: 15px; text-align: center;">
                    <h2>skilledity Solutions Pvt Ltd</h2>
                </div>
                <div style="padding: 20px;">
                    <h3 style="color: #55679c;">Details by ${name}:</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                        <div style="flex: 1 1 calc(50% - 10px); background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                            <p><strong>Email:</strong> ${email}</p>
                        </div>
                        <div style="flex: 1 1 calc(50% - 10px); background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
                            <p><strong>School Name:</strong> ${school_name}</p>
                            <p><strong>City:</strong> ${city}</p>
                            <p><strong>State:</strong> ${state}</p>
                        </div>
                    </div>
                    <div style="margin-top: 15px;">
                        <p><strong>Designation:</strong> ${designation}</p>
                        <p><strong>Message:</strong> ${message}</p>
                    </div>
                </div>
                <div style="background-color: #55679c; color: white; padding: 10px; text-align: center;">
                    <p>© 2025 skilledity Solutions Pvt Ltd. All Rights Reserved.</p>
                </div>
            </div>
        `,
    };

    // Thank-you email to user
    const thankYouUserMailOptions = {
        from: 'no-reply@skilledity.in',
        to: email,
        subject: 'Thank You for Contacting skilledity!',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="background-color: #55679c; color: white; padding: 15px; text-align: center;">
                    <h2>skilledity Solutions Pvt Ltd</h2>
                </div>
                <div style="padding: 20px;">
                    <h3 style="color: #55679c;">Thank You, ${name}!</h3>
                    <p>We appreciate you reaching out to us. Our team will review your submission and get back to you shortly.</p>
                    <h4 style="margin-top: 20px;">Your Submitted Details:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                        <div style="flex: 1 1 calc(50% - 10px); background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                        </div>
                        <div style="flex: 1 1 calc(50% - 10px); background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>School Name:</strong> ${school_name}</p>
                        </div>
                    </div>
                    <p style="margin-top: 15px;">If you have any additional questions, feel free to reply to contact@skilledity.in</p>
                    <p>Best regards,<br><strong>The skilledity Team</strong></p>
                </div>
                <div style="background-color: #55679c; color: white; padding: 10px; text-align: center;">
                    <p>© 2025 skilledity Solutions Pvt Ltd. All Rights Reserved.</p>
                </div>
            </div>
        `,
    };

    try {
        // Send email to admin
        await transporter.sendMail(contactPageAdminMailOptions);

        // Send thank-you email to the user
        await transporter.sendMail(thankYouUserMailOptions);

        res.status(200).send({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).send({ message: 'Failed to send emails' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
