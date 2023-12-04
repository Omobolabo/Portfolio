const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate the form data
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All form fields are required.' });
    }

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // replace with your Gmail email
            pass: 'your-password' // replace with your Gmail password or app-specific password
        }
    });

    // Email content
    const mailOptions = {
        from: 'your-email@gmail.com', // replace with your Gmail email
        to: 'moyosoreosineye@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error sending email.' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ success: 'Form submitted successfully!' });
        }
    });
};