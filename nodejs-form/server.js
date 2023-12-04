const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;

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
            res.status(500).send('Error submitting the form.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Form submitted successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});