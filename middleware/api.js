const express           = require('express')
const app            = express.Router()
const sgMail = require('@sendgrid/mail')
const axiosjs           = require('axios')
const https             = require('https')
const { body }          = require('express-validator')
const { sanitizeBody }  = require('express-validator')
const nodemailer = require('nodemailer')

const axios = axiosjs.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
app.post('/send-email', [
  body('*')
  .not().isEmpty()
  .trim()
  .escape(),
], (req, res) => {

  console.log('Email Details:', JSON.stringify(req.body, 0, 2))

  var transport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 25,
    auth: {
      user: "apikey",
      pass: "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"
    }
  });

  var mailOptions = {
    from: 'jullan.quevedo50@gmail.com',
    to: 'jullan.quevedo50@gmail.com',
    subject: 'Inquiry Received From: '+ req.body.email + '  ' +req.body.subject,
    text: req.body.message + "\n\nRegards,\n " + req.body.name +'\n'
  };

  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('ERROR!!! '+ JSON.stringify(error))
      return res.status(400).json({
        success: false,
        message: 'Opps It seems something went wrong. Please try again'
      })
    } else {
      return res.status(200).json({
        success: true,
        message: 'Thanks for contacting Clearvision. We\'ll be in contact soon'
      })
    }
  });

})

app.get('/test', (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'Welcome to my landing page backend'
    })
  })
module.exports = app