const jwt = require('jsonwebtoken');
const axios = require('axios');

const OTP_SECRET = process.env.OTP_SECRET || 'your_jwt_secret_key'; // Replace with your secret key

// OTP generator
function generateOtp() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 9) + 1; // Generates a number between 1 and 9
    }
    return otp;
}

// Sending OTP
exports.sendOTP = async (req, res) => {
    try {
        const mobileNumber = req.body.mobileNumber;
        if (!mobileNumber) {
            return res.status(400).json({ success: false, message: 'Mobile number is required.' });
        }

        const otp = generateOtp();
        const expirationTime = Date.now() + 2 * 60 * 1000; // OTP valid for 2 minutes

        // Create JWT token with OTP and expiration time
        const token = jwt.sign({ otp, mobileNumber, exp: Math.floor(expirationTime / 1000) }, OTP_SECRET);

        const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            params: {
                authorization: process.env.FAST2SMS_API_KEY,
                route: 'otp',
                variables_values: otp,
                numbers: mobileNumber
            }
        });

        if (response.status === 200) {
            console.log("OTP sent successfully");
            return res.json({ success: true, message: 'OTP sent successfully!', token });
        } else {
            throw new Error('Failed to send OTP via SMS service');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    }
}

// Verifying OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { otp, mobileNumber, token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: 'Token is required for verification.' });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, OTP_SECRET);

        if (decoded.otp === otp && decoded.mobileNumber === mobileNumber) {
            return res.json({ success: true, message: 'OTP verified successfully!' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid OTP or mobile number.' });
        }
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ success: false, message: 'OTP has expired.' });
        }
        console.log(err);
        res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
    }
}
