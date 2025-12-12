const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
    // For development, you can use Gmail or any SMTP service
    // Make sure to add EMAIL_USER and EMAIL_PASS to your .env file
    return nodemailer.createTransport({
        service: 'gmail', // You can change this to any email service
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS  // Your email password or app-specific password
        }
    });
};

// Generate a 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
const sendVerificationEmail = async (email, username, verificationCode) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'VisionMesh - Email Verification',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F46E5;">Welcome to VisionMesh!</h2>
                    <p>Hi ${username},</p>
                    <p>Thank you for registering with VisionMesh. Please verify your email address to complete your registration.</p>
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 14px; color: #6b7280;">Your verification code is:</p>
                        <h1 style="margin: 10px 0; color: #4F46E5; letter-spacing: 5px;">${verificationCode}</h1>
                    </div>
                    <p style="color: #6b7280; font-size: 14px;">This code will expire in 10 minutes.</p>
                    <p style="color: #6b7280; font-size: 14px;">If you didn't create an account with VisionMesh, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                    <p style="color: #9ca3af; font-size: 12px;">VisionMesh - AI-Powered Mesh Analysis</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }
};

module.exports = {
    generateVerificationCode,
    sendVerificationEmail
};
