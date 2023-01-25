const {Router} = require('express')
const router = Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const {renderIndex, renderAbout, renderContact, renderOrder, sendOrder, sendMessage} = require('../controllers/index.controller')

router.get('/', renderIndex);

router.get('/about', renderAbout);

router.get('/contact', renderContact);

router.get('/order', renderOrder);

router.post('/send-order', sendOrder)

router.post('/send-message', sendMessage)

module.exports = router;