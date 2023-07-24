const nodemailer = require('nodemailer');

const sendEmailController = async (req, res) => {
    const { email, subject, text } = req.body;

  // Create a transporter for sending emails (Update with your email service details)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: '',
    },
  });

  // Email content
  const mailOptions = {
    from: 'alialaddin2018@gmail.com',
    to: email,
    subject,
    text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
};

module.exports = sendEmailController;