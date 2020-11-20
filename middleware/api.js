const express           = require('express')
const router            = express.Router()
const sgMail = require('@sendgrid/mail')
const axiosjs           = require('axios')
const https             = require('https')
const { body }          = require('express-validator')
const { sanitizeBody }  = require('express-validator')

const axios = axiosjs.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.post('/send-email',function(req, res){
const msg = {
  to: 'jullan.quevedo50@gmail.com', // Change to your recipient
  from: req.body.email, // Change to your verified sender
  subject: req.body.subject,
  text: req.body.message + "\n\nRegards,\n " + req.body.name,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
})
router.get('/welcome', (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'Welcome to my landing page backend'
    })
  })

router.post('/send-email',function(req, res){
  response = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  }

  return res.status(200).json({
    success: true,
    message: 'Email saved'
  })
})

module.exports = router