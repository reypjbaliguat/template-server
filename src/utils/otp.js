const generateOTP = () => {
    // Generate a random number between 1000 and 9999
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString(); // Return as string if needed
};

const generateOTPHTMLemail = (otp) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #333;
            font-size: 28px;
        }
        .message {
            text-align: center;
            color: #555;
            font-size: 16px;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #2c98f0;
            letter-spacing: 3px;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #e7f1fe;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 14px;
            margin-top: 30px;
        }
        .footer a {
            color: #2c98f0;
            text-decoration: none;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Account Verification</h1>
            <p>Use the OTP code below to complete your authentication process.</p>
        </div>
        
        <div class="message">
            <p><strong>Your One-Time Password (OTP) is:</strong></p>
            <div class="otp-code">${otp}</div>
        </div>
        
        <div class="footer">
            <p>If you did not request this OTP, please ignore this email or <a href="#">contact support</a>.</p>
            <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

module.exports = {
    generateOTP,
    generateOTPHTMLemail,
};
