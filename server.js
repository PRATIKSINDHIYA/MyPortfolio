import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to the server");
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratiksindhiya3@gmail.com',
            pass: 'fofp jzpe zvfz ntdi'
        }
    });

    const mailOptions = {
        from: `${email}`,
        to:  `pratiksindhiya3@gmail.com`, // Change to your receiving email
        subject: 'New Message from Portfolio',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});