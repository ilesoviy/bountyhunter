const sgMail = require('@sendgrid/mail')
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports.sendEmail = async (to, subject, text) => {
  return new Promise(async (resolve, reject) => {
    const msg = {
      to: to,
      from: {
        name: 'blockhub',
        email: process.env.SENDGRID_VERIFIED_SENDER,
      },
    //   templateId: 'd-e490ed1f59ce4fc89d73ae801681425f',
    //   dynamic_template_data: {
    //     name: name,
    //     link: link,
    //     link_html: link_html,
    //   }
      subject: subject,
      text: text,
      html: `<h3>${text}</h3>`
    }
    
    sgMail
      .send(msg)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
  })
  
}