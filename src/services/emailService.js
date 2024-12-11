const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Or use other email services like SendGrid, etc.
    auth: {
        user: process.env.EMAIL_USER,   // Your email address
        pass: process.env.EMAIL_PASS,   // Your email password (consider using environment variables)
    },
});

// Send email function
const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,    // Sender address
        to,                             // List of recipients
        subject,                        // Subject line
        text,                           // Plain text body
        html,                           // HTML body (optional)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };
