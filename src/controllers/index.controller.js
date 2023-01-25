const indexCtrl = {};

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { gmail } = require('googleapis/build/src/apis/gmail');

const { ID_CLIENT, SECRET_CLIENT, URI_REDIRECT, TOKEN_REFRESH } = process.env;

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

indexCtrl.renderContact = (req, res) => {
    res.render('contact')
};

indexCtrl.renderOrder = (req, res) => {
    res.render('order')
};

indexCtrl.sendOrder = (req, res) => {
    const { name, email, file } = req.body;

    contentHTML = `
        <h1>3D Shop Order</h1>
        <ul>
            <li>name: ${name}</li>
            <li>email: ${email}</li>
        </ul>
        <p>files: ${file}</p>
    `;
    
    const CLIENT_ID=ID_CLIENT;
    const CLIENT_SECRET=SECRET_CLIENT;
    const REDIRECT_URI=URI_REDIRECT;
    const REFRESH_TOKEN=TOKEN_REFRESH;

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

    async function sendMail() {
        
        try {
            const accessToken = await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "willygerstner@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                },
            });
            const mailOptions = {
                from: "Proyecto Final 3D Shop <willygerstner@gmail.com>",
                to: 'willygerstner@gmail.com',
                subject: "3D Shop Order",
                html: contentHTML,
            };

            const result = await transporter.sendMail(mailOptions);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    sendMail()
        .then((result) => res.status(200).render('index'))
        .catch((error) => console.log(error.message));
};

indexCtrl.sendMessage = (req, res) => {
    const { name, email, message } = req.body;

    contentHTML = `
        <h1>3D Shop Message</h1>
        <ul>
            <li>name: ${name}</li>
            <li>email: ${email}</li>
        </ul>
        <p>message: ${message}</p>
    `;
    
    const CLIENT_ID=ID_CLIENT;
    const CLIENT_SECRET=SECRET_CLIENT;
    const REDIRECT_URI=URI_REDIRECT;
    const REFRESH_TOKEN=TOKEN_REFRESH;

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

    async function sendMail() {
        
        try {
            const accessToken = await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "willygerstner@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                },
            });
            const mailOptions = {
                from: "Proyecto Final 3D Shop <willygerstner@gmail.com>",
                to: 'willygerstner@gmail.com',
                subject: "3D Shop Message",
                html: contentHTML,
            };

            const result = await transporter.sendMail(mailOptions);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    sendMail()
        .then((result) => res.status(200).render('index'))
        .catch((error) => console.log(error.message));
};

module.exports = indexCtrl;