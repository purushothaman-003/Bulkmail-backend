const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "003purushoth@gmail.com",
        pass: "ujmj venu imwt ixri",
    },
});

const emailTemplate = (message, recipient) => ({
    from: "003purushoth@gmail.com",
    to: recipient,
    subject: "You got a Text Message",
    text: message,
});

const sendMails = ({ message, emailList }) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const recipient of emailList) {
                const mailOptions = emailTemplate(message, recipient);
                await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${recipient}`);
            }
            resolve("Success");
        } catch (error) {
            console.error("Error sending emails:", error.message);
            reject(error.message);
        }
    });
};

app.post("/sendemail", function (req, res) {
    sendMails(req.body)
        .then((response) => {
            console.log(response);
            res.status(200).send(true);
        })
        .catch((error) => {
            console.error("Error:", error);
            res.status(500).send({ success: false, error: error.message });
        });
});

app.listen(5000, function () {
    console.log("Server Started on port 5000...");
});
