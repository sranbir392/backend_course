const AWS = require('aws-sdk');
const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY} = require("../../globals");
// Set the AWS region (e.g., us-east-1)
AWS.config.update({ region: AWS_REGION, credentials: new AWS.Credentials({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  }), });


// Create an instance of the SES service
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

// Define your email parameters

const sendEmail = (recipientEmail, subject, content) => {
    const params = {
        Destination: {
            ToAddresses: [recipientEmail],
        },
        Message: {
            Body: {
                Text: {
                    Data: content, // Replace with your email content
                },
            },
            Subject: {
                Data: subject, // Replace with your email subject
            },
        },
        Source: 'sourav.das@masaischool.com', // Replace with your sender email address
    };
    // Send the email
    ses.sendEmail(params, (err, data) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent successfully:', data);
        }
    });
}

module.exports = sendEmail;
