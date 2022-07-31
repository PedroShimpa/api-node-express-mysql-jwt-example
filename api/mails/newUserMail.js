require("dotenv").config();
from = process.env.FROMEMAIL;
const messages = require('../../messages.json');
const { html } = require('./htmls/newUsersHtmls');
exports.newUserMail = (userEmail) => {
  errorAoEnviar= 0;
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: userEmail,
    from: from,
    subject: messages.userRegistered,
    html: html,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('funcionou');
      return true;
    })
    .catch((error) => {
      errorAoEnviar = 1;
      return false;
    })

    if(errorAoEnviar === 1) return;
    return true;
    
}