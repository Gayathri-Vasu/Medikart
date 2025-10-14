const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

const accountSid = 'your_twilio_account_sid'; // Replace with your Twilio Account SID
const authToken = 'your_twilio_auth_token'; // Replace with your Twilio Auth Token
const twilioClient = twilio(accountSid, authToken);

app.post("/send-notification", (req, res) => {
  const { mobile, medicine, date, time } = req.body;

  const message = `Reminder: Take your medicine ${medicine} on ${date} at ${time}.`;

  twilioClient.messages
    .create({
      body: message,
      from: 'your_twilio_phone_number', // Replace with your Twilio phone number
      to: mobile,
    })
    .then(() => res.status(200).send("Notification sent!"))
    .catch(error => res.status(500).send("Failed to send notification."));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});